import { PAGE_QUERY_KEY } from '@/features/diploma/components/constants/search-params.keys';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

interface AdminDiplomaHeaderProps {
  title?: string;
  total?: number;
  totalPages?: number;
  limit?: number;
  isLoading?: boolean;
  onAddNew?: () => void;
}

export default function AdminDiplomaHeader({
  total = 0,
  totalPages = 1,
  limit = 10,
  isLoading = false,
  onAddNew,
}: AdminDiplomaHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;

  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, total);

  const [inputPage, setInputPage] = useState<string>(String(page));

  const updatePageParam = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (validPage <= 1) {
        next.delete(PAGE_QUERY_KEY);
      } else {
        next.set(PAGE_QUERY_KEY, String(validPage));
      }
      return next;
    });
  };

  const handlePrev = () => {
    if (page > 1 && !isLoading) {
      updatePageParam(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages && !isLoading) {
      updatePageParam(page + 1);
    }
  };

  const handlePageSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const parsed = parseInt(inputPage, 10);
    if (!isNaN(parsed) && parsed !== page) {
      updatePageParam(parsed);
    } else {
      setInputPage(String(page));
    }
  };

  const handlePageBlur = () => {
    const parsed = parseInt(inputPage, 10);
    if (!isNaN(parsed) && parsed !== page) {
      updatePageParam(parsed);
    } else {
      setInputPage(String(page));
    }
  };

  useEffect(() => {
    setInputPage(String(page));
  }, [page]);

  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-xs',
        '-mx-3.5'
      )}
    >
      <BreadCrumb />
      <div className="flex flex-wrap items-center gap-4">
        {/* Left: Range Summary */}
        <div className="font-mono text-xs font-medium text-gray-800">
          {isLoading ? (
            <span className="text-gray-400">Loading count...</span>
          ) : (
            `${startItem} - ${endItem} of ${total}`
          )}
        </div>

        {/* Center: Pagination Controls */}
        <div className="flex items-center overflow-hidden rounded-md border border-gray-200 shadow-2xs">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={page <= 1 || isLoading}
            className="h-9 w-9 rounded-none border-r border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <form
            onSubmit={handlePageSubmit}
            className="flex items-center border-r border-gray-200 bg-white px-3 py-1.5"
          >
            <span className="mr-1.5 font-mono text-xs text-gray-500 select-none">
              Page
            </span>
            <input
              type="text"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={handlePageBlur}
              className="w-8 rounded bg-transparent px-0.5 text-center font-mono text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-emerald-500"
              aria-label="Current page number"
            />
            <span className="ml-1.5 font-mono text-xs text-gray-500 select-none">
              of {totalPages}
            </span>
          </form>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={page >= totalPages || isLoading}
            className="h-9 w-9 rounded-none bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Right: Add New Diploma Button */}
      <Button
        variant="success"
        size={'xl'}
        type="button"
        onClick={onAddNew}
        className="flex h-9 w-auto"
      >
        <Plus className="size-4" />
        <span>Add New Diploma</span>
      </Button>
    </div>
  );
}
