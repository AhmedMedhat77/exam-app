import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string('Username is required')
    .min(2, 'Username must be at least 2 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
