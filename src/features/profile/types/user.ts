import type { changePasswordSchema } from '@/features/profile/schema/change-password.schema';
import type { confirmEmailChangeSchema } from '@/features/profile/schema/confirm-email-change.schema';
import type { requestEmailChangeSchema } from '@/features/profile/schema/request-email-change.schema';
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
  SUPER_ADMIN: 'SUPER_ADMIN',
  USER: 'USER',
} as const;

export type IUpdateForm = z.infer<typeof updateprofileSchema>;

export type IUpdateProfilePayload = Partial<
  Pick<IUser, 'firstName' | 'lastName' | 'profilePhoto' | 'phone'>
>;

export type IChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type IRequestEmailChangeInput = z.infer<typeof requestEmailChangeSchema>;
export type IConfirmEmailChangeInput = z.infer<typeof confirmEmailChangeSchema>;
