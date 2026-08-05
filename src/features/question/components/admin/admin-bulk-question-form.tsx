import { useGetExamsSelect } from '@/features/exam/hooks/use-get-exams-select';
import type { IExam } from '@/features/exam/types/exams.d';
import QuestionAnswersField from '@/features/question/components/admin/question-answers-field';
import type { IBulkQuestionFormValues } from '@/features/question/schemas/question.schema';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

export default function AdminBulkQuestionForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IBulkQuestionFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data: examsData, isLoading: isLoadingExams } = useGetExamsSelect();

  const exams: IExam[] =
    examsData?.payload?.data ||
    (Array.isArray(examsData?.payload) ? (examsData?.payload as IExam[]) : []);

  const examItems = exams.map((exam) => ({
    value: exam.id,
    label: exam.title,
  }));

  const handleAddQuestionTab = () => {
    append({
      text: '',
      answers: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ],
    });
    setActiveTabIndex(fields.length);
  };

  const handleRemoveQuestionTab = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (fields.length <= 1) return;

    remove(index);

    if (activeTabIndex >= fields.length - 1) {
      setActiveTabIndex(Math.max(0, fields.length - 2));
    } else if (activeTabIndex === index) {
      setActiveTabIndex(Math.max(0, index - 1));
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Exam Info Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-primary px-5 py-3 text-white">
          <h3 className="font-mono text-sm font-semibold tracking-wide">
            Exam Info
          </h3>
        </div>
        <div className="p-5">
          <Field>
            <FieldLabel className="font-mono text-xs font-semibold text-gray-700">
              Exam <span className="text-destructive">*</span>
            </FieldLabel>
            <Controller
              name="examId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={field.onChange}
                  disabled={isLoadingExams}
                  items={examItems}
                >
                  <SelectTrigger className="h-10 border-gray-300 font-mono text-xs">
                    <SelectValue
                      placeholder={
                        isLoadingExams ? 'Loading exams...' : 'Select exam...'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem
                        key={exam.id}
                        value={exam.id}
                        className="font-mono text-xs"
                      >
                        {exam.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.examId && (
              <FieldError className="text-destructive font-mono text-xs">
                {errors.examId.message}
              </FieldError>
            )}
          </Field>
        </div>
      </div>

      {/* Section 2: Questions Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header Banner */}
        <div className="bg-primary px-5 py-3 text-white">
          <h3 className="font-mono text-sm font-semibold tracking-wide">
            Questions
          </h3>
        </div>

        {/* Question Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-200 bg-gray-50/80 px-4 py-2">
          {fields.map((field, index) => {
            const isActive = activeTabIndex === index;
            const tabError = errors.questions?.[index];
            const hasError = Boolean(tabError?.text || tabError?.answers);

            return (
              <div
                key={field.id}
                onClick={() => setActiveTabIndex(index)}
                className={`group flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                  isActive
                    ? 'border-primary text-primary bg-white shadow-xs'
                    : 'border-transparent text-gray-600 hover:bg-gray-200/70'
                } ${hasError ? 'border-destructive bg-destructive/10 text-destructive' : ''}`}
              >
                <span>Q{index + 1}</span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveQuestionTab(index, e)}
                    className="hover:bg-destructive/10 hover:text-destructive flex size-4 items-center justify-center rounded-full text-gray-400 opacity-0 transition-all group-hover:opacity-100"
                    title="Delete Tab"
                  >
                    <Trash2 className="size-3" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Plus Add Tab Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddQuestionTab}
            className="hover:border-primary hover:bg-primary/10 hover:text-primary h-8 gap-1 border-dashed border-gray-300 px-3 font-mono text-xs text-gray-600"
          >
            <Plus className="size-3.5" />
            <span>Add Tab</span>
          </Button>
        </div>

        {/* Form area for active tab */}
        <div className="space-y-5 p-5">
          {/* Active Question Headline */}
          <Field>
            <FieldLabel className="font-mono text-xs font-semibold text-gray-700">
              Question Headline <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              {...register(`questions.${activeTabIndex}.text`)}
              placeholder="Enter question headline..."
              className="focus:border-primary focus:ring-primary h-10 border-gray-300 font-mono text-sm focus:ring-1"
            />
            {errors.questions?.[activeTabIndex]?.text && (
              <FieldError className="text-destructive font-mono text-xs">
                {errors.questions[activeTabIndex]?.text?.message}
              </FieldError>
            )}
          </Field>

          {/* Active Question Answers Manager */}
          <QuestionAnswersField name={`questions.${activeTabIndex}.answers`} />
        </div>
      </div>
    </div>
  );
}
