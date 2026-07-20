import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import type { CreateAccountInput } from '@/features/auth/schemas/send-email.schema';
import { CreateAccountService } from '@/features/auth/services/send-email.service';

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
