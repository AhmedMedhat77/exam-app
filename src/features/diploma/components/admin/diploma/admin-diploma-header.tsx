import { PAGE_QUERY_KEY } from '@/features/diploma/components/constants/search-params.keys';
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
  title = 'Diplomas',
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

  useEffect(() => {
    setInputPage(String(page));
  }, [page]);

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

  const handlePageSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Top Header Title */}
      <h1 className="text-2xl font-mono font-semibold tracking-tight text-gray-900">
        {title}
      </h1>

      {/* Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-3 border border-gray-200 shadow-xs">
        {/* Left: Range Summary */}
        <div className="font-mono text-sm text-gray-600 font-medium">
          {isLoading ? (
            <span className="text-gray-400">Loading count...</span>
          ) : (
            `${startItem} - ${endItem} of ${total}`
          )}
        </div>

        {/* Center: Pagination Controls */}
        <div className="flex items-center rounded-md border border-gray-200 bg-gray-100 overflow-hidden shadow-2xs">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={page <= 1 || isLoading}
            className="h-9 w-9 rounded-none bg-gray-100 hover:bg-gray-200 border-r border-gray-200 text-gray-600 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <form onSubmit={handlePageSubmit} className="flex items-center bg-white px-3 py-1.5 border-r border-gray-200">
            <span className="font-mono text-xs text-gray-500 mr-1.5 select-none">
              Page
            </span>
            <input
              type="text"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={handlePageBlur}
              className="w-8 text-center font-mono text-xs font-semibold text-gray-800 bg-transparent outline-none focus:ring-1 focus:ring-emerald-500 rounded px-0.5"
              aria-label="Current page number"
            />
            <span className="font-mono text-xs text-gray-500 ml-1.5 select-none">
              of {totalPages}
            </span>
          </form>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={page >= totalPages || isLoading}
            className="h-9 w-9 rounded-none bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Right: Add New Diploma Button */}
        <Button
          type="button"
          onClick={onAddNew}
          className="w-auto bg-[#00c9a7] hover:bg-[#00b395] text-white font-mono font-medium px-4 h-9 rounded-md flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer border-none"
        >
          <Plus className="size-4" />
          <span>Add New Diploma</span>
        </Button>
      </div>
    </div>
  );
}
