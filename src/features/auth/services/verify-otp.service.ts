import { axiosInstance } from '@/shared/lib/axios';
import axios from 'axios';
import {
  verifyOtpApiResponse,
  type VerifyOtpInput,
} from '@/features/auth/schemas/verify-otp.schema';

const VERIFY_URL = '/api/auth/confirm-email-verification';

interface IVerifyOtpApiResponse {
  status: boolean;
  code: number;
  message: string;
}

export class VerifyOtpService {
  static async verifyOtp(
    payload: VerifyOtpInput
  ): Promise<IVerifyOtpApiResponse> {
    try {
      const response = await axiosInstance.post(VERIFY_URL, payload);
      return verifyOtpApiResponse.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(
          error.response.data.message || 'OTP Verification Failed'
        );
      }
      throw error;
    }
  }
}
