import { Input } from "@/components/ui/input";
import React, { SetStateAction } from "react";
import { IoIosSearch } from "react-icons/io";
import IconButton from "../IconButton";
import { IoClose } from "react-icons/io5";

interface searchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
  closeDiaFn?: () => void;
  className?: string;
}

const SearchBar = ({
  className = "",
  searchTerm,
  closeDiaFn,
  setSearchTerm,
}: searchBarProps) => {
  return (
    <div
      className={`relative ${className} flex  w-full items-center border-b px-3 z-50 bg-background`}
    >
      <IoIosSearch className=" mr-2 opacity-50 mt-1" size={20} />
      <input
        autoFocus
        className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  "
        value={searchTerm}
        type="text"
        placeholder="Search for people..."
        onChange={(e) => setSearchTerm(e.target.value)}
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
};

export default SearchBar;
