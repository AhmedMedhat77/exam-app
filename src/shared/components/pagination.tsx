import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface paginationProps {
  isLoading?: boolean;
  handlePrev: () => void;
  handlePageSubmit: (e: React.SubmitEvent) => void;
  handlePageBlur: () => void;
  handleNext: () => void;
  page: number;
  totalPages: number;
  inputPage: string;
  setInputPage: (page: string) => void;
}

export default function pagination({
  isLoading,
  handlePrev,
  handlePageSubmit,
  handlePageBlur,
  handleNext,
  page,
  totalPages,
  inputPage,
  setInputPage,
}: paginationProps) {
  return (
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
  );
}
