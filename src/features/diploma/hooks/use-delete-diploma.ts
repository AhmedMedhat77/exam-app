import { DIPLOMA_QUERY_KEYS } from '@/features/diploma/constants/diploma-keys';
import DiplomaService from '@/features/diploma/services/diploma.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DiplomaService.deleteDiplomaApi(id),
    onSuccess: (_, id) => {
      toastUtil('Diploma deleted successfully', undefined, 'success');
      queryClient.invalidateQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.all,
      });
      queryClient.removeQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.getById(id),
      });
    },
  });
}
