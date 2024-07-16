import IconButton from "@/components/shared/IconButton";

import { TbEditCircle } from "react-icons/tb";

import Loading from "@/components/shared/Loading";
import useDeletePost from "../projects/useDeletePost";
import DeletePost from "../projects/DeletePost";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

const ProjectViewControls = ({
  id,
  imagesToDelete,
}: {
  id: string;
  imagesToDelete: string[];
}) => {
  const { isDeleting, deletePost } = useDeletePost();
  return (
    <div className=" flex flex-col xs:flex-row  justify-end gap-3 items-center my-3  tracking-wide">
      {isDeleting ? (
        <Loading />
      ) : (
        <>
          <Button
            className="gap-1  w-full xs:w-fit"
            variant="ghost"
            size="sm"
            asChild
          >
            <Link to={`/edit-post/${id}`}>
              {" "}
              Edit <CiEdit size={20} />
            </Link>
          </Button>
        </>
        // <IconButton
        //   disabled={isDeleting}
        //   link={`/edit-post/${id}`}
        //   variant="ghost"
        // >
        //   <TbEditCircle size={20} />
        // </IconButton>
      )}
      <DeletePost
        postId={id}
        disabled={isDeleting}
        imagesToDelete={imagesToDelete}
        deletePost={deletePost}
      />
    </div>
  );
};

export default ProjectViewControls;
