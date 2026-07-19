import VerifyOtpPage from '@/features/(Auth)/verify-otp/page/verify-otp-page';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const verifyOtpSearchSchema = z.object({
  email: z.string().email(),
});

export const Route = createFileRoute('/(Auth)/verify-otp/')({
  validateSearch: verifyOtpSearchSchema,
  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({ to: '/create-account' });
    }
  },
  component: VerifyOtpPage,
});
