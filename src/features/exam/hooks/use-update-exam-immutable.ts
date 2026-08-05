import { EXAMS_KEY } from '@/features/exam/constants/exams-key';
import { ExamsService } from '@/features/exam/service/exams.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateExamImmutable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, immutable }: { id: string; immutable: boolean }) =>
      ExamsService.updateImmutableApi(id, immutable),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [EXAMS_KEY.all()[0]],
      });
      queryClient.invalidateQueries({
        queryKey: EXAMS_KEY.detail(id),
      });
    },
  });
}
