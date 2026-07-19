import { useMutation } from '@tanstack/react-query';
import { CreateAccountService } from '../services/create-account.service';
import type { CreateAccountInput } from '../validation/create-account.schema';

export function useCreateAccount() {
  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
  });
}
