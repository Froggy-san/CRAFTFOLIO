import { Button } from "@/components/ui/button";
import DeleteUserAlert from "../dashboard/DeleteUserDialog";
import AlertDrawer from "./AlertDrawer";
import { useState } from "react";

const DeleteAllPost = ({
  userId,
  className = "",
}: {
  userId: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col  xs:flex-row gap-y-6 items-center justify-between rounded-lg border p-4 w-[90%] mx-auto mb-3 ${className}`}
    >
      <div className="space-y-0.5 text-center xs:text-left  w-full xs:w-fit">
        <div className="text-base font-semibold">Delete all of your posts</div>
        <div>Remove all posts on your account.</div>
      </div>
      <div className=" w-full xs:w-fit">
        <AlertDrawer userId={userId} />
      </div>
    </div>
  );
};

export default DeleteAllPost;
