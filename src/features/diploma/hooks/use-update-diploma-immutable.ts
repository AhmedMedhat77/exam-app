import { DIPLOMA_QUERY_KEYS } from '@/features/diploma/constants/diploma-keys';
import DiplomaService from '@/features/diploma/services/diploma.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateDiplomaImmutable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, immutable }: { id: string; immutable: boolean }) =>
      DiplomaService.updateImmutableDiplomaApi(id, immutable),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.all,
      });
      queryClient.invalidateQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.getById(id),
      });
    },
  });
}
