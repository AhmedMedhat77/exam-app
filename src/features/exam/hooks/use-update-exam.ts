import { EXAMS_KEY } from '@/features/exam/constants/exams-key';
import { ExamsService } from '@/features/exam/service/exams.service';
import type { IUpdateExamPayload } from '@/features/exam/types/exams.d';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateExamPayload;
    }) => ExamsService.updateApi(id, payload),
    onSuccess: (_, { id }) => {
      toastUtil('Exam updated successfully', undefined, 'success');
      queryClient.invalidateQueries({
        queryKey: [EXAMS_KEY.all()[0]],
      });
      queryClient.invalidateQueries({
        queryKey: EXAMS_KEY.detail(id),
      });
    },
  });
}
