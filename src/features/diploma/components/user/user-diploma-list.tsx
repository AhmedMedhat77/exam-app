import { useGetUserDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import { Loader } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function UserDiplomaList() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, isError, error } =
    useGetUserDiplomas({
      limit: 2,
    });

  const diplomas = data?.pages.flatMap((page) => page.payload.data) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={data?.pages[0].payload.metadata.total ?? 0}
      hasMore={
        !!data?.pages[0].payload.metadata.totalPages &&
        !!data?.pages[0].payload.metadata.page &&
        data?.pages[0].payload.metadata.totalPages >
          data?.pages[0].payload.metadata.page
      }
      next={() => fetchNextPage()}
      loader={isFetchingNextPage ? <Loader className="animate-spin" /> : null}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {diplomas.map((diploma) => (
          <div
            className="h-84 rounded-md overflow-hidden relative"
            key={diploma.id}
          >
            <img
              src={diploma.image}
              alt={diploma.title}
              className="w-full h-full object-cover"
            />
            {diploma.title}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
