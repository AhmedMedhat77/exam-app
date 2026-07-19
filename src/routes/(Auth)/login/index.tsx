import LoginPage from '@/features/auth/login/page/login-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(Auth)/login/')({
  component: LoginPage,
});
