import { useChangePassword } from '@/features/profile/hooks/use-change-password';
import type { IChangePasswordInput } from '@/features/profile/types/user';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
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
    <form
      onSubmit={onSubmit}
      className="flex h-full flex-col justify-between space-y-6"
    >
      <div className="max-w-lg space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>
          <p className="text-sm text-gray-500">
            Ensure your account is using a strong password.
          </p>
        </div>

        {isSuccess && (
          <p className="rounded-md bg-green-50 p-3 text-sm font-medium text-green-600">
            Password changed successfully!
          </p>
        )}

        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-600">
            {(error as any)?.response?.data?.message ||
              'Failed to change password'}
          </p>
        )}

        {/* Current Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="currentPassword"
            className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
          >
            Current Password
          </label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            {...register('currentPassword', {
              required: 'Current password is required',
            })}
            className="bg-white"
          />
          {errors.currentPassword?.message && (
            <FieldError>{errors.currentPassword.message}</FieldError>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="newPassword"
            className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
          >
            New Password
          </label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="bg-white"
          />
          {errors.newPassword?.message && (
            <FieldError>{errors.newPassword.message}</FieldError>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
            })}
            className="bg-white"
          />
          {errors.confirmPassword?.message && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end border-t border-gray-100 pt-6">
        <Button
          type="submit"
          disabled={isPending}
          className="w-auto rounded-lg border-0 bg-[#1768FF] px-8 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Password'}
        </Button>
      </div>
    </form>
  );
}
