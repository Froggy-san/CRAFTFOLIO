import { validateEmail } from "@/utils/helper";
import { z } from "zod";

const loginSchema = z
  .object({
    email: z
      .string()
      .min(2, { message: "Please enter a vaild email." })
      .max(50, { message: "Email is too long." }),
    password: z
      .string()
      .min(6, { message: `password is too short.` })
      .max(55, { message: `password is too long.` }),
  })
  .refine((data) => validateEmail(data.email), {
    message: "Please enter a vaild email.",
    path: ["email"],
  });

export default loginSchema;
