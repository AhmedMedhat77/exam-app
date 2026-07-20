import { ROUTES } from '@/app/routes';
import {
  userInfoSchema,
  type IUserInfoFormValues,
} from '@/features/auth/schemas/user-info.schema';
import { useRegisterStore } from '@/features/auth/store/register.store';
import {
  handleGetFromSessionStorage,
  handleSaveToSessionStorage,
} from '@/features/auth/utils/session-storage';
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
  // To Avoid Re renders
  const setFields = useRegisterStore((s) => s.setFields);
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<IUserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
  });

  // ===================== CONSTANTS =====================
  const isDisabled = Object.keys(errors).length === 0 && isSubmitted;

  // ====================== HANDLERS ======================
  const onSubmit = handleSubmit((data) => {
    setFields(data);
    handleSaveToSessionStorage('userData', data);
  });

  // ====================== EFFECTS  ======================
  useEffect(() => {
    // To Return to create Account Screen , i don't validate on email on Form since it will auto redirect if it's not exists
    if (!email) navigate(ROUTES.CREATE_ACCOUNT);
    // To Set the email From props in fields and lift state To Next screen
    if (email) setFields({ email });
  }, [email, navigate]);

  // Email is added From The Above Effect
  useEffect(() => {
    const userData =
      handleGetFromSessionStorage<IUserInfoFormValues>('userData');
    console.log({ userData });

    if (userData) {
      reset(userData);
    }
  }, []);

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

      <Button variant="primary-foreground" type="submit" disabled={isDisabled}>
        Next
      </Button>
    </form>
  );
}
