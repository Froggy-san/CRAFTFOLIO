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
import { Link } from "react-router-dom";
import useSignUp from "./useSignUp";

import { useState } from "react";
import FormFieldItem from "@/components/shared/FormFieldItem";
import signUpSchema from "@/formScehmas/signUpSchema";
import PasswordShowHide from "@/components/shared/PasswordShowHide";
import {
  getPhoneData,
  PhoneInput,
} from "@/components/shared/phomeInput/PhoneInput";

type sginUpSchemaTypes = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { signUp, isSigning } = useSignUp();
  const [isShowPass, setIsShowPass] = useState(false);

  const form = useForm<sginUpSchemaTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      speciality: "",
      username: "",
    },
  });

  function onSubmit(values: sginUpSchemaTypes) {
    console.log(values, "form  vlaues");

    signUp({ ...values, role: "user" });
  }

  return (
    <div className="w-[94%] mx-auto  overflow-y-auto overflow-x-hidden h-[81%] mt-32 px-3">
      <h1 className=" text-xl font-semibold mb-12">Sign up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormFieldItem<sginUpSchemaTypes>
            labelText="Username"
            control={form.control}
            fieldName="username"
            description="Choose a username for your account."
          >
            <Input placeholder="cartfoilio200" disabled={isSigning} />
          </FormFieldItem>

          <FormFieldItem<sginUpSchemaTypes>
            labelText="Email"
            control={form.control}
            fieldName="email"
            description="Enter a vaild email."
          >
            <Input placeholder="cartfoilio200" disabled={isSigning} />
          </FormFieldItem>
          <PasswordShowHide<sginUpSchemaTypes>
            onChange={setIsShowPass}
            disabled={isSigning}
            show={isShowPass}
            labelText={"Password"}
            fieldName={"password"}
            control={form.control}
            description="Enter your password."
          />

          {/* Confirm password start */}
          <PasswordShowHide<sginUpSchemaTypes>
            onChange={setIsShowPass}
            disabled={isSigning}
            show={isShowPass}
            labelText={"Confirm password"}
            fieldName={"confirmPassword"}
            control={form.control}
            description="Confirm your password."
          />

          {/* Confirm password end */}
          <FormFieldItem<sginUpSchemaTypes>
            labelText="Speciality"
            control={form.control}
            fieldName="speciality"
            description="Your area of specialization (e.g., doctor, lawyer, software engineer)."
          >
            <Input
              type="text"
              placeholder="What are you good at?"
              disabled={isSigning}
            />
          </FormFieldItem>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="EG"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Your phone number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <InputOTP
                    className=" "
                    disabled={isSigning}
                    aria-label="phone number"
                    maxLength={11}
                    {...field}
                  >
                    <div className=" hidden xs:flex w-full  items-center justify-center">
                      <InputOTPGroup className=" justify-end phone-input-fields-width-two">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup className=" phone-input-fields-width justify-center">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup className=" phone-input-fields-width">
                        <InputOTPSlot index={7} />
                        <InputOTPSlot index={8} />
                        <InputOTPSlot index={9} />
                        <InputOTPSlot index={10} />
                      </InputOTPGroup>
                    </div>
                    <div className=" xs:hidden     w-full  items-center">
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
          /> */}

          <div className=" flex flex-col items-center gap-4 ">
            <Button
              className=" w-full"
              size="sm"
              disabled={isSigning}
              type="submit"
            >
              Submit
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                form.reset();
              }}
              className=" w-full"
              disabled={isSigning}
              type="button"
            >
              Cancel
            </Button>
          </div>
          <p className=" text-sm pb-10">
            Don't have an account?{" "}
            <Link className=" text-blue-500 underline" to={"/login"}>
              Login.
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
