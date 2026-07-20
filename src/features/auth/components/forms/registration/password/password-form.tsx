import {
  passwordSchema,
  type PasswordFormValues,
} from '@/features/auth/schemas/registration/password.schema';
import { useRegistrationStore } from '@/features/auth/store/registration.store';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function PasswordForm() {
  const setFields = useRegistrationStore((s) => s.setFields);
  const {
    register,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    handleSubmit,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const isDisabled = (isSubmitted && !isValid) || isSubmitting;

  const onSubmit = handleSubmit((data) => {
    setFields({
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  });

  return (
    <div className="flex flex-col w-[90%] gap-2">
      <form className="flex flex-col gap-4 w-full mx-auto" onSubmit={onSubmit}>
        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <CustomInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          variant="primary-foreground"
          className="min-h-12"
          disabled={isDisabled}
        >
          Save Password
        </Button>
      </form>
    </div>
  );
}
