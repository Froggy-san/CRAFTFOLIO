("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { validateEgyptianPhoneNumber } from "@/utils/helper";

import Avatar from "../../components/shared/Avatar";
import useUpdateUser from "./useUpdateUser";
import { useAuth } from "@/hooks/useAuth";
import { Textarea } from "@/components/ui/textarea";
import FormRow from "@/components/shared/FormRow";

const updateUserSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: `password is too short` })
      .max(55, { message: `password is too long.` }),
    email: z.string().min(2).max(50),

    speciality: z.string(),
    socials: z.string(),
    phone: z
      .string()
      .min(6, { message: `password is too short` })
      .max(55, { message: `password is too long.` }),
    avatar: z.custom<File[]>(),
  })
  .refine(
    (data) => {
      return validateEgyptianPhoneNumber(data.phone);
    },
    {
      message: `Phone number must match the patterns of Egyptian phone numbers`,
      path: ["phone"],
    }
  );

type updateUserSchemaTypes = z.infer<typeof updateUserSchema>;

const UpdateUserForm = () => {
  // const { user } = useUser();

  const { user } = useAuth();

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
    <div className="   w-[94%] lg:w-[850px] mx-auto  overflow-y-auto h-[81%] mt-12 sm:px-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <FormRow>
       <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="cartfoilio200"
                    {...field}
                    disabled={isUpdatingUser}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="craftfolio@me.com" {...field} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
       </FormRow>

   <FormRow>
   <FormField
            control={form.control}
            name="speciality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speciality</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="React"
                    {...field}
                    disabled={isUpdatingUser}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />


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
            name="socials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>socials</FormLabel>
                <FormControl>
                  <Textarea
                  className=" h-[140px]"
                    placeholder="how can people reach you."
                    {...field}
                    disabled={isUpdatingUser}
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
