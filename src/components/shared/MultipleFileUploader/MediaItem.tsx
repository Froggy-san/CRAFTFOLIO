import { Button } from "@/components/ui/button";
import React from "react";
import { FileWithPath } from "react-dropzone";
import { IoIosClose } from "react-icons/io";
import ReactPlayer from "react-player";
type MediaType = "video" | "image";
interface MediaItemProps {
  handleDeleteItem: () => void;
  image: string;
  MediaType: MediaType;
  index: number;
}

const MediaItem = ({
  handleDeleteItem,
  index,
  image,
  MediaType,
}: MediaItemProps) => {
  if (MediaType === "video") {
    return (
      <li className="relative w-full sm:w-44" key={image}>
        <Button
          type="button"
          onClick={handleDeleteItem}
          aria-label={`the remove button for the image number ${
            index + 1
          } and with the name of ${image}`}
          variant="outline"
          className="absolute right-0 top-0 z-10 h-5 w-5 p-0"
        >
          <IoIosClose size={20} />
        </Button>
        <ReactPlayer
          url={image}
          controls
          loop
          muted
          playing
          width="100%"
          height="auto"
          onEnded={() => URL.revokeObjectURL(image)}
        />
        {/* <video
          autoPlay
          loop
          muted
          aria-label={`image number: ${index + 1}, image name: ${image} `}
          src={image}
          className="h-full max-h-56 w-full object-contain sm:max-h-40"
        /> */}
        <p
          aria-label={`image number: ${index + 1} image name: ${image}`}
          className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
        >
          {image}
        </p>
      </li>
    );
  } else {
    return (
      <li className="relative w-full sm:w-44" key={image}>
        <Button
          type="button"
          onClick={handleDeleteItem}
          aria-label={`the remove button for the image number ${
            index + 1
          } and with the name of ${image}`}
          variant="outline"
          className="absolute right-0 top-0 z-10 h-5 w-5 p-0"
        >
          <IoIosClose size={20} />
        </Button>
        <img
          aria-label={`image number: ${index + 1}, image name: ${image} `}
          src={image}
          alt="url"
          onLoad={() => URL.revokeObjectURL(image)}
          className="h-full max-h-56 w-full object-contain sm:max-h-40"
        />
        <p
          aria-label={`image number: ${index + 1} image name: ${image}`}
          className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
        >
          {image}
        </p>
      </li>
    );
  }
};

export default MediaItem;
