import { z } from "zod";

export const noticeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  body: z
    .string()
    .min(10, "Body must be at least 10 characters"),

  category: z.enum([
    "EXAM",
    "EVENT",
    "GENERAL",
  ]),

  priority: z.enum([
    "NORMAL",
    "URGENT",
  ]),

  publishDate: z.string().min(1, "Publish date is required"),
});

export type NoticeFormData = z.infer<typeof noticeSchema>;