import { deleteAllUsersPosts } from "@/services/projectsApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteUserPosts() {
  const {
    isPending: isDeletingPosts,
    mutate: deleteAllPosts,
    error,
  } = useMutation({
    mutationFn: deleteAllUsersPosts,
    onMutate: () => {
      toast.loading("Deleting...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Done");
    },

    onError: (error) => {
      toast.dismiss();
      console.error(error.message);
      toast.error("Something went wrong while deleting.");
    },
  });

  return { isDeletingPosts, deleteAllPosts, error };
}

export default useDeleteUserPosts;
