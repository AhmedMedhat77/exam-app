import CreateAccountPage from '@/features/auth/create-account/page/create-account-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(Auth)/create-account/')({
  component: CreateAccountPage,
});
