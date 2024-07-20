import TooltipComp from "@/components/shared/TooltipComp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/types";
import { calcHowManyDaysAgo } from "@/utils/helper";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const PosterInfo = ({
  poster,
  postDate,
  className,
}: {
  poster: User;
  postDate: string;
  className?: string;
}) => {
  return (
    <Link
      to={`/user/${poster.userId}`}
      className={`flex flex-1 gap-2 ${className || ""}`}
    >
      <Avatar className=" w-12 h-12">
        <AvatarImage src={poster.avatar} alt={poster.email} />
        <AvatarFallback>{poster.email}</AvatarFallback>
      </Avatar>
      <div>
        <TooltipComp toolTipText={poster.username}>
          <p className=" line-clamp-1 text-lg font-semibold tracking-wide">
            {poster.username}
          </p>
        </TooltipComp>
        <TooltipComp toolTipText={`${calcHowManyDaysAgo(postDate)}`}>
          <p className=" text-xs text-foreground/60">
            {format(new Date(postDate), "LLLL/dd/yyyy")}
          </p>
        </TooltipComp>
      </div>
    </Link>
  );
};

export default PosterInfo;
