import ImageView from "@/components/shared/ImageView";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types/types";
import { defaultProfilePicture } from "@/utils/constants";
import { calcHowManyDaysAgo } from "@/utils/helper";

import React, { useState } from "react";
import useGetNumOfProjects from "../projects/useGetNumOfProjects";
import Loading from "@/components/shared/Loading";

const UserOverview = ({ user }: { user: User | undefined }) => {
  const { isLoading, count } = useGetNumOfProjects(user?.id || "");

  console.log(user, "user from over view for testing ?");

  console.log(count, "count");
  const [viewedImage, setViewedImage] = useState<string | null>(null);
  const image = user?.avatar || defaultProfilePicture;
  return (
    <Card className=" flex  p-5 my-4 w-full lg:max-w-[70%] mx-auto gap-2">
      <div className=" space-y-1 flex-1">
        <h1 aria-label="user setting" className=" text-xl font-semibold">
          User settings
        </h1>
        <p aria-label="email address">{user?.email}</p>
        <p aria-label="email address">{user?.username}</p>

        <p aria-label="the date the user created the account">{`Joined Craftfolio on ${
          user?.created_at
        } (${calcHowManyDaysAgo(user?.created_at || "")})`}</p>
        <div className=" flex gap-1">
          Created {isLoading ? <Loading /> : count || 0} proejcts.
        </div>
      </div>

      <Avatar
        onClick={() => setViewedImage(image)}
        className=" w-32 h-32 sm:w-48 sm:h-48 cursor-pointer"
      >
        <AvatarImage src={image} className=" object-cover" />
        <AvatarFallback>image</AvatarFallback>
      </Avatar>
      <ImageView image={viewedImage} handleClose={() => setViewedImage(null)} />
    </Card>
  );
};

export default UserOverview;
