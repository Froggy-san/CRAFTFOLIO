import { createClient } from "@supabase/supabase-js";
import { createAboutMe } from "./aboutMeApi";
import supabase, { supabaseUrl } from "./supabase";

export async function deleteUser(userId: string) {
  const serviceRoleKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZHB0Y3pheHliaWpiaGxjYmpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTUxOTAzMiwiZXhwIjoyMDMxMDk1MDMyfQ.riwd24bYKRy160eqPRtr_ZJijvwh5E3GbiAcnWC_Qbw";
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
}

export async function signUp({
  email,
  password,
  phone,
  speciality,
  username,
}: sginupProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        phone,
        speciality,
        username,
      },
    },
  });

  if (error) throw new Error(error.message);
  const { error: publicUserError } = await supabase
    .from("publicUsers")
    .insert([{ email, phone, speciality, username, userId: data.user?.id }])
    .select();

  if (publicUserError) throw new Error(publicUserError.message);

  const aboutError = await createAboutMe({
    links: "",
    aboutMe: "",
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
}

export async function updateUser({
  phone,
  speciality,
  username,
  avatar,
  socials,
  userId,
  avatarImageToDelete,
}: userToBeUpdatedProps) {
  //https://ixzmsptjfugshygjmvmh.supabase.co/storage/v1/object/public/avatars/ab67616d0000b273a5151f2ffeb8510131c4af81.jpg?t=2024-04-06T09%3A44%3A53.245Z

  const { data, error } = await supabase.auth.updateUser({
    data: { username, phone, speciality, socials },
  });

  if (error) throw new Error(error.message);

  // ---
  const { error: publicUserError } = await supabase
    .from("publicUsers")
    .update({ username, phone, speciality, socials })
    .eq("userId", userId)
    .select();

  if (publicUserError) throw new Error(publicUserError.message);

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

  if (!storageError && avatarImageToDelete) {
    const { error } = await supabase.storage
      .from("avatars")
      .remove([avatarImageToDelete]);
    if (error) throw new Error(`profile image didn't get deleted.`);
  }

  return dataWithImage;
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
