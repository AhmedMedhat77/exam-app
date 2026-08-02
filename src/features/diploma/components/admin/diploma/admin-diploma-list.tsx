import { AdminDiplomaActionsMenu } from '@/features/diploma/components/admin/diploma/admin-diploma-actions-menu';
import { AdminDiplomaSortDropdown } from '@/features/diploma/components/admin/diploma/admin-diploma-sort-dropdown';
import {
  IMMUTABLE_QUERY_KEY,
  PAGE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/diploma/components/constants/search-params.keys';
import { useGetUserDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import type {
  IDiploma,
  SORT_BY,
  SORT_ORDER,
} from '@/features/diploma/types/diploma';
import {
  AdminTable,
  type AdminTableColumn,
} from '@/shared/components/admin-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

interface AdminDiplomaListProps {
  diplomas?: IDiploma[];
  isLoading?: boolean;
  onView?: (diploma?: IDiploma) => void;
  onEdit?: (diploma?: IDiploma) => void;
  onDelete?: (diploma?: IDiploma) => void;
}

export default function AdminDiplomaList({
  diplomas: diplomasProp,
  isLoading: isLoadingProp,
  onView,
  onEdit,
  onDelete,
}: AdminDiplomaListProps) {
  const [searchParams] = useSearchParams();

  const isControlled = diplomasProp !== undefined;

  const search = searchParams.get(SEARCH_QUERY_KEY) || '';
  const page = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;
  const sortBy = (searchParams.get(SORT_BY_KEY) as SORT_BY) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as SORT_ORDER) || undefined;
  const immutableParam = searchParams.get(IMMUTABLE_QUERY_KEY);
  const immutable =
    immutableParam !== null ? immutableParam === 'true' : undefined;

  const { data, isLoading: isQueryLoading } = useGetUserDiplomas(
    isControlled
      ? undefined
      : {
          limit: 10,
          page,
          search,
          immutable,
          sortBy,
          sortOrder,
        }
  );

  const queryDiplomas = useMemo(() => {
    return data?.pages.flatMap((page) => page.payload?.data ?? []) ?? [];
  }, [data]);

  const diplomas = isControlled ? diplomasProp : queryDiplomas;
  const isLoading = isControlled ? isLoadingProp : isQueryLoading;

  const columns: AdminTableColumn<IDiploma>[] = useMemo(
    () => [
      {
        header: 'Image',
        colClassName: 'w-24 sm:w-28',
        cell: (item) => (
          <div className="size-18 overflow-hidden rounded-xs border border-gray-100 bg-gray-100">
            <img
              src={item?.image}
              alt={item?.title || 'Diploma'}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ),
      },
      {
        header: 'Title',
        colClassName: 'w-48 sm:w-64',
        cellClassName:
          'wrap-break-words pr-4 font-mono text-sm font-semibold whitespace-normal text-gray-900',
        cell: (item) => item?.title,
      },
      {
        header: 'Description',
        cellClassName:
          'warp-break-words font-mono text-xs leading-relaxed whitespace-normal text-gray-500',
        cell: (item) => <p className="line-clamp-4">{item?.description}</p>,
      },
      {
        header: <AdminDiplomaSortDropdown />,
        colClassName: 'w-24 sm:w-28',
        align: 'right',
        cell: (item) => (
          <AdminDiplomaActionsMenu
            diploma={item}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onView, onEdit, onDelete]
  );

  return (
    <AdminTable<IDiploma>
      columns={columns}
      data={diplomas}
      isLoading={isLoading}
      loadingMessage="Loading diplomas..."
      emptyMessage="No diplomas found."
      getRowKey={(item, index) => item?.id ?? index}
    />
  );
}
