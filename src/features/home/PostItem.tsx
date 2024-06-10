import CardItem from "@/components/shared/CardItem";
import { Project } from "@/types/types";

const PostItem = ({ post }: { post: Project }) => {
  return <CardItem post={post} />;
};

export default PostItem;
