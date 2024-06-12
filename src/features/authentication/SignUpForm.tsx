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
import { validateEgyptianPhoneNumber } from "@/utils/helper";
import { useState } from "react";
import IconButton from "@/components/shared/IconButton";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import FormFieldItem from "@/components/shared/FormFieldItem";
import signUpSchema from "@/formScehmas/signUpSchema";

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
          >
            <Input placeholder="cartfoilio200" disabled={isSigning} />
          </FormFieldItem>

          <FormFieldItem<sginUpSchemaTypes>
            labelText="Email"
            control={form.control}
            fieldName="email"
          >
            <Input placeholder="cartfoilio200" disabled={isSigning} />
          </FormFieldItem>

          {!isShowPass ? (
            <FormFieldItem<sginUpSchemaTypes>
              labelText="Password"
              control={form.control}
              fieldName="password"
            >
              <div className=" relative ">
                <Input
                  className=" pr-10"
                  disabled={isSigning}
                  type="password"
                  placeholder="Password"
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
            </FormFieldItem>
          ) : (
            <FormFieldItem<sginUpSchemaTypes>
              labelText="Password"
              control={form.control}
              fieldName="password"
            >
              <div className=" relative ">
                <Input
                  className=" pr-10"
                  disabled={isSigning}
                  type="text"
                  placeholder="Password"
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
            </FormFieldItem>
          )}

          {/* Confirm password start */}
          {!isShowPass ? (
            <FormFieldItem<sginUpSchemaTypes>
              labelText="Confirm password"
              control={form.control}
              fieldName="confirmPassword"
            >
              <div className=" relative ">
                <Input
                  className=" pr-10"
                  disabled={isSigning}
                  type="password"
                  placeholder="Password"
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
            </FormFieldItem>
          ) : (
            <FormFieldItem<sginUpSchemaTypes>
              labelText="Confirm password"
              control={form.control}
              fieldName="confirmPassword"
            >
              <div className=" relative ">
                <Input
                  className=" pr-10"
                  disabled={isSigning}
                  type="text"
                  placeholder="Password"
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
            </FormFieldItem>
          )}

          {/* Confirm password end */}
          <FormFieldItem<sginUpSchemaTypes>
            labelText="Speciality"
            control={form.control}
            fieldName="speciality"
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
          />
          <p className=" text-sm">
            Don't have an account?{" "}
            <Link className=" text-blue-500 underline" to={"/Login"}>
              Login.
            </Link>
          </p>
          <div className=" flex items-center gap-4 pb-10">
            <Button size="sm" disabled={isSigning} type="submit">
              Submit
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                form.reset();
              }}
              disabled={isSigning}
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

export default SignUpForm;

// <div className="w-[94%] mx-auto  overflow-y-auto overflow-x-hidden h-[81%] mt-32 px-3">
// <h1 className=" text-xl font-semibold mb-12">Sign up</h1>
// <Form {...form}>
//   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//     <FormFieldItem<sginUpSchemaTypes>
//       labelText="Username"
//       control={form.control}
//       fieldName="username"
//     >
//       <Input placeholder="cartfoilio200" disabled={isSigning} />
//     </FormFieldItem>
//     {/* <FormField
//       control={form.control}
//       name="username"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Username</FormLabel>
//           <FormControl>
//             <Input
//               placeholder="cartfoilio200"
//               {...field}
//               disabled={isSigning}
//             />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     /> */}

//     <FormField
//       control={form.control}
//       name="email"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Email</FormLabel>
//           <FormControl>
//             <Input
//               placeholder="craftfolio@me.com"
//               {...field}
//               disabled={isSigning}
//             />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     {!isShowPass ? (
//       <FormField
//         control={form.control}
//         name="password"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Password</FormLabel>
//             <FormControl>
//               <div className=" relative ">
//                 <Input
//                   className=" pr-10"
//                   disabled={isSigning}
//                   type="password"
//                   placeholder="Password"
//                   {...field}
//                 />
//                 <IconButton
//                   type="button"
//                   ariaLabel="show password"
//                   variant="outline"
//                   className="  absolute right-3 top-1/2 translate-y-[-50%]"
//                   onClick={() => setIsShowPass(true)}
//                 >
//                   <RiEyeFill size={20} />
//                 </IconButton>
//               </div>
//             </FormControl>

//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ) : (
//       <FormField
//         control={form.control}
//         name="password"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Password</FormLabel>
//             <FormControl>
//               <div className=" relative ">
//                 <Input
//                   className=" pr-10"
//                   disabled={isSigning}
//                   type="text"
//                   placeholder="Password"
//                   {...field}
//                 />
//                 <IconButton
//                   type="button"
//                   ariaLabel=" hide password"
//                   variant="outline"
//                   className="  absolute right-3 top-1/2 translate-y-[-50%]"
//                   onClick={() => setIsShowPass(false)}
//                 >
//                   <RiEyeCloseFill size={20} />
//                 </IconButton>
//               </div>
//             </FormControl>

//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     )}

//     {!isShowPass ? (
//       <FormField
//         control={form.control}
//         name="confirmPassword"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Confirm password</FormLabel>
//             <FormControl>
//               <div className=" relative ">
//                 <Input
//                   className=" pr-10"
//                   disabled={isSigning}
//                   type="password"
//                   placeholder="Confirm password"
//                   {...field}
//                 />
//                 <IconButton
//                   type="button"
//                   ariaLabel="show password"
//                   variant="outline"
//                   className="  absolute right-3 top-1/2 translate-y-[-50%]"
//                   onClick={() => setIsShowPass(true)}
//                 >
//                   <RiEyeFill size={20} />
//                 </IconButton>
//               </div>
//             </FormControl>

//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ) : (
//       <FormField
//         control={form.control}
//         name="confirmPassword"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Confirm password</FormLabel>
//             <FormControl>
//               <div className=" relative ">
//                 <Input
//                   className=" pr-10"
//                   disabled={isSigning}
//                   type="text"
//                   placeholder="Confirm password"
//                   {...field}
//                 />
//                 <IconButton
//                   type="button"
//                   ariaLabel=" hide password"
//                   variant="outline"
//                   className="  absolute right-3 top-1/2 translate-y-[-50%]"
//                   onClick={() => setIsShowPass(false)}
//                 >
//                   <RiEyeCloseFill size={20} />
//                 </IconButton>
//               </div>
//             </FormControl>

//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     )}

//     <FormField
//       control={form.control}
//       name="speciality"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Speciality</FormLabel>
//           <FormControl>
//             <Input
//               type="text"
//               placeholder="React"
//               {...field}
//               disabled={isSigning}
//             />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     {/*
//     <FormField
//       control={form.control}
//       name="phone"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Phone</FormLabel>
//           <FormControl>
//             <Input
//               type="text"
//               placeholder="React"
//               {...field}
//               disabled={isSigning}
//             />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     /> */}
//     <FormField
//       control={form.control}
//       name="phone"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Phone number</FormLabel>
//           <FormControl>
//             <InputOTP
//               className=" "
//               disabled={isSigning}
//               aria-label="phone number"
//               maxLength={11}
//               {...field}
//             >
//               <div className=" hidden xs:flex w-full  items-center justify-center">
//                 <InputOTPGroup className=" justify-end phone-input-fields-width-two">
//                   <InputOTPSlot index={0} />
//                   <InputOTPSlot index={1} />
//                   <InputOTPSlot index={2} />
//                 </InputOTPGroup>
//                 <InputOTPSeparator />
//                 <InputOTPGroup className=" phone-input-fields-width justify-center">
//                   <InputOTPSlot index={3} />
//                   <InputOTPSlot index={4} />
//                   <InputOTPSlot index={5} />
//                   <InputOTPSlot index={6} />
//                 </InputOTPGroup>
//                 <InputOTPSeparator />
//                 <InputOTPGroup className=" phone-input-fields-width">
//                   <InputOTPSlot index={7} />
//                   <InputOTPSlot index={8} />
//                   <InputOTPSlot index={9} />
//                   <InputOTPSlot index={10} />
//                 </InputOTPGroup>
//               </div>
//               <div className=" xs:hidden     w-full  items-center">
//                 <InputOTPGroup className="divide-width-type ">
//                   <InputOTPSlot index={0} />
//                   <InputOTPSlot index={1} />
//                   <InputOTPSlot index={2} />
//                   <InputOTPSlot index={3} />
//                   <InputOTPSlot index={4} />
//                   <InputOTPSlot index={5} />
//                   <InputOTPSlot index={6} />
//                   <InputOTPSlot index={7} />
//                   <InputOTPSlot index={8} />
//                   <InputOTPSlot index={9} />
//                   <InputOTPSlot index={10} />
//                 </InputOTPGroup>
//               </div>
//             </InputOTP>
//           </FormControl>
//           <FormDescription>
//             Please enter the one-time password sent to your phone.
//           </FormDescription>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     <p className=" text-sm">
//       Don't have an account?{" "}
//       <Link className=" text-blue-500 underline" to={"/Login"}>
//         Login.
//       </Link>
//     </p>
//     <div className=" flex items-center gap-4 pb-10">
//       <Button size="sm" disabled={isSigning} type="submit">
//         Submit
//       </Button>

//       <Button
//         variant="secondary"
//         size="sm"
//         onClick={() => {
//           form.reset();
//         }}
//         disabled={isSigning}
//         type="button"
//       >
//         Cancel
//       </Button>
//     </div>
//   </form>
// </Form>
// </div>
