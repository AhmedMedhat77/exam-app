import { DIPLOMA_QUERY_KEYS } from '@/features/diploma/constants/diploma-keys';
import DiplomaService from '@/features/diploma/services/diploma.service';
import type { IGetDiplomaParams } from '@/features/diploma/types/diploma.d';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useGetDiplomas(
  params: IGetDiplomaParams = { page: 1, limit: 10 }
) {
  return useQuery({
    queryKey: DIPLOMA_QUERY_KEYS.diplomas.getAll(params),
    queryFn: () => DiplomaService.getDiplomasApi(params),
  });
}

export function useGetUserDiplomas(
  params: IGetDiplomaParams = { page: 1, limit: 10 }
) {
  return useInfiniteQuery({
    queryKey: DIPLOMA_QUERY_KEYS.diplomas.getAll(params),
    queryFn: ({ pageParam = 1 }) =>
      DiplomaService.getDiplomasApi({ ...params, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.payload?.metadata?.page ?? 1;
      const totalPages = lastPage?.payload?.metadata?.totalPages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}
