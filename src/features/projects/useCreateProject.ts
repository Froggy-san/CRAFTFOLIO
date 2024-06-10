import { createProject as createProjectApi } from "@/services/projectsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function useCreateProject() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const navigate = useNavigate();
  const id = userId || "";

  const {
    mutate: createProject,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: createProjectApi,

    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(`a new project has been created.`);
      navigate(`/user/${data[0].user_id}`);
      queryClient.invalidateQueries({ queryKey: ["userPosts", id] });
    },

    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
      console.error(error);
    },
  });

  return { createProject, isCreating, createError };
}
