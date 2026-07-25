import { useQuery } from '@tanstack/react-query';
import SubmissionsService from '../service/submissions.service';
import { SUBMISSION_KEYS } from './use-get-exam-submissions';

export function useGetSubmissionById(id?: string) {
  return useQuery({
    queryKey: SUBMISSION_KEYS.detail(id || ''),
    queryFn: () => SubmissionsService.getSubmissionById(id!),
    enabled: !!id,
  });
}

export default useGetSubmissionById;
