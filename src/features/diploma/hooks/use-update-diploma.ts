import DiplomaService, {
  type IDiplomaPayload,
} from '@/features/diploma/services/diploma.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IDiplomaPayload }) =>
      DiplomaService.updateDiplomaApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['diplomas'] });
      queryClient.invalidateQueries({
        queryKey: ['diplomas', 'detail', variables.id],
      });
    },
  });
}
