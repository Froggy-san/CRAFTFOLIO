import { useAuth } from "@/hooks/useAuth";
import React from "react";
import UserImg from "./UserImg";
import { format } from "date-fns";
import AddAdminAcc from "./AddAdminAcc";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full pb-3 md:w-[200px]">
      <div className="mt-2 flex flex-row justify-center gap-x-4 xs:items-center md:flex-col">
        <UserImg avatar={user.avatar} className=" " />
        <div className="text-center">
          <p className="break-all">{user.username}</p>
          <p className="text-xs text-foreground/50">
            Joined: {format(new Date(user.created_at), "LLLL/dd/yyyy")}
          </p>
          {user.role === "admin" && <AddAdminAcc />}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
