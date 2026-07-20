import { useMutation } from '@tanstack/react-query';
import { CreateAccountService } from '../services/send-email.service';
import type { CreateAccountInput } from '../schemas/send-email.schema';

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
  });
}
