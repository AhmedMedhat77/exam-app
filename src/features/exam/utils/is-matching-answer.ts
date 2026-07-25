import type { ISubmissionAnalyticAnswer } from '@/features/exam/types/submissions';
import type { IAnswer } from '@/features/question/types/questions';

export function isMatchingAnswer(
  answer: IAnswer,
  target?: ISubmissionAnalyticAnswer
): boolean {
  if (!target) return false;

  return target.id === answer.id;
}
