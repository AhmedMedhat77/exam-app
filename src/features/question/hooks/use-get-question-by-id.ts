import QuestionService from '@/features/question/services/questions.service';
import { useQuery } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

export function useGetQuestionById(id: string) {
  return useQuery({
    queryKey: QUESTION_KEYS.questionDetail(id),
    queryFn: () => QuestionService.getQuestionByIdApi(id),
    enabled: Boolean(id),
  });
}
