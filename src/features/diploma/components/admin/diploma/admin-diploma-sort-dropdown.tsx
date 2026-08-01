import {
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/diploma/components/constants/search-params.keys';
import type { SORT_BY, SORT_ORDER } from '@/features/diploma/types/diploma';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ArrowDown, ArrowDownUp, ArrowUp, Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router';

export function AdminDiplomaSortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get(SORT_BY_KEY) as SORT_BY | null;
  const currentSortOrder = searchParams.get(
    SORT_ORDER_KEY
  ) as SORT_ORDER | null;

  const handleSort = (sortBy: SORT_BY, sortOrder: SORT_ORDER) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(SORT_BY_KEY, sortBy);
      next.set(SORT_ORDER_KEY, sortOrder);
      return next;
    });
  };

  const isSelected = (sortBy: SORT_BY, sortOrder: SORT_ORDER) => {
    return currentSortBy === sortBy && currentSortOrder === sortOrder;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex cursor-pointer items-center justify-end gap-1.5 font-mono text-sm text-white outline-none hover:opacity-90">
        <span>Sort</span>
        <ArrowDownUp className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 p-1.5 shadow-lg">
        <DropdownMenuItem
          onClick={() => handleSort('title', 'desc')}
          className={cn(
            'flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs text-gray-700',
            isSelected('title', 'desc') &&
              'bg-accent text-primary font-semibold'
          )}
        >
          <ArrowDown className="size-4 text-gray-500" />
          <span>
            Title{' '}
            <span className="text-[10px] text-gray-400">(descending)</span>
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSort('title', 'asc')}
          className={cn(
            'flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs text-gray-700',
            isSelected('title', 'asc') && 'bg-accent text-primary font-semibold'
          )}
        >
          <ArrowUp className="size-4 text-gray-500" />
          <span>
            Title <span className="text-[10px] text-gray-400">(ascending)</span>
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSort('createdAt', 'desc')}
          className={cn(
            'flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs text-gray-700',
            isSelected('createdAt', 'desc') &&
              'bg-accent text-primary font-semibold'
          )}
        >
          <Calendar className="size-4 text-gray-500" />
          <span>
            Newest{' '}
            <span className="text-[10px] text-gray-400">(descending)</span>
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSort('createdAt', 'asc')}
          className={cn(
            'flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs text-gray-700',
            isSelected('createdAt', 'asc') &&
              'bg-accent text-primary font-semibold'
          )}
        >
          <Calendar className="size-4 text-gray-500" />
          <span>
            Newest{' '}
            <span className="text-[10px] text-gray-400">(ascending)</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
