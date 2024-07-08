import { Project } from "@/types/types";

import PostCard from "@/components/shared/posts/PostCard";
import UnorderedListGrid from "../UnorderedListGrid";
import { AnimatePresence } from "framer-motion";

const PostsGrid = ({ posts }: { posts: Project[] | undefined }) => {
  return (
    <UnorderedListGrid>
      <AnimatePresence mode="wait">
        {posts
          ? posts.map((post) => <PostCard post={post} key={post.id} />)
          : null}
      </AnimatePresence>
    </UnorderedListGrid>
  );
};

export default PostsGrid;
