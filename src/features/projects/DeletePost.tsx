import DialogComp from "@/components/shared/DialogComp";
import IconButton from "@/components/shared/IconButton";
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
    <DialogComp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonText={
        <IconButton disabled={disabled} variant="ghost">
          <HiOutlineTrash size={20} />
        </IconButton>
      }
    >
      <div className=" flex items-center gap-3">
        <Button
          onClick={() => deletePost({ postId, imagesToDelete })}
          variant="destructive"
        >
          Delete
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="secondary">
          Cancel
        </Button>
      </div>
    </DialogComp>
  );
};

export default DeletePost;
