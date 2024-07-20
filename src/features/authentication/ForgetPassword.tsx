"use client";

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
import { Input } from "@/components/ui/input";
import useFrogotMyPassword from "./useForgotMyPassword";
import Loading from "@/components/shared/Loading";
import { validateEmail } from "@/utils/helper";
import { useState } from "react";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
  const { isLoading, data, forgotPassword } = useFrogotMyPassword();
  const [showMessage, setShowMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    defaultValues: { email: "moeosama1@outlook.com" },
  });
  console.log(data, "DATA");

  function onSubmit({ email }: FormValues) {
    // console.log(values.email);
    forgotPassword(email, { onSuccess: () => setShowMessage(true) });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-[95%]">
      <div className=" space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="craftfolio@gmail.com"
          {...register("email", {
            validate: (value) =>
              validateEmail(value) || "Please enter a valid email address.",
          })}
        />
        <p className="text-sm text-muted-foreground">
          Enter your email address.
        </p>

        {errors.email && (
          <p className="text-sm font-medium text-destructive">
            {errors.email.message}
          </p>
        )}
        {showMessage && (
          <div className=" border  rounded-lg px-4 py-2 text-center bg-green-950/70">
            Please check your email to continue.
          </div>
        )}
      </div>

      {/* <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <Button disabled={isLoading} type="submit">
        {" "}
        {isLoading ? <Loading /> : "Submit"}
      </Button>
    </form>
  );
};

export default ForgotPassword;
