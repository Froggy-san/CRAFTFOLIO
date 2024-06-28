import { Project, imageObject } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Link } from "react-router-dom";
import UserTag from "../UserTag";
import HandleIcons from "../HandleIcons";
import CardControls from "./PostCardControls";
import useDeletePost from "@/features/projects/useDeletePost";
import { useAuth } from "@/hooks/useAuth";
import Loading from "../Loading";
import TooltipComp from "../TooltipComp";
import { Button } from "../../ui/button";
import { BsArrowUpRight } from "react-icons/bs";
// import { MdArrowOutward } from "react-icons/md";
import { findPreviewLink } from "@/utils/helper";
import PostCardCarousel from "./PostCardCarousel";
import { format } from "date-fns";
import ToolsUsed from "./ToolsUsed";
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
  const currentOwner =
    loggedInUser?.role === "admin" || post.user_id === loggedInUser?.id;
  //bg-[#ffffff]
  return (
    <li
      className={`p-1 relative    rounded-lg h-fit break-words ${
        isDeleting && "opacity-60 cursor-not-allowed"
      }`}
    >
      {currentOwner ? (
        <CardControls
          deletePost={() =>
            deletePost({ postId: String(post.id), imagesToDelete })
          }
          postId={String(post.id)}
        />
      ) : null}

      <PostCardCarousel
        postId={post.id}
        postImages={postImages}
        isDeleting={isDeleting}
      />

      <Link to={`/project/${post.id}`}>
        <div className=" p-2 ">
          <TooltipComp toolTipText={post.name}>
            <h1
              aria-label="project name"
              className="overflow-hidden  w-fit max-w-full text-lg font-semibold whitespace-nowrap overflow-ellipsis"
            >
              {post.name}
            </h1>
          </TooltipComp>

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
          <Button variant="link" className=" group " asChild>
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
    </li>
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
