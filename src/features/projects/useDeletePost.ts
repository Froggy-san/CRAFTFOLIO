import { deletePost as deletePostApi } from "@/services/projectsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const stopTheNavigate =
    location.pathname === "/" || location.pathname.includes("/user");

  const navigate = useNavigate();
  const { isPending: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Post has been deleted");
      !stopTheNavigate && navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error.message);
    },
  });

  return { isDeleting, deletePost };
}
