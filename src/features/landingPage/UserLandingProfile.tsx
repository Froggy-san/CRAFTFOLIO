import ImageView from "@/components/shared/ImageView";
import { defaultProfilePicture } from "@/utils/constants";
import { useState } from "react";

const UserLandingProfile = ({
  avatar,
}: // link,
{
  avatar: string;
  // link?: string;
}) => {
  const [viewedImage, setViewedImaged] = useState<null | string>(null);
  const profileImage = avatar || defaultProfilePicture;
  return (
    <div className=" flex flex-col gap-3">
      {" "}
      <div
        onClick={() => {
          if (!profileImage) return;
          setViewedImaged(profileImage);
        }}
        aria-label="user's picture in the landing page"
        className=" w-28 h-28 xs:w-36 xs:h-36 rounded-full overflow-hidden  cursor-pointer"
      >
        <img
          src={profileImage}
          alt="image"
          className=" h-full w-full object-cover"
        />
      </div>
      <ImageView
        handleClose={() => setViewedImaged(null)}
        image={viewedImage}
      />
    </div>
  );
};

export default UserLandingProfile;
