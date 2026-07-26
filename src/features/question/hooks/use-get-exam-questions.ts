import QuestionService from '@/features/question/services/questions.service';
import type { IExamQuestionParams } from '@/features/question/types/questions';
import { useQuery } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

export default function useGetExamQuestions(params?: IExamQuestionParams) {
  return useQuery({
    queryKey: QUESTION_KEYS.allExamQuestions(params),
    queryFn: () => QuestionService.getExamQuestionsApi({ ...params }),
    enabled: !!params?.examId,
  });
}
