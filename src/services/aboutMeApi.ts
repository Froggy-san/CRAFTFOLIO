import supabase from "./supabase";

interface createAboutMeProps {
  user_id: string | undefined;
  aboutMe: string;
  links: string;
  toolsAndTech: string;
  arrowType?: string;
  arrowColor?: string;
}

export async function createAboutMe({
  user_id,
  aboutMe,
  links,
  toolsAndTech,
  arrowType,
  arrowColor,
}: createAboutMeProps) {
  const { error } = await supabase
    .from("aboutMe")
    .insert([{ user_id, aboutMe, links, toolsAndTech, arrowColor, arrowType }])
    .select();

  return error;
}

interface editAboutMe {
  userId: string;
  aboutMe?: string;
  links?: string;
  toolsAndTech?: string;
  arrowType?: string;
  arrowColor?: string;
}

export async function editAboutMe({
  userId,
  aboutMe,
  links,
  toolsAndTech,
  arrowType,
  arrowColor,
}: editAboutMe) {
  // let updatedData;

  // if (aboutMe) updatedData = { aboutMe };
  // if (links) updatedData = { links };

  const { data, error } = await supabase
    .from("aboutMe")
    .update({ aboutMe, links, toolsAndTech, arrowType, arrowColor })
    .eq("user_id", userId)
    .select();
  if (error) throw new Error(error.message);

  return data;
}
export async function getAboutMeById(userId: string) {
  let { data: aboutMe, error } = await supabase
    .from("aboutMe")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);

  return aboutMe;
}
