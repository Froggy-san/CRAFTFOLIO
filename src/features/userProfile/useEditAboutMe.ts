import { editAboutMe as editAboutMeApi } from "@/services/aboutMeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function useEditAboutMe() {
  const { userId } = useParams();
  const id = userId || "";
  const queryClient = useQueryClient();
  const {
    isPending: isEditting,
    mutate: editAboutMe,
    data: editedData,
  } = useMutation({
    mutationFn: editAboutMeApi,
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Data has been updated.");
      queryClient.invalidateQueries({ queryKey: ["about", id] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.dismiss();
      toast.error("Something went wrong, Please try agian.");
    },
  });
  return { isEditting, editedData, editAboutMe };
}
