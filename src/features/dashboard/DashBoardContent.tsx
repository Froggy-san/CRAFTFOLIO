import React from "react";
import DashBaordStats from "./DashBaordStats";

import UsersList from "./UsersList";
import DeleteAllPost from "../authentication/DeleteAllPost";

const DashBoardContent = ({ userId }: { userId: string }) => {
  return (
    <div className="h-full flex-1 space-y-12 overflow-y-auto px-3">
      {/* <Controls /> */}

      <DashBaordStats />
      <DeleteAllPost userId={userId} className="w-full" />
      <UsersList />
    </div>
  );
};

export default DashBoardContent;
