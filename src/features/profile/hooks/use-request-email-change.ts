import { ProfileService } from '@/features/profile/services/profile.service';
import type { IRequestEmailChangeInput } from '@/features/profile/types/user';
import { useMutation } from '@tanstack/react-query';

export function useRequestEmailChange() {
  return useMutation({
    mutationFn: (payload: IRequestEmailChangeInput) =>
      ProfileService.requestEmailChangeApi(payload),
  });
}
