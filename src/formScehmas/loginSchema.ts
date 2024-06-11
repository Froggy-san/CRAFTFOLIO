import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(2).max(50),
  password: z
    .string()
    .min(6, { message: `password is too short` })
    .max(55, { message: `password is too long.` }),
});

export default loginSchema;
