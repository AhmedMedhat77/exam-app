import { z } from 'zod';

export const verifyOtpSchema = z.object({
  email: z.email('Invalid email address'),
  code: z
    .array(z.number())
    .length(6, 'OTP must be 6 digits')
    .transform((arr) => arr.join('')),
});

export const verifyOtpApiResponse = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
