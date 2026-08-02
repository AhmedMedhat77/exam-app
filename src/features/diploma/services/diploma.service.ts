import type {
  IDiploma,
  IGetDiplomaParams,
} from '@/features/diploma/types/diploma.d';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse, IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/diplomas';

export default class DiplomaService {
  static getDiplomasApi = async (
    params?: IGetDiplomaParams
  ): Promise<IPaginatedAPIResponse<IDiploma[]>> => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data;
  };

  static getDiplomaByIdApi = async (
    id: string
  ): Promise<IApiResponse<{ diploma: IDiploma } | IDiploma>> => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  };
}
