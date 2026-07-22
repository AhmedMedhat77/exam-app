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
      <div className="rounded border border-red-200 bg-red-50 p-4 text-center font-mono text-sm text-red-600">
        {error?.message || 'Failed to load exams.'}
      </div>
    );
  }

  if (!exams.length) {
    return (
      <div className="rounded-none border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/20">
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
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
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <Loader className="text-primary h-6 w-6 animate-spin" />
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
          className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-none border border-gray-400/40 bg-gray-50/60 py-3 transition-colors hover:bg-gray-50 dark:bg-gray-900/40 dark:hover:bg-gray-800"
        >
          <span className="font-mono text-xs text-gray-600 dark:text-gray-400">
            Scroll to view more
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-gray-600" />
        </button>
      )}

      {!hasNextPage && exams.length > 0 && (
        <div className="py-4">
          <p className="text-center font-mono text-xs text-gray-600">
            End of list
          </p>
        </div>
      )}
    </div>
  );
}
