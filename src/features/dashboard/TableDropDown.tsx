import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeVertical } from "react-icons/pi";
import IconButton from "@/components/shared/IconButton";

import { TbBan, TbEye, TbTrashFilled } from "react-icons/tb";

const TableDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" ml-3 p-0 w-7 h-7  " size="sm" variant="ghost">
          <PiDotsThreeVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-48  mr-10">
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <TbEye className="mr-2 h-4 w-4" />
            View profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <TbTrashFilled className="mr-2 h-4 w-4" /> Delete account
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <TbBan className="mr-2 h-4 w-4" /> Ban account
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropDown;
