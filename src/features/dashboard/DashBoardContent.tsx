import React from "react";
import DashBaordStats from "./DashBaordStats";
import Heading from "@/components/shared/Heading";
import Controls from "./Controls";
import UsersList from "./UsersList";
import DeleteAllPost from "../authentication/DeleteAllPost";
import { useAuth } from "@/hooks/useAuth";
import { FlipText } from "@/components/shared/Zoop";

const DashBoardContent = ({ userId }: { userId: string }) => {
  return (
    <div className=" flex-1  px-3 h-full overflow-y-auto space-y-12">
      {/* <Controls /> */}

      <DashBaordStats />
      <DeleteAllPost userId={userId} className=" w-full " />
      <UsersList />
    </div>
  );
};

export default DashBoardContent;
