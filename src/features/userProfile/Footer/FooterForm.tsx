("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TbPhotoEdit } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/shared/Avatar";

import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import React, { Ref, SetStateAction, useEffect, useRef, useState } from "react";
import {
  EditUserFooterProps,
  landingProps,
  UserFooterProps,
} from "@/types/types";

import IconButton from "@/components/shared/IconButton";
import _ from "lodash";
import useObjectCompare from "@/hooks/useCompareObjects";
import FormFieldItem from "@/components/shared/FormFieldItem";
import useCreateUserFooter from "./useCreateFooter";
import useEditUserFooter from "./useEditUserFooter";

// import TagsInput from "@/components/shared/TagsInput";
const FooterSchema = z.object({
  heading: z.string(),
  additionalText: z.string(),
  emailBtnText: z.string(),
  copyText: z.string(),
});

type FooterSchemaTypes = z.infer<typeof FooterSchema>;

const FooterForm = React.forwardRef(function (
  {
    setOpen,
    footerData,
    setHasTheFormDataChanged,
  }: {
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    footerData?: UserFooterProps;
    setHasTheFormDataChanged?: React.Dispatch<SetStateAction<boolean>>;
  },
  ref?: Ref<HTMLFormElement>
) {
  const { user } = useAuth();
  const { isLoading, createFooter } = useCreateUserFooter();
  const { isLoading: isEditting, editFooter } = useEditUserFooter();
  const defaultValues = {
    heading: footerData?.heading || "",
    additionalText: footerData?.additionalText || "",
    emailBtnText: footerData?.emailBtnText || "",
    copyText: footerData?.copyText || "",
  };

  const form = useForm<FooterSchemaTypes>({
    resolver: zodResolver(FooterSchema),
    defaultValues, // defaultValues:{...defualtValues (the one we defined up there)}
  });

  // Check if the user changed anything about the landing page's data, to prevent any unnecessary api calls.
  const isEqual = useObjectCompare(form.getValues(), defaultValues);

  useEffect(() => {
    setHasTheFormDataChanged?.(isEqual);
  }, [isEqual]);
  // everytime the ladningToEdit data change change rest the value in the form's input fields.

  //   useEffect(() => {
  //     form.reset({
  //       ...defaultValues,
  //     });
  //   }, [landingToEdit, form]);

  //   useEffect(() => {
  //     const handleBackButton = (event: PopStateEvent) => {
  //       if (isOpen) {
  //         event.preventDefault();
  //         handleClose(); // Set isOpen to false explicitly
  //       }
  //     };

  //     window.addEventListener("popstate", handleBackButton);
  //     return () => window.removeEventListener("popstate", handleBackButton);
  //   }, [isOpen]);

  //   function handleClose() {
  //     setIsOpen((is) => !is);
  //     form.reset();
  //   }

  function onSubmit(values: FooterSchemaTypes) {
    if (footerData) {
      editFooter({ ...values, id: footerData.id });
    } else {
      createFooter({ ...values, user_id: user?.id || "" });
    }
  }
  return (
    <div className=" min-w-[120px] m-auto  w-full  max-w-[1000px]">
      <div className="   px-1">
        <Form {...form}>
          <form
            ref={ref}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 "
          >
            <FormFieldItem<FooterSchemaTypes>
              labelText="Heading"
              control={form.control}
              fieldName="heading"
              description="Heading."
            >
              <Input
                placeholder="Contact me"
                disabled={isEditting || isLoading}
              />
            </FormFieldItem>

            <FormFieldItem<FooterSchemaTypes>
              labelText="Additional text"
              control={form.control}
              fieldName="additionalText"
              description="Wrtie what ever you want."
            >
              <Textarea
                placeholder="Let's get you started."
                disabled={isEditting || isLoading}
              />
            </FormFieldItem>

            <FormFieldItem<FooterSchemaTypes>
              labelText="Button text"
              control={form.control}
              fieldName="emailBtnText"
              description="Enter the text you want the button to say."
            >
              <Input
                placeholder="Let's get you started."
                disabled={isEditting || isLoading}
              />
            </FormFieldItem>

            <FormFieldItem<FooterSchemaTypes>
              labelText="Copiable Text"
              control={form.control}
              fieldName="copyText"
              description="Enter the text you want the user to copy when clicking the button."
            >
              <Input
                placeholder="Let's get you started."
                disabled={isEditting || isLoading}
              />
            </FormFieldItem>
            <div className="  hidden md:flex flex-col-reverse  sm:flex-row items-center justify-end gap-4 ">
              <Button
                variant="secondary"
                size="sm"
                disabled={isEditting || isLoading || isEqual}
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                type="button"
                className=" tracking-wider w-full sm:w-[unset]"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                onClick={() => setOpen(false)}
                disabled={isEditting || isLoading || isEqual}
                className=" tracking-wider w-full sm:w-[unset]"
              >
                {footerData ? "Edit" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
});

export default FooterForm;
{
  /* <ClickAwayListener
                          onClickAway={() => setShowColorBoard(false)}
                        >
                          <div>
                            <Button
                              onClick={() => setShowColorBoard((is) => !is)}
                              type="button"
                              className=" shadow-2xl border-spacing-2 border-2 border-dotted"
                              style={{
                                width: "40px",
                                height: "25px",
                                borderRadius: "3px",
                                backgroundColor: `rgba(${Object.values(
                                  field.value
                                ).join(",")})`,
                              }}
                            ></Button>
                            <SketchPicker
                              color={field.value}
                              className={` absolute right-0 top-[100%]  duration-150  ${
                                showColorBoard
                                  ? "opacity-1 visible"
                                  : "opacity-0 invisible"
                              }`}
                              onChange={(color) => {
                                // Create a color object that includes the alpha value
                                const colorWithAlpha = {
                                  ...color.rgb,
                                  a: color.rgb.a,
                                };
                                console.log(colorWithAlpha, "color with alpha");

                                field.onChange(colorWithAlpha);
                              }}
                            />
                          </div>
                        </ClickAwayListener> */
}
