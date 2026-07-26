import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/app/routes';
import type { LoginInput } from '@/features/auth/schemas/login/login.schema';
import { LoginService } from '@/features/auth/services/login.service';
import { useUserStore } from '@/features/user/store/user.store';

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginInput) => LoginService.loginApi(data),
    onSuccess: (data) => {
      if (data?.payload) {
        setUser(data.payload.user, data.payload.token);
        navigate(ROUTES.HOME);
      }
    },
  });
}
