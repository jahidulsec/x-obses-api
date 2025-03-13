import { z } from "zod";

export const createBlogDTOSchema = z.object({
  title: z.string(),
  description: z.string(),
  details: z.string(),
  imagePath: z.string(),
  readTime: z.coerce.number(),
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
