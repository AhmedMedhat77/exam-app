import AdminExamsList from '@/features/exam/components/admin/admin-exams-list';
import { useGetAllExams } from '@/features/exam/hooks/use-get-all-exams';
import type { IExam } from '@/features/exam/types/exams.d';
import AdminHeader from '@/shared/components/admin-header';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export default function AdminExamsPage() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useGetAllExams({
    limit: 10,
    page,
    search,
  });

  const metadata = data?.pages[0]?.payload?.metadata;
  const exams = useMemo(() => {
    return (
      (data?.pages.flatMap(
        (page) => page.payload?.data ?? []
      ) as unknown as IExam[]) || []
    );
  }, [data]);

  return (
    <div className="max-w-full space-y-6">
      <AdminHeader
        breadcrumbItems={[{ title: 'Exams', href: '/exams' }]}
        addNewLabel="Add New Exam"
        total={metadata?.total ?? exams.length}
        totalPages={metadata?.totalPages ?? 1}
        limit={metadata?.limit ?? 10}
        isLoading={isLoading}
        onAddNew={() => {
          console.log('Add New Exam');
        }}
      />
      <AdminExamsList exams={exams} isLoading={isLoading} />
    </div>
  );
}
