import { z } from "zod";

export const colorSchema = z.object({
  r: z.number(),
  g: z.number(),
  b: z.number(),
  a: z.number(),
});

export const silderColorSchema = z.object({
  r: z.number(),
  g: z.number(),
  b: z.number(),
});
