import { useMutation } from '@tanstack/react-query';
import type { EmailFormValues } from '@/features/auth/schemas/registration/email.schema';
import { EmailVerificationService } from '@/features/auth/services/registration/email-verification.service';

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: EmailFormValues) =>
      EmailVerificationService.sendVerificationEmail(data),
  });
}
