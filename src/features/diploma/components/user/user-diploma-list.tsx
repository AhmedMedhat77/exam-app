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

  const diplomas =
    data?.pages.flatMap((page) => page.payload?.data ?? []) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <UserDiplomaSkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
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
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <Loader className="text-primary h-6 w-6 animate-spin" />
            <span className="text-xs text-slate-500">
              Loading more diplomas...
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
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
          className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-none border border-gray-400/40 bg-gray-50/60 py-3 transition-colors hover:bg-gray-50 dark:bg-gray-900/40 dark:hover:bg-gray-800"
        >
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Scroll to view more
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-gray-600" />
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
