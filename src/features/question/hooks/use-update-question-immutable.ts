import { QUESTION_KEYS } from '@/features/question/constants/question-keys';
import QuestionService from '@/features/question/services/questions.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateQuestionImmutable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, immutable }: { id: string; immutable: boolean }) =>
      QuestionService.updateQuestionImmutableApi(id, immutable),
    onSuccess: () => {
      toastUtil('Question immutability updated', undefined, 'success');
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.allExamQuestions(),
      });
    },
  });
}
