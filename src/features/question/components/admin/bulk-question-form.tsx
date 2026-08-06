import BulkQuestionFields from '@/features/question/components/admin/bulk-question-fields';
import type { IBulkQuestionFormValues } from '@/features/question/schemas/question.schema';
import type { SubmitEventHandler } from 'react';

import { FormProvider, type UseFormReturn } from 'react-hook-form';

interface BulkQuestionFormProps {
  formId: string;
  form: UseFormReturn<IBulkQuestionFormValues>;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}

export default function BulkQuestionForm({
  formId,
  form,
  onSubmit,
}: BulkQuestionFormProps) {
  return (
    <FormProvider {...form}>
      <form id={formId} onSubmit={onSubmit} className="space-y-6">
        <BulkQuestionFields />
      </form>
    </FormProvider>
  );
}
