import type { IExamQuestionParams } from '@/features/question/types/questions';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse } from '@/shared/types/api';
import type { IQuestion } from '../types/questions';

const BASE_RUL = '/api/questions';

export default class QuestionService {
  static getExamQuestions = async (
    params: IExamQuestionParams
  ): Promise<IApiResponse<{ questions: IQuestion[] }>> => {
    const { examId, ...rest } = params;

    const { data } = await axiosInstance.get(`${BASE_RUL}/exam/${examId}`, {
      params: rest,
    });

    return data;
  };
}
