import { useAuth } from "@/hooks/useAuth";
import { updateUser as updateUserApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const { setUser } = useAuth();

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onMutate: () => {
      // Show loading toast
      toast.loading("Updating...");
    },
    onSuccess: (data) => {
      // Show success toast and invalidate queries to refetch user data
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
      setUser({
        aud: data.user.aud,
        email: data.user.email,
        id: data.user.id,
        avatar: data.user.user_metadata.avatar,
        socials: data.user.user_metadata.socials,
        phone: data.user.user_metadata.phone,
        speciality: data.user.user_metadata.speciality,
        username: data.user.user_metadata.username,
        created_at: format(new Date(data.user.created_at), "LLLL/dd/yyyy"),
        role: data.user.user_metadata.role,
        resumeUrl: data.user.user_metadata.resumeUrl,
      });
      toast.dismiss();
      toast.success("User info has been updated");
    },
    onError: (error) => {
      // Show error toast and log the error
      toast.dismiss();
      toast.error(error.message);
      console.error(error.message);
    },
  });

  return {
    isUpdatingUser,
    updateUser,
  };
}
