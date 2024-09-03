import UserLandingProfile from "@/features/userProfile/landingPage/UserLandingProfile";
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
import LandingDialogDrawer from "./LandingDialogDrawer";
const theColorBlack = "0,0,0,1";

const LandingPage = ({
  isUser,
  isOwner,
}: {
  isUser: boolean;
  isOwner: boolean;
}) => {
  /// getting the LandingPage related to the page owner, in that userLandingPage data there might be a profile picture that user added in the landing page if not we are getting  the user's profile picture from relatedUser to put it instead.
  const { isLoading, userLandingPage, relatedUser } = useLandingPage();

  const landingPage: landingProps | undefined = userLandingPage?.[0];
  const textColor =
    landingPage && landingPage.textColor
      ? Object.values(JSON.parse(landingPage.textColor)).join(",")
      : theColorBlack;

  const icons =
    landingPage && landingPage.socials ? JSON.parse(landingPage.socials) : [];

  if (isLoading) return <FullSnLoading />;

  const landingPageText = {
    primaryText: landingPage?.primaryText || (isOwner ? defaultText.title : ""),
    secondaryText:
      landingPage?.secondaryText || (isOwner ? defaultText.about : ""),
    tertiaryText:
      landingPage?.tertiaryText || (isOwner ? defaultText.about : ""),
  };

  return (
    <div className="select-none">
      {isUser && isOwner ? (
        <LandingDialogDrawer
          relatedUserAvatar={relatedUser?.[0].avatar}
          landingPage={landingPage}
        />
      ) : null}
      {/* {isUser && isOwner ? <LandingForm landingToEdit={landingPage} /> : null} */}

      <div
        className={`xs::max-h-[83vh] relative mt-3 flex max-h-[1450px] flex-col-reverse items-center justify-between gap-5 gap-x-10 overflow-hidden rounded-lg p-5 sm:flex-row lg:p-10 ${
          (!landingPage || landingPage.grainyTexture) && "grainy"
        }`}
      >
        <LandingPageImage
          landingImage={landingPage?.landingImage || defaultLandingPageImage}
          imageEffects={!landingPage || landingPage?.blur}
        />

        <LandingPageText
          landingPageText={landingPageText}
          style={{ color: `rgba(${textColor})` }}
        />
        <LandingUserInfo
          isOwner={isOwner}
          landingPageAvatarImg={
            landingPage?.avatarImage || relatedUser?.[0]?.avatar || ""
          }
          icons={icons}
        />
      </div>
    </div>
  );
};

export default LandingPage;
