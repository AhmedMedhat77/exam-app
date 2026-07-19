import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { CreateAccountService } from '../services/create-account.service';
import type { CreateAccountInput } from '../validation/create-account.schema';

export function useCreateAccount() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
    onSuccess: (_, variables) => {
      navigate({
        to: '/verify-otp',
        search: { email: variables.email },
      });
    },
  });
}
