import AdminExamFilterContent from '@/features/exam/components/admin/admin-exam-filter-content';
import AdminExamList from '@/features/exam/components/admin/admin-exam-list';
import {
  DIPLOMA_ID_QUERY_KEY,
  IMMUTABLE_QUERY_KEY,
  PAGE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/exam/components/constants/search-params.keys';
import { useGetAllExams } from '@/features/exam/hooks/use-get-all-exams';
import type {
  ExamSortBy,
  ExamSortOrder,
  IExam,
} from '@/features/exam/types/exams.d';
import AdminFiltersPanel from '@/features/shared/components/admin/admin-filters-panel';
import AdminListHeader from '@/features/shared/components/admin/admin-list-header';
import { SlidersHorizontal } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const LIMIT = 12;

export default function AdminExamListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get(SEARCH_QUERY_KEY) || '';
  const page = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;
  const sortBy = (searchParams.get(SORT_BY_KEY) as ExamSortBy) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as ExamSortOrder) || undefined;
  const diplomaId = searchParams.get(DIPLOMA_ID_QUERY_KEY) || undefined;
  const immutableParam = searchParams.get(IMMUTABLE_QUERY_KEY);
  const immutable =
    immutableParam !== null ? immutableParam === 'true' : undefined;

  const { data, isLoading } = useGetAllExams({
    limit: LIMIT,
    page,
    search,
    sortBy,
    sortOrder,
    diplomaId,
    immutable,
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
      <AdminListHeader
        breadcrumbItems={[{ title: 'Exams', href: '/exams' }]}
        addNewLabel="Add New Exam"
        total={metadata?.total ?? exams.length}
        totalPages={metadata?.totalPages ?? 1}
        limit={metadata?.limit ?? 10}
        isLoading={isLoading}
        onAddNew={() => {
          navigate('/exams/manage');
        }}
      />
      <AdminFiltersPanel
        title="Search & Filters"
        icon={<SlidersHorizontal className="size-6" />}
      >
        <AdminExamFilterContent />
      </AdminFiltersPanel>
      <AdminExamList exams={exams} isLoading={isLoading} />
    </div>
  );
}
