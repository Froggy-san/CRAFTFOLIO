import { Project } from "@/types/types";

import Empty from "@/components/shared/Empty";
import ErrorComp from "@/components/shared/ErrorComp";
import UnorderedListGrid from "@/components/shared/UnorderedListGrid";
import { useSearchParams } from "react-router-dom";
import PostsGrid from "../../components/shared/posts/PostsGrid";

const UserProjects = ({
  userProjects,
}: {
  userProjects: Project[] | undefined;
}) => {
  const [searchParam] = useSearchParams();

  const searchTerm = !searchParam.get("search")
    ? ""
    : searchParam.get("search");

  if (!userProjects) return <ErrorComp />;
  if (!userProjects.length && searchTerm)
    return (
      <Empty
        className=" h-[300px] flex justify-center items-center font-semibold"
        message={`No matches for "${searchTerm}"`}
      />
    );
  if (!userProjects.length)
    return (
      <Empty
        className=" h-[300px] flex justify-center items-center font-semibold"
        message="There are no posts, be the first to post."
      />
    );

  return (
    <div className=" my-6">
      <PostsGrid posts={userProjects} />
      {/* <UnorderedListGrid>
        {userProjects
          ? userProjects.map((project) => (
              <PostsGrid project={project} key={project.id} />
            ))
          : null}
      </UnorderedListGrid> */}
    </div>
  );
};

export default UserProjects;
