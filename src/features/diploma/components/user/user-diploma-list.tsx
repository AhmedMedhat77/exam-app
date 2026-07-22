import UserDiplomaCard from '@/features/diploma/components/user/user-diploma-card';
import { useGetUserDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import UserDiplomaSkeletonCard from '@/features/diploma/skeletons/user-diploma-skeleton-card';
import { ChevronDown, Loader } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function UserDiplomaList() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useGetUserDiplomas({
    limit: 6,
  });

  const diplomas = data?.pages.flatMap((page) => page.payload.data) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <UserDiplomaSkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 rounded border border-red-200 bg-red-50 text-red-600 text-center font-mono text-sm">
        {error?.message || 'Failed to load diplomas.'}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <InfiniteScroll
        dataLength={diplomas.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="py-6 flex flex-col items-center justify-center gap-2">
            <Loader className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs font-mono text-slate-500">
              Loading more diplomas...
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {diplomas.map((diploma, index) => (
            <UserDiplomaCard key={diploma.id || index} {...diploma} />
          ))}
        </div>
      </InfiniteScroll>

      {/* Footer "Scroll to view more" indicator box */}
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full border border-blue-400/40 bg-slate-50/60 dark:bg-slate-900/40 py-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors rounded-none mt-2"
        >
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Scroll to view more
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500 animate-bounce" />
        </button>
      )}
    </div>
  );
}
