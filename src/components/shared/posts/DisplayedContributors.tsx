import { publicUser } from "@/types/types";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipComp from "../TooltipComp";
import { defaultProfilePicture } from "@/utils/constants";
import { Link } from "react-router-dom";

const DisplayedContributors = ({
  contributors,
  className,
}: {
  contributors: publicUser[];
  className?: string;
}) => {
  return (
    <div
      className={` flex items-center flex-wrap  h-[25px] overflow-hidden gap-y-36  ${
        className || ""
      }`}
    >
      Contributors:
      {contributors.map((item, i) => (
        <div
          className="group  -ml-3 transition-all hover:z-10  transform-gpu"
          key={i}
          //   style={{ transform: `translateX(-${13 * i + 2}px)` }}
        >
          <TooltipComp duration={150} toolTipText={item.username}>
            <Link to={item.userId ? `/user/${item.userId}` : ""} className="  ">
              <Avatar className="w-6  h-6 border-2 border-white   group-hover:scale-110 transition-all">
                <AvatarImage
                  src={item.avatar || defaultProfilePicture}
                  alt={item.username}
                />
                <AvatarFallback>Img</AvatarFallback>
              </Avatar>
            </Link>
          </TooltipComp>
        </div>
      ))}
    </div>
  );
};

export default DisplayedContributors;
