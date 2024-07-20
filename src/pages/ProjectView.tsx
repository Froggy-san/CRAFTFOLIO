import useGetProjectById from "@/features/projects/useGetProjectById";
import { useParams } from "react-router-dom";

import Loading from "@/components/shared/Loading";

import CollapsibleText from "@/components/shared/CollapsibleText";
import { useAuth } from "@/hooks/useAuth";
import { imageObject, Project, publicUser } from "@/types/types";

// import ProjectControls from "@/features/projects/ProjectControls";
import ErrorComp from "@/components/shared/ErrorComp";
import CopyClipboard from "@/components/shared/CopyClipboard";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import UserTag from "@/components/shared/UserTag";
import { useDocumentTitle } from "@uidotdev/usehooks";

import ProjectViewControls from "@/features/projectView/ProjectViewControls";
import ProjectViewCaro from "@/features/projectView/ProjectViewCaro";
import Contributors from "@/features/projectView/Contributors";
import Heading from "@/components/shared/Heading";
import Description from "@/features/projectView/Description";
import PosterInfo from "@/features/projectView/PosterInfo";

const ProjectView = () => {
  const { projectId } = useParams();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  useScrollUpWhenMounted();
  const {
    isLoading,
    project: projectById,
    user: userById,
  } = useGetProjectById(projectId || "");

  const project: Project | undefined = projectById?.[0];

  useDocumentTitle(project?.name || "");

  const relatedUser = userById?.[0]; // user that owns the related project.

  console.log(projectById);
  console.log(relatedUser, "SS");
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
  const images = project.projectImages.map((imageObj) => imageObj.imageUrl);

  return (
    <div id="project-view" className=" mb-40 mt-6 md:px-10">
      {/* <div className=" flex flex-col xs:flex-row justify-between mb-4">
        <PosterInfo poster={relatedUser} postDate={project.created_at} />
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
      </div> */}
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
      <ProjectViewCaro images={images} />
      <PosterInfo poster={relatedUser} postDate={project.created_at} />
      {/* ----------- */}

      <div className=" mt-10 space-y-3">
        <Heading
          as="h1"
          Text={project.name}
          ariaLabel="project name"
          className=" font-semibold text-3xl text-center"
        />

        <Description Text={project.description} />
        <Contributors contrbiutersTags={contrbiutersTags} />
      </div>
    </div>
  );
};

export default ProjectView;

/*
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
*/
