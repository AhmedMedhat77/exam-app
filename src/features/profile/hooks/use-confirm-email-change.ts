import { PROFILE_QUERY_KEYS } from '@/features/profile/constants/query-keys';
import { ProfileService } from '@/features/profile/services/profile.service';
import type { IConfirmEmailChangeInput } from '@/features/profile/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useConfirmEmailChange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IConfirmEmailChangeInput) =>
      ProfileService.confirmEmailChangeApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEYS.getProfile,
      });
    },
  });
}
