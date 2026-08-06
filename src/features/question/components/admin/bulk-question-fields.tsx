import BulkQuestionTab from '@/features/question/components/admin/bulk-question-tab';
import QuestionAnswersField from '@/features/question/components/admin/question-answers-field';
import type { IBulkQuestionFormValues } from '@/features/question/schemas/question.schema';
import { createEmptyQuestion } from '@/features/question/utils/question-form.utils';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function BulkQuestionFields() {
  // ====================== FORM ======================
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

  // ====================== handlers ======================
  const handleAddQuestionTab = () => {
    append(createEmptyQuestion());
    setActiveTabIndex(fields.length);
  };

  const handleRemoveQuestionTab = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (fields.length <= 1) return;

    remove(index);

    if (index < activeTabIndex) {
      setActiveTabIndex((prev) => prev - 1);
    } else if (index === activeTabIndex) {
      setActiveTabIndex((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header Banner */}
      <div className="bg-primary px-5 py-3 text-white">
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          Questions
        </h3>
      </div>

      {/* Question Tabs Bar */}
      <div
        className="flex h-11 items-stretch border-b border-gray-200 bg-gray-50/80"
        role="tablist"
        aria-label="Questions"
      >
        {/* Scrollable Tabs */}
        <div className="flex flex-1 items-stretch overflow-x-auto">
          {fields.map((field, index) => {
            const isActive = activeTabIndex === index;
            const tabError = errors.questions?.[index];
            const hasError = Boolean(tabError?.text || tabError?.answers);

            return (
              <BulkQuestionTab
                key={field.id}
                onRemove={(event) => handleRemoveQuestionTab(index, event)}
                onSelect={() => setActiveTabIndex(index)}
                index={index}
                questionCount={fields.length}
                hasError={hasError}
                isActive={isActive}
              />
            );
          })}
        </div>

        {/* Plus Add Tab Button (Always visible on the right) */}
        <button
          type="button"
          onClick={handleAddQuestionTab}
          className="hover:bg-primary/10 hover:text-primary flex size-11 shrink-0 items-center justify-center border-l border-gray-200 bg-gray-100 text-gray-700 transition-colors"
          title="Add Question"
          aria-label="Add question"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* Form area for active tab */}
      {fields.length > 0 && activeTabIndex < fields.length && (
        <div
          key={fields[activeTabIndex]?.id || activeTabIndex}
          className="space-y-5 p-5"
        >
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
      )}
    </div>
  );
}
