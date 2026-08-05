import type { IAnswer } from '@/features/question/types/questions';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

interface QuestionProps {
  questionNumber: number;
  text: string;
  answers: IAnswer[];
  selectedAnswer?: string;
  onAnswerSelect?: (answerId: string) => void;
}

export default function Question({
  questionNumber,
  text,
  answers,
  selectedAnswer,
  onAnswerSelect,
}: QuestionProps) {
  return (
    <div className="space-y-4">
      {/* Question Title */}
      <h3 className="text-base font-semibold text-blue-600">
        {questionNumber}. {text}
      </h3>

      {/* Answer Options */}
      <RadioGroup
        value={selectedAnswer ?? ''}
        onValueChange={onAnswerSelect}
        className="gap-4"
      >
        {answers.map((answer) => (
          <Label
            key={answer.id}
            htmlFor={answer.id}
            className={`flex h-12.5 cursor-pointer items-center gap-3 border px-4 py-3 font-mono transition-colors select-none ${
              selectedAnswer === answer.id
                ? 'border-blue-500 bg-blue-50'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <RadioGroupItem value={answer.id} id={answer.id} />
            <span className="text-sm text-gray-800">{answer.text}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
