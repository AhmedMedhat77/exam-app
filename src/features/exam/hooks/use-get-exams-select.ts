import { ExamsService } from '@/features/exam/service/exams.service';
import { useQuery } from '@tanstack/react-query';
import { EXAMS_KEY } from '../constants/exams-key';

export function useGetExamsSelect() {
  return useQuery({
    queryKey: EXAMS_KEY.all({ limit: 100 }),
    queryFn: () => ExamsService.getAllApi({ limit: 100 }),
    staleTime: 5 * 60 * 1000,
  });
}
