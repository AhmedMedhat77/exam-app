import { ROUTES } from '@/app/routes';
import UserExamList from '@/features/exam/components/user/user-exam-list';
import { useGetAllExams } from '@/features/exam/hooks/use-get-all-exams';
import UserDashboardHeader from '@/features/shared/components/user-dashboard-header';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import { GraduationCap } from 'lucide-react';
import { useSearchParams } from 'react-router';

export default function UserExamListPage() {
  const [searchParams] = useSearchParams();
  const diplomaId = searchParams.get('diplomaId') || '';

  const { data: examsData } = useGetAllExams({ diplomaId, limit: 5 });
  const exams =
    examsData?.pages?.flatMap((page) => page?.payload?.data ?? []) ?? [];

  const diplomaTitle = exams[0]?.diploma?.title;

  useBreadcrumb({
    items: [
      { title: 'Diplomas', href: ROUTES.DIPLOMAS },
      ...(diplomaId && diplomaTitle
        ? [
            {
              title: diplomaTitle,
              href: `${ROUTES.EXAMS}?diplomaId=${diplomaId}`,
            },
          ]
        : []),
      { title: 'Exams' },
    ],
  });

  return (
    <div className="w-full space-y-6 py-4">
      <UserDashboardHeader
        title="Exams"
        icon={<GraduationCap size={45} className="text-white" />}
      />
      <UserExamList diplomaId={diplomaId} />
    </div>
  );
}
