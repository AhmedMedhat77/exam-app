import { useMutation } from '@tanstack/react-query';
import type { LoginInput } from '@/features/auth/schemas/login.schema';
import { LoginService } from '@/features/auth/services/login.service';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => LoginService.login(data),
  });
}
