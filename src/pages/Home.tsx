import Banner from "@/components/shared/Banner";
import LogoCarousel from "@/components/shared/LogoCarousel";

import Pagination from "@/components/shared/Pagination";

import HomePostControlls from "@/features/home/HomePostControlls";
import PostsList from "@/features/home/PostList";
import ContributorsTags from "@/features/projects/contribuorsInputField/ContributorsTags";
import useGetPosts from "@/features/projects/usePosts";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { publicUser } from "@/types/types";
import { useState } from "react";

// const users = [
//   { userid: 1, username: "mohammed" },
//   { userid: 2, username: "lolman" },
//   { userid: 3, username: "something else" },
// ];

// function handleEdit() {
//   const userToEdit = users.find((el) => el.userid === 2);
//   if (userToEdit) userToEdit.username = "kill your self";
//   console.log(users, "did it work?!!!");
// }

// handleEdit();
const Home = () => {
  const { user } = useAuth();
  const { posts, isLoading, pageCount } = useGetPosts();
  const [tags, setTags] = useState<publicUser[]>([]);
  useScrollUpWhenMounted();
  const userObj = {
    username: user?.username,
    userId: user?.id,
    avatar: user?.avatar,
  };

  console.log(tags, "TTTTTTT");
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

      <ContributorsTags contrbiutersTag={tags} onChange={setTags} />
      <HomePostControlls
        selectDisabled={posts && !posts.length ? true : false}
        user={userObj}
      />

      {/* <LandingForm /> */}
      {/* <LandingFormRewrite /> */}
      <PostsList userId={user?.id} posts={posts} isLoading={isLoading} />
      {!pageCount ? null : <Pagination pageCount={pageCount} />}
    </div>
  );
};

export default Home;
