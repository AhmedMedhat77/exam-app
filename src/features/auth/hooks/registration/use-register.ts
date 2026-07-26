import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import {
  RegisterService,
  type RegisterPayload,
} from '@/features/auth/services/registration/register.service';
import { useUserStore } from '@/features/user/store/user.store';

export function useRegister() {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: RegisterPayload) => RegisterService.registerApi(data),
    onSuccess: (response) => {
      setUser(response.payload.user, response.payload.token);
      navigate(ROUTES.LOGIN);
    },
  });
}
