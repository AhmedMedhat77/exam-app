import type { ISubmissionAnalytic } from '@/features/submission/types/submission';
import { isMatchingAnswer } from '@/features/submission/utils/is-matching-answer';
import type { IAnswer } from '@/features/question/types/questions';
import { Check, X } from 'lucide-react';

interface AnswerCardProps {
  answer: IAnswer;
  analytic?: ISubmissionAnalytic;
  userAnswerId?: string;
}

export default function AnswerCard({
  answer,
  analytic,
  userAnswerId,
}: AnswerCardProps) {
  const isSelected =
    (userAnswerId && userAnswerId === answer.id) ||
    isMatchingAnswer(answer, analytic?.selectedAnswer);

  const isCorrect =
    Boolean(answer.isCorrect) ||
    isMatchingAnswer(answer, analytic?.correctAnswer);

  let bgClass = 'bg-gray-50 border-gray-200 text-gray-800';
  let dotClass = 'border-gray-300 bg-transparent';

  if (isCorrect) {
    bgClass = 'bg-emerald-50/70 border-emerald-300 text-gray-800';
    if (isSelected) {
      dotClass = 'border-emerald-500 bg-emerald-500 text-white';
    } else {
      dotClass = 'border-emerald-500 bg-emerald-100/80';
    }
  } else if (isSelected) {
    bgClass = 'bg-red-50/70 border-red-200 text-gray-800';
    dotClass = 'border-red-500 bg-red-500 text-white';
  }

  return (
    <div
      className={`flex min-h-12.5 items-center gap-3 border px-4 py-3 font-mono transition-colors select-none ${bgClass}`}
    >
      <span
        className={`flex size-4 min-w-4 items-center justify-center rounded-full border ${dotClass}`}
      >
        {isCorrect && isSelected && <Check className="size-3 stroke-3" />}
        {!isCorrect && isSelected && <X className="size-3 stroke-3" />}
      </span>

      <span className="font-mono text-sm text-gray-800">{answer.text}</span>
    </div>
  );
}
