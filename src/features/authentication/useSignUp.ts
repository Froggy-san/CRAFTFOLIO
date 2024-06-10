import { signUp as signUpApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSigning } = useMutation({
    mutationFn: signUpApi,
    onMutate : () => {
toast.loading("Loading...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success(`you have signed up!`);
      navigate("/login");
    },

    onError: (error) => {
      toast.dismiss()

      toast.error(error.message);
    },
  });
  return { signUp, isSigning };
}
