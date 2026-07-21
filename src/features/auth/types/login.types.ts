import type { User } from '@/features/user/types/user.types';

export type { User };

export interface LoginPayload {
  user: User;
  token: string;
}

export interface LoginResponse {
  status: boolean;
  code: number;
  payload: LoginPayload;
}
