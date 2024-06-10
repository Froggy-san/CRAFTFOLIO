import ErrorComp from "@/components/shared/ErrorComp";
import LinkBtn from "@/components/shared/LinkBtn";
import Loading from "@/components/shared/Loading";
import ProjectForm from "@/features/projects/ProjectForm";
import useGetProjectById from "@/features/projects/useGetProjectById";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { user, isAuthenticated, isLoading: isUserLaoding } = useAuth();
  const { postId } = useParams();
  useScrollUpWhenMounted();
  const {
    user: relatedUser,
    isLoading,
    project,
  } = useGetProjectById(postId || "");

  const isOwnerOfPost = relatedUser?.[0]?.userId === user?.id;

  if (isLoading || isUserLaoding)
    return (
      <div className=" h-[91dvb] flex items-center justify-center">
        <Loading size={30} />
      </div>
    );

  if (!isAuthenticated || !isOwnerOfPost)
    return (
      <ErrorComp
        message={
          <div className=" flex flex-col sm:flex-row items-center gap-3">
            <p className=" text-center font-semibold ">
              You are not authrized to do this action, please login first{" "}
            </p>
            <LinkBtn to="/login">Login</LinkBtn>
          </div>
        }
      />
    );

  return (
    <div className=" flex justify-center items-center h-[91dvb]">
      <ProjectForm user={user} post={project?.[0]} />
    </div>
  );
};

export default EditPost;
