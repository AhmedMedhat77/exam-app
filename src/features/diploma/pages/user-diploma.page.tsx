import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import UserDiplomaList from '@/features/diploma/components/user/user-diploma-list';
import { GraduationCap } from 'lucide-react';

export default function UserDiplomaPage() {
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
