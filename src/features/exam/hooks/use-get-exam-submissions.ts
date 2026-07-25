import type { IGetSubmissionsParams } from '@/features/exam/types/submissions';
import { useQuery } from '@tanstack/react-query';
import SubmissionsService from '../service/submissions.service';

export const SUBMISSION_KEYS = {
  all: (params?: IGetSubmissionsParams) => ['submissions', { ...params }],
  detail: (id: string) => ['submissions', id],
};

export function useGetExamSubmissions(params?: IGetSubmissionsParams) {
  return useQuery({
    queryKey: SUBMISSION_KEYS.all(params),
    queryFn: () => SubmissionsService.getSubmissions(params),
    enabled: !!params?.examId,
  });
}

export default useGetExamSubmissions;
