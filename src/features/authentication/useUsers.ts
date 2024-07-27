import { getUsers } from "@/services/authApi";
import { GetUsersProps } from "@/types/types";
import { DASHBOARD_PAGE_SIZE } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useUsers({
  page,
  sortValue,
  searchTerm,
}: GetUsersProps) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { publicUsers: users, count } = {},
    error,
  } = useQuery({
    queryFn: () => getUsers({ page, sortValue, searchTerm }),
    queryKey: ["allUsers", page, sortValue, searchTerm],
  });
  const pageCount = count ? Math.ceil(count / DASHBOARD_PAGE_SIZE) : 0;

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () => getUsers({ page: page + 1, sortValue, searchTerm }),
      queryKey: ["allUsers", page + 1, sortValue, searchTerm],
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getUsers({ page: page - 1, sortValue, searchTerm }),
      queryKey: ["allUsers", page - 1, sortValue, searchTerm],
    });
  }

  return { isLoading, pageCount, users, error };
}
