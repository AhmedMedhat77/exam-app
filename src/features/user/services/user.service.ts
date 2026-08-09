import type {
  IGetUsersParams,
  IUserItem,
} from '@/features/user/types/user-api.d';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse, IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/admin/users';

export class UserService {
  static getUsersApi = async (
    params?: IGetUsersParams
  ): Promise<IPaginatedAPIResponse<IUserItem[]>> => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data;
  };

  static getUserByIdApi = async (
    id: string
  ): Promise<IApiResponse<{ user: IUserItem }>> => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  };
}

export default UserService;
