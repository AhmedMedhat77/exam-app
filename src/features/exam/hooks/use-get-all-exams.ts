import { useInfiniteQuery } from '@tanstack/react-query';
import { EXAMS_KEY } from '../constants/exams-key';
import { ExamsService } from '../service/exams.service';
import type { IGetExamsParams } from '../types/exams.d';

export const useGetAllExams = (params?: IGetExamsParams) => {
  return useInfiniteQuery({
    queryKey: EXAMS_KEY.all(params),
    queryFn: ({ pageParam = 1 }) =>
      ExamsService.getAllApi({ ...params, page: pageParam }),
    initialPageParam: params?.page ?? 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.payload?.metadata?.page ?? 1;
      const totalPages = lastPage?.payload?.metadata?.totalPages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};
