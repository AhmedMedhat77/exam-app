import UserExamsList from '@/features/exam/components/user/exams-list';
import { useSearchParams } from 'react-router';

export default function ExamsPage() {
  const [searchParams] = useSearchParams();
  const diplomaId = searchParams.get('diplomaId') || '';

  return (
    <div className="w-full space-y-6">
      <UserExamsList diplomaId={diplomaId} />
    </div>
  );
}
