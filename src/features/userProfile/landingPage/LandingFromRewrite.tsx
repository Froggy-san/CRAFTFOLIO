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

import { Button } from "@/components/ui/button";
import Avatar from "@/components/shared/Avatar";

import { Textarea } from "@/components/ui/textarea";
import useCreateLanding from "./useCreateLanding";
import { useAuth } from "@/hooks/useAuth";
import React, { Ref, SetStateAction, useEffect, useRef, useState } from "react";
import { landingProps } from "@/types/types";
import useEditLandingPage from "./useEditLandingPage";
import _ from "lodash";
import useObjectCompare from "@/hooks/useCompareObjects";
import {
  defaultLandingPageImage,
  defaultProfilePicture,
  defaultTextColor,
} from "@/utils/constants";
import ProfileImageUploader from "@/components/shared/ProfileImageUploader";
import { Switch } from "@/components/ui/switch";

import ColorPicker from "@/components/shared/ColorPicker";
import { colorSchema } from "@/formScehmas/colorSchema";
import TagsInput from "@/components/shared/TagsInputRewrite";
import FormRow from "@/components/shared/FormRow";
import { LinkPreview } from "@/components/ui/link-preview";
import { landingPageSchma } from "@/formScehmas/landingFormSchema";
// import TagsInput from "@/components/shared/TagsInput";

type updateUserSchemaTypes = z.infer<typeof landingPageSchma>;

const LandingFormRewrite = React.forwardRef(function (
  {
    setOpen,
    landingToEdit,
    setHasTheFormDataChanged,
    relatedUserAvatar,
  }: {
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    landingToEdit?: landingProps;
    relatedUserAvatar?: string;
    setHasTheFormDataChanged?: React.Dispatch<SetStateAction<boolean>>;
  },
  ref?: Ref<HTMLFormElement>,
) {
  const { user } = useAuth();
  const { isEditting, editLandingPage } = useEditLandingPage();
  const { isCreanting, createLanding } = useCreateLanding();

  const defaultValues = {
    primaryText: landingToEdit?.primaryText || "",
    secondaryText: landingToEdit?.secondaryText || "",
    tertiaryText: landingToEdit?.tertiaryText || "",
    socials:
      landingToEdit && landingToEdit.socials
        ? JSON.parse(landingToEdit.socials)
        : [],
    grainyTexture: landingToEdit ? landingToEdit?.grainyTexture : true,
    blur: landingToEdit ? landingToEdit?.blur : true,
    textColor:
      landingToEdit && landingToEdit.textColor
        ? JSON.parse(landingToEdit.textColor)
        : defaultTextColor,
    avatar: [],
    landingImage: [],
  };

  const form = useForm<updateUserSchemaTypes>({
    resolver: zodResolver(landingPageSchma),
    defaultValues, // defaultValues:{...defualtValues (the one we defined up there)}
  });

  // Check if the user changed anything about the landing page's data, to prevent any unnecessary api calls.
  const isEqual = useObjectCompare(form.getValues(), defaultValues);

  const chosenLandingImage =
    (form.getValues().landingImage.length &&
      URL.createObjectURL(form.getValues().landingImage[0])) ||
    landingToEdit?.landingImage ||
    defaultLandingPageImage;
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

  function onSubmit(values: updateUserSchemaTypes) {
    if (landingToEdit) {
      const avatarImageToBeDeleted =
        !values.avatar.length || typeof values.avatar[0] === "string"
          ? landingToEdit.avatarImage
          : values.avatar;

      const landingImageToBeDelted =
        !values.landingImage.length ||
        typeof values.landingImage[0] === "string"
          ? landingToEdit.landingImage
          : values.landingImage;

      const avatarImageToRemove =
        typeof landingToEdit.avatarImage === "string"
          ? landingToEdit.avatarImage.split("landingImages/")[1]
          : null;
      const landingImageToRemove =
        typeof landingToEdit.landingImage === "string"
          ? landingToEdit.landingImage.split("landingImages/")[1]
          : null;
      editLandingPage(
        {
          ...values,
          id: landingToEdit.id,
          avatar: avatarImageToBeDeleted,
          landingImage: landingImageToBeDelted,
          user_id: user?.id || "",
          avatarImageToDelete: avatarImageToRemove,
          landingImageToDelete: landingImageToRemove,
          socials: JSON.stringify(values.socials),
          textColor: JSON.stringify(values.textColor),
        },
        { onSuccess: () => setOpen(false) },
      );
    }
    if (!landingToEdit)
      createLanding(
        {
          ...values,
          avatar:
            !values.avatar.length || typeof values.avatar[0] === "string"
              ? ""
              : values.avatar,

          landingImage:
            !values.landingImage.length ||
            typeof values.landingImage[0] === "string"
              ? ""
              : values.landingImage,
          socials: JSON.stringify(values.socials),
          textColor: JSON.stringify(values.textColor),
          user_id: user?.id || "",
        },
        { onSuccess: () => setOpen(false) },
      );
  }
  return (
    <div className="m-auto w-full min-w-[120px] max-w-[1000px]">
      <div className="px-1">
        <Form {...form}>
          <form
            ref={ref}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="primaryText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="You can put your name and your profession"
                      {...field}
                      disabled={isCreanting || isEditting}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly introduce yourself and your profession.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondaryText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[150px]"
                      placeholder="Experienced [Your Profession] | Passionate about [Your Area of Interest] | Skilled in [Your Key Skills]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share a brief description of yourself, your background, and
                    interests.{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tertiaryText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[150px]"
                      placeholder="Any other relevant information?"
                      {...field}
                      disabled={isCreanting || isEditting}
                    />
                  </FormControl>
                  <FormDescription>
                    Feel free to provide any other relevant information about
                    yourself.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socials"
              render={({ field }) => (
                <FormItem className=" ">
                  <FormLabel>Socials.</FormLabel>
                  <FormControl>
                    <TagsInput Tags={field.value} onChange={field.onChange}>
                      <TagsInput.TagsContainer>
                        <TagsInput.TagsInputField placeholder="Enter social media links" />
                      </TagsInput.TagsContainer>
                    </TagsInput>

                    {/* mx-auto min-w-[250px] max-w-[250px] xs:max-w-[400px] md:max-w-[700px] max-w-[730px] */}
                    {/* <TagsInput
                      className=" "
                      tags={field.value}
                      onChange={field.onChange}
                    /> */}
                  </FormControl>
                  <FormDescription>
                    Add up to 5 social media links to connect with your
                    audience.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormRow className="z-0 gap-x-2 gap-y-7">
              <FormField
                control={form.control}
                name="grainyTexture"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-4 text-center xs:flex-row xs:text-left">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Grainy image</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        For a vintage look, consider adding a{" "}
                        <LinkPreview
                          grainy={field.value}
                          url=""
                          imageSrc={chosenLandingImage}
                          isStatic
                          className="font-semibold"
                        >
                          grainy / old TV
                        </LinkPreview>{" "}
                        effect to the background image on your landing page.
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blur"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-center justify-between gap-2 rounded-lg border p-4 text-center xs:flex-row xs:text-left">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Blur landing image
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Create a{" "}
                        <LinkPreview
                          url=""
                          imageSrc={chosenLandingImage}
                          isStatic
                          className="font-semibold"
                          imageClassName={`${field.value && "blur-[1px]"}`}
                        >
                          blurred background effect
                        </LinkPreview>{" "}
                        for your landing page.
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormRow>
            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem className="relative z-0 flex flex-col items-center justify-between gap-2 rounded-lg border p-4 text-center xs:flex-row xs:text-left">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Text color</FormLabel>
                    <FormDescription>
                      Update the text color on your landing page for a fresh
                      look.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landing photo</FormLabel>
                  <FormControl>
                    <ProfileImageUploader
                      mediaUrl={
                        landingToEdit?.avatarImage ||
                        relatedUserAvatar ||
                        defaultProfilePicture
                      }
                      fieldChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Add an image to your liking.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landingImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover photo</FormLabel>
                  <FormControl>
                    <Avatar
                      mediaUrl={
                        landingToEdit?.landingImage || defaultLandingPageImage
                      }
                      fieldChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Pick a cover photo to your landing page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="hidden flex-col-reverse items-center justify-end gap-4 sm:flex-row md:flex">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                disabled={isCreanting || isEditting}
                type="button"
                className="w-full tracking-wider sm:w-[unset]"
              >
                Cancel
              </Button>

              <Button
                size="sm"
                disabled={isEqual || isCreanting || isEditting}
                type="submit"
                className="w-full tracking-wider sm:w-[unset]"
              >
                {isEditting ? "Upload landing page" : "Edit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
});

export default LandingFormRewrite;
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
