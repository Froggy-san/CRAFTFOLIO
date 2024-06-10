import ImageView from "@/components/shared/ImageView";
import { useState } from "react";

const UserLandingProfile = ({
  avatar,
}: // link,
{
  avatar: string;
  // link?: string;
}) => {
  const [viewedImage, setViewedImaged] = useState<null | string>(null);

  return (
    <div className=" flex flex-col gap-3">
      {" "}
      <div
        onClick={() => setViewedImaged(avatar)}
        aria-label="user's picture in the landing page"
        className=" w-28 h-28 xs:w-36 xs:h-36 rounded-full overflow-hidden  cursor-pointer"
      >
        <img src={avatar} alt="image" className=" h-full w-full object-cover" />
      </div>
      <ImageView
        handleClose={() => setViewedImaged(null)}
        image={viewedImage}
      />
    </div>
  );
};

export default UserLandingProfile;
