import Banner from "@/components/shared/Banner";
import Pagination from "@/components/shared/Pagination";
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

  return (
    <div>
      {/* <div className=" ball"></div> */}
      <Banner />
      {/* <CarouselSpacing /> */}
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
    </div>
  );
};

export default Home;
