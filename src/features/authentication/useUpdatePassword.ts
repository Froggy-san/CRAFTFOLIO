import { updatePassword as updatePasswordApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useLogout from "./useLogout";

function useUpdatePassword() {
  const { logOut } = useLogout();
  const { isPending: isUpdatingPassword, mutate: updatePassword } = useMutation(
    {
      mutationFn: updatePasswordApi,
      onMutate: () => {
        toast.loading("Updating...");
      },
      onSuccess: () => {
        toast.dismiss();
        logOut();
        toast.success("Password has been updated, please login agian.");
      },

      onError: (error) => {
        toast.dismiss();
        console.error(error.message);
        toast.error("Something went wrong while updating the password.");
      },
    }
  );
  return { isUpdatingPassword, updatePassword };
}

export default useUpdatePassword;
