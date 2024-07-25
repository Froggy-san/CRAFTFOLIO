import BackButton from "@/components/shared/BackButton";
import ErrorComp from "@/components/shared/ErrorComp";
import LinkBtn from "@/components/shared/LinkBtn";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import ProjectForm from "@/features/projects/ProjectForm";
import useGetProjectById from "@/features/projects/useGetProjectById";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  useScrollUpWhenMounted();
  useDocumentTitle("Edit post");
  const navigate = useNavigate();
  const {
    user: relatedUser,
    isLoading,
    project,
    error,
  } = useGetProjectById(postId || "");

  const isOwnerOfPost =
    user?.role === "admin" || relatedUser?.[0]?.userId === user?.id;

  if (isLoading)
    return (
      <div className=" h-[91dvh] flex items-center justify-center">
        <Loading size={30} />
      </div>
    );

  if (error)
    return (
      <ErrorComp
        message={
          <div className=" flex flex-col sm:flex-row items-center gap-3">
            <p className=" text-center font-semibold ">{error.message} </p>

            <Button onClick={() => navigate(-1)}>Go back </Button>
          </div>
        }
      />
    );

  if (!isOwnerOfPost)
    return (
      <ErrorComp
        message={
          <div className=" flex flex-col sm:flex-row items-center gap-3">
            <p className=" text-center font-semibold ">
              You are not authrized to do this action, please login first{" "}
            </p>

            <Button onClick={() => navigate(-1)}>Go back </Button>
          </div>
        }
      />
    );

  return (
    <div className=" flex justify-center items-center project-form-h relative">
      <BackButton />
      <ProjectForm user={user} post={project?.[0]} />
    </div>
  );
};

export default EditPost;
