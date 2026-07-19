import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/')({
  component: DashboardHome,
});

function DashboardHome() {
  return <div>Dashboard Home</div>;
}
