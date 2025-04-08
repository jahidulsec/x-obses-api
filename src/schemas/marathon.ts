import { z } from "zod";

export const createMarathonDTOSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  about: z.string().min(3),
  distanceKm: z.coerce.number().min(0.001),
  location: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  rewards: z.array(z.string()).optional(),
  reward: z.string().min(2),
  imagePath: z.string().optional(),
  type: z.enum(["onsite", "virtual"]),
  createdBy: z.string().optional(),
});

export const updateMarathonDTOSchema = createMarathonDTOSchema
  .omit({})
  .partial();

export const marathonsQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  type: z.enum(["onsite", "virtual"]).optional(),
  active: z.enum(["0", "1"]).optional(),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
});

export type createMarathonInputsTypes = z.infer<typeof createMarathonDTOSchema>;
export type updateMarathonInputTypes = z.infer<typeof updateMarathonDTOSchema>;
export type marathonsQueryInputTypes = z.infer<typeof marathonsQuerySchema>;
