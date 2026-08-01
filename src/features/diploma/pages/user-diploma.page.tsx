import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import UserDiplomaList from '@/features/diploma/components/user/user-diploma-list';
import { GraduationCap } from 'lucide-react';

import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';

export default function UserDiplomaPage() {
  useBreadcrumb({
    title: 'Diplomas',
    description: 'Explore available diplomas and track your learning progress',
    items: [{ title: 'Dashboard', href: '/' }, { title: 'Diplomas' }],
  });
  return (
    <div className="flex w-full flex-col gap-2">
      <UserDashboardHeader
        title="Diplomas"
        icon={<GraduationCap size={48} className="text-white" />}
      />

      <UserDiplomaList />
    </div>
  );
}
