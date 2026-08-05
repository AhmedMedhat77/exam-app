import QuestionService from '@/features/question/services/questions.service';
import type { ICreateBulkQuestionsPayload } from '@/features/question/types/questions';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUESTION_KEYS } from '../constants/question-keys';

export function useCreateBulkQuestions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateBulkQuestionsPayload) => {
      // Promise.all to create questions sequentially/in parallel for the given exam
      const results = await Promise.all(
        payload.questions.map((q) =>
          QuestionService.createQuestionApi({
            examId: payload.examId,
            text: q.text,
            answers: q.answers,
          })
        )
      );
      return results;
    },
    onSuccess: (data) => {
      toastUtil(
        `${data.length} question(s) created successfully`,
        undefined,
        'success'
      );
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.allExamQuestions(),
      });
    },
  });
}
