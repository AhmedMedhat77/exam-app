import type { IExam, IGetExamsParams } from '@/features/exam/types/exams.d';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse, IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/exams';

export class ExamsService {
  static async getAllApi(
    params?: IGetExamsParams
  ): Promise<IPaginatedAPIResponse<IExam[]>> {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response?.data;
  }

  static async getByIdApi(id: string): Promise<IApiResponse<{ exam: IExam }>> {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response?.data;
  }
}
