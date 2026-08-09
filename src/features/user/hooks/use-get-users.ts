import { USER_QUERY_KEYS } from '@/features/user/constants/user-keys';
import UserService from '@/features/user/services/user.service';
import type { IGetUsersParams } from '@/features/user/types/user-api.d';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useGetUsers(params: IGetUsersParams = { page: 1, limit: 10 }) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.users.getAll(params),
    queryFn: () => UserService.getUsersApi(params),
  });
}

export function useGetPaginatedUsers(
  params: IGetUsersParams = { page: 1, limit: 10 }
) {
  return useInfiniteQuery({
    queryKey: USER_QUERY_KEYS.users.getAll(params),
    queryFn: ({ pageParam = 1 }) =>
      UserService.getUsersApi({ ...params, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.payload?.metadata?.page ?? 1;
      const totalPages = lastPage?.payload?.metadata?.totalPages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}
