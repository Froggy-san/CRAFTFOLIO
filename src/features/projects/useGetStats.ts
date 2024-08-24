import { getStats } from "@/services/projectsApi";
import { useQuery } from "@tanstack/react-query";

function useGetStats(userId: string) {
  const { isLoading, data: { count, visted } = {} } = useQuery({
    queryFn: () => getStats(userId),
    queryKey: ["numOfProjectForUser", userId],
    enabled: !!userId,
  });
  return { isLoading, count, visted };
}

export default useGetStats;
