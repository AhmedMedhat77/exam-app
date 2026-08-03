import {
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/diploma/components/constants/search-params.keys';
import type { SortBy } from '@/features/diploma/types/diploma.d';
import {
  AdminSortDropdown,
  type SortOption,
} from '@/shared/components/admin-sort-dropdown';

const DIPLOMA_SORT_OPTIONS: SortOption<SortBy>[] = [
  {
    label: 'Title',
    sortBy: 'title',
    sortOrder: 'desc',
  },
  {
    label: 'Title',
    sortBy: 'title',
    sortOrder: 'asc',
  },
  {
    label: 'Newest',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  {
    label: 'Newest',
    sortBy: 'createdAt',
    sortOrder: 'asc',
  },
];

export function AdminDiplomaSortDropdown() {
  return (
    <AdminSortDropdown<SortBy>
      options={DIPLOMA_SORT_OPTIONS}
      sortByParamKey={SORT_BY_KEY}
      sortOrderParamKey={SORT_ORDER_KEY}
    />
  );
}
