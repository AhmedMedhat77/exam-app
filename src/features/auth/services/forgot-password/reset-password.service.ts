import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';
import type { ResetPasswordPayload } from '@/features/auth/schemas/forgot-password/reset-password.schema';

const URL = '/api/auth/reset-password';

interface IResetPasswordApiResponse {
  status: boolean;
  code: number;
  message: string;
}

export class ResetPasswordService {
  static async resetPasswordApi(
    payload: ResetPasswordPayload
  ): Promise<IResetPasswordApiResponse> {
    try {
      const response = await axiosInstance.post(URL, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(
          error.response.data.message || 'Failed to reset password'
        );
      }
      throw error;
    }
  }
}
