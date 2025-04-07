import { z } from "zod";

export const createWorkOutDTOSchema = z.object({
  userId: z.string(),
  calories: z.coerce.number().optional(),
  distanceKm: z.coerce.number().optional(),
  heartPts: z.coerce.number().optional(),
  workoutTime: z.coerce.number().optional(),
  type: z.enum(["running", "walking", "cycling"]).optional(),
  durationMs: z.coerce.number().optional(),
});

export const updateWorkOutDTOSchema = createWorkOutDTOSchema.omit({}).partial();

export const workOutsQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortBy: z.string().default("updatedAt"),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
  view: z.enum(["daily", "weekly", "monthly"]).default("daily").optional(),
});

export type createWorkOutInputsTypes = z.infer<typeof createWorkOutDTOSchema>;
export type updateWorkOutInputTypes = z.infer<typeof updateWorkOutDTOSchema>;
export type workOutsQueryInputTypes = z.infer<typeof workOutsQuerySchema>;

export const createStepsDTOSchema = z.object({
  userId: z.string(),
  steps: z.coerce.number().min(1),
  createdAt: z.coerce.date(),
});

export type createStepsInputsTypes = z.infer<typeof createStepsDTOSchema>;
