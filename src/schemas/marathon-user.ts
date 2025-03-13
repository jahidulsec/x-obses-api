import { z } from "zod";

export const createMarathonUserDTOSchema = z.object({
  userId: z.string(),
  marathonId: z.string(),
  distanceKm: z.coerce.number().optional(),
  durationMs: z.coerce.number().optional(),
});

export const updateMarathonUserDTOSchema = createMarathonUserDTOSchema
  .omit({
    userId: true,
    marathonId: true
  })
  .partial();

export const marathonUsersQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  type: z.enum(["onsite", "virtual"]).default('virtual').optional(),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
});

export type createMarathonUserInputsTypes = z.infer<typeof createMarathonUserDTOSchema>;
export type updateMarathonUserInputTypes = z.infer<typeof updateMarathonUserDTOSchema>;
export type marathonUsersQueryInputTypes = z.infer<typeof marathonUsersQuerySchema>;
