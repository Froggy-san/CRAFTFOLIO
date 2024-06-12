// import React from "react";
// import GranyImg from "@/components/shared/GrainyImg";
// import useGetUserProfile from "@/features/projects/useUserPosts";
import UserLandingProfile from "@/features/landingPage/UserLandingProfile";
import HandleIcons from "@/components/shared/HandleLinkIcons";
import useLandingPage from "./useLandingPage";
import LandingForm from "./LandingForm";
// import Loading from "@/components/shared/Loading";
import FullSnLoading from "@/components/shared/FullSnLoading";
import { defaultLandingPageImage } from "@/utils/constants";
const defaultText = {
  title: ` Hello, I am Something something and i whatever whatever fuck you`,
  about: `Tech-savvy and eager, the Junior React Developer combines web
    fundamentals with a love for React, a UI-building library. They
    write clean code and navigate the web's blueprint. Their React
    skills shine, crafting reusable components and managing data flow.
    Always learning, they explore React's ecosystem. From collaborating
    on projects to crafting UIs, each challenge paves their path to
    becoming a web development force.`,
};

const LandingPage = ({
  isUser,
  isOwner,
}: {
  isUser: boolean;
  isOwner: boolean;
}) => {
  const { isLoading, userLandingPage, userAvatar } = useLandingPage();

  const landingPage = userLandingPage?.[0];

  if (isLoading) return <FullSnLoading />;

  return (
    <div className=" select-none">
      {isUser && isOwner ? <LandingForm landingToEdit={landingPage} /> : null}

      <div className=" h-fit max-h-[83dvb] rounded-md mt-3 relative grany overflow-hidden flex flex-col-reverse items-center sm:flex-row justify-between  p-5">
        {/* <GranyImg /> */}
        <img
          src={landingPage?.landingImage || defaultLandingPageImage}
          alt="asa"
          className=" absolute w-full h-full inset-0 object-cover blur-[3px]"
        />
        <div className=" z-10 h-full flex flex-col gap-3  flex-1 max-w-[1000px]  text-teal-400">
          <h1 className="  text-xl  xs:text-1xl md:text-2xl lg:text-4xl ">
            {landingPage?.primaryText || defaultText.title}
          </h1>

          <h2 className=" text-xs xs:text-sm sm:text-xl sm:pt-6  md:pt-16  lg:pt-24 lg:text-2xl">
            {landingPage?.secondaryText || defaultText.about}
          </h2>

          <p className=" hidden md:block text-sm">
            {landingPage?.tertiaryText || defaultText.about}
          </p>
        </div>

        <div className=" z-10 h-full w-[200px] flex  sm:items-end items-center flex-col gap-3   ">
          <div className=" flex flex-col gap-2 items-center">
            <UserLandingProfile
              avatar={landingPage?.avatarImage || userAvatar?.[0].avatar || ""}
            />
            <HandleIcons links={landingPage?.socials.split(",") || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
