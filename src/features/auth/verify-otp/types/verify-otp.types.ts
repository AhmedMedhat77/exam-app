import type z from 'zod';
import type { verifyOtpSchema } from '../validation/verify-otp.schema';

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
