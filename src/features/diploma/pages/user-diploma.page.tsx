import DiplomaHeader from '@/features/diploma/components/shared/header';
import UserDiplomaList from '@/features/diploma/components/user/user-diploma-list';
import { GraduationCap } from 'lucide-react';

export default function UserDiplomaPage() {
  return (
    <div className="flex flex-col w-full gap-2">
      <DiplomaHeader
        title="My Diplomas"
        icon={<GraduationCap size={48} className="text-white" />}
      />

      <UserDiplomaList />
    </div>
  );
}
