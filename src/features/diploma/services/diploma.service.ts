import type {
  IDiploma,
  IGetDiplomaParams,
} from '@/features/diploma/types/diploma.types';
import { axiosInstance } from '@/shared/lib/axios';
import type { IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/diplomas';

export default class DiplomaService {
  static getDiplomas = async (
    params?: IGetDiplomaParams
  ): Promise<IPaginatedAPIResponse<IDiploma[]>> => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data;
  };
}
