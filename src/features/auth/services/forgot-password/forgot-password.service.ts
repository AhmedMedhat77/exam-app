import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';
import type { RequestPasswordResetPayload } from '@/features/auth/schemas/forgot-password/forgot-password.schema';

const URL = '/api/auth/forgot-password';

interface IForgotPasswordApiResponse {
  status: boolean;
  code: number;
  message: string;
}

export class ForgotPasswordService {
  static async forgotPassword(
    payload: RequestPasswordResetPayload
  ): Promise<IForgotPasswordApiResponse> {
    try {
      const response = await axiosInstance.post(URL, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(
          error.response.data.message || 'Failed to send reset email'
        );
      }
      throw error;
    }
  }
}
