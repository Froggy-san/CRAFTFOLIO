import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
// import GranyImg from "@/components/shared/GrainyImg";
// import Loading from "@/components/shared/Loading";
import { useAuth } from "@/hooks/useAuth";
import ProjectList from "@/features/projects/ProjectList";
import useUserPosts from "@/features/projects/useUserPosts";
import Pagination from "@/components/shared/Pagination";
import LandingPage from "@/features/landingPage/LandingPage";
import ProjectControls from "@/features/projects/ProjectControls";
import FullSnLoading from "@/components/shared/FullSnLoading";
import AboutMe from "@/features/userProfile/AboutMe";
// import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import Heading from "@/components/shared/Heading";
// import { FaArrowLeftLong } from "react-icons/fa6";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const { isLoading: isPostsLoading, pageCount, userPosts } = useUserPosts();
  // useScrollUpWhenMounted();

  const { userId } = useParams();
  const isTheOwnerOfPage = user?.role === "admin" || user?.id === userId;

  // const userProfileId = userId || "";
  // const { isLoading: isUserProfileLoading, userProfile } = useGetUserProfile();

  if (isLoading) return <FullSnLoading />;

  // console.log(pageCount, "SS");
  // console.log(userPosts, "USER POSTS");

  // const userProjects = userProfile?.[0].projects;

  // console.log(userProfile, "01129442476");

  return (
    <div className=" relative ">
      {/* <div className=" flex items-center gap-3 fixed bottom-[70px] left-[500px]">
        <FaArrowLeftLong size={20} />
        <p>Preview link</p>
      </div>
      <div></div> */}
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
          <ProjectList userProjects={userPosts} />
        )}
        {!pageCount ? null : <Pagination pageCount={pageCount} />}
      </div>
      <div className="my-7 mb-52">
        <Heading>About me</Heading>
        <AboutMe isAuthenticated={isTheOwnerOfPage} userId={userId || ""} />
      </div>
    </div>
  );
};

export default UserProfile;
