import QuestionService from '@/features/question/services/questions.service';
import type { ICreateBulkQuestionsPayload } from '@/features/question/types/questions';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

export function useCreateBulkQuestions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateBulkQuestionsPayload) => {
      await QuestionService.createQuestionBulkApi(payload);
    },
    onSuccess: () => {
      toastUtil(`Question(s) created successfully`, 'success');
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.allExamQuestions(),
      });
    },
  });
}
