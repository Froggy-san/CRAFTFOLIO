import React, {
  CSSProperties,
  FormEvent,
  ReactElement,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IoClose } from "react-icons/io5";
import { values } from "lodash";
import { publicUser } from "@/types/types";
import ContriburosPopover from "./ContriburosPopover";
import { defaultProfilePicture } from "@/utils/constants";
import { ClickAwayListener } from "@mui/material";
import { v6 as uuidv6 } from "uuid";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  onChange: React.Dispatch<SetStateAction<publicUser[]>>;
  contrbiutersTag: publicUser[];
  className?: string;
  style?: CSSProperties;
  children?: ReactElement;
}

// Example using uuid library

const ContributorsTags = ({
  onChange,
  contrbiutersTag,
  className,
  style,
  children,
}: TagInputProps) => {
  const [inputedValue, setInputedValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddTag(value: publicUser) {
    onChange([...contrbiutersTag, value]);
    setInputedValue("");
  }

  function handleRemovingTag(index: number) {
    // Create a shallow copy of the tags array
    const updatedTags = [...contrbiutersTag];
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    onChange(updatedTags); // Update the state with the modified array
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const trimmedValue = inputedValue.trim();
      if (trimmedValue) {
        handleAddTag({
          userId: uuidv6() + "-any",
          avatar: "",
          username: trimmedValue,
          email: "",
        });
      }
    }

    if (e.key === "Backspace" && !inputedValue) {
      e.preventDefault();
      const updatedTags = [...contrbiutersTag];
      updatedTags.pop();
      onChange(updatedTags);
    }
  }
  const handleFocus = useCallback(function handleFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <ClickAwayListener onClickAway={() => setInputedValue("")}>
      <div className=" w-full">
        <Card
          style={style}
          className={` flex items-center p-2 gap-1 flex-wrap w-full  ${
            className || ""
          }`}
        >
          {contrbiutersTag.length
            ? contrbiutersTag.map((tag: publicUser, i: number) => (
                <TagItem
                  key={i}
                  tag={tag}
                  removeFunction={() => handleRemovingTag(i)}
                />
              ))
            : null}

          <div className=" relative  min-w-[250px]">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter tools you use..."
              value={inputedValue}
              onChange={(e) => setInputedValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className=" h-7 focus:outline-none pl-3  w-full bg-background"
            />
            {inputedValue ? (
              <Badge className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex  text-foreground   show-tag">
                Enter
              </Badge>
            ) : null}
            <ContriburosPopover
              alreadyAddedTags={contrbiutersTag}
              handleAddTag={handleAddTag}
              handleFocus={handleFocus}
              inputedValue={inputedValue}
            />
          </div>
        </Card>
        {children}
      </div>
    </ClickAwayListener>
  );
};

function TagItem({
  tag,
  removeFunction,
}: {
  tag: publicUser;
  removeFunction: () => void;
}) {
  return (
    <div className=" border flex  justify-between items-center pl-2   max-w-[100%]   bg-secondary  hover:bg-secondary/90 transition-all  text-primary text-sm h-fit p-1 gap-1 rounded-md border-solid font-semibold  show-tag">
      <Avatar className=" h-7 w-7">
        <AvatarImage
          className=""
          src={tag.avatar || defaultProfilePicture}
          alt="image not found"
        />
        <AvatarFallback>image</AvatarFallback>
      </Avatar>
      <span className="pb-[1px]  flex-1 truncate">{tag.username}</span>{" "}
      <button type="button" className=" mt-1 p-1 h-fit mx-2">
        {" "}
        <IoClose onClick={removeFunction} size={15} />
      </button>
    </div>
  );
}

export default ContributorsTags;

/*
const ContributorsTags = ({
  onChange,
  contrbiutersTag,
  className,
  style,
  children,
}: TagInputProps) => {
  const [inputedValue, setInputedValue] = useState("");
  const [open, setOpen] = useState(false);
  const { publicUsers } = useSearchUser(inputedValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const users =
    publicUsers &&
    publicUsers.filter(
      (user) => !contrbiutersTag.some((tag) => tag.userId === user.userId)
    );
  function handleAddTag(value: publicUser) {
    onChange([...contrbiutersTag, value]);
    setInputedValue("");
  }

  function handleRemovingTag(index: number) {
    // Create a shallow copy of the tags array
    const updatedTags = [...contrbiutersTag];
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    onChange(updatedTags); // Update the state with the modified array
  }

  useEffect(() => {
    if (inputedValue.trim().length) {
      setOpen(true);
    } else setOpen(false);
  }, [inputedValue, open]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const trimmedValue = inputedValue.trim();
      if (trimmedValue) {
        handleAddTag({
          userId: uuidv6() + "-any",
          avatar: "",
          username: trimmedValue,
          email: "",
        });
      }
    }

    if (e.key === "Backspace" && !inputedValue) {
      e.preventDefault();
      const updatedTags = [...contrbiutersTag];
      updatedTags.pop();
      onChange(updatedTags);
    }
  }
  const handleFocus = useCallback(function handleFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <ClickAwayListener onClickAway={() => setInputedValue("")}>
      <div className=" w-full">
        <Card
          style={style}
          className={` flex items-center p-2 gap-1 flex-wrap w-full  ${
            className || ""
          }`}
        >
          {contrbiutersTag.length
            ? contrbiutersTag.map((tag: publicUser, i: number) => (
                <TagItem
                  key={i}
                  tag={tag}
                  removeFunction={() => handleRemovingTag(i)}
                />
              ))
            : null}
          <Command
            shouldFilter={false}
            className="rounded-lg  relative min-w-[250px]  max-w-[250px] flex-1    border-none shadow-md"
          >
            <div className=" relative  ">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter tools you use..."
                value={inputedValue}
                onChange={(e) => setInputedValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className=" h-7 focus:outline-none pl-3  w-full bg-background"
              />
              {inputedValue ? (
                <Badge className="pointer-events-none absolute right-[0.3rem] top-[0.3rem]  h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex  text-foreground   show-tag">
                  Enter
                </Badge>
              ) : null}
            </div>


            {users?.length ? (
              <Popover open={open}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className=" w-1   center-abslute invisible"
                  ></Button>
                </PopoverTrigger>
                <PopoverContent
                  onFocus={handleFocus} // to prevent the autoFocus feature in the popover.
                  className={`w-80 p-2   my-2  max-h-[40vh] overflow-y-auto  ${
                    className || ""
                  }`}
                >
                  <CommandList className="">
                    {users.map((user, i) => {
                      return (
                        <CommandItem
                          className="!px-2 !py-1.5"
                          onSelect={() => handleAddTag(user)}
                          onClick={() => handleAddTag(user)}
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
                          </li>
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </PopoverContent>
              </Popover>
            ) : null}
          </Command>
        </Card>
        {children}
      </div>
    </ClickAwayListener>
  );
};

*/
