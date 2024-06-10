import { useAuth } from "@/hooks/useAuth";
import { login as loginApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const { checkAuthUser } = useAuth();

  const { mutate: login, isPending: isSigningIn } = useMutation({
    mutationFn: loginApi,

    onMutate: () => {
      toast.loading(`Loading...`);
    },

    onSuccess: async () => {
      // queryClient.setQueryData(["user"], data.user);
      toast.dismiss();
      await checkAuthUser();
      toast.success(`Welcome back!`);
      navigate("/", { replace: true });
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });
  return { login, isSigningIn };
}
