import { getUserFooter } from "@/services/footerApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useUserFooter(postOwnerId?: string) {
  const { userId } = useParams();
  const id = postOwnerId || userId || ""; //We need the postOwnerId because normally we are getting the user id from the params, but in the postView we don't have the id in the params so instead we can provide the id our selfs.
  const { isLoading, data } = useQuery({
    queryFn: () => getUserFooter(id),
    queryKey: ["userFooter", id],
    enabled: !!id,
  });
  return { isLoading, data };
}
