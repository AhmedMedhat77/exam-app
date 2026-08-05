import type { IExamQuestionParams } from '@/features/question/types/questions';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse } from '@/shared/types/api';
import type { IQuestion } from '../types/questions';

const BASE_RUL = '/api/questions';

export default class QuestionService {
  static getExamQuestionsApi = async (
    params: IExamQuestionParams
  ): Promise<IApiResponse<{ questions: IQuestion[] }>> => {
    const { examId, ...rest } = params;

    const { data } = await axiosInstance.get(`${BASE_RUL}/exam/${examId}`, {
      params: rest,
    });

    return data;
  };

  static deleteQuestionApi = async (
    id: string
  ): Promise<IApiResponse<{ message?: string }>> => {
    const { data } = await axiosInstance.delete(`${BASE_RUL}/${id}`);

    return data;
  };

  static createQuestionApi = async (
    payload: import('@/features/question/types/questions').ICreateQuestionPayload
  ): Promise<IApiResponse<{ question: IQuestion }>> => {
    const { data } = await axiosInstance.post(BASE_RUL, payload);

    return data;
  };
}
