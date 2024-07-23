import UserLandingProfile from "./UserLandingProfile";
import HandleLinkIcons from "@/components/shared/HandleLinkIcons";

interface landingUserInfoProps {
  landingPageAvatarImg: string;
  icons: string[];
  isOwner: boolean;
}

const LandingUserInfo = ({
  landingPageAvatarImg,
  icons,
  isOwner,
}: landingUserInfoProps) => {
  return (
    <div className=" z-10 h-full f-fit flex  sm:items-end items-center flex-col gap-3 mb-auto   ">
      <div className=" flex flex-col gap-2 items-center h-full">
        <UserLandingProfile isOwner={isOwner} avatar={landingPageAvatarImg} />
        <HandleLinkIcons links={icons} />
      </div>
    </div>
  );
};

export default LandingUserInfo;
