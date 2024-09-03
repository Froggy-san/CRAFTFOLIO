import { editLandtingPage as editLandtingPageApi } from "@/services/landingPageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditLandingPage() {
  const queryClient = useQueryClient();

  const { isPending: isEditting, mutate: editLandingPage } = useMutation({
    mutationFn: editLandtingPageApi,

    onMutate: () => {
      toast.loading(`Loading...`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLanding"] });
      toast.dismiss();
      toast.success("Landing page has been updated.");
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return { isEditting, editLandingPage };
}

export default useEditLandingPage;
