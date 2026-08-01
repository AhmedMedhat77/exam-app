import { AdminDiplomaSortDropdown } from '@/features/diploma/components/admin/diploma/admin-diploma-sort-dropdown';
import { AdminDiplomaTableRow } from '@/features/diploma/components/admin/diploma/admin-diploma-table-row';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
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
    return data?.pages.flatMap((page) => page.payload?.data) || [];
  }, [data]);

  const diplomas = isControlled ? diplomasProp : queryDiplomas;
  const isLoading = isControlled ? isLoadingProp : isQueryLoading;

  return (
    <div className="w-full overflow-x-auto rounded-md border border-gray-200 bg-white shadow-xs">
      <Table className="w-full min-w-175 table-fixed">
        <colgroup>
          <col className="w-24 sm:w-28" />
          <col className="w-48 sm:w-64" />
          <col />
          <col className="w-24 sm:w-28" />
        </colgroup>
        <TableHeader className="bg-primary border-b-0">
          <TableRow className="hover:bg-primary border-b-0">
            <TableHead className="px-6 py-3.5 text-left font-mono font-medium text-white">
              Image
            </TableHead>
            <TableHead className="px-6 py-3.5 text-left font-mono font-medium text-white">
              Title
            </TableHead>
            <TableHead className="px-6 py-3.5 text-left font-mono font-medium text-white">
              Description
            </TableHead>
            <TableHead className="px-6 py-3.5 text-right font-mono font-medium text-white">
              <AdminDiplomaSortDropdown />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-10 text-center font-mono text-sm text-gray-400"
              >
                Loading diplomas...
              </TableCell>
            </TableRow>
          ) : diplomas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-10 text-center font-mono text-sm text-gray-400"
              >
                No diplomas found.
              </TableCell>
            </TableRow>
          ) : (
            diplomas.map((item) => (
              <AdminDiplomaTableRow
                key={item?.id}
                diploma={item}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
