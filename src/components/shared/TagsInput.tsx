import React, { FormEvent, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { IoClose } from "react-icons/io5";
import { values } from "lodash";

interface TagInputProps {
  onChange: React.Dispatch<SetStateAction<string[]>>;
  tags: string[];
  className?: string;
}

const TagsInput = ({ onChange, tags }: TagInputProps) => {
  const [formValue, setFormValue] = useState("");

  function handleAddTag(value: string) {
    onChange([...tags, value]);
  }

  function handleRemovingTag(index: number) {
    // Create a shallow copy of the tags array
    const updatedTags = [...tags];
    updatedTags.splice(index, 1); // Remove the tag at the specified index
    onChange(updatedTags); // Update the state with the modified array
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const trimmedValue = formValue.trim();
      if (trimmedValue) {
        handleAddTag(trimmedValue);
        setFormValue("");
      }
    }
  }

  return (
    <Card className=" flex items-center p-2 gap-1 flex-wrap my-10">
      {tags.length
        ? tags.map((tag, i) => (
            <TagItem
              key={i}
              tag={tag}
              removeFunction={() => handleRemovingTag(i)}
            />
          ))
        : null}

      <input
        type="text"
        placeholder="Enter tools you use..."
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className=" h-7 focus:outline-none pl-3 flex-1 min-w-[250px]"
      />
    </Card>
  );
};

function TagItem({
  tag,
  removeFunction,
}: {
  tag: string;
  removeFunction: () => void;
}) {
  return (
    <span className=" border flex  justify-between items-center pl-2  w-fit  max-w-[100%]  bg-primary hover:bg-primary/90 transition-all text-[#fafafa] text-sm h-8 rounded-md border-solid cursor-default  font-semibold  show-tag">
      <div className="pb-[1px]  truncate">{tag}</div>{" "}
      <button type="button" className=" mt-1 p-1 h-fit mx-2">
        {" "}
        <IoClose onClick={removeFunction} size={15} />
      </button>
    </span>
  );
}

export default TagsInput;
