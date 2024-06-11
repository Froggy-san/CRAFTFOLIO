import { getNumOfProjectsForUser } from "@/services/projectsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetNumOfProjects(userId: string) {
  const { isLoading, data: count } = useQuery({
    queryFn: () => getNumOfProjectsForUser(userId),
    queryKey: ["numOfProjectForUser", userId],
    enabled: !!userId,
  });
  return { isLoading, count };
}

export default useGetNumOfProjects;
