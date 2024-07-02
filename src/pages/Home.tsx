"use client";

import { Drawer } from "vaul";
import Banner from "@/components/shared/Banner";

import { DrawerDemo } from "@/components/shared/DrawerTest";
// import HandleIcons from "@/components/shared/HandleLinkIcons";
// import LOL from "@/components/shared/LOL";
// import LinkBtn from "@/components/shared/LinkBtn";
import Pagination from "@/components/shared/Pagination";
import TagInput from "@/components/shared/TagsInput";
import TagsInput from "@/components/shared/TagsInputRewrite";
// import LinksForm from "@/components/shared/Test2";
import HomePostControlls from "@/features/home/HomePostControlls";
import PostsList from "@/features/home/PostList";
import LandingDialogDrawer from "@/features/landingPage/LandingDialogDrawer";
import LandingForm from "@/features/landingPage/LandingForm";
import LandingFormRewrite from "@/features/landingPage/LandingFromRewrite";
import useLandingPage from "@/features/landingPage/useLandingPage";
import useGetPosts from "@/features/projects/usePosts";
import { CarouselSpacing } from "@/features/userProfile/AboutMeSection/Test";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { landingProps } from "@/types/types";
import { useState } from "react";

const Home = () => {
  const { userLandingPage, userAvatar } = useLandingPage();
  const [tags, setTags] = useState<string[]>([]);
  const landingPage: landingProps | undefined = userLandingPage?.[0];
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
      <TagsInput tags={tags} onChange={setTags}>
        <TagsInput.TagsContainer className=" items-start">
          <TagsInput.TagsInputField
            className={tags.length >= 6 ? "h-[30px]" : "h-[120px] pb-[100px]"}
          />
        </TagsInput.TagsContainer>
        <TagsInput.SendBtn />
      </TagsInput>
      <DrawerDemo />

      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button>Open Drawer</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4">
                  Unstyled drawer for React.
                </Drawer.Title>
                <p className="text-zinc-600 mb-2">
                  This component can be used as a replacement for a Dialog on
                  mobile and tablet devices.
                </p>
                <p className="text-zinc-600 mb-8">
                  It uses{" "}
                  <a
                    href="https://www.radix-ui.com/docs/primitives/components/dialog"
                    className="underline"
                    target="_blank"
                  >
                    Radix&apos;s Dialog primitive
                  </a>{" "}
                  under the hood and is inspired by{" "}
                  <a
                    href="https://twitter.com/devongovett/status/1674470185783402496"
                    className="underline"
                    target="_blank"
                  >
                    this tweet.
                  </a>
                </p>
              </div>
            </div>
            <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <a
                  className="text-xs text-zinc-600 flex items-center gap-0.25"
                  href="https://github.com/emilkowalski/vaul"
                  target="_blank"
                >
                  GitHub
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
                <a
                  className="text-xs text-zinc-600 flex items-center gap-0.25"
                  href="https://twitter.com/emilkowalski_"
                  target="_blank"
                >
                  Twitter
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
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

      <LandingDialogDrawer landingPage={landingPage} />
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
