import ImageView from "@/components/shared/ImageView";
import { defaultProfilePicture } from "@/utils/constants";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdImages } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { ClickAwayListener } from "@mui/material";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";

const UserLandingProfile = ({
  avatar,
  isOwner,
}: // link,
{
  avatar: string;
  isOwner: boolean;
  // link?: string;
}) => {
  const [viewedImage, setViewedImaged] = useState<null | string>(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const profileImage = avatar || defaultProfilePicture;
  // const isDisktop = useMediaQuery("(min-width: 450px)");
  const handleShowImage = useCallback(
    function () {
      setViewedImaged(profileImage);
    },
    [profileImage]
  );

  const handleCloseOptions = () => {
    setIsOptionOpen(false);
  };

  return (
    <div className=" flex flex-col gap-3">
      {" "}
      <div
        onClick={() => {
          if (!profileImage) return;
          if (isOwner) setIsOptionOpen(true);
          else handleShowImage();
        }}
        aria-label="user's picture in the landing page"
        className=" w-28 relative h-28 xs:w-36 xs:h-36  lg:w-40 lg:h-40 rounded-full  hover:grayscale-[10%] hover:opacity-95   transition-all duration-200 cursor-pointer"
      >
        {/* OPTIONS  */}
        <AnimatePresence>
          {isOwner && isOptionOpen && (
            <ClickAwayListener
              onClickAway={() => {
                handleCloseOptions();
              }}
            >
              <motion.div
                initial={{
                  width: 30,
                  height: 30,
                  left: "-120%",

                  opacity: 0,
                }}
                animate={{
                  width: 150,
                  height: 73,
                  left: "calc(-150% + 150px)",
                  opacity: 1,
                }}
                exit={{ width: 30, right: "calc(100% - 30px)", opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="absolute  overflow-hidden p-1 rounded-md bg-background text-sm whitespace-nowrap"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseOptions();
                    handleShowImage();
                  }}
                  className=" relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground w-full"
                >
                  <IoMdImages className="mr-2 " size={20} />
                  View image
                </button>
                <Link
                  to="/user-settings"
                  className=" relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground w-full"
                >
                  <CiSettings className="mr-2 " size={20} />
                  Settings
                </Link>
              </motion.div>
            </ClickAwayListener>
          )}
        </AnimatePresence>
        {/* OPTIONS  */}
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
    </div>
  );
};

export default UserLandingProfile;
