import Question from '@/features/question/components/user/question';
import type { IQuestion } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface QuestionsListProps {
  questions: IQuestion[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function QuestionsList({
  questions,
  currentStep,
  onStepChange,
}: QuestionsListProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
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
      <Question
        questionNumber={currentStep}
        text={currentQuestion.text}
        answers={currentQuestion.answers}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswerSelect={(answerId) =>
          handleAnswerSelect(currentQuestion.id, answerId)
        }
      />

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="flex-1 cursor-pointer gap-1"
          disabled={isFirst}
          size={'xl'}
          onClick={() => onStepChange(currentStep - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          className="flex-1 cursor-pointer gap-1"
          disabled={isLast}
          size={'xl'}

          onClick={() => onStepChange(currentStep + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
