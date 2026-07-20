import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';
import {
  sendVerificationCodeApiResponse,
  type EmailFormValues,
} from '@/features/auth/schemas/registration/email.schema';

const URL = '/api/auth/send-email-verification';

interface ISendVerificationCodeApiResponse {
  status: boolean;
  code: number;
  message: string;
}

export class EmailVerificationService {
  static async sendVerificationEmail(
    payload: EmailFormValues
  ): Promise<ISendVerificationCodeApiResponse> {
    try {
      const response = await axiosInstance.post(URL, payload);
      return sendVerificationCodeApiResponse.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(error.response.data.message || 'Email Sent Failed');
      }
      throw error;
    }
  }
}
