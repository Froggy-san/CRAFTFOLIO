import useDebounce from "@/hooks/useDebounce";
import { getPosts } from "@/services/projectsApi";
import { PAGE_SIZE } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function useGetPosts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const searchTerm = !searchParams.get("search")
    ? ""
    : searchParams.get("search");
  const sortValue = !searchParams.get("sort") ? "" : searchParams.get("sort");
  const debouncedValue = useDebounce(searchTerm, 500);

  const { isLoading, data: { posts, count } = {} } = useQuery({
    queryFn: () => getPosts({ page, searchTerm: debouncedValue, sortValue }),
    queryKey: ["posts", page, debouncedValue, sortValue],
  });

  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;
  //prefetching the products in the next page.

  // if the page/the page we are currently on is smaller than the pageCount, that means there are more products to be shown therefore we prefetch it.
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () =>
        getPosts({ page: page + 1, searchTerm: debouncedValue, sortValue }),
      queryKey: ["posts", page + 1, debouncedValue, sortValue],
    });
  /// prefetching the products in the previous page, just in case the user refreshes the app on pages more then 1.
  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () =>
        getPosts({ page: page - 1, searchTerm: debouncedValue, sortValue }),
      queryKey: ["posts", page - 1, debouncedValue, sortValue],
    });

  return { isLoading, posts, pageCount };
}
