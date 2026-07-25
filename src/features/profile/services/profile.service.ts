import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse } from '@/shared/types/api';
import type { IUser } from '../types/user';

const BASE_URL = '/api/users';
export class ProfileService {
  static fetchProfile = async (): Promise<IApiResponse<{ user: IUser }>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/profile`);
    return data;
  };
}
