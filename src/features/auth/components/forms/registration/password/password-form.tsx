import { useRegister } from '@/features/auth/hooks/registration/use-register';
import {
  passwordSchema,
  type PasswordFormValues,
} from '@/features/auth/schemas/registration/password.schema';
import { useRegistrationStore } from '@/features/auth/store/registration.store';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function PasswordForm() {
  const store = useRegistrationStore();
  const { mutate, isPending, error, isError } = useRegister();
  const {
    register,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    handleSubmit,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const isLoading = isSubmitting || isPending;
  const isDisabled = (isSubmitted && !isValid) || isSubmitting;

  const onSubmit = handleSubmit((data) => {
    mutate({
      username: store.username,
      email: store.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: store.firstName,
      lastName: store.lastName,
      phone: store.phone,
    });
  });

  return (
    <div className="flex flex-col w-[90%] gap-2">
      <form className="flex flex-col gap-4 w-full mx-auto" onSubmit={onSubmit}>
        <CustomInput
          required
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <CustomInput
          required
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          className="min-h-12"
          disabled={isLoading || isDisabled}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
        </Button>

        {isError && (
          <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
            <span className="text-destructive">{error?.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
