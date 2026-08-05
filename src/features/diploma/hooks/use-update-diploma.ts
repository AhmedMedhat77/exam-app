import { DIPLOMA_QUERY_KEYS } from '@/features/diploma/constants/diploma-keys';
import DiplomaService, {
  type IDiplomaPayload,
} from '@/features/diploma/services/diploma.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IDiplomaPayload }) =>
      DiplomaService.updateDiplomaApi(id, payload),
    onSuccess: (_, variables) => {
      toastUtil('Diploma updated successfully', undefined, 'success');
      queryClient.invalidateQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.all,
      });
      queryClient.invalidateQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.getById(variables.id),
      });
    },
  });
}
