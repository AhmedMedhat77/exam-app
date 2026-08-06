import QuestionService from '@/features/question/services/questions.service';
import type { IUpdateQuestionPayload } from '@/features/question/types/questions';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

interface UpdateQuestionArgs {
  id: string;
  payload: IUpdateQuestionPayload;
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateQuestionArgs) =>
      QuestionService.updateQuestionApi(id, payload),
    onSuccess: (_, { id }) => {
      toastUtil('Question updated successfully', 'success');
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.questionDetail(id),
      });
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.allExamQuestions(),
      });
    },
  });
}
