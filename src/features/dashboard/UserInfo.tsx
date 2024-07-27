import { useAuth } from "@/hooks/useAuth";
import React from "react";
import UserImg from "./UserImg";
import { format } from "date-fns";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="  w-[200px]">
      <div className=" text-center">
        <UserImg avatar={user.avatar} className=" mx-auto mt-2" />
        <p>{user.username}</p>
        <p className=" text-xs  text-foreground/50">
          Joined: {format(new Date(user.created_at), "LLLL/dd/yyyy")}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
