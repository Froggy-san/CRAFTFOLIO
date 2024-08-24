import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userEssentialData } from "@/types/types";
import { defaultProfilePicture } from "@/utils/constants";
import React, { forwardRef, useEffect, useRef, useState } from "react";

const ContriburosPopover = forwardRef(
  (
    {
      users,
      selectedIndex,
      inputedValue,
      handleFocus,
      className,
      handleAddTag,
    }: {
      className?: string;
      selectedIndex: number;
      users: userEssentialData[];
      handleFocus: () => void;
      inputedValue: string;
      alreadyAddedTags: userEssentialData[];
      handleAddTag: (value: userEssentialData) => void;
    },
    ref?: React.Ref<HTMLUListElement>,
  ) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (inputedValue.trim().length) {
        setOpen(true);
      } else setOpen(false);
    }, [inputedValue, open]);

    return (
      <>
        {users?.length ? (
          <Popover open={open}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="center-abslute invisible w-1"
              ></Button>
            </PopoverTrigger>
            <PopoverContent
              onFocus={handleFocus} // to prevent the autoFocus feature in the popover.
              className={`my-2 max-h-[40vh] w-80 overflow-y-auto p-2 ${
                className || ""
              }`}
            >
              <ul ref={ref} className="space-y-2">
                {users.map((user, index) => {
                  return (
                    <li
                      onClick={() => handleAddTag(user)}
                      key={index}
                      className={`flex cursor-pointer items-center gap-3 rounded-md p-1 hover:bg-accent focus:bg-accent ${
                        selectedIndex === index && "bg-accent"
                      }`}
                    >
                      <Avatar>
                        <AvatarImage
                          className=""
                          src={user.avatar || defaultProfilePicture}
                          alt="image not found"
                        />
                        <AvatarFallback>image</AvatarFallback>
                      </Avatar>
                      <p className="truncate">{user.username}</p>
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>
        ) : null}
      </>
    );
  },
);
export default ContriburosPopover;

// import useSearchUser from "@/components/shared/headerSearchBar/useSearchUser";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import Menu from "@mui/joy/Menu";
// import MenuButton from "@mui/joy/MenuButton";
// import MenuItem from "@mui/joy/MenuItem";
// import Dropdown from "@mui/joy/Dropdown";

// import { useEffect, useState } from "react";

// const ContriburosPopover = ({
//   inputedValue,
//   className,
// }: {
//   className?: string;
//   inputedValue: string;
// }) => {
//   const [open, setOpen] = useState(false);
//   const { publicUsers, isLoading } = useSearchUser(inputedValue);

//   useEffect(() => {
//     if (inputedValue.trim().length) setOpen(true);
//     else setOpen(false);
//   }, [inputedValue]);

//   return (
//     <Popover open={open}>
//       <PopoverTrigger asChild>
//         <Button variant="outline">Open popover</Button>
//       </PopoverTrigger>
//       <PopoverContent
//         autoFocus={false}
//         className={`w-80 focus:bg-slate-700 ${className || ""}`}
//       >
//         <div>asadsasdads</div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default ContriburosPopover;
/**
     <ul
      className={`  bg-slate-100  absolute left-0 top-[120%]  z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none ${
        open
          ? "animate-in fade-in-0 zoom-in-95"
          : " animate-out fade-out-0  zoom-out-95 invisible z-[-22] duration-200 "
      } d  data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
    >
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>
 */
