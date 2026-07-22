import DiplomaHeader from '@/features/diploma/components/header';
import { GraduationCap } from 'lucide-react';

export default function UserDiplomaPage() {
  return (
    <>
      <DiplomaHeader
        title="My Diplomas"
        icon={<GraduationCap size={48} className="text-white" />}
      />
    </>
  );
}
