import CreateAccountPage from '@/features/(Auth)/create-account/page/create-account-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(Auth)/create-account/')({
  component: CreateAccountPage,
});
