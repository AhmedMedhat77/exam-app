import { useChangePassword } from '@/features/profile/hooks/use-change-password';
import type { IChangePasswordInput } from '@/features/profile/types/user';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';

export default function UserChangePasswordPage() {
  const {
    mutate: changePassword,
    isPending,
    error,
    isSuccess,
  } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChangePasswordInput>();

  const onSubmit = handleSubmit((data) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <Field>
        <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
        <Input id="currentPassword" {...register('currentPassword')} />
        <FieldError
          errors={
            errors?.currentPassword ? [errors.currentPassword] : undefined
          }
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
        <Input id="newPassword" {...register('newPassword')} />
        <FieldError
          errors={errors?.newPassword ? [errors.newPassword] : undefined}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input id="confirmPassword" {...register('confirmPassword')} />
        <FieldError
          errors={
            errors?.confirmPassword ? [errors.confirmPassword] : undefined
          }
        />
      </Field>
      <Button disabled={isPending} size={'xl'} type="submit">
        Update Password
      </Button>
    </form>
  );
}
