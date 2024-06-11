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
    <div className="   w-[94%] lg:w-[850px] mx-auto  overflow-y-auto  overflow-x-hidden h-[81%] mt-12 sm:px-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormRow>
            <FormFieldItem<updateUserSchemaTypes>
              labelText="Username"
              fieldName="username"
              control={form.control}
            >
              <Input placeholder="Mohammed Osama" disabled={isUpdatingUser} />
            </FormFieldItem>

            <FormFieldItem<updateUserSchemaTypes>
              labelText="Email"
              fieldName="email"
              control={form.control}
            >
              <Input placeholder="Mohammed Osama" disabled />
            </FormFieldItem>
          </FormRow>

          <FormRow>
            <FormFieldItem<updateUserSchemaTypes>
              labelText="Speciality"
              fieldName="speciality"
              control={form.control}
            >
              <Input
                type="text"
                placeholder="What are you good at?"
                disabled={isUpdatingUser}
              />
            </FormFieldItem>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="011-294-244-76"
                      {...field}
                      disabled={isUpdatingUser}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile image</FormLabel>
                <FormControl>
                  <Avatar
                    mediaUrl={user?.avatar || ""}
                    fieldChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" flex items-center gap-4 pb-10">
            <Button size="sm" disabled={isUpdatingUser} type="submit">
              Submit
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                form.reset();
              }}
              disabled={isUpdatingUser}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
