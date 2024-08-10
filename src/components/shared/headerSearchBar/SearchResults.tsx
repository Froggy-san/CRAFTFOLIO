import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { publicUser } from "@/types/types";
import { defaultProfilePicture } from "@/utils/constants";
import React, { forwardRef, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  users: publicUser[];
  className?: string;
  selecedIndex: number;
  closeDialogFn: () => void;
}

const SearchResults = forwardRef(
  (
    { users, className = "", closeDialogFn, selecedIndex }: SearchResultsProps,
    ref?: React.Ref<HTMLUListElement>
  ) => {
    return (
      // <div
      //   onKeyDown={handleKeyDown}
      //   className={`px-2  w-full  max-h-[300px] mt-2 overflow-x-hidden overflow-y-auto ${className}`}
      // >
      //   <h1 className=" text-sm font-semibold ml-3 mb-2">Users</h1>
      // <ul ref={ref}>
      <>
        {users.map((user, i) => (
          // <li
          //   onClick={closeDialogFn}
          //   key={user.userId}
          //   className={` relative focus:bg-red-500 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
          //     selecedIndex === i && " border border-zinc-100"
          //   }`}
          // >
          <Link
            key={i}
            to={`/user/${user.userId}`}
            className={` w-fullgap-3 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
              selecedIndex === i && " bg-accent  text-accent-foreground"
            }`}
          >
            <div className=" flex items-center gap-2 min-w-[150px] max-w-[250px]">
              <Avatar>
                <AvatarImage
                  className=""
                  src={user.avatar || defaultProfilePicture}
                  alt="image not found"
                />
                <AvatarFallback>image</AvatarFallback>
              </Avatar>
              <p className="    truncate">{user.username}</p>
            </div>
            <p className=" flex-1 opacity-40 truncate text-right text-sm">
              {user.email}
            </p>
          </Link>
          // </li>
        ))}
        {/* </ul> */}
      </>
      // </div>
    );
  }
);

export default SearchResults;
