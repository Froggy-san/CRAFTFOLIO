import { useEffect } from "react";
import { ClickAwayListener } from "@mui/base";
import { Button } from "../ui/button";
import { IoIosClose } from "react-icons/io";

const ImageView = ({
  handleClose,
  image,
}: {
  image: string | null;
  handleClose: () => void;
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (typeof image === "string") {
      if (body) {
        body.style.height = "100dvb";
        body.style.overflow = "hidden";
      }
    } else {
      if (body) {
        body.style.height = "unset";
        body.style.overflow = "unset";
      }
    }
  }, [image]);
  return (
    <>
      {image ? (
        <div className=" fixed flex items-center justify-center z-[9999] left-0 top-0 w-full h-[100dvb] bg-red-[rgba(0,0,0,0.3)] select-none  backdrop-blur-sm  backdrop-brightness-50 ">
          <Button
            variant="secondary"
            className=" absolute right-5 top-10 rounded-full  w-7 h-7 p-0 text-gray-800 hover:text-black"
          >
            <IoIosClose size={50} />
          </Button>
          <ClickAwayListener
            mouseEvent="onMouseUp" // the default mode by the way
            touchEvent="onTouchEnd" // here we are telling it to call the onClickAway when the user touch the screen to make it work right on mobile phones
            onClickAway={(e) => {
              // Prevent the click from propagating and triggering the image view again
              e.preventDefault();
              handleClose();
            }}
          >
            {/* <ImageComp image={image} /> */}
            <img
              src={image}
              alt={image}
              className=" max-w-[100%]  max-h-[75dvh] sm:max-h-[95dvh] object-contain"
            />
          </ClickAwayListener>
        </div>
      ) : null}
    </>
  );
};

export default ImageView;
