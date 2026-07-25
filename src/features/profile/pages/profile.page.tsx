import EditEmailModal from '@/features/profile/components/edit-email-modal';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { useUpdateProfile } from '@/features/profile/hooks/use-update-profile';
import { updateprofileSchema } from '@/features/profile/schema/update-profile.schema';
import type { IUpdateForm } from '@/features/profile/types/user';
import { Button } from '@/shared/ui/button';
import { Field, FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import CustomPhoneInput from '@/shared/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLine } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function UserProfilePage() {
  const { data } = useGetProfile();
  const {
    mutate: updateProfile,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateProfile();
  const {
    mutate: deleteAccount,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteAccount();
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);

  const user = data?.payload?.user;

  const form = useForm<IUpdateForm>({
    resolver: zodResolver(updateprofileSchema),
    values: user
      ? {
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          username: user.username ?? '',
          email: user.email ?? '',
          phone: user.phone ?? '',
        }
      : undefined,
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit((formData) => {
    updateProfile(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      },
      {
        onError: (err: any) => {
          const apiError = err?.response?.data;
          if (apiError?.errors && Array.isArray(apiError.errors)) {
            apiError.errors.forEach(
              (item: {
                path: string;
                message?: string;
                messages?: string[];
              }) => {
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
        },
      }
    );
  });

  const handleDeleteAccount = () => {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      deleteAccount();
    }
  };

  return (
    <>
      <EditEmailModal
        open={isEditEmailModalOpen}
        onOpenChange={setIsEditEmailModalOpen}
      />
      <form onSubmit={onSubmit} className="space-y-4 px-9 py-8">
        {(updateError || deleteError) && (
          <p className="rounded-md bg-red-50 p-3 font-mono text-xs font-medium text-red-600">
            {((updateError || deleteError) as any)?.response?.data?.message ||
              'An error occurred. Please try again.'}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="First Name"
              {...register('firstName')}
            />
            {errors.firstName?.message && (
              <FieldError>{errors.firstName.message}</FieldError>
            )}
          </Field>

          <Field>
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Last Name"
              {...register('lastName')}
            />
            {errors.lastName?.message && (
              <FieldError>{errors.lastName.message}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <Label htmlFor="user-name">Username</Label>
          <Input
            {...register('username')}
            id="user-name"
            type="text"
            placeholder="User Name"
            readOnly={true}
          />
          {errors.username?.message && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </Field>

        <Field>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="email">Email</Label>
            <button
              type="button"
              onClick={() => setIsEditEmailModalOpen(true)}
              className="text-primary flex cursor-pointer items-center gap-1 font-mono text-sm"
            >
              <PencilLine className="size-4" />
              Change
            </button>
          </div>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email?.message && (
            <FieldError>{errors.email.message}</FieldError>
          )}
        </Field>

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Field>
              <Label>Phone</Label>
              <CustomPhoneInput value={value} onChange={onChange} />
              {errors.phone?.message && (
                <FieldError>{errors.phone.message}</FieldError>
              )}
            </Field>
          )}
        />

        <div className="grid gap-4 pt-2 md:grid-cols-2">
          <Button
            type="button"
            size="xl"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="rounded-lg border-0 bg-red-50 px-6 py-2.5 font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete My Account'}
          </Button>
          <Button
            type="submit"
            size="xl"
            disabled={isUpdating}
            className="rounded-lg px-6 py-2.5 font-medium disabled:opacity-50"
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </>
  );
}
