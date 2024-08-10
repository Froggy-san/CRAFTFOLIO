import React, { SetStateAction, useEffect, useRef, useState } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoading, publicUsers, error } = useSearchUser(searchTerm);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyNavigaiton = (e: React.KeyboardEvent) => {
    const { key } = e;
    const listLength = publicUsers?.length || 0;

    if (key === "ArrowDown" && selectedIndex < listLength - 1) {
      setSelectedIndex((prev) => prev + 1);
      // Cast the element to HTMLElement to ensure focus is available
      (listRef.current!.children[selectedIndex + 1] as HTMLLIElement).focus();
    } else if (key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
      (listRef.current!.children[selectedIndex - 1] as HTMLLIElement).focus();
    }
  };
  useEffect(() => {
    // function to open the dialog open when the controlkey or the command key in macbooks + K key.
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault(); // Prevent default browser behavior
        onOpenChange((open) => !open);
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
      <DialogContent className="p-0 pb-3 border  overflow-hidden ">
        <div className=" w-full overflow-hidden h-full">
          <SearchBar
            selectedIndex={selectedIndex}
            setSelected={setSelectedIndex}
            ref={searchInputRef}
            onKeyDown={handleKeyNavigaiton}
            closeDiaFn={() => onOpenChange(false)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {publicUsers?.length ? (
            <div
              className={`px-2  w-full  max-h-[300px] mt-2 overflow-x-hidden overflow-y-auto `}
            >
              <h1 className=" text-sm font-semibold ml-3 mb-2">Users</h1>
              <ul
                onKeyDown={(e) => {
                  handleKeyNavigaiton(e);
                  searchInputRef.current?.focus();
                }}
                ref={listRef}
              >
                <SearchResults
                  selecedIndex={selectedIndex}
                  closeDialogFn={() => onOpenChange(false)}
                  users={publicUsers}
                />
              </ul>
            </div>
          ) : error ? (
            <p className=" text-center  py-6 truncate px-4 w-full">
              Something went wrong!
            </p>
          ) : searchTerm && !publicUsers?.length ? (
            <p className=" text-center  py-6 truncate px-4 w-full">
              No results for "{searchTerm}"
            </p>
          ) : (
            <p className=" text-center  py-6 truncate px-4 w-full">
              Start searching
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchPopover;
