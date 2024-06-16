// import React from "react";
// import GranyImg from "@/components/shared/GrainyImg";
// import useGetUserProfile from "@/features/projects/useUserPosts";
import UserLandingProfile from "@/features/landingPage/UserLandingProfile";
import HandleIcons from "@/components/shared/HandleLinkIcons";
import useLandingPage from "./useLandingPage";
import LandingForm from "./LandingForm";
// import Loading from "@/components/shared/Loading";
import FullSnLoading from "@/components/shared/FullSnLoading";
import { defaultLandingPageImage, defaultText } from "@/utils/constants";
import GrainyImg from "@/components/shared/GrainyImg";

import LandingPageText from "./LandingPageText";
import LandingUserInfo from "./LandingUserInfo";
import LandingPageImage from "./LandingPageImage";
import { landingProps } from "@/types/types";
const theColorBlack = "0,0,0,1";
const LandingPage = ({
  isUser,
  isOwner,
}: {
  isUser: boolean;
  isOwner: boolean;
}) => {
  /// getting the LandingPage related to the page owner, in that userLandingPage data there might be a profile picture that user added in the landing page if not we are getting the userAvatar to put it instead.
  const { isLoading, userLandingPage, userAvatar } = useLandingPage();

  const landingPage: landingProps | undefined = userLandingPage?.[0];
  const textColor =
    landingPage && landingPage.textColor
      ? Object.values(JSON.parse(landingPage.textColor)).join(",")
      : theColorBlack;
  console.log(landingPage, "landing pagessssssssssssssss");
  const landingPageText = {
    primaryText: landingPage?.primaryText || defaultText.title,
    secondaryText: landingPage?.secondaryText || defaultText.about,
    tertiaryText: landingPage?.tertiaryText || defaultText.about,
  };

  if (isLoading) return <FullSnLoading />;

  return (
    <div className=" select-none">
      {isUser && isOwner ? <LandingForm landingToEdit={landingPage} /> : null}

      <div className="  max-h-[83vh] rounded-md mt-3 relative grany overflow-hidden flex flex-col-reverse items-center sm:flex-row justify-between  gap-5 p-5">
        {!landingPage || landingPage.grainyTexture ? <GrainyImg /> : null}

        <LandingPageImage
          landingImage={landingPage?.landingImage || defaultLandingPageImage}
          imageEffects={!landingPage || landingPage?.blur}
        />

        <LandingPageText
          landingPageText={landingPageText}
          style={{ color: `rgba(${textColor})` }}
        />
        <LandingUserInfo
          landingPageAvatarImg={
            landingPage?.avatarImage || userAvatar?.[0].avatar || ""
          }
          icons={landingPage?.socials.split(",") || []}
        />
      </div>
    </div>
  );
};

export default LandingPage;
