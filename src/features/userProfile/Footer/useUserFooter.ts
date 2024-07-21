import { getUserFooter } from "@/services/footerApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useUserFooter() {
  const { userId } = useParams();
  const id = userId || "";
  const { isLoading, data } = useQuery({
    queryFn: () => getUserFooter(id),
    queryKey: ["userFooter", id],
    enabled: !!id,
  });
  return { isLoading, data };
}
