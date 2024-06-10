("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
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
import LandingImageUploader from "./LandingImageUploader";
import { Textarea } from "@/components/ui/textarea";
import useCreateLanding from "./useCreateLanding";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { landingProps } from "@/types/types";
import useEditLandingPage from "./useEditLandingPage";
import IconButton from "@/components/shared/IconButton";
import _ from "lodash";
import useObjectCompare from "@/hooks/useCompareObjects";
import { defaultLandingPageImage } from "@/utils/constants";
const landingPageSchma = z
  .object({
    primaryText: z.string().min(6, { message: `Text is too short` }).max(100, {
      message: `text is too long.`,
    }),
    secondaryText: z
      .string()
      .max(440, { message: `Text must be no more than (150)char.` }),
    tertiaryText: z
      .string()
      .max(350, { message: `Text must be no more than (150)char.` }),
    socials: z
      .string()
      .trim()
      .transform((str) => str.split(/,\s*/))
      .transform((data) =>
        data
          .map((str) => str.trim())
          .filter((str) => str !== "")
          .join(",")
      ),

    avatar: z.custom<File[]>(),
    landingImage: z.custom<File[]>(),
  })
  .refine((data) => data.socials.split(",").length <= 5, {
    message: "You can add a maximum of 5 social media links.",
    path: ["socials"], // Specify the path for targeted error display
  });

type updateUserSchemaTypes = z.infer<typeof landingPageSchma>;

const LandingForm = ({ landingToEdit }: { landingToEdit?: landingProps }) => {
  const { user } = useAuth();
  const { isEditting, editLandingPage } = useEditLandingPage();
  const { isCreanting, createLanding } = useCreateLanding();
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues = {
    primaryText: landingToEdit?.primaryText || "",
    secondaryText: landingToEdit?.secondaryText || "",
    tertiaryText: landingToEdit?.tertiaryText || "",
    socials: landingToEdit?.socials || "",
    avatar: [],
    landingImage: [],
  };

  const form = useForm<updateUserSchemaTypes>({
    resolver: zodResolver(landingPageSchma),
    defaultValues, // defaultValues:{...defualtValues (the one we defined up there)}
  });

  // Check if the user changed anything about the landing page's data, to prevent any unnecessary api calls.
  const isEqual = useObjectCompare(form.getValues(), defaultValues);

  // everytime the ladningToEdit data change change rest the value in the form's input fields.

  useEffect(() => {
    form.reset({
      ...defaultValues,
    });
  }, [landingToEdit, form]);

  function handleClose() {
    setIsOpen((is) => !is);
    form.reset();
  }

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
        },
        { onSuccess: () => setIsOpen(false) }
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

          user_id: user?.id || "",
        },
        { onSuccess: () => setIsOpen(false) }
      );
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <div className="flex items-end">
          <IconButton
            className=" ml-auto  my-3"
            onClick={() => setIsOpen(true)}
            variant="ghost"
          >
            <TbPhotoEdit className="h-4 w-4" />
          </IconButton>
        </div>
        {/* <DialogTrigger className=" ml-auto block my-3">
          <Button size="sm" variant="ghost" className="p-0 w-7 h-7">
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
          <IconButton variant="ghost">
            <TbPhotoEdit className="h-4 w-4" />
          </IconButton>
          <button className="p-0 w-7 h-7">
            {" "}
            <TbPhotoEdit className="h-4 w-4" />
          </button>
        </DialogTrigger> */}
        <DialogContent className=" overflow-y-scroll h-[80dvb] max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create Your landing page.</DialogTitle>
            <DialogDescription>
              Talk about your self and what you do.
            </DialogDescription>
          </DialogHeader>
          <div className="   w-[94%]  mx-auto   px-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="primaryText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="I am your name"
                          {...field}
                          disabled={isCreanting || isEditting}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brief Description about your self</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" h-[150px]"
                          placeholder="craftfolio@me.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tertiaryText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Write what ever you want</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" h-[150px]"
                          placeholder="React"
                          {...field}
                          disabled={isCreanting || isEditting}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Socials.</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" h-[150px]"
                          placeholder="how can people reach you."
                          {...field}
                          disabled={isCreanting || isEditting}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile image</FormLabel>
                      <FormControl>
                        <LandingImageUploader
                          mediaUrl={landingToEdit?.avatarImage || user?.avatar}
                          fieldChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="landingImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile image</FormLabel>
                      <FormControl>
                        <Avatar
                          mediaUrl={
                            landingToEdit?.landingImage ||
                            defaultLandingPageImage
                          }
                          fieldChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className=" flex items-center gap-4 pb-10">
                  {landingToEdit ? (
                    <Button
                      size="sm"
                      disabled={isEqual || isCreanting || isEditting}
                      type="submit"
                      className=" tracking-wider"
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      disabled={isCreanting || isEditting}
                      type="submit"
                    >
                      Upload landing page
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      form.reset();
                      setIsOpen(false);
                    }}
                    disabled={isCreanting || isEditting}
                    type="button"
                    className=" tracking-wider"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingForm;
