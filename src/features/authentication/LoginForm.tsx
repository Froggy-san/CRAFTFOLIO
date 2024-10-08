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
import { useRef, useState } from "react";
// import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import IconButton from "@/components/shared/IconButton";
import loginSchema from "@/formScehmas/loginSchema";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "@/services/supabase";
import { useTheme } from "@/context/ThemeProvidor";

type loginSchemaTypes = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const { login, isSigningIn } = useLogin();
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  };
  const form = useForm<loginSchemaTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: loginSchemaTypes) {
    login(values);
  }

  return (
    <div className="mx-auto w-[94%]">
      <h1 className="mb-12 text-xl font-semibold">Login</h1>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-11"
        >
          <div className="space-y-8">
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
                    <FormLabel className="flex items-center justify-between">
                      Password{" "}
                      <p className="mt-2 text-sm">
                        <Link
                          className="text-blue-500 underline"
                          to={"/frogot-password"}
                        >
                          Forgot password?
                        </Link>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-10"
                          disabled={isSigningIn}
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                        <IconButton
                          type="button"
                          ariaLabel="show password"
                          variant="outline"
                          className="absolute right-3 top-1/2 translate-y-[-50%]"
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
                    <FormLabel className="flex items-center justify-between">
                      Password{" "}
                      <p className="mt-2 text-sm">
                        <Link
                          className="text-blue-500 underline"
                          to={"/frogot-password"}
                        >
                          Forgot password?
                        </Link>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-10"
                          disabled={isSigningIn}
                          type="text"
                          placeholder="Password"
                          {...field}
                        />
                        <IconButton
                          type="button"
                          ariaLabel=" hide password"
                          variant="outline"
                          className="absolute right-3 top-1/2 translate-y-[-50%]"
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
          </div>

          <Button
            onClick={submitForm}
            size="sm"
            disabled={isSigningIn}
            type="submit"
            className="block w-full"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="mx-auto">
        <Auth
          onlyThirdPartyProviders
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme={theme}
          providers={["google"]}
        />
      </div>

      <div>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-500 underline" to={"/signup"}>
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
