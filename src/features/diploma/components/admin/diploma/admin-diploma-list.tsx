import { useGetUserDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import type { IDiploma } from '@/features/diploma/types/diploma';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Calendar,
  Ellipsis,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type SortOption =
  'title-desc' | 'title-asc' | 'newest-desc' | 'newest-asc' | null;

interface AdminDiplomaListProps {
  onView?: (diploma?: IDiploma) => void;
  onEdit?: (diploma?: IDiploma) => void;
  onDelete?: (diploma?: IDiploma) => void;
}

export default function AdminDiplomaList({
  onView,
  onEdit,
  onDelete,
}: AdminDiplomaListProps) {
  const [sortBy, setSortBy] = useState<SortOption>(null);

  const { data, isLoading } = useGetUserDiplomas({
    limit: Number(10),
    page: Number(1),
  });

  const rawDiplomas = useMemo(() => {
    return data?.pages.flatMap((page) => page.payload?.data) || [];
  }, [data]);

  const diplomas = useMemo(() => {
    if (!rawDiplomas.length) return [];
    const list = [...rawDiplomas];

    if (sortBy === 'title-asc') {
      list.sort((a, b) => (a?.title || '').localeCompare(b?.title || ''));
    } else if (sortBy === 'title-desc') {
      list.sort((a, b) => (b?.title || '').localeCompare(a?.title || ''));
    } else if (sortBy === 'newest-desc') {
      list.sort(
        (a, b) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime()
      );
    } else if (sortBy === 'newest-asc') {
      list.sort(
        (a, b) =>
          new Date(a?.createdAt || 0).getTime() -
          new Date(b?.createdAt || 0).getTime()
      );
    }

    return list;
  }, [rawDiplomas, sortBy]);

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
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex cursor-pointer items-center justify-end gap-1.5 font-mono text-sm text-white outline-none hover:opacity-90">
                  <span>Sort</span>
                  <ArrowDownUp className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 p-1.5 shadow-lg"
                >
                  <DropdownMenuItem
                    onClick={() => setSortBy('title-desc')}
                    className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs ${
                      sortBy === 'title-desc'
                        ? 'bg-accent text-primary font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    <ArrowDown className="size-4 text-gray-500" />
                    <span>
                      Title{' '}
                      <span className="text-[10px] text-gray-400">
                        (descending)
                      </span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy('title-asc')}
                    className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs ${
                      sortBy === 'title-asc'
                        ? 'bg-accent text-primary font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    <ArrowUp className="size-4 text-gray-500" />
                    <span>
                      Title{' '}
                      <span className="text-[10px] text-gray-400">
                        (ascending)
                      </span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy('newest-desc')}
                    className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs ${
                      sortBy === 'newest-desc'
                        ? 'bg-accent text-primary font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    <Calendar className="size-4 text-gray-500" />
                    <span>
                      Newest{' '}
                      <span className="text-[10px] text-gray-400">
                        (descending)
                      </span>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy('newest-asc')}
                    className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs ${
                      sortBy === 'newest-asc'
                        ? 'bg-accent text-primary font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    <Calendar className="size-4 text-gray-500" />
                    <span>
                      Newest{' '}
                      <span className="text-[10px] text-gray-400">
                        (ascending)
                      </span>
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              <TableRow
                key={item?.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50/80"
              >
                <TableCell className="px-6 py-4 align-top">
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
                </TableCell>
                <TableCell className="wrap-break-words px-6 py-4 pr-4 align-top font-mono text-sm font-semibold whitespace-normal text-gray-900">
                  {item?.title}
                </TableCell>
                <TableCell className="warp-break-words px-6 py-4 align-top font-mono text-xs leading-relaxed whitespace-normal text-gray-500">
                  <p className="line-clamp-4">{item?.description}</p>
                </TableCell>
                <TableCell className="px-6 py-4 text-right align-top">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-100 text-gray-600 transition-colors outline-none hover:bg-gray-200">
                      <Ellipsis className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-36 p-1 shadow-md"
                    >
                      <DropdownMenuItem
                        onClick={() => onView?.(item)}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <Eye className="size-4 text-emerald-500" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit?.(item)}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil className="size-4 text-blue-500" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete?.(item)}
                        variant="destructive"
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="size-4 text-red-500" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
