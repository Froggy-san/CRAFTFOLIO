import ImageView from "@/components/shared/ImageView";
import TooltipComp from "@/components/shared/TooltipComp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/types";
import { calcHowManyDaysAgo } from "@/utils/helper";
import { format } from "date-fns";
import React, { useState } from "react";
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
  const [viewedImage, setViewedImage] = useState<string | null>(null);

  return (
    <div className="flex gap-2">
      <Avatar
        onClick={() => setViewedImage(poster.avatar)}
        className="h-12 w-12 cursor-pointer transition-all duration-200 hover:opacity-95 hover:grayscale-[15%]"
      >
        <AvatarImage
          src={poster.avatar}
          alt={poster.email}
          className="object-cover"
        />
        <AvatarFallback>{poster.email}</AvatarFallback>
      </Avatar>
      <Link
        to={`/user/${poster.userId}`}
        className={`flex flex-1 gap-2 ${className || ""}`}
      >
        <div>
          <TooltipComp toolTipText={poster.username}>
            <p className="line-clamp-1 text-lg font-semibold tracking-wide">
              {poster.username}
            </p>
          </TooltipComp>
          <TooltipComp toolTipText={`Posted: ${calcHowManyDaysAgo(postDate)}`}>
            <p className="w-fit text-xs text-foreground/60">
              {format(new Date(postDate), "LLLL/dd/yyyy")}
            </p>
          </TooltipComp>
        </div>
      </Link>
      <ImageView image={viewedImage} handleClose={() => setViewedImage(null)} />
    </div>
  );
};

export default PosterInfo;
