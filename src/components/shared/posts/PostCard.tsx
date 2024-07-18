import { Project, imageObject } from "@/types/types";

import { Link } from "react-router-dom";
import UserTag from "../UserTag";
import CardControls from "./PostCardControls";
import useDeletePost from "@/features/projects/useDeletePost";
import { useAuth } from "@/hooks/useAuth";
import TooltipComp from "../TooltipComp";
import { Button } from "../../ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import PostCardCarousel from "./PostCardCarousel";
import { format } from "date-fns";
import ToolsUsed from "./ToolsUsed";
import { motion, useMotionValue } from "framer-motion";
import GrainyImg from "../GrainyImg";
import { AnimatedTooltip } from "../AnimatedTooltops";
import DisplayedContributors from "./DisplayedContributors";
import PostCardContributors from "./PostCardContributors";
import Loading from "../Loading";

const previewRegex = /pre[av]iew/i;

// function extractPreviewLink(text: string) {
//   // The updated regex includes '.*?' to handle any characters between 'preview:' and the actual URL
//   const match = text.match(/pre[av]iew:.*?(https:\/\/\S+)/i);
//   return match ? match[1] : null;
// }
const PostCard = ({ post }: { post: Project }) => {
  const { isDeleting, deletePost } = useDeletePost();
  const { user: loggedInUser } = useAuth();
  const user = {
    username: post.publicUsers?.username,
    userId: post.publicUsers?.userId,
    avatar: post.publicUsers?.avatar,
  };
  const x = useMotionValue(0);
  const postTech =
    post && post.technologies ? JSON.parse(post.technologies) : [];
  const previewLink = JSON.parse(post.links).find(
    (link: { description: string; url: string }) =>
      previewRegex.test(link.description)
  )?.url;

  const imagesToDelete = post.projectImages.map(
    (image: imageObject) => image.imageUrl.split("projects/")[1]
  );

  const postImages = post.projectImages.map(
    (image: imageObject) => image.imageUrl
  );
  const contrbiutersTags =
    post && post.contributors ? JSON.parse(post.contributors) : [];
  const currentOwner =
    loggedInUser?.role === "admin" || post.user_id === loggedInUser?.id;
  //bg-[#ffffff]
  return (
    <motion.li
      layout
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        deleting: { opacity: 0.6, y: -20 }, // Added variant for deleting state
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={isDeleting ? "deleting" : "visible"}
      // exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={` relative    rounded-lg h-fit break-words
        `}
    >
      {currentOwner ? (
        <CardControls
          deletePost={() =>
            deletePost({ postId: String(post.id), imagesToDelete })
          }
          postId={String(post.id)}
        />
      ) : null}

      {postImages.length ? (
        <PostCardCarousel
          postId={post.id}
          postImages={postImages}
          isDeleting={isDeleting}
        />
      ) : (
        <Link to={`/project/${post.id}`}>
          <div className="flex relative  h-[200px] xs:h-[250px] sm:h-[350px]  grany  rounded-md overflow-hidden items-center justify-center p-0  font-semibold">
            No images.
            {isDeleting && (
              <Loading
                className=" center-abslute z-30 !opacity-100"
                size={30}
              />
            )}
            <GrainyImg />
          </div>
        </Link>
      )}

      <Link to={`/project/${post.id}`}>
        <div className=" p-2 ">
          <TooltipComp toolTipText={post.name}>
            <h1
              aria-label="project name"
              className="  w-fit max-w-full text-lg font-semibold line-clamp-1"
            >
              {post.name}
            </h1>
          </TooltipComp>
          {/* <h2 className=" line-clamp-2">{post.description}</h2> */}

          {/* <TruncateText
            text={`Description: ${post.description}`}
            textLenght={120}
            className=" text-sm max-h-[70px] break-all h-fit"
            element="p"
          /> */}
          <div className=" text-[10px]">
            <p>
              From:
              <span className=" text-red-500">
                {" "}
                {format(new Date(post.startDate), "LLLL/dd/yyyy")}
              </span>{" "}
              - To:
              <span className=" text-red-500">
                {" "}
                {format(new Date(post.endDate), "LLLL/dd/yyyy")}
              </span>
            </p>
            <TooltipComp toolTipText={post.type}>
              <p className="overflow-hidden  w-fit max-w-full   whitespace-nowrap overflow-ellipsis">{`Type: ${
                post.type.length ? post.type : "~"
              }`}</p>
            </TooltipComp>

            <PostCardContributors items={contrbiutersTags} />
            {/* <DisplayedContributors contributors={contrbiutersTags} /> */}
            {/* <div className=" flex flex-nowrap gap-1 items-center">
              <span>Contributors: </span>
              <DisplayedContributors contributors={contrbiutersTags} />
            </div> */}
            {/* <p className=" break-words">Technologies: [{post.technologies}]</p> */}
            <ToolsUsed toolsArr={postTech} />
            {/* <HandleIcons toolsArr={post.technologies.split(",")} /> */}
          </div>
        </div>
      </Link>
      <div className=" flex items-center justify-between">
        {post.publicUsers ? (
          <UserTag
            link={`/user/${user.userId}`}
            user={user}
            className=" text-[12px] font-semibold  w-[80%] xs:w-[70%] sm:w-[50%]"
          />
        ) : (
          <span></span>
        )}
        {previewLink ? (
          <Button variant="link" className=" group  pr-0" asChild>
            <Link target="_blank" to={previewLink}>
              {" "}
              <BsArrowUpRight
                className=" group-hover:translate-x-[5px] group-hover:translate-y-[-5px] transition-all"
                size={15}
              />
            </Link>
          </Button>
        ) : null}
      </div>
    </motion.li>
  );
};

export default PostCard;

/*
     <Carousel id="carousel" className="w-full    rounded-lg ">
        {isDeleting && (
          <Loading className=" center-abslute z-20 text-black" size={30} />
        )}
        <Link to={`/project/${post.id}`}>
          <CarouselContent
            id="carousel-Content"
            className=" p-0 bg-transparent"
          >
            {post.projectImages.map((imageObj, index) => (
              <CarouselItem id="carousel item" key={index} className=" ">
                <div id="carousel div" className=" ">
                  <Card
                    id="carousel card"
                    className=" w-full border-none bg-[transparent] overflow-hidden rounded-lg"
                  >
                    
                    <CardContent
                      id="carousel card content"
                      className="flex  h-[200px] xs:h-[250px] sm:h-[350px]   items-center justify-center p-0 "
                    >
                       <ImagePortrait image={imageObj.imageUrl} /> 

                      <img
                        src={imageObj.imageUrl}
                        alt={imageObj.imageUrl}
                        className=" w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Link>
        <CarouselPrevious className=" left-2   w-6 h-6 disabled:z-20" />
        <CarouselNext className="  right-2  w-6 h-6  disabled:z-20" />
      </Carousel>

*/
