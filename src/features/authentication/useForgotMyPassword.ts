import { forgotMyPassword } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useFrogotMyPassword() {
  const {
    data,
    isPending: isLoading,
    mutate: forgotPassword,
  } = useMutation({
    mutationFn: forgotMyPassword,
    onSuccess: () => {
      toast.success("Please check you email.");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
  });
  return { isLoading, data, forgotPassword };
}
