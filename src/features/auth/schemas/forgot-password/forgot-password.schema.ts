import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid registered email address'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export interface RequestPasswordResetPayload {
  email: string;
  redirectUrl: string;
}
