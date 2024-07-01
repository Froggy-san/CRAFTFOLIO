import { getUserLandingPage } from "@/services/projectsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useLandingPage() {
  const { userId } = useParams();
  const id = userId || "";

  const { isLoading, data: { userLandingPage, userAvatar } = {} } = useQuery({
    queryFn: () => getUserLandingPage(id),
    queryKey: ["userLanding", id],
    enabled: !!id,
  });
  return { isLoading, userLandingPage, userAvatar };
}
