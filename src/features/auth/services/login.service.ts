import type { LoginInput } from '@/features/auth/schemas/login/login.schema';
import type { LoginResponse } from '@/features/auth/types/login.d';
import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';

const URL = '/api/auth';

export class LoginService {
  static async login(payload: LoginInput): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post(`${URL}/login`, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw error;
    }
  }
}
