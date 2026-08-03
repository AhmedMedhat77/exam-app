import { DIPLOMA_QUERY_KEYS } from '@/features/diploma/constants/diploma-keys';
import DiplomaService, {
  type IDiplomaPayload,
} from '@/features/diploma/services/diploma.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IDiplomaPayload) =>
      DiplomaService.createDiplomaApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DIPLOMA_QUERY_KEYS.diplomas.all,
      });
    },
  });
}
