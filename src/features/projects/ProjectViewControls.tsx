import IconButton from "@/components/shared/IconButton";

import { TbEditCircle } from "react-icons/tb";

import DeletePost from "./DeletePost";
import useDeletePost from "./useDeletePost";
import Loading from "@/components/shared/Loading";

const ProjectViewControls = ({
  id,
  imagesToDelete,
}: {
  id: string;
  imagesToDelete: string[];
}) => {
  const { isDeleting, deletePost } = useDeletePost();
  return (
    <div className=" flex justify-end gap-3 items-center my-3">
      {isDeleting ? (
        <Loading />
      ) : (
        <IconButton
          disabled={isDeleting}
          link={`/edit-post/${id}`}
          variant="ghost"
        >
          <TbEditCircle size={20} />
        </IconButton>
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
