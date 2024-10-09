import React, { useState } from "react";
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

import { TbBan, TbEye, TbTrashFilled } from "react-icons/tb";

import { Link } from "react-router-dom";

import DeleteUserAlert from "./DeleteUserDialog";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const TableDropDown = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-3 h-7 w-7 p-0" size="sm" variant="ghost">
            <PiDotsThreeVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10 w-48">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <Link to={`/user/${id}`}>
              <DropdownMenuItem>
                <TbEye className="mr-2 h-4 w-4" />
                View profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              disabled={user?.role !== "admin"}
              onClick={() => {
                if (user?.role !== "admin")
                  return toast.error(
                    "You are not authorized to do this action.",
                  );

                setOpen(true);
              }}
            >
              {" "}
              <TbTrashFilled className="mr-2 h-4 w-4" /> Delete account
            </DropdownMenuItem>
            <DropdownMenuItem disabled={user?.role !== "admin"}>
              {" "}
              <TbBan className="mr-2 h-4 w-4" /> Ban account
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteUserAlert userId={id} open={open} setOpen={setOpen} />
    </>
  );
};

export default TableDropDown;
