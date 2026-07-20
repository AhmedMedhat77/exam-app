import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import {
  RegisterService,
  type RegisterPayload,
} from '@/features/auth/services/registration/register.service';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterPayload) => RegisterService.register(data),
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
  });
}
