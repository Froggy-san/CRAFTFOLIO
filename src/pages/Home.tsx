import { VanishList } from "@/components/shared/Animation";
import GlowingCards from "@/components/shared/GlowingCards";
import LinkPreviewDemo from "@/components/shared/LinkPreviewDemo";
import Pagination from "@/components/shared/Pagination";
import SearchDialog from "@/components/shared/search-dialog";

import { LinkPreview } from "@/components/ui/link-preview";
import Banner from "@/features/home/Banner";
import Faq from "@/features/home/Faq";
import Footer from "@/features/home/Footer";
import HomePostControlls from "@/features/home/HomePostControlls";
import PostsList from "@/features/home/PostList";
import useGetPosts from "@/features/projects/usePosts";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { useDocumentTitle } from "@uidotdev/usehooks";

const Home = () => {
  const { user } = useAuth();
  const { posts, isLoading, pageCount } = useGetPosts();

  useScrollUpWhenMounted();
  useDocumentTitle("Home");
  const userObj = {
    role: user?.role,
    username: user?.username,
    userId: user?.id,
    avatar: user?.avatar,
  };

  return (
    <div>
      {/* <div className=" ball"></div> */}
      <Banner />
      {/* <SearchDialog
        currPage="1"
        carId={"1"}
        clientId={"1"}
        dateFrom={"1"}
        dateTo={"1"}
        minPrice={"1"}
        maxPrice={"1"}
        serviceStatusId={"1"}
        status={[]}
        cars={[]}
        clients={[]}
      /> */}
      <HomePostControlls
        selectDisabled={!posts?.length}
        user={userObj}
        className="mt-20"
      />
      <PostsList userId={user?.id} posts={posts} isLoading={isLoading} />
      {!pageCount ? null : (
        <Pagination pageCount={pageCount} className="mb-5" />
      )}

      <GlowingCards />

      {/* <Faq /> */}

      {/* <Footer /> */}

      {/* <Card className=" relative my-20   max-w-[1200px]  px-5 h-[500px] sm:h-[350px] mx-auto  overflow-hidden text-center">
        <div className=" space-y-3 text-3xl sm:text-5xl font-semibold mt-7">
          <Heading
            Text={
              <span>
                Let your presence be felt around the{" "}
                <span className=" text-lime-300">world</span>.
              </span>
            }
          />
          <Heading
            Text={
              <span>
                Ready to take <span className=" text-lime-300">your</span>{" "}
                digital presence to the next level?.
              </span>
            }
            as="h2"
          />
        </div>
        <GlobeComp />
      </Card> */}
      {/* <VanishList /> */}
    </div>
  );
};

export default Home;
