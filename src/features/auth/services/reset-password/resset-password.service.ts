import type { ResetPasswordPayload } from '@/features/auth/schemas/forgot-passowrd/forgot-password.schema';
import { axiosInstance } from '@/shared/lib/axios';

const BASE_URL = '/api/auth/reset-password';

export class ResetPasswordService {
  static async resetPassword(payload: ResetPasswordPayload) {
    const response = await axiosInstance.post(BASE_URL, payload);
    return response.data;
  }
}
