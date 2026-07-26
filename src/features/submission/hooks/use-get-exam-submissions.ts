import { SUBMISSIONS_KEY } from '@/features/submission/constants/submission-keys';
import SubmissionService from '@/features/submission/services/submission.service';
import type { IGetSubmissionsParams } from '@/features/submission/types/submission';
import { useQuery } from '@tanstack/react-query';

export function useGetExamSubmissions(params?: IGetSubmissionsParams) {
  return useQuery({
    queryKey: SUBMISSIONS_KEY.all(params),
    queryFn: () => SubmissionService.getSubmissionsApi(params),
    enabled: !!params?.examId,
  });
}

export default useGetExamSubmissions;
