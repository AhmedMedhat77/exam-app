import { z } from 'zod';

export const verifyOtp = z.object({
  email: z.email('Invalid email address'),
  code: z.string().length(6, 'OTP must be 6 digits'),
});

export const verifyOtpApiResponse = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
});

export type VerifyOtpInput = z.infer<typeof verifyOtp>;
