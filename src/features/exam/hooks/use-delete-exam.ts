import { EXAMS_KEY } from '@/features/exam/constants/exams-key';
import { ExamsService } from '@/features/exam/service/exams.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ExamsService.deleteApi(id),
    onSuccess: () => {
      toastUtil('Exam deleted successfully', 'success');
      queryClient.invalidateQueries({
        queryKey: [EXAMS_KEY.all()[0]],
      });
    },
  });
}
