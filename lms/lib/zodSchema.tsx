import { z } from "zod";

export const courseLEvels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Deveopment",
  "Bussiness",
  "finance",
  "IT & Software",
  "Office productivity",
  "teaching",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least three characters long " })
    .max(100, { message: "Title must be at most 100 characters long " }),
  description: z
    .string()
    .min(3, { message: "Description must be at least three characters long " }),
  fileKey: z.string().min(1, { message: "File is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hourslong " })
    .max(500, { message: "Title must be at most 500 hours long " }),
  level: z.enum(courseLEvels, { message: "levels is required" }),
  category: z.enum(courseCategories, { message: "Cateories error" }),
  smallDescription: z
    .string()
    .min(3, {
      message: "smallDescription must be at least three characters long ",
    })
    .max(200, {
      message: "smallDescription must be at most 200 characters long ",
    }),
  slug: z.string().min(3, {
    message: "slug must be at least three characters long ",
  }),
  status: z.enum(courseStatus, {
    message: "status is required ",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
