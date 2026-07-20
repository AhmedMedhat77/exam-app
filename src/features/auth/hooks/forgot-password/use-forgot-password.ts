import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import type { ForgotPasswordFormValues } from '@/features/auth/schemas/forgot-password/forgot-password.schema';
import { ForgotPasswordService } from '@/features/auth/services/forgot-password/forgot-password.service';

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ForgotPasswordFormValues) =>
      ForgotPasswordService.forgotPassword({
        email: data.email,
        redirectUrl: `${window.location.origin}/reset-password`,
      }),
    onSuccess: (_, variables) => {
      navigate(
        `${ROUTES.FORGOT_PASSWORD_SENT}?email=${encodeURIComponent(variables.email)}`
      );
    },
  });
}
