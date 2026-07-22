import { useInfiniteQuery } from '@tanstack/react-query';
import { EXAMS_KEY } from '../constants/exams-key';
import { ExamsService } from '../service/exams.service';
import type { IGetExamsParams } from '../types/exams.types';

export const useGetAllExams = (params?: IGetExamsParams) => {
  return useInfiniteQuery({
    queryKey: EXAMS_KEY.all(params),
    queryFn: () => ExamsService.getAll({ ...params, page: 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.payload?.metadata?.page ?? 1;
      const totalPages = lastPage?.payload?.metadata?.totalPages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
