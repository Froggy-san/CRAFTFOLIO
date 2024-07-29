import { deleteUser as deleteUserApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteUserAccount() {
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,

    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries();
      toast.success("User has been deleted.");
    },
    onError: (error) => {
      console.error(error.message);
      toast.dismiss();
      toast.error("Something went wrong while deleteing the user.");
    },
  });

  return { isLoading, deleteUser };
}
