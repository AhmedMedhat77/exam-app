import UserExamsCard from '@/features/exam/components/user/exams-card';
import { useGetAllExams } from '@/features/exam/hooks/use-get-all-exams';
import UserExamCardSkeleton from '@/features/exam/skeletons/user/user-exam-card-skeleton';
import { ChevronDown, Loader } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  diplomaId?: string;
}

export default function UserExamsList({ diplomaId }: Props) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useGetAllExams({
    diplomaId,
    limit: 5,
  });

  const exams = data?.pages.flatMap((page) => page.payload?.data ?? []) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <UserExamCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 rounded border border-red-200 bg-red-50 text-red-600 text-center text-sm font-mono">
        {error?.message || 'Failed to load exams.'}
      </div>
    );
  }

  if (!exams.length) {
    return (
      <div className="p-8 text-center border border-dashed border-gray-300 dark:border-slate-800 rounded-none bg-gray-50/50 dark:bg-slate-900/20">
        <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
          No exams found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <InfiniteScroll
        dataLength={exams.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="py-6 flex flex-col items-center justify-center gap-2">
            <Loader className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs text-slate-500">
              Loading more exams...
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          {exams.map((exam, index) => (
            <UserExamsCard key={exam.id || index} {...exam} />
          ))}
        </div>
      </InfiniteScroll>

      {/* Footer "Scroll to view more" indicator box */}
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full border border-gray-400/40 bg-gray-50/60 dark:bg-gray-900/40 py-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-none mt-2"
        >
          <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            Scroll to view more
          </span>
          <ChevronDown className="w-4 h-4 text-gray-600 animate-bounce" />
        </button>
      )}

      {!hasNextPage && exams.length > 0 && (
        <div className="py-4">
          <p className="text-center text-xs font-mono text-gray-600">
            End of list
          </p>
        </div>
      )}
    </div>
  );
}
