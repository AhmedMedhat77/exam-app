import { ROUTES } from '@/app/routes';
import type { ResetPasswordPayload } from '@/features/auth/schemas/forgot-password/reset-password.schema';
import { ResetPasswordService } from '@/features/auth/services/forgot-password/reset-password.service';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordPayload) =>
      ResetPasswordService.resetPassword(data),
    onSuccess: () => {
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
}
