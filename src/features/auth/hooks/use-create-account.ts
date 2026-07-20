import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import { CreateAccountService } from '../services/create-account.service';
import type { CreateAccountInput } from '../schemas/create-account.schema';

export function useCreateAccount() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      CreateAccountService.createAccount(data),
    onSuccess: (_, variables) => {
      navigate(
        `${ROUTES.VERIFY_OTP}?email=${encodeURIComponent(variables.email)}`
      );
    },
  });
}
