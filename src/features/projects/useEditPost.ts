import { editPost as editPostApi } from "@/services/projectsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function useEditPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const {
    isPending: isEditing,
    mutate: editPost,
    error: edittingError,
  } = useMutation({
    mutationFn: editPostApi,
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(`post has been updated.`);
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["project", postId] });
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return { isEditing, editPost, edittingError };
}
