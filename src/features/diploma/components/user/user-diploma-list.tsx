import { ROUTES } from '@/app/routes';
import UserDiplomaCard from '@/features/diploma/components/user/user-diploma-card';
import { useGetUserDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import UserDiplomaSkeletonCard from '@/features/diploma/skeletons/user-diploma-skeleton-card';
import { ChevronDown, Loader } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

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
    limit: 3,
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
      <div className="p-4 rounded border border-red-200 bg-red-50 text-red-600 text-center text-sm">
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
            <span className="text-xs text-slate-500">
              Loading more diplomas...
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {diplomas.map((diploma, index) => (
            <Link
              to={`${ROUTES.EXAMS}?diplomaId=${diploma.id}`}
              key={diploma.id || index}
            >
              <UserDiplomaCard {...diploma} />
            </Link>
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
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Scroll to view more
          </span>
          <ChevronDown className="w-4 h-4 text-gray-600 animate-bounce" />
        </button>
      )}

      {!hasNextPage && (
        <div className="py-4">
          <p className="text-center text-xs text-gray-600">End of list</p>
        </div>
      )}
    </div>
  );
}
