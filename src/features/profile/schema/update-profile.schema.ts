import z from 'zod';

export const updateprofileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.email('Email is invalid'),
  phone: z.string().min(1, 'Phone number is required'),
});
