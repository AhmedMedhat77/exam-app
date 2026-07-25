import type { ISubmissionAnalyticAnswer } from '@/features/exam/types/submissions';
import type { IAnswer } from '@/features/question/types/questions';

export function isMatchingAnswer(
  answer: IAnswer,
  target?: ISubmissionAnalyticAnswer
): boolean {
  if (!target) return false;
  if (typeof target === 'string') {
    return target === answer.id || target === answer.text;
  }
  if (typeof target === 'object' && target !== null) {
    const t = target as Record<string, unknown>;
    if (t.id && (t.id === answer.id || t.id === answer.text)) return true;
    if (t._id && (t._id === answer.id || t._id === answer.text)) return true;
    if (t.key && (t.key === answer.id || t.key === answer.text)) return true;
    if (t.text && t.text === answer.text) return true;
  }
  return false;
}
