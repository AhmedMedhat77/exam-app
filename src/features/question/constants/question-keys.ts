import type { IExamQuestionParams } from '@/features/question/types/questions';

export const QUESTION_KEYS = {
  allExamQuestions: (params?: IExamQuestionParams) => [
    'exam',
    'question',
    { ...params },
  ],
  questionDetail: (id: string) => ['question', id],
};
