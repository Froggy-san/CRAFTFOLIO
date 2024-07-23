import { useState } from "react";
import IconButton from "./IconButton";
import { copyTextToClipboard } from "@/utils/helper";
import { TbCopy } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";

const CopyClipboard = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [isCopying, setIsCopying] = useState(false);

  function handleShufflingBtn() {
    setIsCopying(true);
    try {
      copyTextToClipboard(text);
      const timeoutId = setTimeout(() => {
        setIsCopying(false);
      }, 700);
      // Return a cleanup function directly from the event handler
      return () => {
        clearTimeout(timeoutId);
      };
    } catch (error) {
      console.error("Failed to copy text:", error);
      // Optionally, handle the error by updating the state to show an error message
    }
  }

  //   function handleShufflingBtn() {
  //     setIsCopying(true);
  //     copyTextToClipboard(text);
  //     setTimeout(() => {
  //       setIsCopying(false);
  //     }, 700);
  //   }
  return (
    <div
      className={`relative w-full  flex items-center px-2 h-11 justify-between rounded-md border border-input bg-background gap-2 ${className}`}
    >
      <span aria-label={`Copy URL:${text}`} className="truncate flex-1">
        {text}
      </span>
      {!isCopying ? (
        <IconButton
          className=" h-6 w-6"
          ariaLabel={!isCopying ? "Copy the URL" : "Copied!"}
          variant="outline"
          onClick={handleShufflingBtn}
        >
          <TbCopy size={20} />
        </IconButton>
      ) : (
        <IconButton className=" h-6 w-6" variant="outline">
          <IoCheckmarkDone size={20} />
        </IconButton>
      )}
    </div>
  );
};

export default CopyClipboard;
