import EditEmailModal from '@/features/profile/components/edit-email-modal';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { useUpdateProfile } from '@/features/profile/hooks/use-update-profile';
import type { IUpdateForm } from '@/features/profile/types/user';
import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import CustomPhoneInput from '@/shared/ui/phone-input';
import { PencilLine } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function UserProfilePage() {
  const { data } = useGetProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);

  const user = data?.payload?.user;

  const form = useForm<IUpdateForm>({
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

  const onSubmit = form.handleSubmit((formData) => {
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    });
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="First Name"
              {...form.register('firstName')}
            />
          </Field>
          <Field>
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Last Name"
              {...form.register('lastName')}
            />
          </Field>
        </div>

        <Field>
          <Label htmlFor="user-name">Username</Label>
          <Input
            {...form.register('username')}
            id="user-name"
            type="text"
            placeholder="User Name"
            readOnly={true}
          />
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
            {...form.register('email')}
            id="email"
            type="email"
            placeholder="Email"
          />
        </Field>

        <Controller
          name="phone"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Field>
              <Label>Phone</Label>
              <CustomPhoneInput value={value} onChange={onChange} />
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
