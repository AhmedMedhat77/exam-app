import type { ISubmitExamPayload } from '@/features/exam/types/submissions';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse } from '@/shared/types/api';

const BASE_URL = '/api/submissions';

export class SubmissionsService {
  static submitExam = async (
    payload: ISubmitExamPayload
  ): Promise<IApiResponse<unknown>> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  };
}

export default SubmissionsService;
