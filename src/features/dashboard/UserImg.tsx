import ImageView from "@/components/shared/ImageView";
import { cn } from "@/lib/utils";
import { defaultProfilePicture } from "@/utils/constants";
import React, { useCallback, useState } from "react";

const UserImg = ({
  avatar,
  className,
}: {
  className?: string;
  avatar: string;
}) => {
  const [viewedImage, setViewedImaged] = useState<null | string>(null);
  const profileImage = avatar || defaultProfilePicture;
  const handleShowImage = useCallback(
    function () {
      setViewedImaged(profileImage);
    },
    [profileImage]
  );

  return (
    <>
      <div
        onClick={() => {
          if (!profileImage) return;

          handleShowImage();
        }}
        aria-label="user's picture in the landing page"
        className={cn(
          " w-20 relative h-20 xs:w-36 xs:h-36  lg:w-40 lg:h-40 rounded-full  hover:grayscale-[10%] hover:opacity-95   transition-all duration-200 cursor-pointer",
          className
        )}
      >
        <img
          src={profileImage}
          alt="image"
          className=" h-full w-full object-cover rounded-full"
        />
      </div>
      <ImageView
        handleClose={() => setViewedImaged(null)}
        image={viewedImage}
      />
    </>
  );
};

export default UserImg;
