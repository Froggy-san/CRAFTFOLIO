// import React from "react";
// ("use client");
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";
// import useSignUp from "./useSignUp";
// import { validateEgyptianPhoneNumber } from "@/utils/helper";

// const signUpSchema = z
//   .object({
//     username: z
//       .string()
//       .min(6, { message: `password is too short` })
//       .max(55, { message: `password is too long.` }),
//     email: z.string().min(2).max(50),
//     password: z
//       .string()
//       .min(6, { message: `password is too short` })
//       .max(55, { message: `password is too long.` }),

//     confirmPassword: z
//       .string()
//       .min(6, { message: `password is too short` })
//       .max(55, { message: `password is too long.` }),
//     speciality: z.string(),
//     phone: z
//       .string()
//       .min(6, { message: `password is too short` })
//       .max(55, { message: `password is too long.` }),
//   })
//   .refine(
//     (data) => {
//       return validateEgyptianPhoneNumber(data.phone);
//     },
//     {
//       message: `Phone number must match the patterns of Egyptian phone numbers`,
//       path: ["phone"],
//     }
//   )
//   .refine(
//     (data) => {
//       return data.password === data.confirmPassword;
//     },
//     {
//       message: "Passwords don't match. Make sure you typed the right password.",
//       path: ["confirmPassword"],
//     }
//   );
// type sginUpSchemaTypes = z.infer<typeof signUpSchema>;

// const AddProjectForm = () => {
//   const { signUp, isSigning } = useSignUp();

//   const form = useForm<sginUpSchemaTypes>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       speciality: "",
//       username: "",
//     },
//   });
//   function onSubmit(values: sginUpSchemaTypes) {
//     signUp(values);
//   }
//   return (
//     <div className="w-[94%] mx-auto  overflow-y-auto h-[81%] mt-32 px-3">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="cartfoilio200"
//                     {...field}
//                     disabled={isSigning}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="craftfolio@me.com"
//                     {...field}
//                     disabled={isSigning}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     {...field}
//                     disabled={isSigning}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Repeat the Password"
//                     {...field}
//                     disabled={isSigning}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="speciality"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Speciality</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="React"
//                     {...field}
//                     disabled={isSigning}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="React"
//                     {...field}
//                     disabled={isSigning}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <p className=" text-sm">
//             Don't have an account?{" "}
//             <Link className=" text-blue-500 underline" to={"/Login"}>
//               Login.
//             </Link>
//           </p>
//           <div className=" flex items-center gap-4 pb-10">
//             <Button size="sm" disabled={isSigning} type="submit">
//               Submit
//             </Button>

//             <Button
//               variant="secondary"
//               size="sm"
//               onClick={() => {
//                 form.reset();
//               }}
//               disabled={isSigning}
//               type="button"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AddProjectForm;
