import { editUserFooter } from "@/services/footerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function useEditUserFooter() {
  const { userId } = useParams();
  const id = userId || "";
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutate: editFooter } = useMutation({
    mutationFn: editUserFooter,
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["userFooter", id] });
      toast.success("Done");
    },
    onError: (error) => {
      console.error(error.message);
      toast.dismiss();
      toast.error(error.message);
    },
  });
  return { isLoading, editFooter };
}
