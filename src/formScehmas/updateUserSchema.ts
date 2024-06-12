import { validateEgyptianPhoneNumber } from "@/utils/helper";
import { z } from "zod";

const updateUserSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: `password is too short` })
      .max(55, { message: `password is too long.` }),
    email: z.string().min(2).max(50),

    speciality: z.string(),
    socials: z.string(),
    resumeUrl: z.string(),
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

export default updateUserSchema;
