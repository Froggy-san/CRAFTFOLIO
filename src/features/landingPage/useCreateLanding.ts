import { createLanding as createLandingApi } from "@/services/projectsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateLanding() {
  const queryClient = useQueryClient();
  // const { userId } = useParams();

  // const id = userId || "";

  const { isPending: isCreanting, mutate: createLanding } = useMutation({
    mutationFn: createLandingApi,

    onMutate: () => {
      toast.loading(`Uploading...`);
    },

    onSuccess: () => {
      toast.dismiss();
      toast.success(`Uploaded`);
      queryClient.invalidateQueries({ queryKey: ["userLanding"] });
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });
  return { isCreanting, createLanding };
}
