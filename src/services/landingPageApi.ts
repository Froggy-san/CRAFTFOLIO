import { deleteImgFromStrage } from "@/utils/helper";
import supabase, { supabaseUrl } from "./supabase";
import { createLandingProps, editLandingProps } from "@/types/types";

export async function getUserLandingPage(userId: string) {
  const { data: userLandingPage, error } = await supabase
    .from("landingPages")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);

  let { data: relatedUser, error: relatedUserError } = await supabase
    .from("publicUsers")
    .select("*")
    .eq("userId", userId);

  if (relatedUserError) throw new Error(relatedUserError.message);

  return { userLandingPage, relatedUser };
}

export async function deleteUserLandingPage(userId: string) {
  const { data: userLandingImages, error: imageErrors } = await supabase
    .from("landingPages")
    .select("avatarImage,landingImage")
    .eq("user_id", userId);

  if (imageErrors)
    throw new Error(
      `Something went wrong with the deleting of the user's landing page.`
    );

  if (userLandingImages.length) {
    //https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/landingImages/0.3974139411032498-449130082_989589689240789_3290714148449789681_n.jpg
    const imageObj = userLandingImages[0];
    const avatarImage = imageObj.avatarImage.split("landingImages/")[1];
    const landingImage = imageObj.landingImage.split("landingImages/")[1];
    console.log(avatarImage, landingImage, "LANDIGN IMAGES DELETE");
    await deleteImgFromStrage({
      storageName: "landingImages",
      imagesToDelete: [avatarImage, landingImage],
    });
  }
  const { error } = await supabase
    .from("landingPages")
    .delete()
    .eq("user_id", userId);
  if (error) throw new Error(`Couldn't delete user's landing page.`);
}

export async function createLanding({
  primaryText,
  secondaryText,
  tertiaryText,
  avatar,
  landingImage,
  socials,
  user_id,
  grainyTexture,
  blur,
  textColor,
}: createLandingProps) {
  const avatarIsAString = typeof avatar === "string";
  const landingImageIsAString = typeof landingImage === "string";
  let avatarImageName;
  let landingImageName;
  let avatarPath;
  let landingImagePath;

  if (!avatarIsAString) {
    avatarImageName = `${Math.random()}-${avatar[0].name.replace(/\//g, "")}`;
    avatarPath = `${supabaseUrl}/storage/v1/object/public/landingImages/${avatarImageName}`;
  }

  //https://ixzmsptjfugshygjmvmh.supabase.co/storage/v1/object/public/landingAvatar/432936713_1035772597906233_5650981466176355753_n.jpg
  if (!landingImageIsAString) {
    landingImageName = `${Math.random()}-${landingImage[0].name.replace(
      /\//g,
      ""
    )}`;

    landingImagePath = `${supabaseUrl}/storage/v1/object/public/landingImages/${landingImageName}`;
  }

  const insertData = {
    primaryText,
    secondaryText,
    tertiaryText,
    user_id,
    socials,
    blur,
    grainyTexture,
    textColor,
    avatarImage: avatarPath,
    landingImage: landingImagePath,
  };

  // Remove properties if they are undefined
  if (!avatarPath) delete insertData.avatarImage;
  if (!landingImagePath) delete insertData.landingImage;

  const { data, error } = await supabase
    .from("landingPages")
    .insert([insertData])
    .select();

  if (error) throw new Error(error.message);

  if (avatarImageName && avatarPath) {
    const { error: storageError } = await supabase.storage
      .from("landingImages")
      .upload(avatarImageName, avatar[0]);

    if (storageError) throw new Error(storageError.message);
  }

  if (landingImageName && landingImagePath) {
    const { error: storageError } = await supabase.storage
      .from("landingImages")
      .upload(landingImageName, landingImage[0]);

    if (storageError) throw new Error(storageError.message);
  }
  return data;
}

/// Editing landing page .

export async function editLandtingPage(landingToEdit: editLandingProps) {
  const updatedData = {
    primaryText: landingToEdit.primaryText,
    secondaryText: landingToEdit.secondaryText,
    tertiaryText: landingToEdit.tertiaryText,
    avatarImage: landingToEdit.avatar,
    landingImage: landingToEdit.landingImage,
    grainyTexture: landingToEdit.grainyTexture,
    blur: landingToEdit.blur,
    textColor: landingToEdit.textColor,
    socials: landingToEdit.socials,
  };

  let avatarImageName;
  let landingImageName;
  let avatarPath;
  let landingImagePath;

  if (landingToEdit.avatar && typeof landingToEdit.avatar !== "string") {
    avatarImageName = `${Math.random()}-${landingToEdit.avatar[0].name.replace(
      /\//g,
      ""
    )}`;
    avatarPath = `${supabaseUrl}/storage/v1/object/public/landingImages/${avatarImageName}`;

    updatedData.avatarImage = avatarPath;
  }

  if (
    landingToEdit.landingImage &&
    typeof landingToEdit.landingImage !== "string"
  ) {
    landingImageName = `${Math.random()}-${landingToEdit.landingImage[0].name.replace(
      /\//g,
      ""
    )}`;

    landingImagePath = `${supabaseUrl}/storage/v1/object/public/landingImages/${landingImageName}`;

    updatedData.landingImage = landingImagePath;
  }

  // console.log("TEST -------------------- TEST");
  // console.log(landingToEdit, "landing To edit");
  // console.log("TEST -------------------- TEST");
  const { data, error } = await supabase
    .from("landingPages")
    .update({ ...updatedData })
    .eq("id", landingToEdit.id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(`Something went wrong while updating. Please try again.`);
  }

  if (avatarImageName && avatarPath) {
    const { error: storageError } = await supabase.storage
      .from("landingImages")
      .upload(avatarImageName, landingToEdit.avatar[0]);
    if (storageError)
      throw new Error(`Something went wrong while uploading the image.`);

    if (!storageError && landingToEdit.avatarImageToDelete) {
      const { error } = await supabase.storage
        .from("landingImages")
        .remove([landingToEdit.avatarImageToDelete]);
      if (error) throw new Error(`profile image didn't get deleted.`);
    }
  }

  if (landingImageName && landingImagePath) {
    const { error: storageError } = await supabase.storage
      .from("landingImages")
      .upload(landingImageName, landingToEdit.landingImage[0]);

    if (storageError)
      throw new Error(
        `Something went wrong while uploading the landing image.`
      );

    if (!storageError && landingToEdit.landingImageToDelete) {
      const { error } = await supabase.storage
        .from("landingImages")
        .remove([landingToEdit.landingImageToDelete]);
      if (error) throw new Error(`profile image didn't get deleted.`);
    }
  }
  return data;
}
