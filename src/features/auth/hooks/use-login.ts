import { useMutation } from '@tanstack/react-query';
import { LoginService } from '../services/login.service';
import type { LoginInput } from '../schemas/login.schema';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => LoginService.login(data),
  });
}
