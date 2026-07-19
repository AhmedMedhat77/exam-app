import { z } from 'zod';

export const createAccount = z.object({
  email: z.email('Invalid email address'),
});

export const sendVerificationCodeApiResponse = z.object({
  status: z.boolean(),
  code: z.number(),
  message: z.string(),
});

export type CreateAccountInput = z.infer<typeof createAccount>;
