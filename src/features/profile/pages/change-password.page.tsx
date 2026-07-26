import { useChangePassword } from '@/features/profile/hooks/use-change-password';
import { changePasswordSchema } from '@/features/profile/schema/change-password.schema';
import type { IChangePasswordInput } from '@/features/profile/types/user';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { toast } from '@/shared/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function UserChangePasswordPage() {
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = handleSubmit((data) => {
    changePassword(data, {
      onSuccess: () => {
        toast.success('Password changed successfully');
        reset();
      },
      onError: (err: any) => {
        const serverError = err?.response?.data;
        if (serverError?.errors && Array.isArray(serverError.errors)) {
          serverError.errors.forEach(
            (item: { path: string; message?: string; messages?: string[] }) => {
              const msg = item.message || item.messages?.[0];
              if (item.path && msg) {
                setError(item.path as any, {
                  type: 'server',
                  message: msg,
                });
              }
            }
          );
        }
        toast.error(
          serverError?.message || 'Failed to change password. Please try again.'
        );
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <Field>
        <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
        <Input
          id="currentPassword"
          type="password"
          {...register('currentPassword')}
        />
        <FieldError
          errors={
            errors?.currentPassword ? [errors.currentPassword] : undefined
          }
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
        <Input id="newPassword" type="password" {...register('newPassword')} />
        <FieldError
          errors={errors?.newPassword ? [errors.newPassword] : undefined}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <FieldError
          errors={
            errors?.confirmPassword ? [errors.confirmPassword] : undefined
          }
        />
      </Field>
      <Button disabled={isPending} size={'xl'} type="submit">
        {isPending ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}
