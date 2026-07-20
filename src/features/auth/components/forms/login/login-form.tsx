import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { useLogin } from '@/features/auth/hooks/use-login';
import {
  loginSchema,
  type LoginInput,
} from '@/features/auth/schemas/login.schema';

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
    <div className="flex flex-col w-full gap-2">
      <form className="flex flex-col gap-4 w-full mx-auto" onSubmit={onSubmit}>
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
          className="text-blue-500 text-sm text-end"
        >
          Forgot your password?
        </Link>

        <Button type="submit" className={'min-h-12'} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>

        {isApiError && (
          <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
            <span className="text-destructive">{error?.message}</span>
          </div>
        )}
        {/* Sign Up Link */}
        <span className="text-gray-500 text-center text-sm">
          Don't have an account?{' '}
          <span className="text-blue-500 cursor-pointer">
            <Link to={ROUTES.REGISTER}>Sign Up</Link>
          </span>
        </span>
      </form>
    </div>
  );
}
