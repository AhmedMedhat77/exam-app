import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/features/auth/schemas/forgot-password/reset-password.schema';
import { useResetPassword } from '@/features/auth/hooks/forgot-password/use-reset-password';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { ROUTES } from '@/app/routes';

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const { mutate, isPending, error, isError } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const isLoading = isSubmitting || isPending;

  const onSubmit = handleSubmit((values) => {
    mutate({
      token,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    });
  });

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <CustomInput
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        autoComplete="new-password"
        autoFocus
        {...register('password')}
        error={errors.password?.message}
      />

      <CustomInput
        label="Confirm New Password"
        type="password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" className="min-h-12" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
      </Button>

      {isError && (
        <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
          <span className="text-destructive">{error?.message}</span>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link className="text-primary" to={ROUTES.REGISTER}>
          Create yours
        </Link>
      </p>
    </form>
  );
}
