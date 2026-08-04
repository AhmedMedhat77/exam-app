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
import { useGetDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import type { SortBy, SortOrder } from '@/features/diploma/types/diploma.d';
import AdminFiltersContainer from '@/shared/components/admin-filters-container';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';
import { SlidersHorizontal } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

const LIMIT = 12;

export default function AdminDiplomaPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useBreadcrumb({
    items: [{ title: 'Diplomas', href: '/' }],
  });

  const search = searchParams.get(SEARCH_QUERY_KEY) || '';
  const page = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;
  const sortBy = (searchParams.get(SORT_BY_KEY) as SortBy) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as SortOrder) || undefined;
  const immutableParam = searchParams.get(IMMUTABLE_QUERY_KEY);
  const immutable =
    immutableParam !== null ? immutableParam === 'true' : undefined;

  const { data, isLoading } = useGetDiplomas({
    limit: LIMIT,
    page,
    search,
    immutable,
    sortBy,
    sortOrder,
  });

  const metadata = data?.payload?.metadata;
  const diplomas = data?.payload?.data ?? [];

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
      <AdminDiplomaList diplomas={diplomas} isLoading={isLoading} />
    </div>
  );
}
