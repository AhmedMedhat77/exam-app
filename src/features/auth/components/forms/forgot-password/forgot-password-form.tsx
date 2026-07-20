import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/schemas/forgot-password/forgot-password.schema';
import { useForgotPassword } from '@/features/auth/hooks/forgot-password/use-forgot-password';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { ROUTES } from '@/app/routes';

interface ForgotPasswordFormProps {
  email?: string;
}

export default function ForgotPasswordForm({
  email = '',
}: ForgotPasswordFormProps) {
  const { mutate, isPending, error, isError } = useForgotPassword();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email },
  });

  const isLoading = isSubmitting || isPending;

  useEffect(() => {
    reset({ email });
  }, [email, reset]);

  const onSubmit = handleSubmit((values) => {
    mutate(values);
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

      <Button type="submit" className="min-h-12" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Next'}
        <ChevronRight className="size-4" />
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
