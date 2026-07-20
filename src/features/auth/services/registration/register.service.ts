import { z } from 'zod';
import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';

const URL = '/api/auth/register';

export const registerApiResponse = z.object({
  status: z.boolean(),
  code: z.number(),
  payload: z.object({
    user: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      phone: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      emailVerified: z.boolean(),
      phoneVerified: z.boolean(),
      role: z.string(),
      createdAt: z.string(),
    }),
    token: z.string(),
  }),
});

export type IRegisterApiResponse = z.infer<typeof registerApiResponse>;

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export class RegisterService {
  static async register(
    payload: RegisterPayload
  ): Promise<IRegisterApiResponse> {
    try {
      const response = await axiosInstance.post(URL, payload);
      return registerApiResponse.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw error;
    }
  }
}
