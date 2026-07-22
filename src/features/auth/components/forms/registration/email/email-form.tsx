import { ROUTES } from '@/app/routes';
import { useSendVerificationEmail } from '@/features/auth/hooks/registration/use-send-verification-email';
import {
  type EmailFormValues,
  emailSchema,
} from '@/features/auth/schemas/registration/email.schema';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

interface EmailFormProps {
  email?: string;
}

export default function EmailForm({ email }: EmailFormProps) {
  const { mutate, isPending, error, isError } = useSendVerificationEmail();

  const {
    register,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  // Loading State
  const isLoading = isSubmitting || isPending;
  const isDisabled = (isSubmitted && !isValid) || isSubmitting;
  const isApiError = isError;

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (email) reset({ email });
  }, [email]);

  return (
    <div className="flex w-full flex-col gap-2">
      <form className="mx-auto flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <CustomInput
          label="Email"
          type="email"
          placeholder="user@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          variant="primary-foreground"
          className={'min-h-12'}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Next'}
          <ChevronRight className="size-4" />
        </Button>

        {isApiError && (
          <div className="bg-destructive/20 border-destructive border-2 p-3 text-center">
            <span className="text-destructive">{error?.message}</span>
          </div>
        )}
        {/* Sign Up Link */}
        <span className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span className="cursor-pointer text-blue-500">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </span>
        </span>
      </form>
    </div>
  );
}
