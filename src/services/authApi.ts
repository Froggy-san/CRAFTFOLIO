import { createClient } from "@supabase/supabase-js";
import { createAboutMe } from "./aboutMeApi";
import supabase, { supabaseUrl } from "./supabase";
import { defaultTextColor } from "@/utils/constants";
import { publicUser } from "@/types/types";

export async function deleteUser(userId: string) {
  // const serviceRoleKey =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZHB0Y3pheHliaWpiaGxjYmpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTUxOTAzMiwiZXhwIjoyMDMxMDk1MDMyfQ.riwd24bYKRy160eqPRtr_ZJijvwh5E3GbiAcnWC_Qbw";
  const serviceRoleKey = import.meta.env.VITE_SUPABASE_ADMIN_KEY as string;
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
}

interface loginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: loginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  // console.log(data);
  return data;
}

interface sginupProps {
  email: string;
  password: string;
  phone: string;
  speciality: string;
  username: string;
  role: string;
}

export async function signUp({
  email,
  password,
  phone,
  speciality,
  username,
  role,
}: sginupProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        phone,
        speciality,
        username,
        role,
        resumeUrl: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  const { error: publicUserError } = await supabase
    .from("publicUsers")
    .insert([
      {
        email,
        phone,
        speciality,
        username,
        userId: data.user?.id,
        resumeUrl: "",
      },
    ])
    .select();

  if (publicUserError) throw new Error(publicUserError.message);

  const aboutError = await createAboutMe({
    links: "",
    aboutMe: "",
    toolsAndTech: "",
    arrowType: "",
    arrowColor: JSON.stringify(defaultTextColor),
    user_id: data.user?.id,
  });
  if (aboutError) {
    await deleteUser(data.user?.id || ""); // deleting the user from the users table.
    await deletePublicUser(data.user?.id || ""); // deleting the user from public users talbe.
    throw new Error(aboutError.message);
  }

  return data;
}

export async function getCurrentUser() {
  /// this will get the data from localstorage , if it exists of course .
  const { data: session } = await supabase.auth.getSession();

  /// it seems obvious but am ganna say it anyways , so if the user's data isn't in the localStorage it iwll return null , so we are ganna get the user's data some other way , like redirectiong the user to the login page or soemthing , i don't know up until this point .
  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error?.message);
    throw new Error(`Faild to logout`);
  }
}

interface userToBeUpdatedProps {
  email: string;
  phone: string;
  speciality: string;
  username: string;
  socials: string;
  avatar: File[] | "";
  userId: string;
  avatarImageToDelete: string | undefined;
  resumeUrl: string;
}

export async function updateUser({
  phone,
  speciality,
  username,
  avatar,
  socials,
  userId,
  avatarImageToDelete,
  resumeUrl,
}: userToBeUpdatedProps) {
  //https://ixzmsptjfugshygjmvmh.supabase.co/storage/v1/object/public/avatars/ab67616d0000b273a5151f2ffeb8510131c4af81.jpg?t=2024-04-06T09%3A44%3A53.245Z

  console.log("____________");
  const { data, error } = await supabase.auth.updateUser({
    data: { username, phone, speciality, socials, resumeUrl },
  });

  if (error) throw new Error(error.message);

  // ---
  const { error: publicUserError } = await supabase
    .from("publicUsers")
    .update({ username, phone, speciality, socials, resumeUrl })
    .eq("userId", userId)
    .select();

  if (publicUserError) throw new Error(publicUserError.message);

  if (typeof avatar === "string" || !avatar)
    await editContributorsTags({
      userId,
      username,
    });

  // ---
  if (typeof avatar === "string" || !avatar) return data;

  const fileName = `avater-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar[0]);

  if (storageError) throw new Error(storageError.message);
  // https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/avatars/438243069_477362904643750_5262773232368488463_n.jpg
  const filePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { data: dataWithImage, error: dataError } =
    await supabase.auth.updateUser({
      data: { avatar: filePath },
    });

  if (dataError) throw new Error(`coudn't edit the image of the user`);

  const { error: publicUserErrorImage } = await supabase
    .from("publicUsers")
    .update({ avatar: filePath })
    .eq("userId", userId)
    .select();

  if (publicUserErrorImage) throw new Error("publicUserErrorImage.message");

  await editContributorsTags({
    userId,
    avatar: filePath,
    username,
  });

  if (!storageError && avatarImageToDelete) {
    const { error } = await supabase.storage
      .from("avatars")
      .remove([avatarImageToDelete]);
    if (error) throw new Error(`profile image didn't get deleted.`);
  }

  return dataWithImage;
}

interface TagsToEdit {
  userId: string;
  username: string;
  avatar?: string;
}

interface ProjectData {
  id: number;
  user_id: string;
  created_at: string;
  description: string;
  type: string;
  technologies: string;
  startDate: string;
  endDate: string;
  name: string;
  links: string;
  contributors: string;
} // to be removed and refactored later

export async function editContributorsTags({
  userId,

  avatar,
  username,
}: TagsToEdit) {
  const { data: projects, error: errorFromContributors } = await supabase
    .from("projects")
    .select("*")
    .or(`contributors.ilike.%${userId}%`);

  if (errorFromContributors) console.warn(errorFromContributors.message);

  if (!projects) return;

  for (let i = 0; i < projects.length; i++) {
    const item: ProjectData = projects[i];
    const contributors: publicUser[] = JSON.parse(item.contributors);
    const TagsToEdit = contributors.find((tag) => tag.userId === userId);

    if (TagsToEdit) {
      TagsToEdit.username = username;

      if (avatar) TagsToEdit.avatar = avatar;

      const { data, error } = await supabase
        .from("projects")
        .update({ contributors: JSON.stringify(contributors) })
        .eq("id", item.id)
        .select();
    }
  }
}

export async function getUserById(userId: string) {
  const { data: user, error } = await supabase
    .from("publicUsers")
    .select("*")
    .eq("userId", userId);

  if (error) {
    console.error(error.message);

    throw new Error(error.message);
  }

  return user;
}

export async function deletePublicUser(userId: string) {
  const { error } = await supabase
    .from("publicUsers")
    .delete()
    .eq("userId", userId);
  if (error) throw new Error(error?.message);
}

export async function getUserByNameOrEmail(searchTerm: string) {
  const { data: publicUsers, error } = await supabase
    .from("publicUsers")
    .select("userId,username,avatar,email")
    .or(`username.ilike.%${searchTerm}%,email.ilike.%${searchTerm}`);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return publicUsers;
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function forgotMyPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
  return data;
}
