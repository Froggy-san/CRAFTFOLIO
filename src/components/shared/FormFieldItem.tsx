import React, { ReactElement, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// Define a generic type for the FormFieldItem component
const FormFieldItem = <TFieldValues extends FieldValues>({
  control,
  labelText,
  children,
  fieldName,
  className,
  description,
}: {
  fieldName: Path<TFieldValues>;
  control: Control<TFieldValues>;
  labelText: string;
  children: ReactElement;
  className?: string;
  description?: string;
}) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{labelText}</FormLabel>
          <FormControl>
            {React.cloneElement(children, { ...field })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldItem;
