import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  image: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal(""))
});