import { PAGE_QUERY_KEY as DEFAULT_PAGE_QUERY_KEY } from '@/features/diploma/components/constants/search-params.keys';
import CustomPagination from '@/shared/components/pagination';
import BreadCrumb, {
  type BreadCrumbProps,
} from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import type { BreadcrumbItem } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export interface AdminHeaderProps {
  /** Custom breadcrumb items to override context/defaults */
  breadcrumbItems?: BreadcrumbItem[];
  /** Custom breadcrumb title */
  breadcrumbTitle?: string;
  /** Custom breadcrumb description */
  breadcrumbDescription?: string;
  /** Direct props passed to BreadCrumb component */
  breadcrumbProps?: BreadCrumbProps;

  /** Total number of items */
  total?: number;
  /** Total number of pages */
  totalPages?: number;
  /** Items per page limit */
  limit?: number;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Search parameter key for pagination page index (defaults to 'page') */
  pageQueryKey?: string;

  /** Action callback when clicking the add button */
  onAddNew?: () => void;
  /** Label for the add button (defaults to 'Add New') */
  addNewLabel?: string;
  /** Custom action node to render on the right instead of default button */
  actionNode?: React.ReactNode;

  /** Custom class names for header container */
  className?: string;
}

export default function AdminHeader({
  breadcrumbItems,
  breadcrumbTitle,
  breadcrumbDescription,
  breadcrumbProps,
  total = 0,
  totalPages = 1,
  limit = 10,
  isLoading = false,
  pageQueryKey = DEFAULT_PAGE_QUERY_KEY,
  onAddNew,
  addNewLabel = 'Add New',
  actionNode,
  className,
}: AdminHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(pageQueryKey)) || 1;

  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, total);

  const [inputPage, setInputPage] = useState<string>(String(page));

  const updatePageParam = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (validPage <= 1) {
        next.delete(pageQueryKey);
      } else {
        next.set(pageQueryKey, String(validPage));
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
        'sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border border-gray-200 bg-white p-4 shadow-xs',
        '-mx-4 -mt-8',
        className
      )}
    >
      <BreadCrumb
        items={breadcrumbItems}
        title={breadcrumbTitle}
        description={breadcrumbDescription}
        {...breadcrumbProps}
      />
      <div className="flex flex-wrap items-center gap-4">
        {/* Left: Range Summary */}
        <div className="font-mono text-xs font-medium text-gray-800">
          {isLoading ? (
            <span className="text-gray-400">Loading count...</span>
          ) : (
            `${startItem} - ${endItem} of ${total}`
          )}
        </div>

        <CustomPagination
          handleNext={handleNext}
          handlePrev={handlePrev}
          handlePageSubmit={handlePageSubmit}
          handlePageBlur={handlePageBlur}
          page={page}
          inputPage={inputPage}
          setInputPage={setInputPage}
          totalPages={totalPages}
        />
      </div>

      {/* Right: Action / Add New Button */}
      {actionNode ? (
        actionNode
      ) : onAddNew ? (
        <Button
          variant="success"
          size={'xl'}
          type="button"
          onClick={onAddNew}
          className="flex h-9 w-auto"
        >
          <Plus className="size-4" />
          <span>{addNewLabel}</span>
        </Button>
      ) : null}
    </div>
  );
}
