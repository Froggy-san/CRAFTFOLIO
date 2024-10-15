import React, { isValidElement } from "react";
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link, useLocation, useSearchParams } from "react-router-dom";
import useSetParams from "@/hooks/useSetParams";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { UserTagProps } from "@/types/types";
import { HiOutlinePlus } from "react-icons/hi";

interface Option {
  value: string;
  link?: string;
  label: string | JSX.Element;
}

interface SelectProps {
  paramName: string;
  options: Option[];
  selectPlaceholer?: string;
  className?: string;
  disabled?: boolean;
}

const SelectComp = ({
  paramName,
  options,
  selectPlaceholer,
  className,
  disabled = false,
}: SelectProps) => {
  const [searchParams] = useSearchParams();
  const selectedValue = searchParams.get("sort") || "";
  const url = useLocation();
  const setParam = useSetParams();

  const doesTheUrlHasTheSortProp = url.search.includes("sort"); // Because we don't want the sort results to stack over each other to not make the user press the back button in the browser multiple time to navigate to the previous page.
  return (
    <div>
      <Select
        disabled={disabled}
        value={selectedValue}
        onValueChange={(value) =>
          setParam(paramName, value, doesTheUrlHasTheSortProp)
        }
      >
        <SelectTrigger className={`hidden w-[280px] sm:flex ${className}`}>
          <SelectValue placeholder={selectPlaceholer || "Select"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, i) =>
            !option.value ? null : (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>

      {/*----------------------------------------*/}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={disabled}
            variant="ghost"
            className="h-8 w-8 rounded-md p-0 sm:hidden"
          >
            <IoIosMore size={22} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 w-56 sm:hidden">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((option, i) => {
            if (option.link) {
              return (
                <React.Fragment key={i}>
                  <DropdownMenuSeparator />
                  <Link to={option.link}>
                    <DropdownMenuItem>
                      {isValidElement(option.label) ? (
                        option.label
                      ) : (
                        <span className="truncate">{option.label}</span>
                      )}
                    </DropdownMenuItem>
                  </Link>
                </React.Fragment>
              );
            } else {
              return (
                <DropdownMenuItem
                  key={i}
                  onClick={() =>
                    setParam("sort", option.value, doesTheUrlHasTheSortProp)
                  }
                  disabled={selectedValue === option.value || disabled}
                >
                  {isValidElement(option.label) ? (
                    option.label
                  ) : (
                    <span className="truncate">{option.label}</span>
                  )}

                  {selectedValue === option.value ? (
                    <DropdownMenuShortcut key={i}>
                      <IoIosCheckmark size={20} />
                    </DropdownMenuShortcut>
                  ) : null}
                </DropdownMenuItem>
              );
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectComp;
