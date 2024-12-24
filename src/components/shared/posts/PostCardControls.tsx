import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
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
            className="absolute right-2 top-2 z-[4] h-7 w-7 rounded-md p-0 opacity-90 sm:right-4 sm:top-5"
          >
            <IoIosMore size={22} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`right-0 mr-4 w-48 ${className}`}>
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
