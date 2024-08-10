import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from "@/components/ui/command";
import React, { useCallback, useState } from "react";
import useSearchUser from "./useSearchUser";
import useDebounce from "@/hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";
import { defaultProfilePicture } from "@/utils/constants";
import { publicUser } from "@/types/types";
import SearchBar from "./SearchBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SearchPopoverRewrite = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debouncedValue = useDebounce(searchTerm, 150);
  const { isLoading, publicUsers, error } = useSearchUser(debouncedValue);

  const navigate = useNavigate();
  const handleClickAndSelect = useCallback((publicUser: publicUser) => {
    setOpen(false);
    navigate(`/user/${publicUser.userId}`);
  }, []);

  return (
    // <CommandDialog open={open} onOpenChange={setOpen}>

    // </CommandDialog>
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="p-0  border  overflow-hidden ">
        <Command
          shouldFilter={false}
          className="rounded-lg border-none shadow-md"
        >
          {/* <CommandInput
      value={searchTerm}
      onValueChange={setSearchTerm}
      placeholder="Type a command or search..."
    /> */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CommandList>
            <CommandEmpty className=" pt-6 pb-9 px-4 text-center">
              {error
                ? `${error.message}`
                : !searchTerm
                ? "Start searching"
                : `No results found for "${searchTerm}"`}
            </CommandEmpty>
            {publicUsers?.length ? (
              <CommandGroup heading="Users">
                {publicUsers.map((user, i) => {
                  return (
                    <CommandItem
                      className="!px-2 !py-1.5  "
                      onSelect={() => handleClickAndSelect(user)}
                      onClick={() => handleClickAndSelect(user)}
                      key={i}
                      value={user.userId}
                    >
                      <li className=" flex  text-sm items-center w-full gap-3">
                        <div className=" flex items-center gap-2 min-w-[150px] max-w-[250px]">
                          <Avatar>
                            <AvatarImage
                              className=" object-cover"
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
                      </li>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            <CommandSeparator />
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchPopoverRewrite;
