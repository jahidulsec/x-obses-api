import { z } from "zod";

export const createWorkOutPlanDTOSchema = z.object({
  userId: z.string(),
  bmi: z.coerce.number().optional(),
  weightGoal: z.coerce.number(),
  goalType: z.enum(["gain_muscle", "keep_fit", "lose_weight"]),
  workoutTime: z.coerce.number().optional(),
  workoutDays: z.string().optional(),
  activateReminder: z.boolean().optional(),
  reminderTime: z.coerce.date().optional(),
  totalDays: z.coerce.number().optional(),
  consumption: z.coerce.number().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const updateWorkOutPlanDTOSchema = createWorkOutPlanDTOSchema
  .omit({})
  .partial();

export const workOutPlansQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortBy: z.string().default("updatedAt"),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
  view: z.enum(["daily", "weekly", "monthly"]).default("daily").optional(),
});

export type createWorkOutPlanInputsTypes = z.infer<
  typeof createWorkOutPlanDTOSchema
>;
export type updateWorkOutPlanInputTypes = z.infer<
  typeof updateWorkOutPlanDTOSchema
>;
export type workOutPlansQueryInputTypes = z.infer<
  typeof workOutPlansQuerySchema
>;
