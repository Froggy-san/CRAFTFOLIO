import Loading from "@/components/shared/Loading";
import PostItem from "./PostItem";
import { Project } from "@/types/types";
import Empty from "@/components/shared/Empty";
import LinkBtn from "@/components/shared/LinkBtn";
import ErrorComp from "@/components/shared/ErrorComp";
import UnorderedListGrid from "@/components/shared/UnorderedListGrid";
import { useSearchParams } from "react-router-dom";

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
      <div className=" flex items-center justify-center h-96">
        <Loading size={30} />
      </div>
    );
  if (!isLoading && !posts) return <ErrorComp />;
  if (posts && !posts.length && searchTerm)
    return (
      <Empty
        className=" h-[500px] flex justify-center items-center font-semibold"
        message={`No matches for "${searchTerm}"`}
      />
    );

  if (!isLoading && !posts?.length)
    return (
      <Empty
        className=" flex  flex-col sm:flex-row h-[500px]  justify-center items-center gap-2"
        message={
          userId ? (
            <>
              {" "}
              <p className="  font-semibold">
                There are not posts, be the first one to post.
              </p>{" "}
              <LinkBtn
                to={`/user/${userId}`}
                className=" py-0 h-[35px] pb-[2px]"
              >
                My profile.
              </LinkBtn>
            </>
          ) : (
            <>
              {" "}
              <p>There are not posts, be the first one to post.</p>{" "}
              <LinkBtn to="/login" className=" py-0 h-[35px] pb-[2px]">
                Login.
              </LinkBtn>
            </>
          )
        }
      />
    );

  // console.log(posts, "posts!!");
  return (
    <div className=" mb-24">
      <UnorderedListGrid>
        {posts
          ? posts.map((post) => <PostItem post={post} key={post.id} />)
          : null}
      </UnorderedListGrid>
    </div>
  );
};

export default PostsList;
