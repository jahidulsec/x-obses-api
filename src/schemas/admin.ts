import { z } from "zod";

export const createAdminDTOSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(3),
  role: z.enum(["admin", "superadmin"]),
});

export const adminLoginDTOSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const updateAdminDTOSchema = createAdminDTOSchema.omit({}).partial();

export const adminsQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortBy: z.string().default("updatedAt"),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
});

export type createAdminInputsTypes = z.infer<typeof createAdminDTOSchema>;
export type updateAdminInputTypes = z.infer<typeof updateAdminDTOSchema>;
export type adminsQueryInputTypes = z.infer<typeof adminsQuerySchema>;
export type adminsLoginInputTypes = z.infer<typeof adminLoginDTOSchema>;
