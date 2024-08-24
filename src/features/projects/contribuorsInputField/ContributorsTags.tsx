import React, {
  CSSProperties,
  ReactElement,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { Card } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IoClose } from "react-icons/io5";
import { userEssentialData } from "@/types/types";
import ContriburosPopover from "./ContriburosPopover";
import { defaultProfilePicture } from "@/utils/constants";
import { ClickAwayListener } from "@mui/material";
import { v6 as uuidv6 } from "uuid";
import { Badge } from "@/components/ui/badge";
import useSearchUser from "@/components/shared/headerSearchBar/useSearchUser";
import { useAuth } from "@/hooks/useAuth";

interface TagInputProps {
  onChange: React.Dispatch<SetStateAction<userEssentialData[]>>;
  contrbiutersTag: userEssentialData[];
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
  const { user: { id } = {} } = useAuth();
  const [inputedValue, setInputedValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { publicUsers } = useSearchUser(inputedValue);

  const users = publicUsers
    ? publicUsers.filter(
        (user) =>
          !contrbiutersTag.some((tag) => tag.userId === user.userId) &&
          user.userId !== id,
      )
    : [];

  function handleAddTag(value: userEssentialData) {
    onChange([...contrbiutersTag, value]);
    setInputedValue("");
    setSelectedIndex(-1);
  }

  function handleRemovingTag(index: number) {
    // Create a shallow copy of the tags array
    const updatedTags = [...contrbiutersTag];
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    onChange(updatedTags); // Update the state with the modified array
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = e;
    const listLength = users.length;
    const isSelected = selectedIndex >= 0; // Checking if it is greater or equal 0 because the selection starts at 0.

    if (key === "ArrowDown") {
      e.preventDefault();
      if (selectedIndex < listLength - 1) {
        setSelectedIndex((prev) => prev + 1);
        // (listRef.current!.children[selectedIndex + 1] as HTMLLIElement).focus();
      } else {
        setSelectedIndex(-1); // If the user keeps clicking the arrow down key after reaching the last item, we reset the selectedIndex so we enable them to go through the list again.
      }
    } else if (key === "ArrowUp") {
      e.preventDefault();
      if (selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
        // (listRef.current!.children[selectedIndex - 1] as HTMLLIElement).focus();
      } else {
        setSelectedIndex(listLength); // If the user keeps clicking the arrow up key after reaching the first item, we set the selectedIndex to the lengh of the results so they can go through the list from the other direction.
      }
    }

    if (key === "Enter") {
      e.preventDefault();
      // Adding a tag in the case where the user presses the Enter key while selecting an item.
      if (isSelected) {
        handleAddTag(users[selectedIndex]);
      }
      // If the user doesn't select an item, a tag is added with a random ID and the '-any' suffix to distinguish it from existing user tags in the database.
      const trimmedValue = inputedValue.trim();
      if (!isSelected && trimmedValue) {
        handleAddTag({
          userId: uuidv6() + "-any",
          avatar: "",
          username: trimmedValue,
          email: "",
        });
      }
    }

    // Deleting the tags if the user doesn't have any text inputed inside the input field.

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
      <div className="w-full">
        <Card
          style={style}
          className={`flex w-full flex-wrap items-center gap-1 p-2 ${
            className || ""
          }`}
        >
          {contrbiutersTag.length
            ? contrbiutersTag.map((tag: userEssentialData, i: number) => (
                <TagItem
                  key={i}
                  tag={tag}
                  removeFunction={() => handleRemovingTag(i)}
                />
              ))
            : null}

          <div className="relative min-w-[250px]">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or add a user's name ..."
              value={inputedValue}
              onChange={(e) => {
                if (selectedIndex > -1) setSelectedIndex(-1);
                setInputedValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="h-7 w-full bg-background pl-3 focus:outline-none"
            />
            {inputedValue ? (
              <Badge className="show-tag pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground opacity-100 sm:flex">
                Enter
              </Badge>
            ) : null}
            <ContriburosPopover
              selectedIndex={selectedIndex}
              ref={listRef}
              users={users || []}
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
  tag: userEssentialData;
  removeFunction: () => void;
}) {
  return (
    <div className="show-tag flex h-fit max-w-[100%] items-center justify-between gap-1 rounded-md border border-solid bg-secondary p-1 pl-2 text-sm font-semibold text-primary transition-all hover:bg-secondary/90">
      <Avatar className="h-7 w-7">
        <AvatarImage
          className=""
          src={tag.avatar || defaultProfilePicture}
          alt="image not found"
        />
        <AvatarFallback>image</AvatarFallback>
      </Avatar>
      <span className="flex-1 truncate pb-[1px]">{tag.username}</span>{" "}
      <button type="button" className="mx-2 mt-1 h-fit p-1">
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
