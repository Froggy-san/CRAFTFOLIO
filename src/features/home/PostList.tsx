import Loading from "@/components/shared/Loading";
import { Project } from "@/types/types";
import Empty from "@/components/shared/Empty";
import LinkBtn from "@/components/shared/LinkBtn";
import ErrorComp from "@/components/shared/ErrorComp";
import { useSearchParams } from "react-router-dom";
import PostsGrid from "@/components/shared/posts/PostsGrid";

const PostsList = ({
  userId,
  posts,
  isLoading,
}: {
  posts: Project[] | undefined;
  userId: string | undefined;
  isLoading: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const searchTerm = !searchParams.get("search")
    ? ""
    : searchParams.get("search");

  if (isLoading)
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <Loading size={30} />
      </div>
    );
  if (!isLoading && !posts) return <ErrorComp />;
  if (posts && !posts.length && searchTerm)
    return (
      <Empty
        className="flex h-[500px] items-center justify-center font-semibold"
        message={`No matches for "${searchTerm}"`}
      />
    );

  if (!isLoading && !posts?.length)
    return (
      <Empty
        className="flex h-[500px] flex-col items-center justify-center gap-2 sm:flex-row"
        message={
          userId ? (
            <>
              {" "}
              <p className="font-semibold">
                There are not posts, be the first one to post.
              </p>{" "}
              <LinkBtn
                to={`/user/${userId}`}
                className="h-[35px] py-0 pb-[2px]"
              >
                My profile.
              </LinkBtn>
            </>
          ) : (
            <>
              {" "}
              <p>There are not posts, be the first one to post.</p>{" "}
              <LinkBtn to="/login" className="h-[35px] py-0 pb-[2px]">
                Login.
              </LinkBtn>
            </>
          )
        }
      />
    );

  // console.log(posts, "posts!!");
  return (
    <div className="mb-24">
      <PostsGrid posts={posts} />
    </div>
  );
};

export default PostsList;
