import { getAboutMeById } from "@/services/aboutMeApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useAboutMe() {
  const { userId } = useParams();
  const id = userId || "";

  const { isLoading, data: aboutMe } = useQuery({
    queryFn: () => getAboutMeById(id),
    queryKey: ["about", id],
  });

  return { isLoading, aboutMe };
}
