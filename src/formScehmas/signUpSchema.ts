import { validateEgyptianPhoneNumber } from "@/utils/helper";
import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: `password is too short` })
      .max(55, { message: `password is too long.` }),
    email: z.string().min(2).max(50),
    password: z
      .string()
      .min(6, { message: `password is too short` })
      .max(55, { message: `password is too long.` }),

    confirmPassword: z
      .string()
      .min(6, { message: `password is too short` })
      .max(55, { message: `password is too long.` }),
    speciality: z.string(),
    phone: z.string().max(55, { message: `password is too long.` }),
  })
  .refine(
    (data) => {
      return validateEgyptianPhoneNumber(data.phone);
    },
    {
      message: `Phone number must match the patterns of Egyptian phone numbers`,
      path: ["phone"],
    }
  )
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match. Make sure you typed the right password.",
      path: ["confirmPassword"],
    }
  );

export default signUpSchema;
