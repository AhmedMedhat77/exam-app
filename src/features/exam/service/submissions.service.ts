import type {
  IGetSubmissionByIdPayload,
  IGetSubmissionsParams,
  ISubmission,
  ISubmitExamPayload,
} from '@/features/exam/types/submissions';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse, IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/submissions';

export class SubmissionsService {
  static submitExam = async (
    payload: ISubmitExamPayload
  ): Promise<IApiResponse<unknown>> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  };

  static getSubmissions = async (
    params?: IGetSubmissionsParams
  ): Promise<IPaginatedAPIResponse<ISubmission[]>> => {
    const { data } = await axiosInstance.get(BASE_URL, { params });
    return data;
  };

  static getSubmissionById = async (
    id: string
  ): Promise<IApiResponse<IGetSubmissionByIdPayload>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/${id}`);
    return data;
  };
}

export default SubmissionsService;
