import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuPortal,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogComp from "./DialogComp";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";

interface CartControlsProps {
  className?: string;
  deletePost: () => void;
  postId: string;
}

const CardControls = ({ className, deletePost, postId }: CartControlsProps) => {
  const [isDiaOpen, setIsDiaOpen] = useState(false);

  return (
    <>
      <DialogComp
        isOpen={isDiaOpen}
        setIsOpen={setIsDiaOpen}
        showOpenButton={false}
      >
        <div className=" flex flex-col pt-2 sm:py-0 sm:flex-row-reverse  justify-start items-center gap-2 sm:gap-2">
          <Button
            className="  w-full sm:w-24 "
            onClick={() => {
              deletePost();
              setIsDiaOpen(false);
            }}
            variant="destructive"
          >
            Delete
          </Button>
          <Button
            className="  w-full  sm:w-24"
            onClick={() => setIsDiaOpen(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </DialogComp>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className=" absolute right-4  opacity-90 top-5  z-[2] p-0 w-7 h-7 rounded-md "
          >
            <IoIosMore size={22} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={` w-48 mr-4 right-0 ${className}`}>
          <DropdownMenuItem onClick={() => setIsDiaOpen(true)}>
            <MdDeleteForever className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <Link to={`/edit-post/${postId}`}>
            <DropdownMenuItem>
              <MdOutlineEditNote className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CardControls;
