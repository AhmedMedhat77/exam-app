import { useMutation } from '@tanstack/react-query';
import type { CreateAccountInput } from '@/features/auth/schemas/send-email.schema';
import { CreateAccountService } from '@/features/auth/services/send-email.service';

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
  });
}
