("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";

import { validateEgyptianPhoneNumber } from "@/utils/helper";

import Avatar from "../../components/shared/Avatar";
import useUpdateUser from "./useUpdateUser";
import { useAuth } from "@/hooks/useAuth";
import { Textarea } from "@/components/ui/textarea";
import FormRow from "@/components/shared/FormRow";
import updateUserSchema from "@/formScehmas/updateUserSchema";
import FormFieldItem from "@/components/shared/FormFieldItem";
import { User } from "@/types/types";
import ProfileImageUploader from "@/components/shared/ProfileImageUploader";

type updateUserSchemaTypes = z.infer<typeof updateUserSchema>;

const UpdateUserForm = ({ user }: { user: User | undefined }) => {
  console.log(user, "user))))))))))))))))");
  const { isUpdatingUser, updateUser } = useUpdateUser();

  const form = useForm<updateUserSchemaTypes>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email || "",
      phone: user?.phone || "",
      speciality: user?.speciality || "",
      socials: user?.socials || "",
      username: user?.username || "",
      resumeUrl: user?.resumeUrl || "",
      avatar: [],
    },
  });
  function onSubmit(values: updateUserSchemaTypes) {
    console.log(values);

    updateUser({
      ...values,
      avatar:
        !values.avatar.length || typeof values.avatar === "string"
          ? ""
          : values.avatar,

      userId: user?.id || "1",

      avatarImageToDelete: user?.avatar ? user.avatar.split("avatars/")[1] : "",
    });
  }
  return (
    <div className="   w-[94%]  mx-auto    overflow-x-hidden   mt-12 sm:px-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" flex flex-col md:flex-row gap-5 px-2">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Profile image</FormLabel> */}
                  <FormControl>
                    <ProfileImageUploader
                      className=""
                      mediaUrl={user?.avatar || ""}
                      fieldChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex-1 space-y-3">
              <FormRow className=" justify-between  items-center">
                <FormFieldItem<updateUserSchemaTypes>
                  labelText="Username"
                  fieldName="username"
                  control={form.control}
                  className=" w-full"
                >
                  <Input
                    placeholder="Mohammed Osama"
                    disabled={isUpdatingUser}
                  />
                </FormFieldItem>

                <FormFieldItem<updateUserSchemaTypes>
                  labelText="Email"
                  fieldName="email"
                  className=" w-full"
                  control={form.control}
                >
                  <Input placeholder="Mohammed Osama" disabled />
                </FormFieldItem>
              </FormRow>
              <FormRow className=" justify-between  items-center">
                <FormFieldItem<updateUserSchemaTypes>
                  labelText="Speciality"
                  fieldName="speciality"
                  className=" w-full"
                  control={form.control}
                >
                  <Input
                    type="text"
                    placeholder="What are you good at?"
                    disabled={isUpdatingUser}
                  />
                </FormFieldItem>
                <FormFieldItem<updateUserSchemaTypes>
                  labelText="Resume URL"
                  fieldName="resumeUrl"
                  className=" w-full"
                  control={form.control}
                >
                  <Input type="text" disabled={isUpdatingUser} />
                </FormFieldItem>
                {/* <FormField
                  control={form.control}
                  name="resumeUrl"
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume URL</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={isUpdatingUser}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </FormRow>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <InputOTP
                        className=" "
                        disabled={isUpdatingUser}
                        aria-label="phone number"
                        maxLength={11}
                        {...field}
                      >
                        <div className="     w-full  items-center">
                          <InputOTPGroup className="divide-width-type ">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                            <InputOTPSlot index={8} />
                            <InputOTPSlot index={9} />
                            <InputOTPSlot index={10} />
                          </InputOTPGroup>
                        </div>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormFieldItem<updateUserSchemaTypes>
                labelText="Socials"
                fieldName="socials"
                control={form.control}
              >
                <Textarea
                  className=" h-[140px]"
                  placeholder="how can people reach you."
                  disabled={isUpdatingUser}
                />
              </FormFieldItem>
            </div>
          </div>
          <div className="flex flex-col-reverse  sm:flex-row items-center justify-end gap-4 pb-10">
            <Button
              variant="secondary"
              size="sm"
              className=" w-full sm:w-[120px]"
              onClick={() => {
                form.reset();
              }}
              disabled={isUpdatingUser}
              type="button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={isUpdatingUser}
              type="submit"
              className=" w-full sm:w-[120px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
