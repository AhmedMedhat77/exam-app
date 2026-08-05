import type {
  ICreateQuestionPayload,
  IExamQuestionParams,
  IQuestion,
  IUpdateQuestionPayload,
} from '@/features/question/types/questions';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse } from '@/shared/types/api';

const BASE_URL = '/api/questions';

export default class QuestionService {
  static getExamQuestionsApi = async (
    params: IExamQuestionParams
  ): Promise<IApiResponse<{ questions: IQuestion[] }>> => {
    const { examId, ...rest } = params;

    const { data } = await axiosInstance.get(`${BASE_URL}/exam/${examId}`, {
      params: rest,
    });

    return data;
  };

  static getQuestionByIdApi = async (
    id: string
  ): Promise<IApiResponse<{ question: IQuestion } | IQuestion>> => {
    const { data } = await axiosInstance.get(`${BASE_URL}/${id}`);
    return data;
  };

  static deleteQuestionApi = async (
    id: string
  ): Promise<IApiResponse<{ message?: string }>> => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return data;
  };

  static createQuestionApi = async (
    payload: ICreateQuestionPayload
  ): Promise<IApiResponse<{ question: IQuestion }>> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  };

  static updateQuestionApi = async (
    id: string,
    payload: IUpdateQuestionPayload
  ): Promise<IApiResponse<{ question: IQuestion }>> => {
    const { data } = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
    return data;
  };

  static updateQuestionImmutableApi = async (
    id: string,
    immutable: boolean
  ): Promise<IApiResponse<{ message?: string }>> => {
    const { data } = await axiosInstance.patch(
      `/api/admin/questions/${id}/immutable`,
      { immutable }
    );
    return data;
  };
}
