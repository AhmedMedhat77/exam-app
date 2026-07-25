import type { ISubmissionAnalytic } from '@/features/exam/types/submissions';
import { isMatchingAnswer } from '@/features/exam/utils/is-matching-answer';
import type { IAnswer } from '@/features/question/types/questions';
import { Check, X } from 'lucide-react';

interface AnswerCardProps {
  answer: IAnswer;
  analytic?: ISubmissionAnalytic;
}
export default function AnswerCard({ answer, analytic }: AnswerCardProps) {
  const isSelected = isMatchingAnswer(answer, analytic?.selectedAnswer);
  const isCorrect =
    Boolean(answer.isCorrect) ||
    isMatchingAnswer(answer, analytic?.correctAnswer);

  let bgClass = 'bg-gray-50 border-gray-200 text-gray-800';
  let dotClass = 'border-gray-300';
  let showCheck = false;
  let showX = false;

  if (isCorrect) {
    bgClass = 'bg-emerald-50/70 border-emerald-300 text-gray-800';
    if (isSelected) {
      dotClass = 'border-emerald-500 bg-emerald-500 text-white';
      showCheck = true;
    } else {
      dotClass = 'border-emerald-500 bg-emerald-100';
    }
  } else if (isSelected) {
    bgClass = 'bg-red-50/70 border-red-200 text-gray-800';
    dotClass = 'border-red-500 bg-red-500 text-white';
    showX = true;
  }
  return (
    <div
      className={`flex min-h-12.5 items-center gap-3 border px-4 py-3 font-mono transition-colors select-none ${bgClass}`}
    >
      <div
        className={`flex size-4 items-center justify-center rounded-full border ${dotClass}`}
      >
        {showCheck && <Check className="size-3 stroke-3" />}
        {showX && <X className="size-3 stroke-3" />}
      </div>
      <span className="text-sm">{answer.text}</span>
    </div>
  );
}
