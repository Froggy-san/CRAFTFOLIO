import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { publicUser } from "@/types/types";
import { defaultProfilePicture } from "@/utils/constants";
import React from "react";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  users: publicUser[];
  className?: string;
  closeDialogFn: () => void;
}

const SearchResults = ({
  users,
  className = "",
  closeDialogFn,
}: SearchResultsProps) => {
  return (
    <div
      className={`px-2   max-h-[300px]  overflow-x-hidden overflow-y-auto ${className}`}
    >
      <h1 className=" text-sm font-semibold ml-3 mb-2">Users</h1>
      <ul>
        {users.map((user) => (
          <li
            onClick={closeDialogFn}
            key={user.userId}
            className="  rounded-md hover:bg-slate-100"
          >
            <Link
              to={`/user/${user.userId}`}
              className=" w-full flex items-center px-3 py-2 gap-3"
            >
              <div className=" flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className=""
                    src={user.avatar || defaultProfilePicture}
                    alt="image not found"
                  />
                  <AvatarFallback>image</AvatarFallback>
                </Avatar>
                <p className="   max-w-[150px] truncate">{user.username}</p>
              </div>
              <p className=" flex-1 opacity-40 truncate text-right text-sm">
                {user.email}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
