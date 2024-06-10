import useDebounce from "@/hooks/useDebounce";
import { getUserPosts } from "@/services/projectsApi";
import { PAGE_SIZE } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

export default function useUserPosts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { userId } = useParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const searchTerm = !searchParams.get("search")
    ? ""
    : searchParams.get("search");
  const sortValue = !searchParams.get("sort") ? "" : searchParams.get("sort");
  const debouncedValue = useDebounce(searchTerm, 500);
  const id = userId || "";
  const {
    isLoading,
    data: { userPosts, count } = {},
    error,
  } = useQuery({
    queryFn: () =>
      getUserPosts({ userId: id, page, sortValue, searchTerm: debouncedValue }),
    queryKey: ["userPosts", id, page, sortValue, debouncedValue],
  });

  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;
  //prefetching the products in the next page.

  // if the page/the page we are currently on is smaller than the pageCount, that means there are more products to be shown therefore we prefetch it.
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () =>
        getUserPosts({
          userId: id,
          page: page + 1,
          sortValue,
          searchTerm: debouncedValue,
        }),
      queryKey: ["userPosts", id, page + 1, sortValue, debouncedValue],
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () =>
        getUserPosts({
          userId: id,
          page: page - 1,
          sortValue,
          searchTerm: debouncedValue,
        }),
      queryKey: ["userPosts", id, page - 1, sortValue, debouncedValue],
    });

  return { isLoading, userPosts, error, pageCount };
}
