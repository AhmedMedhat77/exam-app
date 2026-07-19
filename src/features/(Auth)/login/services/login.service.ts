import { axiosInstance } from '@/shared/lib/axios';

const URL = '/api/auth/login';

export class LoginService {
  async login(email: string, password: string): Promise<void> {
    const response = await axiosInstance.post(`${URL}/login`, {
      email,
      password,
    });
    return response.data;
  }
}
