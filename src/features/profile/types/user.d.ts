import type { updateprofileSchema } from '@/features/profile/schema/update-profile.schema';
import type z from 'zod';

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: (typeof ROLE_ENUM)[keyof typeof ROLE_ENUM];
  createdAt: string;
  updatedAt: string;
}

export const ROLE_ENUM = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type IUpdateForm = z.infer<typeof updateprofileSchema>;
