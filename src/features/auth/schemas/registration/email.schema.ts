import { z } from 'zod';

export const emailSchema = z.object({
  email: z.email('Invalid email address'),
});

export const sendVerificationCodeApiResponse = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
