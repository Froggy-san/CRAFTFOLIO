import { Input } from "@/components/ui/input";
import React, { forwardRef, SetStateAction } from "react";
import { IoIosSearch } from "react-icons/io";
import IconButton from "../IconButton";
import { IoClose } from "react-icons/io5";

interface searchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
  closeDiaFn?: () => void;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setSelected?: React.Dispatch<React.SetStateAction<number>>;
  selectedIndex?: number;
}

const SearchBar = forwardRef(
  (
    {
      className = "",
      searchTerm,
      setSelected,
      selectedIndex,
      closeDiaFn,
      onKeyDown,
      setSearchTerm,
    }: searchBarProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div
        className={`relative ${className} flex  w-full items-center border-b px-3 z-50 bg-background`}
      >
        <IoIosSearch className=" mr-2 opacity-50 mt-1" size={20} />
        <input
          ref={ref}
          autoFocus
          onKeyDown={onKeyDown}
          className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  "
          value={searchTerm}
          type="text"
          placeholder="Search for people..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // if (selectedIndex > 0) setSelected(0);
          }}
        />
        {/* <IconButton
        onClick={closeDiaFn}
        variant="link"
        className=" hover:opacity-80 duration-200"
      >
        <IoClose size={17} />
      </IconButton> */}
      </div>
    );
  }
);

export default SearchBar;
