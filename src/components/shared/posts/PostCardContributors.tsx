import { userEssentialData } from "@/types/types";
import React from "react";
import { AnimatedTooltip } from "../AnimatedTooltops";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultProfilePicture } from "@/utils/constants";
import TooltipComp from "../TooltipComp";

const PostCardContributors = ({ items }: { items: userEssentialData[] }) => {
  const navigate = useNavigate();
  function handleNavigate(id: string) {
    if (!id.includes("-any")) navigate(`/user/${id}`);
  }

  if (!items.length) return null;
  return (
    <div className="flex h-[30px] flex-wrap items-center gap-y-36 overflow-hidden pt-1 md:h-[31px] md:pt-0">
      <span className="pr-4">Contributors:</span>
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
              className="-ml-[.6rem] h-6 w-6 border-2 border-white transition-all hover:z-30 hover:scale-110 md:h-7 md:w-7"
            >
              <AvatarImage
                src={item.avatar || defaultProfilePicture}
                onError={(e) => {
                  e.currentTarget.src = defaultProfilePicture;
                }}
                alt={item.username}
              />
              <AvatarFallback>
                <img src={defaultProfilePicture} alt="User Avatar" />
              </AvatarFallback>
            </Avatar>
            {/* </Link> */}
          </TooltipComp>
        );
      })}
    </div>
  );
};

export default PostCardContributors;
