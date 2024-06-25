import Banner from "@/components/shared/Banner";
// import HandleIcons from "@/components/shared/HandleLinkIcons";
// import LOL from "@/components/shared/LOL";
// import LinkBtn from "@/components/shared/LinkBtn";
import Pagination from "@/components/shared/Pagination";
import TagInput from "@/components/shared/TagsInput";
// import LinksForm from "@/components/shared/Test2";
import HomePostControlls from "@/features/home/HomePostControlls";
import PostsList from "@/features/home/PostList";
import useGetPosts from "@/features/projects/usePosts";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";

const Home = () => {
  const { user } = useAuth();
  const { posts, isLoading, pageCount } = useGetPosts();
  useScrollUpWhenMounted();
  const userObj = {
    username: user?.username,
    userId: user?.id,
    avatar: user?.avatar,
  };
  console.log(posts, "POSTS");
  return (
    <div>
      {/* <div className=" ball"></div> */}
      <Banner />

      {/* {user ? (
        <LinkBtn to={`/user/${user.id}`} className="my-8  w-fit">
          Make your own page.
        </LinkBtn>
      ) : null} */}

      {/* <HandleIcons links={links} /> */}
      {/* <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg> */}

      <HomePostControlls
        selectDisabled={posts && !posts.length ? true : false}
        user={userObj}
      />

      <PostsList userId={user?.id} posts={posts} isLoading={isLoading} />
      {!pageCount ? null : <Pagination pageCount={pageCount} />}
      <div className=" my-20">
        {/* <LinkInputForm /> */}

        {/* <LinksForm />

        <LOL /> */}
      </div>
    </div>
  );
};

export default Home;
