import { isValidUrl } from "@/utils/helper";
import { isAfter, isBefore } from "date-fns";
import { z } from "zod";

export const projectFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Post name must is too short." })
      .max(50, { message: `Post name is too long.` }),
    type: z
      .string()
      .min(6, { message: `Post type is too short.` })
      .max(55, { message: `Post type is too long.` }),

    description: z
      .string()
      .min(6, { message: `Post description is too short.` }),
    technologies: z.string().array().default([]),

    links: z
      .object({
        description: z.string().min(4, {
          message: "Description is required and must be at least 4 characters.",
        }),
        url: z
          .string()
          .min(4, {
            message: "URL is required and must be at least 4 characters.",
          })
          .refine((text) => isValidUrl(text), {
            message: "This url in not a vaild url.",
          }),
      })
      .array(),
    startDate: z.date(),
    endDate: z.date(),
    contributors: z
      .object({
        avatar: z.string(),
        userId: z.string(),
        email: z.string(),
        username: z.string(),
      })
      .array(),

    projectImages: z.custom<File[]>(),
  })
  .refine(
    (data) => {
      return isBefore(data.startDate, data.endDate);
    },
    {
      message: "Start date must be before end date",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      return isAfter(data.endDate, data.startDate);
    },
    {
      message: "Start date must be before end date",
      path: ["endDate"],
    }
  );
