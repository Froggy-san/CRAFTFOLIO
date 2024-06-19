import { deleteAllUsersPosts } from "@/services/projectsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteUserPosts() {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["numOfProjectForUser"] });
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
