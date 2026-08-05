import { useCreateQuestion } from '@/features/question/hooks/use-create-question';
import type { ICreateAnswerPayload } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { FieldLabel } from '@/shared/ui/field';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
}

export default function AddQuestionModal({
  isOpen,
  onClose,
  examId,
}: AddQuestionModalProps) {
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState<ICreateAnswerPayload[]>([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: createQuestion, isPending } = useCreateQuestion();

  const handleCorrectSelect = (index: number) => {
    setAnswers((prev) =>
      prev.map((ans, idx) => ({
        ...ans,
        isCorrect: idx === index,
      }))
    );
  };

  const handleAnswerTextChange = (index: number, text: string) => {
    setAnswers((prev) =>
      prev.map((ans, idx) => (idx === index ? { ...ans, text } : ans))
    );
  };

  const handleAddAnswerOption = () => {
    if (answers.length >= 6) return;
    setAnswers((prev) => [...prev, { text: '', isCorrect: false }]);
  };

  const handleRemoveAnswerOption = (index: number) => {
    if (answers.length <= 2) return;
    setAnswers((prev) => {
      const updated = prev.filter((_, idx) => idx !== index);
      // Ensure at least one correct answer remains selected
      if (!updated.some((a) => a.isCorrect) && updated.length > 0) {
        updated[0].isCorrect = true;
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!questionText.trim()) {
      setErrorMessage('Question text is required.');
      return;
    }

    const validAnswers = answers.filter((a) => a.text.trim() !== '');
    if (validAnswers.length < 2) {
      setErrorMessage('At least 2 non-empty answers are required.');
      return;
    }

    const hasCorrect = validAnswers.some((a) => a.isCorrect);
    if (!hasCorrect) {
      setErrorMessage('Please select one correct answer.');
      return;
    }

    createQuestion(
      {
        examId,
        text: questionText.trim(),
        answers: validAnswers.map((a) => ({
          text: a.text.trim(),
          isCorrect: a.isCorrect,
        })),
      },
      {
        onSuccess: () => {
          setQuestionText('');
          setAnswers([
            { text: '', isCorrect: true },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ]);
          onClose();
        },
        onError: (err: unknown) => {
          const apiErr = err as { response?: { data?: { message?: string } } };
          setErrorMessage(
            apiErr.response?.data?.message ||
              'Failed to create question. Please check input values.'
          );
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl font-mono">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-gray-900">
            Add Question
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {errorMessage && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <CustomInput
              label="Question Text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g. What is the difference between state and props?"
              required
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <FieldLabel className="text-xs font-semibold text-gray-700">
              Answer Choices (Select correct answer)
            </FieldLabel>

            {answers.map((answer, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50/50 p-2"
              >
                <button
                  type="button"
                  onClick={() => handleCorrectSelect(index)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    answer.isCorrect
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  title={
                    answer.isCorrect ? 'Correct Answer' : 'Mark as Correct'
                  }
                >
                  {answer.isCorrect && <Check className="size-3.5 stroke-3" />}
                </button>

                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerTextChange(index, e.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 rounded-sm border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-800 outline-none focus:border-blue-500"
                />

                {answers.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAnswerOption(index)}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Remove option"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            ))}

            {answers.length < 6 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddAnswerOption}
                className="h-8 w-auto gap-1 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <Plus className="size-3.5" />
                <span>Add Option</span>
              </Button>
            )}
          </div>

          <div className="grid w-full grid-cols-2 items-center justify-between gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-9 font-mono text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="h-9 bg-blue-600 font-mono text-xs text-white hover:bg-blue-700"
            >
              {isPending ? 'Adding...' : 'Add Question'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
