import z from "zod";
import { phoneRegex } from "../utils/regex";

export const createLoginDTOSchema = z.object({
  mobile: z.string().regex(phoneRegex, "Invalid number!"),
});

export const createOtpDtoSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  type: z.enum(["login", "signup"]),
});

export type createLoginInputTypes = z.infer<typeof createLoginDTOSchema>;
export type createOtpInputTypes = z.infer<typeof createOtpDtoSchema>;
