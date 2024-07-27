import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Card } from "../ui/card";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import { buttonSize, variant } from "@/types/types";
import { BsSendFill } from "react-icons/bs";
import { Badge } from "../ui/badge";

interface TagsInputContextValues {
  onChange: React.Dispatch<SetStateAction<string[]>>;
  tags: string[];
  handleAddTag: (value: string) => void;
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}

const TagsInputContext = createContext<TagsInputContextValues>({
  onChange: () => {},
  tags: [],
  handleAddTag: () => {},
  value: "",
  setValue: () => {},
});
interface TagsInputProps {
  onChange: React.Dispatch<SetStateAction<string[]>>;
  tags: string[];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
const TagsInput = function ({ children, tags, onChange }: TagsInputProps) {
  const [value, setValue] = useState("");
  function handleAddTag(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onChange([...tags, trimmedValue]);
      setValue("");
    }
  }
  return (
    <TagsInputContext.Provider
      value={{ onChange, tags, handleAddTag, value, setValue }}
    >
      {children}
    </TagsInputContext.Provider>
  );
};

function TagsContainer({
  className,
  children,
  style,
  tagsStyles,
}: {
  className?: string;
  style?: CSSProperties;
  tagsStyles?: string;
  children?: ReactElement;
}) {
  const { onChange, tags } = useContext(TagsInputContext);
  function handleRemovingTag(index: number) {
    // Create a shallow copy of the tags array
    const updatedTags = [...tags];
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    onChange(updatedTags); // Update the state with the modified array
  }
  return (
    <Card
      style={style}
      className={` flex items-center p-2 gap-1 flex-wrap my-10 ${
        className || ""
      }`}
    >
      {tags.length
        ? tags.map((tag, i) => (
            <TagItem
              className={tagsStyles}
              key={i}
              tag={tag}
              removeFunction={() => handleRemovingTag(i)}
            />
          ))
        : null}
      {children}
    </Card>
  );
}

function TagItem({
  tag,
  removeFunction,
  className,
}: {
  className?: string;
  tag: string;
  removeFunction: () => void;
}) {
  return (
    <div
      className={`border flex  justify-between items-center pl-2   max-w-[100%]  bg-primary hover:bg-primary/90 text-primary-foreground  transition-all text-sm h-8 rounded-md border-solid font-semibold  show-tag ${
        className || ""
      }`}
    >
      <span className="pb-[1px]  flex-1 truncate">{tag}</span>{" "}
      <button type="button" className=" mt-1 p-1 h-fit mx-2">
        {" "}
        <IoClose onClick={removeFunction} size={15} />
      </button>
    </div>
  );
}

function TagsInputField({
  className,
  style,
  placeholder,
  type,
  ariaLabel,
}: {
  className?: string;
  placeholder?: string;
  type?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}) {
  const { value, setValue, handleAddTag } = useContext(TagsInputContext);
  // const [value, setValue] = useState("");
  // function handleAddTag(value: string) {
  //   onChange([...tags, value]);
  //   setValue("");
  // }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAddTag(value);
    }
  }
  return (
    <div className=" relative pl-3 bg-background  text-foreground   flex-1 min-w-[250px]  h-7">
      <input
        type={type || "text"}
        aria-label={ariaLabel}
        placeholder={placeholder || "Enter tools you use..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={style}
        className={` focus:outline-none w-full h-full bg-background pr-16  ${
          className || ""
        }`}
      />
      {value && (
        <Badge className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex  text-foreground   show-tag">
          Enter
        </Badge>
      )}
    </div>
  );
}

function SendBtn({
  className,
  style,
  variant,
  children,
  size,
}: {
  className?: string;
  style?: CSSProperties;
  variant?: variant;
  size?: buttonSize;
  children?: ReactElement;
}) {
  const { value, handleAddTag } = useContext(TagsInputContext);
  const isValue = value.trim().length; // checking if the user inputed any value in the input field

  return (
    <Button
      type="button"
      onClick={() => handleAddTag(value)}
      size={size || "sm"}
      style={style}
      className={`  transition-all   ${
        !isValue ? "opacity-0 invisible" : " opacity-100 visible"
      } ${className || ""}`}
      variant={variant || "default"}
    >
      {children || <BsSendFill size={20} />}
    </Button>
  );
}

export function useTagsInput() {
  const context = useContext(TagsInputContext);
  if (!context)
    throw new Error(`You have used the TagsContext outside the providor`);
  return context;
}

TagsInput.TagsContainer = TagsContainer;
TagsInput.TagsInputField = TagsInputField;
TagsInput.SendBtn = SendBtn;
export default TagsInput;
