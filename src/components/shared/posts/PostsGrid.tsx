import { Project } from "@/types/types";

import PostCard from "@/components/shared/posts/PostCard";
import UnorderedListGrid from "../UnorderedListGrid";

const PostsGrid = ({ posts }: { posts: Project[] | undefined }) => {
  return (
    <UnorderedListGrid>
      {posts
        ? posts.map((post) => <PostCard post={post} key={post.id} />)
        : null}
    </UnorderedListGrid>
  );
};

export default PostsGrid;
