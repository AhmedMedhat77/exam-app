import type { IExam, IGetExamsParams } from '@/features/exam/types/exams.types';
import { axiosInstance } from '@/shared/lib/axios';
import type { IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/v1/exams';

export class ExamsService {
  static async getAll(
    params?: IGetExamsParams
  ): Promise<IPaginatedAPIResponse<IExam[]>> {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response?.data;
  }
}
