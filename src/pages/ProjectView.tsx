import useGetProjectById from "@/features/projects/useGetProjectById";
import { useParams } from "react-router-dom";

import Loading from "@/components/shared/Loading";

import { useAuth } from "@/hooks/useAuth";
import { imageObject, Project } from "@/types/types";

// import ProjectControls from "@/features/projects/ProjectControls";
import ErrorComp from "@/components/shared/ErrorComp";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { useDocumentTitle } from "@uidotdev/usehooks";
import ProjectViewControls from "@/features/projectView/ProjectViewControls";
import ProjectViewCaro from "@/features/projectView/ProjectViewCaro";
import Contributors from "@/features/projectView/Contributors";
import Heading from "@/components/shared/Heading";
import Description from "@/features/projectView/Description";
import PosterInfo from "@/features/projectView/PosterInfo";
import Tools from "@/features/projectView/Tools";
import FullSnLoading from "@/components/shared/FullSnLoading";
import Links from "@/features/projectView/Links";
import TypeAndDate from "@/features/projectView/TypeAndDate";

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
  // const posterData: User | undefined = userById?.[0];

  useDocumentTitle(project?.name || "");

  const relatedUser = userById?.[0]; // user that owns the related project.

  const isProjectOwner =
    user?.role === "admin" ||
    (isAuthenticated && user?.id === relatedUser?.userId); // is the current viewer the same person as the owner of the post?

  const contrbiutersTags =
    project && project.contributors ? JSON.parse(project.contributors) : [];

  const toolsArr =
    project && project.technologies ? JSON.parse(project.technologies) : [];

  // const postOwnerSocials =
  //   posterData && posterData.socials ? JSON.parse(posterData.socials) : [];

  if (isLoading) return <FullSnLoading />;

  if (!project) return <ErrorComp message={`Sorry, we can't find the post!`} />;

  const imagesToDelete = project.projectImages.map(
    (image: imageObject) => image.imageUrl.split("projects/")[1],
  );

  const images = project.projectImages.map((imageObj) => imageObj.imageUrl);

  return (
    <div id="project-view" className="mt-6 pb-5 md:px-10">
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
      {
        images.length ? <ProjectViewCaro images={images} /> : null
        // <div className="flex relative  h-[330px]  sm:h-[600px]  grainy  rounded-md overflow-hidden items-center justify-center p-0  font-semibold mb-3">
        //   No images.
        //   <GrainyImg />
        // </div>
      }
      <div className="flex flex-col items-center justify-between gap-y-6 xs:flex-row">
        <PosterInfo poster={relatedUser} postDate={project.created_at} />
      </div>
      {/* ----------- */}

      <div className="mt-10">
        <Heading
          as="h1"
          Text={project.name}
          ariaLabel="project name"
          className="text-center"
          style={{
            fontSize: "clamp(40px, 5vw, 50px)",
            lineHeight: 1.1,
            fontWeight: 600,
            letterSpacing: "1px",
            wordWrap: "break-word",
          }}
        />

        <div className="mt-24 space-y-24">
          <TypeAndDate
            type={project.type}
            startDate={project.startDate}
            endDate={project.endDate}
          />
          <Description Text={project.description} />
          <Tools toolsArr={toolsArr} />
          <Links links={project.links} isOwner={isProjectOwner} />
          <Contributors contrbiutersTags={contrbiutersTags} />
        </div>
      </div>

      {/* <Footer
        resume={posterData?.resumeUrl || ""}
        userPhone={posterData?.phone || ""}
        userEmail={posterData?.email || ""}
        postOwnerId={posterData?.userId}
        isTheOwnerOfPage={isProjectOwner}
        userSocials={posterData?.socials || ""}
      /> */}
    </div>
  );
};

export default ProjectView;
