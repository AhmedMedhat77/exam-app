import type { RequestPasswordResetPayload } from '@/features/auth/schemas/forgot-passowrd/forgot-password.schema';
import { axiosInstance } from '@/shared/lib/axios';

const FORGOT_PASSWORD_URL = '/api/auth/forgot-password';

export class ForgotPasswordService {
  static async forgotPassword(payload: RequestPasswordResetPayload) {
    const response = await axiosInstance.post(FORGOT_PASSWORD_URL, payload);
    return response.data;
  }
}
