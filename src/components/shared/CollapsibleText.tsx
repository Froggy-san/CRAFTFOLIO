import { useState } from "react";
import IconButton from "./IconButton";
import { LENGHT_OF_STRING } from "@/utils/constants";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
{
  /* ${
          !isOpen && isBigEnough && "text-ellipsis overflow-clip h-[170px]"
        }  */
}

type arrowPositionX = "right" | "left" | null | undefined;

const CollapsibleText = ({
  textLengthToShow,
  text,
  arrowPositionX,
  textStyles,
  onClick,
}: {
  text: string | undefined;
  textLengthToShow?: number | null;
  arrowPositionX?: arrowPositionX;
  textStyles?: string;
  onClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isBigEnough =
    text && text.length >= (textLengthToShow || LENGHT_OF_STRING);

  const desc =
    isBigEnough && !isOpen
      ? text?.slice(0, textLengthToShow || LENGHT_OF_STRING) + "..."
      : text;

  return (
    <div onClick={onClick} className=" relative">
      <p
        aria-label=" project description"
        className={`mt-5 break-words   ${textStyles}`}
      >
        {desc}
      </p>
      {isBigEnough ? (
        <IconButton
          className={`absolute ${arrowPositionX}-0 bottom-[-45px]`}
          variant="ghost"
          onClick={() => {
            setIsOpen((is) => !is);
          }}
        >
          {!isOpen ? <IoIosArrowDown size={20} /> : <IoIosArrowUp size={20} />}
        </IconButton>
      ) : null}
    </div>
  );
};

export default CollapsibleText;
