import z from "zod";

export const calendarQuerySchema = z.object({
  year: z.coerce.number().optional(),
  month: z.coerce.number().max(12).optional(),
});

export type calendarQueryType = z.infer<typeof calendarQuerySchema>;
