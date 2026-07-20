import { ROUTES } from '@/app/routes';
import {
  userInfoSchema,
  type IUserInfoFormValues,
} from '@/features/auth/schemas/user-info.schema';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { Field } from '@/shared/ui/field';
import { Label } from '@/shared/ui/label';
import CustomPhoneInput from '@/shared/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface IUserInfoFormProps {
  email?: string;
}

export default function UserInfoForm({ email }: IUserInfoFormProps) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IUserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (!email) navigate(ROUTES.CREATE_ACCOUNT);
  }, [email, navigate]);

  return (
    <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="First Name"
          placeholder="First Name"
          required
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <CustomInput
          label="Last Name"
          placeholder="Last Name"
          required
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>
      <CustomInput
        label="Username"
        placeholder="user123"
        required
        {...register('userName')}
        error={errors.userName?.message}
      />

      <Field>
        <Label htmlFor="phone">Phone</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <CustomPhoneInput
              id="phone"
              international
              country="EG"
              defaultCountry="EG"
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </Field>

      <Button variant="primary-foreground">Next</Button>
    </form>
  );
}
