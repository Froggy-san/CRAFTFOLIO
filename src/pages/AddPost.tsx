import BackButton from "@/components/shared/BackButton";
import ErrorComp from "@/components/shared/ErrorComp";
import FullSnLoading from "@/components/shared/FullSnLoading";
import LinkBtn from "@/components/shared/LinkBtn";
import ProjectForm from "@/features/projects/ProjectForm";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { useDocumentTitle } from "@uidotdev/usehooks";

const AddPost = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  useScrollUpWhenMounted();
  useDocumentTitle("Add post");
  if (isLoading) return <FullSnLoading />;

  // if (!isAuthenticated)
  //   return (
  //     <ErrorComp
  //       message={
  //         <div className=" flex flex-col sm:flex-row items-center gap-3">
  //           <p className=" text-center font-semibold ">
  //             You are not authrized to do this action, please login first{" "}
  //           </p>
  //           <LinkBtn to="/login">Login</LinkBtn>
  //         </div>
  //       }
  //     />
  //   );

  return (
    <div className=" flex flex-col project-form-h relative">
      <BackButton />
      {/* <h1 className=" text-4xl">Create Project</h1> */}
      <ProjectForm user={user} />
    </div>
  );
};

export default AddPost;
