import { publicUser } from "@/types/types";
import React from "react";
import { AnimatedTooltip } from "../AnimatedTooltops";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultProfilePicture } from "@/utils/constants";
import TooltipComp from "../TooltipComp";

const PostCardContributors = ({ items }: { items: publicUser[] }) => {
  const navigate = useNavigate();
  function handleNavigate(id: string) {
    if (!id.includes("-any")) navigate(`/user/${id}`);
  }

  if (!items.length) return null;
  return (
    <div className=" flex items-center flex-wrap  h-[30px] pt-1 md:pt-0  md:h-[31px] overflow-hidden gap-y-36">
      <span className=" pr-4">Contributors:</span>
      {items.map((item, i: number) => {
        return (
          <TooltipComp key={i} duration={150} toolTipText={item.username}>
            {/* <Link
              to={!item.userId?.includes("-any") ? `/user/${item.userId}` : ""}
              className="  "
            > */}

            <Avatar
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(item.userId);
              }}
              className="w-6 h-6 md:w-7 md:h-7 border-2 border-white hover:z-30 hover:scale-110 transition-all -ml-[.6rem]"
            >
              <AvatarImage
                src={item.avatar || defaultProfilePicture}
                alt={item.username}
              />
              <AvatarFallback>Img</AvatarFallback>
            </Avatar>
            {/* </Link> */}
          </TooltipComp>
        );
      })}
    </div>
  );
};

export default PostCardContributors;
