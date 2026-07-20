import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';
import type { LoginInput } from '@/features/auth/schemas/login.schema';

const URL = '/api/auth';

export class LoginService {
  static async login(payload: LoginInput): Promise<void> {
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
