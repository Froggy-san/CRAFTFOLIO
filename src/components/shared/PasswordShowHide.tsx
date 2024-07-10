import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import IconButton from "./IconButton";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
const PasswordShowHide = <TFieldValues extends FieldValues>({
  control,
  labelText,
  disabled,
  fieldName,
  className,
  description,
  onChange,
  show,
}: {
  fieldName: Path<TFieldValues>;
  control: Control<TFieldValues>;
  labelText: string;
  disabled?: boolean;
  className?: string;
  description?: string;
  onChange?: React.Dispatch<SetStateAction<boolean>>;
  show?: boolean;
}) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const handleHideAndShow = useCallback(function () {
    if (onChange) {
      onChange((is) => !is);
    } else {
      setIsShowPass((is) => !is);
    }
  }, []);

  return (
    <>
      {(show ? !show : !isShowPass) ? (
        <FormField
          control={control}
          name={fieldName}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>{labelText}</FormLabel>
              <FormControl>
                <div className=" relative ">
                  <Input
                    className=" pr-10"
                    disabled={disabled}
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                  <IconButton
                    type="button"
                    ariaLabel="show password"
                    variant="outline"
                    className="  absolute right-3 top-1/2 translate-y-[-50%]"
                    onClick={handleHideAndShow}
                  >
                    <RiEyeFill size={20} />
                  </IconButton>
                </div>
              </FormControl>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={control}
          name={fieldName}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>{labelText}</FormLabel>
              <FormControl>
                <div className=" relative ">
                  <Input
                    className=" pr-10"
                    disabled={disabled}
                    type="text"
                    placeholder="Password"
                    {...field}
                  />
                  <IconButton
                    type="button"
                    ariaLabel=" hide password"
                    variant="outline"
                    className="  absolute right-3 top-1/2 translate-y-[-50%]"
                    onClick={handleHideAndShow}
                  >
                    <RiEyeCloseFill size={20} />
                  </IconButton>
                </div>
              </FormControl>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default PasswordShowHide;
