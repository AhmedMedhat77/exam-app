import SubmissionService from '@/features/submission/services/submission.service';
import type { ISubmitExamPayload } from '@/features/submission/types/submission';
import { useMutation } from '@tanstack/react-query';

export function useSubmitExam() {
  return useMutation({
    mutationFn: (data: ISubmitExamPayload) =>
      SubmissionService.submitExam(data),
  });
}

export default useSubmitExam;
