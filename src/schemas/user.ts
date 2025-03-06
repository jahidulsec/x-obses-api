import { z } from "zod";
import { phoneRegex } from "../utils/regex";

export const createUserDTOSchema = z.object({
  mobile: z.string().regex(phoneRegex, { message: "Invalid phone number" }),
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  image: z.string().optional(),
  birth: z.coerce.date().optional(),
  address: z.string().optional(),
  heightFt: z.number().optional(),
  heightIn: z.number().optional(),
  weight: z.number().optional(),
});

export const updateUserDTOSchema = createUserDTOSchema.omit({}).partial();

export const usersQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortBy: z.string().default("updatedAt"),
  page: z.coerce.number().int().default(1),
  size: z.coerce.number().default(20),
  search: z.string().optional(),
});

export type createUserInputsTypes = z.infer<typeof createUserDTOSchema>;
export type updateUserInputTypes = z.infer<typeof updateUserDTOSchema>;
export type usersQueryInputTypes = z.infer<typeof usersQuerySchema>;
