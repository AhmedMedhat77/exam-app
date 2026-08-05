import type { ICreateAnswerPayload } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import { Input } from '@/shared/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Check, CheckCheck, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { get, useFormContext, useWatch } from 'react-hook-form';

interface AdminQuestionAnswersManagerProps {
  name?: string;
  answers?: ICreateAnswerPayload[];
  onChange?: (answers: ICreateAnswerPayload[]) => void;
  error?: string;
}

export default function SingleQuestionTableForm({
  name = 'answers',
  answers: propAnswers,
  onChange: propOnChange,
  error: propError,
}: AdminQuestionAnswersManagerProps = {}) {
  const formContext = useFormContext();

  const watchedAnswers = useWatch({
    name,
    control: formContext?.control,
    disabled: !formContext || Boolean(propAnswers),
  });

  const answers: ICreateAnswerPayload[] =
    propAnswers ?? (watchedAnswers as ICreateAnswerPayload[] | undefined) ?? [];

  const error =
    propError ??
    (formContext
      ? (get(formContext.formState.errors, `${name}.message`) as
          string | undefined) ||
        (get(formContext.formState.errors, name)?.message as string | undefined)
      : undefined);

  const updateAnswers = (newAnswers: ICreateAnswerPayload[]) => {
    if (propOnChange) {
      propOnChange(newAnswers);
    } else if (formContext) {
      formContext.setValue(name, newAnswers, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  // Todo Replace this with useForm Hook
  const [isAdding, setIsAdding] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddAnswer = () => {
    if (answers.length >= 4) {
      setInputError('Question cannot have more than 4 answers');
      return;
    }

    if (!newAnswerText.trim()) {
      setInputError('Answer text cannot be empty');
      return;
    }

    const newAnswers = [
      ...answers,
      {
        text: newAnswerText.trim(),
        // If first answer, mark it as correct by default
        isCorrect: answers.length === 0,
      },
    ];

    updateAnswers(newAnswers);
    setNewAnswerText('');
    setInputError('');
    setIsAdding(false);
  };

  const handleRemoveAnswer = (index: number) => {
    const updated = answers.filter((_, i) => i !== index);
    // If we deleted the correct answer and have remaining answers, set first one as correct
    if (answers[index]?.isCorrect && updated.length > 0) {
      updated[0] = { ...updated[0], isCorrect: true };
    }
    updateAnswers(updated);
  };

  const handleSetCorrect = (index: number) => {
    const updated = answers.map((ans, i) => ({
      ...ans,
      isCorrect: i === index,
    }));
    updateAnswers(updated);
  };

  const handleTextChange = (index: number, text: string) => {
    const updated = [...answers];
    updated[index] = { ...updated[index], text };
    updateAnswers(updated);
  };

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* Header Banner */}
      <div className="bg-primary flex items-center justify-between px-5 py-3 text-white">
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          Question Answers
        </h3>
      </div>

      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead
              colSpan={2}
              className="font-mono text-xs font-semibold text-gray-800"
            >
              Body
            </TableHead>
            <TableHead className="text-right">
              <Button
                type="button"
                variant="success"
                disabled={answers.length >= 4}
                onClick={() => {
                  if (answers.length >= 4) return;
                  setIsAdding(true);
                }}
                className="w-fit gap-1.5 bg-emerald-500 px-3 font-mono text-xs font-semibold hover:bg-emerald-500/80"
              >
                <Plus className="size-3.5" />
                <span>Add Answer</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {answers.map((answer, index) => (
            <TableRow key={index} className="hover:bg-gray-50/50">
              {/* Delete icon */}
              <TableCell
                className="w-12 cursor-pointer border-r border-gray-200 bg-red-50/70 p-0 text-center transition-colors duration-200 hover:bg-red-50"
                onClick={() => handleRemoveAnswer(index)}
              >
                <span className="flex h-full w-full items-center justify-center p-3 text-red-500 hover:text-red-700">
                  <Trash2 className="size-4" />
                </span>
              </TableCell>

              {/* Answer Text Input */}
              <TableCell className="p-0">
                <Input
                  value={answer.text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  className="h-10 flex-1 rounded-none border-none bg-transparent px-4 font-mono text-sm focus:bg-white focus:ring-0 focus:outline-none"
                  placeholder="Enter answer body..."
                />
              </TableCell>

              {/* correct answer */}
              <TableCell className="text-right whitespace-nowrap">
                {answer.isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-600">
                    <CheckCheck className="size-4" />
                    <span>Correct Answer</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetCorrect(index)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-gray-300 bg-gray-100 px-3 py-1 font-mono text-xs font-medium text-gray-700 transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Check className="size-3.5" />
                    <span>Mark Correct</span>
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Bottom Input Row for Adding New Answer (Appears when isAdding is true and answers < 4) */}
      {isAdding && answers.length < 4 && (
        <div className="flex min-h-10 items-center gap-3 border-t border-gray-200 bg-emerald-50 p-2">
          {/* Cancel/Clear Icon (Left) */}
          <button
            type="button"
            onClick={() => {
              setNewAnswerText('');
              setInputError('');
              setIsAdding(false);
            }}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition-all duration-200 hover:border-emerald-500"
            title="Cancel"
          >
            <X className="size-4" />
          </button>

          {/* New Answer Text Input (Middle) */}
          <CustomInput
            id="new-answer-body-input"
            value={newAnswerText}
            onChange={(e) => {
              setNewAnswerText(e.target.value);
              if (inputError) setInputError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddAnswer();
              }
            }}
            placeholder="Enter answer body"
            className="h-full bg-transparent px-4 font-mono text-sm hover:border-emerald-500 focus:border-emerald-500!"
          />

          {/* Add Button (Right) */}
          <Button
            type="button"
            variant="success"
            size={'lg'}
            onClick={handleAddAnswer}
            className="min-h-10 w-fit gap-1.5 rounded-none bg-emerald-500"
          >
            <Plus className="size-4" />
            <span>Add</span>
          </Button>
        </div>
      )}
      {/* Errors (Input & Form level) */}
      {(inputError || error) && (
        <div className="p-3">
          {inputError && (
            <p className="text-destructive font-mono text-xs">{inputError}</p>
          )}
          {error && (
            <p className="text-destructive font-mono text-xs font-medium">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
