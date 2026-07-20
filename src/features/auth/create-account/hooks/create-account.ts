import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { CreateAccountService } from '../services/create-account.service';
import type { CreateAccountInput } from '../validation/create-account.schema';

export function useCreateAccount() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
    onSuccess: (_, variables) => {
      navigate(`/verify-otp?email=${encodeURIComponent(variables.email)}`);
    },
  });
}
