import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import type { EmailFormValues } from '@/features/auth/schemas/registration/email.schema';
import { EmailVerificationService } from '@/features/auth/services/registration/email-verification.service';

export function useSendVerificationEmail() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: EmailFormValues) =>
      EmailVerificationService.sendVerificationEmailApi(data),
    onSuccess: (_, variables) => {
      navigate(
        `${ROUTES.REGISTER_VERIFY_OTP}?email=${encodeURIComponent(variables.email)}`
      );
    },
  });
}
