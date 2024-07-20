import { useAuth } from "@/hooks/useAuth";
import { logOut as logOutApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const { checkAuthUser } = useAuth();
  const navigate = useNavigate();
  const { mutate: logOut, isPending: isLogingOut } = useMutation({
    mutationFn: logOutApi,
    onMutate: () => {
      toast.loading(`Loading...`);
    },
    onSuccess: async () => {
      // queryClient.removeQueries();
      toast.dismiss();
      await checkAuthUser();
      // navigate("/", { replace: true });
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });
  return { logOut, isLogingOut };
}
