import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import useUserPosts from "@/features/projects/useUserPosts";
import Pagination from "@/components/shared/Pagination";
import LandingPage from "@/features/userProfile/landingPage/LandingPage";
import ProjectControls from "@/features/projects/ProjectControls";
import FullSnLoading from "@/components/shared/FullSnLoading";
import AboutMe from "@/features/userProfile/AboutMeSection/AboutMe";
import UserProjects from "@/features/userProfile/UserProjects";
import BackButton from "@/components/shared/BackButton";

import { defaultProfilePicture } from "@/utils/constants";
import useLandingPage from "@/features/userProfile/landingPage/useLandingPage";
import TooltipComp from "@/components/shared/TooltipComp";
import Footer from "@/features/userProfile/Footer/Footer";

import { useDocumentTitle } from "@uidotdev/usehooks";
import ErrorComp from "@/components/shared/ErrorComp";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { createPortal } from "react-dom";
import { lazy, Suspense } from "react";
import useTrackVisted from "@/hooks/useTrackVisted";
import Resume from "@/features/userProfile/Resume";
const LazyFloatingNav = lazy(() => import("@/components/ui/FloatingNavBar"));
const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const { isLoading: isPostsLoading, pageCount, userPosts } = useUserPosts();
  const { relatedUser, isLoading: landingLoading } = useLandingPage();
  const { userId } = useParams();

  useScrollUpWhenMounted();
  useDocumentTitle(relatedUser?.[0]?.username || "");

  const APPLAYOUT_CONTAINER = document.getElementById("home");

  const isTheOwnerOfPage = user?.role === "admin" || user?.id === userId;

  useTrackVisted({
    currentViewedProfile: relatedUser?.[0],
    isOwnerOfPage: isTheOwnerOfPage,
  });

  if (isLoading || landingLoading) return <FullSnLoading />;

  if (!relatedUser || !relatedUser.length)
    return <ErrorComp message="This user doesn't exist." />;

  return (
    <div className="relative">
      <BackButton className={`${!isTheOwnerOfPage && "relative mb-5"}`} />

      {APPLAYOUT_CONTAINER &&
        createPortal(
          <Suspense>
            <LazyFloatingNav
              navItems={[
                // { name: "Landing", link: "home" },
                {
                  name: (
                    <Resume
                      asLink={true}
                      isOwnerOfPage={isTheOwnerOfPage}
                      link={relatedUser[0]?.resumeUrl || ""}
                    />
                  ),
                  link: "",
                },
                {
                  name: (
                    <span
                      className={`${!userPosts?.length && "text-muted-foreground"}`}
                    >
                      Projects
                    </span>
                  ),
                  link: "posts-container",
                },
                { name: "About", link: "about" },
                { name: "Contact", link: "contact" },
                {
                  name: (
                    <TooltipComp toolTipText={relatedUser?.at(0)?.username}>
                      <img
                        className="h-7 w-7 rounded-full"
                        src={
                          relatedUser?.at(0)?.avatar || defaultProfilePicture
                        }
                        alt="asa"
                      />
                    </TooltipComp>
                  ),
                  link: "home",
                },
              ]}
            />
          </Suspense>,
          APPLAYOUT_CONTAINER,
        )}
      <LandingPage isOwner={isTheOwnerOfPage} isUser={user ? true : false} />

      {/* ------------------ projects section */}

      <ProjectControls
        selectDisabled={!userPosts?.length}
        isTheOwnerOfPage={isTheOwnerOfPage}
      />
      <div className="my-5">
        {isPostsLoading ? (
          <FullSnLoading />
        ) : (
          <UserProjects userProjects={userPosts} />
        )}
        {!pageCount ? null : <Pagination pageCount={pageCount} />}
      </div>

      <div className="my-7">
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
