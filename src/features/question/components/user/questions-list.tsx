import Question from '@/features/question/components/user/question';
import type { IQuestion } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface UserExamFormValues {
  answers: Record<string, string>;
}

interface QuestionsListProps {
  questions: IQuestion[];
  currentStep: number;
  onStepChange: (step: number) => void;
  answers?: Record<string, string>;
  onAnswerSelect?: (questionId: string, answerId: string) => void;
  onSubmit?: (answers: Record<string, string>) => void;
  isSubmitting?: boolean;
}

export default function QuestionsList({
  questions,
  currentStep,
  onStepChange,
  answers: controlledAnswers,
  onAnswerSelect,
  onSubmit,
  isSubmitting,
}: QuestionsListProps) {
  const formContext = useFormContext<UserExamFormValues>();
  const [internalAnswers, setInternalAnswers] = useState<
    Record<string, string>
  >({});

  const formAnswers = formContext?.watch('answers');
  const answers = controlledAnswers ?? formAnswers ?? internalAnswers;

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    if (formContext) {
      formContext.setValue(
        'answers',
        {
          ...formContext.getValues('answers'),
          [questionId]: answerId,
        },
        { shouldDirty: true }
      );
    }
    setInternalAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    onAnswerSelect?.(questionId, answerId);
  };

  if (!questions.length) {
    return (
      <p className="py-6 text-center font-mono text-sm text-gray-500">
        No questions available for this exam.
      </p>
    );
  }

  const currentQuestion = questions[currentStep - 1];
  const isFirst = currentStep === 1;
  const isLast = currentStep === questions.length;

  return (
    <div className="space-y-6">
      {currentQuestion && (
        <Question
          questionNumber={currentStep}
          text={currentQuestion.text}
          answers={currentQuestion.answers}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswerSelect={(answerId) =>
            handleAnswerSelect(currentQuestion.id, answerId)
          }
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="flex-1 cursor-pointer gap-1"
          disabled={isFirst || isSubmitting}
          size={'xl'}
          onClick={() => onStepChange(currentStep - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {isLast ? (
          <Button
            className="flex-1 cursor-pointer gap-1"
            size={'xl'}
            disabled={isSubmitting}
            onClick={() => onSubmit?.(answers)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        ) : (
          <Button
            className="flex-1 cursor-pointer gap-1"
            size={'xl'}
            onClick={() => onStepChange(currentStep + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
