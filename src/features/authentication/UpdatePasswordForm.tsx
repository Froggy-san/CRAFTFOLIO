"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import PasswordShowHide from "@/components/shared/PasswordShowHide";
import { Card } from "@/components/ui/card";
import useUpdatePassword from "./useUpdatePassword";
import useObjectCompare from "@/hooks/useCompareObjects";

const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Too short" })
      .max(33, { message: "Too long" }),

    confirmPassword: z
      .string()
      .min(8, { message: "Too short" })
      .max(33, { message: "Too long" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match. Make sure you typed the right password.",
      path: ["confirmPassword"],
    }
  );

type updatePasswordTypes = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordForm = () => {
  const { isUpdatingPassword, updatePassword } = useUpdatePassword();

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };
  const form = useForm<updatePasswordTypes>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues,
  });
  const isEqual = useObjectCompare(form.getValues(), defaultValues);
  function onSubmit(values: updatePasswordTypes) {
    console.log(values, "form  vlaues");

    updatePassword(values.password);
  }
  return (
    <div className="  mb-3 w-full md:max-w-[65%] mr-[30px]  ml-auto  ">
      <h1 className=" font-semibold text-lg my-2 ">Update password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-6 py-3  rounded-md  "
        >
          <PasswordShowHide<updatePasswordTypes>
            disabled={isUpdatingPassword}
            labelText={"Password"}
            fieldName={"password"}
            control={form.control}
          />

          <PasswordShowHide<updatePasswordTypes>
            disabled={isUpdatingPassword}
            labelText={"Confirm password"}
            fieldName={"confirmPassword"}
            control={form.control}
          />
          <div className="flex flex-col-reverse  sm:flex-row items-center justify-end gap-4 pb-10">
            <Button
              variant="secondary"
              size="sm"
              className=" w-full sm:w-[120px]"
              onClick={() => {
                form.reset();
              }}
              disabled={isEqual || isUpdatingPassword}
              type="button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={isEqual || isUpdatingPassword}
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

export default UpdatePasswordForm;
