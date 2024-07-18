import DialogComp from "@/components/shared/DialogComp";
import IconButton from "@/components/shared/IconButton";
import DeletePostDiaDrawer from "@/components/shared/posts/DeletePostDiaDrawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// import { BsTrash2Fill } from "react-icons/bs";
// import { PiTrashSimpleBold } from "react-icons/pi";
import { HiOutlineTrash } from "react-icons/hi";

/// btw remove this shit later, this interface is shared across the app so put is somwehre else you fucking idiot.
interface x {
  postId: string;
  imagesToDelete: string[];
}

const DeletePost = ({
  disabled,
  deletePost,
  postId,
  imagesToDelete,
}: {
  postId: string;
  disabled?: boolean;
  imagesToDelete: string[];
  deletePost: ({ postId, imagesToDelete }: x) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DeletePostDiaDrawer
      setOpen={setIsOpen}
      open={isOpen}
      onSubmit={() => deletePost({ postId, imagesToDelete })}
      triggerBtnText={
        <Button
          className=" gap-1 w-full xs:w-fit tracking-wide"
          variant="destructive"
          size="sm"
        >
          Delete <HiOutlineTrash size={20} />
        </Button>
      }
    />
    // <DialogComp
    //   isOpen={isOpen}
    //   setIsOpen={setIsOpen}
    //   triggerBtnText={
    //     <Button
    //       className=" gap-1 w-full xs:w-fit tracking-wide"
    //       variant="destructive"
    //       size="sm"
    //     >
    //       Delete <HiOutlineTrash size={20} />
    //     </Button>
    //     // <IconButton disabled={disabled} variant="ghost">
    //     //   <HiOutlineTrash size={20} />
    //     // </IconButton>
    //   }
    // >
    //   <div className=" flex flex-col pt-2 sm:py-0 sm:flex-row-reverse  justify-start items-center gap-2 sm:gap-2">
    //     <Button
    //       className="  w-full sm:w-24 "
    //       onClick={() => deletePost({ postId, imagesToDelete })}
    //       variant="destructive"
    //     >
    //       Delete
    //     </Button>
    //     <Button
    //       className="  w-full sm:w-24 "
    //       onClick={() => setIsOpen(false)}
    //       variant="secondary"
    //     >
    //       Cancel
    //     </Button>
    //   </div>
    // </DialogComp>
  );
};

export default DeletePost;
