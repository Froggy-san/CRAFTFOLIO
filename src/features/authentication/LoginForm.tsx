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
import { Link } from "react-router-dom";
import useLogin from "./useLogin";
import { useState } from "react";
// import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import IconButton from "@/components/shared/IconButton";
import loginSchema from "@/formScehmas/loginSchema";

type loginSchemaTypes = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const { login, isSigningIn } = useLogin();

  const form = useForm<loginSchemaTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: loginSchemaTypes) {
    console.log(values, "VAlues");
    login(values);
  }

  return (
    <div className="w-[94%] mx-auto ">
      <h1 className=" text-xl font-semibold mb-12">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isSigningIn}
                    placeholder="craftfolio@me.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {!isShowPass ? (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex justify-between items-center">
                    Password{" "}
                    <p className=" mt-2 text-sm">
                      <Link
                        className=" text-blue-500 underline"
                        to={"/frogot-password"}
                      >
                        Forgot password?
                      </Link>
                    </p>
                  </FormLabel>
                  <FormControl>
                    <div className=" relative ">
                      <Input
                        className=" pr-10"
                        disabled={isSigningIn}
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                      <IconButton
                        type="button"
                        ariaLabel="show password"
                        variant="outline"
                        className="  absolute right-3 top-1/2 translate-y-[-50%]"
                        onClick={() => setIsShowPass(true)}
                      >
                        <RiEyeFill size={20} />
                      </IconButton>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" flex justify-between items-center">
                    Password{" "}
                    <p className=" mt-2 text-sm">
                      <Link
                        className=" text-blue-500 underline"
                        to={"/frogot-password"}
                      >
                        Forgot password?
                      </Link>
                    </p>
                  </FormLabel>
                  <FormControl>
                    <div className=" relative ">
                      <Input
                        className=" pr-10"
                        disabled={isSigningIn}
                        type="text"
                        placeholder="Password"
                        {...field}
                      />
                      <IconButton
                        type="button"
                        ariaLabel=" hide password"
                        variant="outline"
                        className="  absolute right-3 top-1/2 translate-y-[-50%]"
                        onClick={() => setIsShowPass(false)}
                      >
                        <RiEyeCloseFill size={20} />
                      </IconButton>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            size="sm"
            disabled={isSigningIn}
            type="submit"
            className="  block  "
          >
            Login
          </Button>

          <div>
            <p className=" text-sm">
              Don't have an account?{" "}
              <Link className=" text-blue-500 underline" to={"/signup"}>
                Sign up.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
