import { useMutation } from '@tanstack/react-query';
import { CreateAccountService } from '../../create-account/services/create-account.service';
import type { CreateAccountInput } from '../../create-account/validation/create-account.schema';

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
  });
}
