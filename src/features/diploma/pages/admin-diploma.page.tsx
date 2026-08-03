import { ROUTES } from '@/app/routes';
import AdminDiplomaFilterContent from '@/features/diploma/components/admin/diploma/admin-diploma-filter-content';
import AdminDiplomaHeader from '@/features/diploma/components/admin/diploma/admin-diploma-header';
import AdminDiplomaList from '@/features/diploma/components/admin/diploma/admin-diploma-list';
import {
  IMMUTABLE_QUERY_KEY,
  PAGE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/diploma/components/constants/search-params.keys';
import { useGetUserDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import type { SORT_BY, SORT_ORDER } from '@/features/diploma/types/diploma.d';
import AdminFiltersContainer from '@/shared/components/admin-filters-container';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';
import { SlidersHorizontal } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const LIMIT = 12;

export default function AdminDiplomaPage() {
  const navigate = useNavigate();

  useBreadcrumb({
    items: [{ title: 'Diplomas', href: '/' }],
  });

  const [searchParams] = useSearchParams();

  const search = searchParams.get(SEARCH_QUERY_KEY) || '';
  const page = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;
  const sortBy = (searchParams.get(SORT_BY_KEY) as SORT_BY) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as SORT_ORDER) || undefined;
  const immutableParam = searchParams.get(IMMUTABLE_QUERY_KEY);
  const immutable =
    immutableParam !== null ? immutableParam === 'true' : undefined;

  const { data, isLoading } = useGetUserDiplomas({
    limit: LIMIT,
    page,
    search,
    immutable,
    sortBy,
    sortOrder,
  });

  const metadata = data?.pages[0]?.payload?.metadata;
  const diplomas = useMemo(() => {
    return data?.pages.flatMap((page) => page.payload?.data ?? []) || [];
  }, [data]);

  return (
    <div className="max-w-full space-y-6">
      <AdminDiplomaHeader
        total={metadata?.total}
        totalPages={metadata?.totalPages}
        limit={metadata?.limit}
        isLoading={isLoading}
        onAddNew={() => navigate(ROUTES.DIPLOMA_CREATE)}
      />
      <AdminFiltersContainer
        title="Search & Filters"
        icon={<SlidersHorizontal className="size-6" />}
      >
        <AdminDiplomaFilterContent />
      </AdminFiltersContainer>
      <AdminDiplomaList diplomas={diplomas || []} isLoading={isLoading} />
    </div>
  );
}
