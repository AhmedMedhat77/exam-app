import { EXAMS_KEY } from '@/features/exam/constants/exams-key';
import { ExamsService } from '@/features/exam/service/exams.service';
import type { ICreateExamPayload } from '@/features/exam/types/exams.d';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateExamPayload) =>
      ExamsService.createApi(payload),
    onSuccess: () => {
      toastUtil('Exam created successfully', undefined, 'success');
      queryClient.invalidateQueries({
        queryKey: [EXAMS_KEY.all()],
      });
    },
  });
}
