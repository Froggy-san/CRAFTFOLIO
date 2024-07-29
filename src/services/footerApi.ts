import {
  CreateUserFooter,
  EditUserFooterProps,
  UserFooterProps,
} from "@/types/types";
import supabase, { supabaseUrl } from "./supabase";

export async function getUserFooter(id: string) {
  const { data: profileFooter, error } = await supabase
    .from("profileFooter")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error(error.message);
  //   if (!profileFooter.length)
  //     throw new Error(`Couldn't find user footer data with the id:[${id}]`);

  return profileFooter;
}

export async function createUserFooter(footerData: CreateUserFooter) {
  //https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/footerBucket/451764614_452491387654435_3619427560978072807_n.jpg?t=2024-07-21T06%3A53%3A05.616Z

  const { data, error } = await supabase
    .from("profileFooter")
    .insert([footerData])
    .select();
  if (error) throw new Error(error.message);

  return data;
}
createUserFooter;

export async function editUserFooter({
  id,
  heading,
  additionalText,
  emailBtnText,
  copyText,
}: EditUserFooterProps) {
  const { data, error } = await supabase
    .from("profileFooter")
    .update({ heading, additionalText, emailBtnText, copyText })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(`Failed to update the footer data, please try again,`);
  }

  return data;
}

export async function deleteUserFooter(userId: string) {
  const { error } = await supabase
    .from("profileFooter")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(`Couldn't delete user's footer section`);
}
