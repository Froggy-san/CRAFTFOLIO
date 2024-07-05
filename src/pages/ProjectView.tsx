import useGetProjectById from "@/features/projects/useGetProjectById";
import { useParams } from "react-router-dom";

import Loading from "@/components/shared/Loading";

import ProjectViewCaro from "@/features/projects/ProjectViewCaro";

import CollapsibleText from "@/components/shared/CollapsibleText";
import { useAuth } from "@/hooks/useAuth";
import { imageObject, Project, publicUser } from "@/types/types";
import ProjectViewControls from "@/features/projects/ProjectViewControls";
// import ProjectControls from "@/features/projects/ProjectControls";
import ErrorComp from "@/components/shared/ErrorComp";
import CopyClipboard from "@/components/shared/CopyClipboard";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import UserTag from "@/components/shared/UserTag";
const ProjectView = () => {
  const { projectId } = useParams();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  useScrollUpWhenMounted();
  const {
    isLoading,
    project: projectById,
    user: userById,
  } = useGetProjectById(projectId || "");

  const project: Project = projectById?.[0];
  const relatedUser = userById?.[0]; // user that owns the related project.
  const contrbiutersTags =
    project && project.contributors ? JSON.parse(project.contributors) : [];
  const isProjectOwner =
    user?.role === "admin" ||
    (isAuthenticated && user?.id === relatedUser?.userId); // is the current viewer the same person as the owner of the post?

  if (isLoading)
    return (
      <div className=" h-[80dvb] flex justify-center items-center">
        <Loading />
      </div>
    );

  if (!project) return <ErrorComp />;
  const imagesToDelete = project.projectImages.map(
    (image: imageObject) => image.imageUrl.split("projects/")[1]
  );

  return (
    <div className=" mb-40 mt-6">
      {isAuthLoading ? (
        <Loading />
      ) : (
        isProjectOwner && (
          <ProjectViewControls
            imagesToDelete={imagesToDelete}
            id={projectId || ""}
          />
        )
      )}
      <ProjectViewCaro imageObjs={project.projectImages} />

      {/* ----------- */}

      <div>
        {contrbiutersTags.length
          ? contrbiutersTags.map((el: publicUser, i: number) => (
              <UserTag
                key={i}
                user={{
                  userId: el.userId,
                  username: el.username,
                  avatar: el.avatar,
                }}
                link={
                  el.userId ? `http://localhost:5173/user/${el.userId} ` : ""
                }
              />
            ))
          : null}
      </div>

      <div className=" mt-6 break-words">
        <h1 className=" text-3xl" aria-label="project name">
          {project.name}
        </h1>
        <CollapsibleText
          arrowPositionX="right"
          text={`${project.description}`}
        />
      </div>
      <div className=" my-6  ">
        <h1 className=" font-semibold text-lg">Links:</h1>
        <div className="">
          <div className=" flex flex-col gap-1 my-4">
            <h1 className=" font-semibold text-sm">Website Link:</h1>
            <CopyClipboard
              className=" h-9 text-sm"
              text="http://localhost:5173/user/6345e9d7-df41-47da-af29-a723b1a6afbb"
            />
          </div>
          <div className=" flex flex-col gap-1 my-4">
            <h1 className=" font-semibold text-sm">Youtube:</h1>
            <CopyClipboard
              className=" h-9 text-sm"
              text="https://www.youtube.com/watch?v=NmFJ4bYLUY0&ab_channel=HasanabiPublicBroadcastSystem"
            />
          </div>
          <div className=" flex flex-col gap-1 my-4">
            <h1 className=" font-semibold text-sm">cakeresume:</h1>
            <CopyClipboard
              className=" h-9 text-sm"
              text="https://www.cakeresume.com/resources/front-end-developer-portfolio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
