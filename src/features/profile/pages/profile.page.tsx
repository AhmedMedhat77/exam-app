import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import type { IUpdateForm } from '@/features/profile/types/user';
import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import CustomPhoneInput from '@/shared/ui/phone-input';
import { PencilLine } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function UserProfilePage() {
  const { data, isLoading } = useGetProfile();

  const form = useForm<IUpdateForm>({});

  const onSubmit = form.handleSubmit((data) => {});

  useEffect(() => {
    if (data?.payload?.user) {
      form.reset(data.payload.user);
    }
  }, [data]);

  return (
    <form className="space-y-4 px-9 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field>
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" type="text" placeholder="First Name" />
        </Field>
        <Field>
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" type="text" placeholder="Last Name" />
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
          size="xl"
          className="rounded-lg border-0 bg-red-50 px-6 py-2.5 font-medium text-red-600 hover:bg-red-100"
        >
          Delete My Account
        </Button>
        <Button size="xl" className="rounded-lg px-6 py-2.5 font-medium">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
