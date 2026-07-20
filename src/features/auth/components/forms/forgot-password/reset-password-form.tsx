import { ROUTES } from '@/app/routes';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
  type ResetPasswordPayload,
} from '@/features/auth/schemas/forgot-password.schema';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

export default function ResetPasswordForm({
  email,
  token,
}: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const payload: ResetPasswordPayload = { email, token, ...values };

    // TODO: Pass this payload to the reset-password service. Navigate only
    // after the API confirms that the password was updated.
    void payload;
    navigate(ROUTES.LOGIN, { replace: true });
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

      <Button type="submit" className="min-h-12" disabled={isSubmitting}>
        {isSubmitting ? 'Resetting...' : 'Reset Password'}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link className="text-primary" to={ROUTES.REGISTER}>
          Create yours
        </Link>
      </p>
    </form>
  );
}
