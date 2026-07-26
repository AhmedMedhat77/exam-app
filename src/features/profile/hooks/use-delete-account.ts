import { ProfileService } from '@/features/profile/services/profile.service';
import { useUserStore } from '@/features/user/store/user.store';
import { useMutation } from '@tanstack/react-query';

export function useDeleteAccount() {
  const logout = useUserStore((state) => state.logout);

  return useMutation({
    mutationFn: () => ProfileService.deleteAccountApi(),
    onSuccess: () => {
      logout();
    },
  });
}
