import { z } from "zod";

export const createBlogDTOSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  details: z.string().min(3),
  imagePath: z.string().min(3),
  readTime: z.coerce.number().min(1),
  createdBy: z.string().optional(),
});

export const updateBlogDTOSchema = createBlogDTOSchema
  .omit({})
  .partial();

export const blogsQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
});

export type createBlogInputsTypes = z.infer<typeof createBlogDTOSchema>;
export type updateBlogInputTypes = z.infer<typeof updateBlogDTOSchema>;
export type blogsQueryInputTypes = z.infer<typeof blogsQuerySchema>;
