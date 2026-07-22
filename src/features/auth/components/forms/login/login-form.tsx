import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { useLogin } from '@/features/auth/hooks/login/use-login';
import {
  loginSchema,
  type LoginInput,
} from '@/features/auth/schemas/login/login.schema';

export default function LoginForm() {
  // API Hook
  const { mutate, isPending, error, isError } = useLogin();
  // React Hook-Form
  const {
    register,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // Loading State
  const isLoading = (isSubmitted && !isValid) || isSubmitting || isPending;
  const isApiError = isError;

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <form className="mx-auto flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <CustomInput
          label="Username"
          placeholder="User 123"
          {...register('username')}
          error={errors.username?.message}
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Password"
          {...register('password')}
          error={errors.password?.message}
        />

        {/* Forget Password Link */}
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-end text-sm text-blue-500"
        >
          Forgot your password?
        </Link>

        <Button type="submit" className={'min-h-12'} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>

        {isApiError && (
          <div className="bg-destructive/20 border-destructive border-2 p-3 text-center">
            <span className="text-destructive">{error?.message}</span>
          </div>
        )}
        {/* Sign Up Link */}
        <span className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <span className="cursor-pointer text-blue-500">
            <Link to={ROUTES.REGISTER}>Sign Up</Link>
          </span>
        </span>
      </form>
    </div>
  );
}
