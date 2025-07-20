import { z } from "zod";

export const createBannerDTOSchema = z.object({
  title: z.string().min(3),
  imagePath: z.string().min(3),
});

export const updateBannerDTOSchema = createBannerDTOSchema
  .omit({})
  .partial();

export const bannersQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
});

export type createBannerInputsTypes = z.infer<typeof createBannerDTOSchema>;
export type updateBannerInputTypes = z.infer<typeof updateBannerDTOSchema>;
export type bannersQueryInputTypes = z.infer<typeof bannersQuerySchema>;
