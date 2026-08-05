import AdminQuestionInfoCard from '@/features/question/components/admin/admin-question-info-card';
import QuestionAnswersField from '@/features/question/components/admin/question-answers-field';
import type { IQuestionFormValues } from '@/features/question/schemas/question.schema';
import type { FormEventHandler } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

interface SingleQuestionFormProps {
  formId: string;
  form: UseFormReturn<IQuestionFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function SingleQuestionForm({
  formId,
  form,
  onSubmit,
}: SingleQuestionFormProps) {
  return (
    <FormProvider {...form}>
      <form id={formId} onSubmit={onSubmit} className="space-y-6">
        <AdminQuestionInfoCard />
        <QuestionAnswersField />
      </form>
    </FormProvider>
  );
}
