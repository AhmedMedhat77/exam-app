import { useQuery } from '@tanstack/react-query';
import { EXAMS_KEY } from '../constants/exams-key';
import { ExamsService } from '../service/exams.service';

export const useGetExamById = (id: string) => {
  return useQuery({
    queryKey: EXAMS_KEY.detail(id),
    queryFn: () => ExamsService.getByIdApi(id),
    enabled: !!id,
  });
};
