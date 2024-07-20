import { getProjectById } from "@/services/projectsApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetProjectById(id: string) {
  const {
    isLoading,
    data: { project, user } = {},
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),

    enabled: !!id,
  });

  return { isLoading, project, user, error };
}
