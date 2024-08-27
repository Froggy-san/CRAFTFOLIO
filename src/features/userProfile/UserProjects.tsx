import { Project } from "@/types/types";
import Empty from "@/components/shared/Empty";
import ErrorComp from "@/components/shared/ErrorComp";
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
        className="flex h-[300px] items-center justify-center font-semibold"
        message={`No matches for "${searchTerm}"`}
      />
    );
  if (!userProjects.length)
    return (
      <Empty
        className="flex h-[300px] items-center justify-center font-semibold"
        message="No posts."
      />
    );

  return (
    <div className="my-6">
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
