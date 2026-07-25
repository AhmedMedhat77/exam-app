import { ProfileService } from '@/features/profile/services/profile.service';
import type { IChangePasswordInput } from '@/features/profile/types/user';
import { useMutation } from '@tanstack/react-query';

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: IChangePasswordInput) =>
      ProfileService.changePassword(payload),
  });
}
