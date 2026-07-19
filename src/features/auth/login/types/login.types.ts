import type z from 'zod';
import type { loginSchema } from '../validation/login.schema';

export type LoginInput = z.infer<typeof loginSchema>;
