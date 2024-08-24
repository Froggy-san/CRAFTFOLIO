import ImageView from "@/components/shared/ImageView";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types/types";
import { defaultProfilePicture } from "@/utils/constants";
import { calcHowManyDaysAgo } from "@/utils/helper";
import { useState } from "react";

import Loading from "@/components/shared/Loading";
import { format } from "date-fns";
import useGetStats from "../projects/useGetStats";

const UserOverview = ({ user }: { user: User | undefined }) => {
  const { isLoading, count } = useGetStats(user?.id || "");
  const [viewedImage, setViewedImage] = useState<string | null>(null);
  const image = user?.avatar || defaultProfilePicture;
  const date = user ? format(new Date(user.created_at), "LLLL/dd/yyyy") : "";
  const timePassed = calcHowManyDaysAgo(user ? user.created_at : "");
  return (
    <Card className="mx-auto my-4 flex w-full gap-2 p-5 lg:max-w-[70%]">
      <div className="flex-1 space-y-1 text-xs sm:text-base">
        <h1 aria-label="user setting" className="text-xl font-semibold">
          User settings
        </h1>
        <p aria-label="email address">{user?.email}</p>

        <p aria-label="the date the user created the account">
          {`Joined Craftfolio on ${date} (${timePassed})`}
        </p>
        <div className="flex gap-1">
          Created {isLoading ? <Loading /> : count || 0} proejcts.
        </div>
      </div>

      <Avatar
        onClick={() => setViewedImage(image)}
        className="transition-grayscale h-32 w-32 cursor-pointer duration-200 hover:grayscale-[10%] sm:h-48 sm:w-48"
      >
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>image</AvatarFallback>
      </Avatar>
      <ImageView image={viewedImage} handleClose={() => setViewedImage(null)} />
    </Card>
  );
};

export default UserOverview;
