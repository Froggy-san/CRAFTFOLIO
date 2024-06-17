import React, { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { IoIosSearch } from "react-icons/io";
import SearchBar from "./SearchBar";
import useSearchUser from "./useSearchUser";
import SearchResults from "./SearchResults";

interface searchPopoverProps {
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
}

const SearchPopover = ({ open, onOpenChange }: searchPopoverProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, publicUsers, error } = useSearchUser(searchTerm);
  useEffect(() => {
    // function to open the dialog open when the controlkey or the command key in macbooks + K key.
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault(); // Prevent default browser behavior
        onOpenChange(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="p-0 pb-3 border overflow-hidden ">
        <DialogHeader>
          {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}

          <SearchBar
            closeDiaFn={() => onOpenChange(false)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </DialogHeader>
        {publicUsers?.length ? (
          <SearchResults
            closeDialogFn={() => onOpenChange(false)}
            users={publicUsers}
          />
        ) : error ? (
          <p className=" text-center">Something went wrong!</p>
        ) : searchTerm && !publicUsers?.length ? (
          <p className=" text-center  truncate px-4 w-full">
            No results for "{searchTerm}"
          </p>
        ) : (
          <p className=" text-center">Start searching</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchPopover;