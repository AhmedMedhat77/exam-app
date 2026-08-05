import type { IQuestion } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import { CheckCircle2, Circle, Edit3, Trash2 } from 'lucide-react';

interface AdminQuestionViewCardProps {
  question: IQuestion;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleSelectable?: () => void;
  isSelectable?: boolean;
}

export default function AdminQuestionViewCard({
  question,
  onEdit,
  onDelete,
  onToggleSelectable,
  isSelectable = true,
}: AdminQuestionViewCardProps) {
  return (
    <div className="space-y-6">
      {/* Action Header Card */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <span className="bg-primary/10 text-primary inline-block rounded-md px-2.5 py-0.5 font-mono text-xs font-semibold">
            Question Detail
          </span>
          <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900">
            {question.text}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Selectable Badge / Toggle */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggleSelectable}
            className={`h-9 gap-1.5 border-gray-300 font-mono text-xs font-medium ${
              isSelectable
                ? 'border-primary/30 bg-primary/10 text-primary hover:bg-primary/20'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 className="size-3.5" />
            <span>Selectable</span>
          </Button>

          {/* EDIT Button */}
          {onEdit && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onEdit}
              className="bg-primary hover:bg-primary/90 h-9 gap-1.5 px-4 font-mono text-xs font-medium text-white"
            >
              <Edit3 className="size-3.5" />
              <span>EDIT</span>
            </Button>
          )}

          {/* DELETE Button */}
          {onDelete && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="bg-destructive hover:bg-destructive/90 h-9 gap-1.5 px-4 font-mono text-xs font-medium text-white"
            >
              <Trash2 className="size-3.5" />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Question Content Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
          <p className="font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
            Headline
          </p>
          <h2 className="mt-1 font-mono text-lg font-bold text-gray-900">
            {question.text}
          </h2>
          {question.exam?.title && (
            <p className="mt-1 font-mono text-xs text-gray-600">
              Exam:{' '}
              <span className="text-primary font-semibold">
                {question.exam.title}
              </span>
            </p>
          )}
        </div>

        <div className="space-y-4 p-6">
          <p className="font-mono text-xs font-semibold tracking-wider text-gray-700 uppercase">
            Answers ({question.answers?.length || 0})
          </p>

          <div className="space-y-3">
            {question.answers?.map((answer) => (
              <div
                key={answer.id || answer.text}
                className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
                  answer.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {answer.isCorrect ? (
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="size-5 shrink-0 text-gray-300" />
                  )}
                  <span
                    className={`font-mono text-sm ${
                      answer.isCorrect
                        ? 'font-semibold text-gray-900'
                        : 'text-gray-700'
                    }`}
                  >
                    {answer.text}
                  </span>
                </div>

                {answer.isCorrect && (
                  <span className="rounded-full bg-emerald-600 px-3 py-1 font-mono text-xs font-semibold text-white shadow-xs">
                    Correct Answer
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
