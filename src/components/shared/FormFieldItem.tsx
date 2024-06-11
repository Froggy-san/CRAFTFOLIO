import React, { ReactElement, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// Define a generic type for the FormFieldItem component
const FormFieldItem = <TFieldValues extends FieldValues>({
  control,
  labelText,
  children,
  fieldName,
}: {
  fieldName: Path<TFieldValues>;
  control: Control<TFieldValues>;
  labelText: string;
  children: ReactElement;
}) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <FormControl>
            {React.cloneElement(children, { ...field })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldItem;
