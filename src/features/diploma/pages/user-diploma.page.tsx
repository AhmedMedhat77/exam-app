import UserDiplomaList from '@/features/diploma/components/user/user-diploma-list';
import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import { GraduationCap } from 'lucide-react';

import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';

export default function UserDiplomaPage() {
  useBreadcrumb({
    items: [{ title: 'Diplomas', href: '/' }],
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
