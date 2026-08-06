import QuestionService from '@/features/question/services/questions.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => QuestionService.deleteQuestionApi(id),
    onSuccess: () => {
      toastUtil('Question deleted successfully', 'success');
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.allExamQuestions(),
      });
    },
  });
}
