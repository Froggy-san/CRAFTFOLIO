import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import useUserPosts from "@/features/projects/useUserPosts";
import Pagination from "@/components/shared/Pagination";
import LandingPage from "@/features/landingPage/LandingPage";
import ProjectControls from "@/features/projects/ProjectControls";
import FullSnLoading from "@/components/shared/FullSnLoading";
// import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import Heading from "@/components/shared/Heading";
import AboutMe from "@/features/userProfile/AboutMeSection/AboutMe";
import UserProjects from "@/features/userProfile/UserProjects";
import BackButton from "@/components/shared/BackButton";
import { FloatingNav } from "@/components/ui/FloatingNavBar";
import { defaultProfilePicture } from "@/utils/constants";
import useLandingPage from "@/features/landingPage/useLandingPage";
import TooltipComp from "@/components/shared/TooltipComp";
import Footer from "@/features/userProfile/Footer/Footer";
import { BackgroundBeams } from "@/components/ui/BackgroundBeam";

// import { FaArrowLeftLong } from "react-icons/fa6";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const { isLoading: isPostsLoading, pageCount, userPosts } = useUserPosts();
  // useScrollUpWhenMounted();

  const { userId } = useParams();
  const isTheOwnerOfPage = user?.role === "admin" || user?.id === userId;

  const { relatedUser } = useLandingPage();
  console.log(relatedUser, "user avatar");
  // const userProfileId = userId || "";
  // const { isLoading: isUserProfileLoading, userProfile } = useGetUserProfile();

  if (isLoading) return <FullSnLoading />;

  // console.log(pageCount, "SS");
  // console.log(userPosts, "USER POSTS");

  // const userProjects = userProfile?.[0].projects;

  // console.log(userProfile, "01129442476");

  return (
    <div className=" relative ">
      <BackButton />
      {/* <div className=" flex items-center gap-3 fixed bottom-[70px] left-[500px]">
        <FaArrowLeftLong size={20} />
        <p>Preview link</p>
      </div>
      <div></div> */}
      <FloatingNav
        navItems={[
          { name: "Home", link: "/" },
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
      />
      <LandingPage isOwner={isTheOwnerOfPage} isUser={user ? true : false} />

      {user && isTheOwnerOfPage ? (
        <Button className="my-4" asChild>
          <Link to="/upload-post">Upload a post</Link>
        </Button>
      ) : null}

      {/* ------------------ projects section */}

      <ProjectControls />
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
        userSocials={relatedUser?.at(0)?.socials || ""}
        isTheOwnerOfPage={isTheOwnerOfPage}
      />
    </div>
  );
};

export default UserProfile;
