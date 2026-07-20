import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'react-router';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateAccount } from '../hooks/use-create-account';
import {
  type CreateAccountInput,
  createAccountSchema,
} from '../schemas/create-account.schema';
import { ROUTES } from '@/app/routes';
import { useEffect } from 'react';

export default function CreateAccountForm() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const { mutate, isPending, error, isError } = useCreateAccount();

  const {
    register,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
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
  }, []);

  return (
    <div className="flex flex-col w-[90%] gap-2">
      <h1 className="text-start text-2xl mb-8 font-medium text-gray-800">
        Create Account
      </h1>

      <form className="flex flex-col gap-4 w-full mx-auto" onSubmit={onSubmit}>
        <CustomInput
          label="Email"
          type="email"
          placeholder="user@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          className={'min-h-12'}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Next'}
          <ChevronRight className="size-4" />
        </Button>

        {isApiError && (
          <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
            <span className="text-destructive">{error?.message}</span>
          </div>
        )}
        {/* Sign Up Link */}
        <span className="text-gray-500 text-center text-sm">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </span>
        </span>
      </form>
    </div>
  );
}
