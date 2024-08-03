import { z } from "zod";
import { colorSchema } from "./colorSchema";

export const landingPageSchma = z
  .object({
    primaryText: z.string().max(100, {
      message: `text is too long.`,
    }),
    secondaryText: z
      .string()
      .max(600, { message: `Text must be no more than (150)char.` }),
    tertiaryText: z
      .string()
      .max(450, { message: `Text must be no more than (150)char.` }),
    socials: z.string().array().default([]),

    grainyTexture: z.boolean(),
    blur: z.boolean(),
    textColor: colorSchema,
    avatar: z.custom<File[]>(),
    landingImage: z.custom<File[]>(),
  })
  .refine((data) => data.socials.length <= 5, {
    message: "You can add a maximum of 5 social media links.",
    path: ["socials"], // Specify the path for targeted error display
  });
