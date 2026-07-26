import { SUBMISSIONS_KEY } from '@/features/submission/constants/submission-keys';
import SubmissionService from '@/features/submission/services/submission.service';
import { useQuery } from '@tanstack/react-query';

export function useGetSubmissionById(id?: string) {
  return useQuery({
    queryKey: SUBMISSIONS_KEY.detail(id),
    queryFn: () => SubmissionService.getSubmissionByIdApi(id!),
    enabled: !!id,
  });
}

export default useGetSubmissionById;
