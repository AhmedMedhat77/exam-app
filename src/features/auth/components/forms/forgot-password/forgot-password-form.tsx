import { ROUTES } from '@/app/routes';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/schemas/forgot-passowrd/forgot-password.schema';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

interface ForgotPasswordFormProps {
  email?: string;
}

export default function ForgotPasswordForm({
  email = '',
}: ForgotPasswordFormProps) {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email },
  });

  useEffect(() => {
    reset({ email });
  }, [email, reset]);

  const onSubmit = handleSubmit(async (values) => {
    // TODO: Call the request-password-reset service here. Navigate only after
    // the API confirms that the reset email request was accepted.
    navigate(
      `${ROUTES.FORGOT_PASSWORD_SENT}?email=${encodeURIComponent(values.email)}`
    );
  });

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <CustomInput
        label="Email"
        type="email"
        placeholder="user@example.com"
        autoComplete="email"
        autoFocus
        {...register('email')}
        error={errors.email?.message}
      />

      <Button type="submit" className="min-h-12" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Next'}
        <ChevronRight className="size-4" />
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
