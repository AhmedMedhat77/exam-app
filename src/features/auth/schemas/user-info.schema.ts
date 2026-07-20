import z from 'zod';

export const userInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  userName: z.string().min(2, 'Username must be at least 2 characters'),
  phone: z.string().refine(isValidPhone, {
    message: 'Phone number is invalid',
  }),
});

function isValidPhone(value: string) {
  const regex = /^\+?\d{10,15}$/;
  return regex.test(value);
}

export type IUserInfoFormValues = z.infer<typeof userInfoSchema>;
