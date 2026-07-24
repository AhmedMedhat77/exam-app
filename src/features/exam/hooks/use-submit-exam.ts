import type { ISubmitExamPayload } from '@/features/exam/types/submissions';
import { useMutation } from '@tanstack/react-query';
import SubmissionsService from '../service/submissions.service';

export function useSubmitExam() {
  return useMutation({
    mutationFn: (data: ISubmitExamPayload) =>
      SubmissionsService.submitExam(data),
  });
}

export default useSubmitExam;
