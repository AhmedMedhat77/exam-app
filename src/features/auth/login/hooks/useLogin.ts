import { useMutation } from '@tanstack/react-query';
import { LoginService } from '../services/login.service';
import type { LoginInput } from '../types/login.types';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => LoginService.login(data),
  });
}
