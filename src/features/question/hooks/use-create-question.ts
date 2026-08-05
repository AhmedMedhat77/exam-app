import QuestionService from '@/features/question/services/questions.service';
import type { ICreateQuestionPayload } from '@/features/question/types/questions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateQuestionPayload) =>
      QuestionService.createQuestionApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.allExamQuestions(),
      });
    },
  });
}
