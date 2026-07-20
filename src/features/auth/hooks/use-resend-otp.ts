import { useMutation } from '@tanstack/react-query';
import { CreateAccountService } from '../services/create-account.service';
import type { CreateAccountInput } from '../schemas/create-account.schema';

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
  });
}
