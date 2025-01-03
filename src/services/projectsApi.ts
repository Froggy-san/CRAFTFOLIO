import {
  createLandingProps,
  createProjectProps,
  editLandingProps,
  editProps,
} from "@/types/types";
import supabase, { supabaseUrl } from "./supabase";
import { getUserById } from "./authApi";
import { deleteImgFromStrage } from "@/utils/helper";
import { PAGE_SIZE } from "@/utils/constants";

// export async function getAllProjects() {
//   const { data: projects, error } = await supabase.from("projects").select("*");

//   return { projects, error };
// }

export async function getStats(userId: string) {
  const { data: visted, error: vistedError } = await supabase
    .from("publicUsers")
    .select("visted")
    .eq("userId", userId);

  if (vistedError) throw new Error(vistedError.message);

  const { count, error } = await supabase
    .from("projects")
    .select("", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) throw new Error(`Couldn't get the number of project for the user`);
  return { count, visted };
}

interface getPosts {
  page: number;
  searchTerm: string | null;
  sortValue: string | null;
}

export async function getPosts({ page, searchTerm, sortValue }: getPosts) {
  let query = sortValue
    ? supabase
        .from("projects")
        .select(
          "* ,projectImages(id,imageUrl,project_id) ,publicUsers(userId,avatar,username)",
          { count: "exact" },
        )
        .order("created_at", {
          referencedTable: "projectImages",
          ascending: true,
        })
    : // if there is no sort value we want the data to come from the database sorted by the newest to the oldest posts when the web app load the first time.
      supabase
        .from("projects")
        .select(
          `*, 
      projectImages(id, imageUrl, project_id) , 
      publicUsers(userId, avatar, username)`,
          { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .order("created_at", {
          referencedTable: "projectImages",
          ascending: true,
        });
  // Searching through projects .

  if (searchTerm) {
    query = query.or(
      `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,technologies.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`,
    );
  }

  if (sortValue) {
    const sort = sortValue.split("-");

    query = query.order(sort[0], { ascending: sort[1] === "asc" });
  }

  // pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE; // (1-1) * 10 = 0

    const to = from + PAGE_SIZE - 1; // 0 + 10 - 1 = 9

    query = query.range(from, to);
  }
  const { data: posts, error, count } = await query;

  if (error) throw new Error(error.message);

  return { posts, count };
}

/// Creating project.

export async function createProject(project: createProjectProps) {
  const { projectImages, ...projectObj } = project;

  // const imageTypes = projectImages.every((el) => typeof el === "string");

  const noFiles = typeof projectImages === "string";

  const { data, error } = await supabase
    .from("projects")
    .insert([{ ...projectObj }])
    .select();

  if (error) throw new Error(error.message);

  if (noFiles) return data;

  const imageNames = projectImages.map((image) => {
    return `${Math.random()}-${image.name.replace(/\//g, "")}`;
  });
  //`https://ixzmsptjfugshygjmvmh.supabase.co/storage/v1/object/public/projects/istockphoto-1495088043-612x612.jpg`
  const imagePaths = imageNames.length
    ? imageNames.map((name) => {
        return {
          project_id: data.at(0).id,
          imageUrl: `${supabaseUrl}/storage/v1/object/public/projects/${name}`,
          userId: project.user_id,
        };
      })
    : [];

  const { error: imageTableError } = await supabase
    .from("projectImages")
    .insert(imagePaths)
    .select();

  if (imageTableError) throw new Error(imageTableError.message);

  if (imageNames) {
    for (let i = 0; i < project.projectImages.length; i++) {
      const imageFile = project.projectImages[i];
      const { error: storageError } = await supabase.storage
        .from("projects")
        .upload(imageNames[i], imageFile);

      if (storageError) throw new Error(storageError.message);

      // Delete images files related to product.
      // if (!error && imagesToRemove) {
      //   const { error: deleteStorageImageError } = await supabase.storage
      //     .from('catzoui')
      //     .remove([...(imagesToRemove as string[])])
      //   if (deleteStorageImageError)
      //     throw new Error(`had truble deleting images from storage!`)
      // }
    }
  }

  return data;
}

/// Edit post.

export async function editPost({
  postToEdit,
  imagesToDelete,
  postId,
  userId,
}: editProps) {
  const { projectImages, ...post } = postToEdit;

  /// Upload the updated data for the post.

  const { data, error } = await supabase
    .from("projects")
    .update({ ...post })
    .eq("id", postId)
    .select();

  if (error) throw new Error(error.message);

  /// Uplaoding new images added by the user.

  // 1. Change the name of the image name , just in case the user uploads the same images more than once.

  const imageNames = projectImages.length
    ? projectImages.map(
        (image) => `${Math.random()}-${image.name.replace(/\//g, "")}`,
      )
    : [];

  // 2. Create image paths objects becasue in the back-end we have a table for the project's images and each row holds objects that look like this : {project_id: number , imageUrl: path}, so we are creating the objects here based on each image name in the imageNames variable up above, and we get the project ID form the data received up above and we are creating the image path by adding the supabaseurl and the image name the path will look like this link: (supabaseUrl:(https://ixzmsptjfugshygjmvmh.supabase.co)  /storage/v1/object/public/projects/ imageName:(0.41336132728436326-438782097_122107868006284253_3991697528105296940_n.jpg)).
  const imagePaths = imageNames.length
    ? imageNames.map((imageName) => {
        return {
          project_id: data.at(0).id,
          imageUrl: `${supabaseUrl}/storage/v1/object/public/projects/${imageName}`,
          userId,
        };
      })
    : [];

  // 3. Uplaod the image objects to the projectImages table in the back-end. please note as of now we didn't upload the actual image files, we just uploaded the image paths that is all.
  const { error: imageTableError } = await supabase
    .from("projectImages")
    .insert(imagePaths)
    .select();

  if (imageTableError) throw new Error(imageTableError.message);

  // 4. Uplaoding image Files.
  if (imageNames) {
    // (4.1). Uplaoding each image file.
    for (let i = 0; i < projectImages.length; i++) {
      const imageFile = projectImages[i];
      const { error: storageError } = await supabase.storage
        .from("projects")
        .upload(imageNames[i], imageFile);
      // (4.2). If there is an error while uplaoding the  image files to the back-end, we need to delete the images and the image paths in the projectImages table.
      if (storageError) {
        const imagesToDelete: string[] = []; /// [0.41336132728436326_n.jpg , 0.41336132728436326-438782097_n.jpg]

        // (4.3). Deleting the images paths we uploaded up above from the projectImages table.
        for (let i = 0; i < imageNames.length; i++) {
          const { error: deleteImageError } = await supabase
            .from("projectImages")
            .delete()
            .eq("imageUrl", imageNames[i]);

          //* The function that deletes the image files from the storages take the image name only not the path so we are spliting the links/paths and taking the image names form it and pushing it to the imageToDelte array to later delete them using the deleteImageFromStorage function down below, the image names will look like this , imageName : 0.41336132728436326-438782097_n.jpg
          imagesToDelete.push(imageNames[i].split("projects/")[1]);

          if (deleteImageError) throw new Error(deleteImageError.message);
        }

        // (4.4). This is a function that takes the storageName which is the name of the storage in the back-end and the imageToDelete array to delete the image files it self.
        deleteImgFromStrage({ storageName: "projects", imagesToDelete });
      }
    }
  }

  /// Uplaoding new images added by the user.

  /// 5. In case the user has deleted an existing image from the post.

  if (imagesToDelete.length) {
    const imageNamesToDelete: string[] = [];

    for (let i = 0; i < imagesToDelete.length; i++) {
      const { error: deleteImageError } = await supabase
        .from("projectImages")
        .delete()
        .eq("imageUrl", imagesToDelete[i]);

      if (deleteImageError)
        throw new Error(`TEST: Couldn't delete images from project images`);
      imageNamesToDelete.push(imagesToDelete[i].split("projects/")[1]);
    }

    /// refactored code to delete the image Files it self from the storage.
    deleteImgFromStrage({
      storageName: "projects",
      imagesToDelete: imageNamesToDelete,
    });
  }
  /// in case the user has deleted an existing image from the post.

  return data;
}

/// Get personal profile

export async function getPersonalPortfolio(userId: string) {
  const { data: userPorfolio, error } = await supabase
    .from("landingPages")
    .select("*")
    // Filters
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const { data: userProjects, error: userProjectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId);

  if (userProjectsError) throw new Error(userProjectsError.message);

  return { userPorfolio, userProjects };
}

interface getUserProps {
  userId: string;
  page: number;
  sortValue: string | null;
  searchTerm: string | null;
}

export async function getUserPosts({
  userId,
  page,
  sortValue,
  searchTerm,
}: getUserProps) {
  let query = sortValue
    ? supabase
        .from("projects")
        .select("* ,projectImages(id,imageUrl,project_id)", { count: "exact" })
        .order("created_at", {
          referencedTable: "projectImages",
          ascending: true,
        })
    : supabase
        .from("projects")
        .select("* ,projectImages(id,imageUrl,project_id)", { count: "exact" })
        .order("created_at", { ascending: false })
        .order("created_at", {
          referencedTable: "projectImages",
          ascending: true,
        });

  // searching.
  if (searchTerm) {
    query = query.or(
      `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,technologies.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`,
    );
  }

  if (sortValue) {
    const sort = sortValue.split("-");

    query = query.order(sort[0], { ascending: sort[1] === "asc" });
  }

  // pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE; // (1-1) * 10 = 0

    const to = from + PAGE_SIZE - 1; // 0 + 10 - 1 = 9

    query = query.range(from, to);
  }
  const { data: userPosts, error, count } = await query.eq("user_id", userId);
  // .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return { userPosts, count };
}

export async function getProjectById(projectId: string) {
  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `
    *,
  projectImages(id,project_id,imageUrl)
  `,
    )
    .eq("id", projectId)
    .order("created_at", {
      referencedTable: "projectImages",
      ascending: true,
    });

  if (error) throw new Error(error.message);
  if (!project.length)
    throw new Error(`No posts with the id:[${projectId}] were found!`);
  const user = await getUserById(project[0].user_id);

  return { project, user };
}

interface deletePostProps {
  postId: string;
  imagesToDelete: string[];
}

export async function deletePost({ postId, imagesToDelete }: deletePostProps) {
  const { error: imageTableError } = await supabase
    .from("projectImages")
    .delete()
    .eq("project_id", postId);
  if (imageTableError) throw new Error(imageTableError.message);

  deleteImgFromStrage({
    storageName: "projects",
    imagesToDelete,
  });
  const { error } = await supabase.from("projects").delete().eq("id", postId);

  if (error) throw new Error(error.message);
}

export async function deleteAllUsersPosts(userId: string) {
  const { error: error } = await supabase
    .from("projects")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const { data: imageNames, error: projectImagesError } = await supabase
    .from("projectImages")
    .select("imageUrl")
    .eq("userId", userId);

  if (projectImagesError) throw new Error(projectImagesError.message);

  let imagesToDelete: string[] = [];

  imageNames &&
    imageNames.forEach((name) =>
      imagesToDelete.push(name.imageUrl.split("projects/")[1]),
    );

  const { error: imageDeletionError } = await supabase
    .from("projectImages")
    .delete()
    .eq("userId", userId);

  if (imageDeletionError) throw new Error(imageDeletionError.message);

  deleteImgFromStrage({
    storageName: "projects",
    imagesToDelete,
  });
}
