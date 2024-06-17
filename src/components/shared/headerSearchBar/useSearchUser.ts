import { getUserByNameOrEmail } from "@/services/authApi";
import { useQuery } from "@tanstack/react-query";

function useSearchUser(searchTerm: string) {
  const {
    isLoading,
    error,
    data: publicUsers,
  } = useQuery({
    queryFn: () => getUserByNameOrEmail(searchTerm),
    queryKey: ["headerSearchBar", searchTerm],
    enabled: !!searchTerm,
  });

  return { publicUsers, isLoading, error };
}

export default useSearchUser;
