import type { IPaginatedParams } from '@/shared/types/api';

export interface IUserItem {
  id: string;
  username: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  profilePhoto?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

export interface IGetUsersParams extends IPaginatedParams {
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  immutable?: boolean;
  sortBy?: 'username' | 'email' | 'role' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}
