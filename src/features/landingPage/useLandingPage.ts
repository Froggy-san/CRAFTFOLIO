import { getUserLandingPage } from "@/services/projectsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useLandingPage() {
  const { userId } = useParams();
  const id = userId || "6345e9d7-df41-47da-af29-a723b1a6afbb";

  const { isLoading, data: { userLandingPage, userAvatar } = {} } = useQuery({
    queryFn: () => getUserLandingPage(id),
    queryKey: ["userLanding", id],
    enabled: !!id,
  });
  return { isLoading, userLandingPage, userAvatar };
}
