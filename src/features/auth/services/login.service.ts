import type { LoginInput } from '@/features/auth/schemas/login/login.schema';
import type { LoginResponse } from '@/features/auth/types/login.d';
import { axiosInstance } from '@/shared/lib/axios';

const URL = '/api/auth';

export class LoginService {
  static async loginApi(payload: LoginInput): Promise<LoginResponse> {
    const response = await axiosInstance.post(`${URL}/login`, payload);
    return response.data;
  }
}
