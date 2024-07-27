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

import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import DialogComp from "../DialogComp";
import DeletePostDiaDrawer from "./DeletePostDiaDrawer";

interface CartControlsProps {
  className?: string;
  deletePost: () => void;
  postId: string;
}

const PostCardControls = ({
  className,
  deletePost,
  postId,
}: CartControlsProps) => {
  const [isDiaOpen, setIsDiaOpen] = useState(false);

  return (
    <>
      <DeletePostDiaDrawer
        open={isDiaOpen}
        setOpen={setIsDiaOpen}
        onSubmit={deletePost}
        Description="This action cannot be undone. This will permanently delete this post from our servers."
        primaryTextBtn="Continue"
        showTriggerBtn={false}
      />
      {/* <DialogComp
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
      </DialogComp> */}
      {/* <DeletePostDiaDrawer
        open={isDiaOpen}
        setOpen={setIsDiaOpen}
        handleDelete={deletePost}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className=" absolute  opacity-90  top-2 right-2 sm:top-5 sm:right-4 z-[4] p-0 w-7 h-7 rounded-md "
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

export default PostCardControls;
