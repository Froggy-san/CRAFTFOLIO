import { Button } from "@/components/ui/button";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import useUserPosts from "@/features/projects/useUserPosts";
import Pagination from "@/components/shared/Pagination";
import LandingPage from "@/features/landingPage/LandingPage";
import ProjectControls from "@/features/projects/ProjectControls";
import FullSnLoading from "@/components/shared/FullSnLoading";
import AboutMe from "@/features/userProfile/AboutMeSection/AboutMe";
import UserProjects from "@/features/userProfile/UserProjects";
import BackButton from "@/components/shared/BackButton";
import { FloatingNav } from "@/components/ui/FloatingNavBar";
import { defaultProfilePicture } from "@/utils/constants";
import useLandingPage from "@/features/landingPage/useLandingPage";
import TooltipComp from "@/components/shared/TooltipComp";
import Footer from "@/features/userProfile/Footer/Footer";
import { BackgroundBeams } from "@/components/ui/BackgroundBeam";
import { useDocumentTitle } from "@uidotdev/usehooks";
import ErrorComp from "@/components/shared/ErrorComp";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { createPortal } from "react-dom";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const { isLoading: isPostsLoading, pageCount, userPosts } = useUserPosts();
  useScrollUpWhenMounted();
  const APPLAYOUT_CONTAINER = document.getElementById("home");
  console.log(APPLAYOUT_CONTAINER, "TTTTTTTTTTTTTTEST");
  const { userId } = useParams();
  const isTheOwnerOfPage = user?.role === "admin" || user?.id === userId;
  useDocumentTitle("");
  const { relatedUser, isLoading: landingLoading } = useLandingPage();

  if (isLoading || landingLoading) return <FullSnLoading />;

  if (!relatedUser || !relatedUser.length)
    return <ErrorComp message="This user doens't exist." />;

  return (
    <div className=" relative ">
      <BackButton className={`${!isTheOwnerOfPage && "relative mb-5"}`} />

      {APPLAYOUT_CONTAINER &&
        createPortal(
          <FloatingNav
            navItems={[
              { name: "Home", link: "home" },
              { name: "Projects", link: "posts-container" },
              { name: "About", link: "about" },
              { name: "Contact", link: "contact" },
              {
                name: (
                  <TooltipComp toolTipText={relatedUser?.at(0)?.username}>
                    <img
                      className="w-7 h-7 rounded-full"
                      src={relatedUser?.at(0)?.avatar || defaultProfilePicture}
                      alt="asa"
                    />
                  </TooltipComp>
                ),
                link: "",
              },
            ]}
          />,
          APPLAYOUT_CONTAINER
        )}
      <LandingPage isOwner={isTheOwnerOfPage} isUser={user ? true : false} />

      {/* ------------------ projects section */}

      <ProjectControls
        selectDisabled={!userPosts?.length}
        isTheOwnerOfPage={isTheOwnerOfPage}
      />
      <div className=" my-5">
        {isPostsLoading ? (
          <FullSnLoading />
        ) : (
          <UserProjects userProjects={userPosts} />
        )}
        {!pageCount ? null : <Pagination pageCount={pageCount} />}
      </div>
      <div className="my-7 mb-52">
        {/* <AboutMe isAuthenticated={isTheOwnerOfPage} userId={userId || ""} /> */}
        <AboutMe isAuthenticated={isTheOwnerOfPage} userId={userId || ""} />
      </div>

      <Footer
        resume={relatedUser.at(0)?.resumeUrl || ""}
        userPhone={relatedUser?.at(0)?.phone || ""}
        userEmail={relatedUser?.at(0)?.email || ""}
        userSocials={relatedUser?.at(0)?.socials || ""}
        isTheOwnerOfPage={isTheOwnerOfPage}
      />
    </div>
  );
};

export default UserProfile;
