import QuestionsList, {
  type UserExamFormValues,
} from '@/features/question/components/user/questions-list';
import type { IQuestion } from '@/features/question/types/questions';
import { FormProvider, useForm } from 'react-hook-form';

interface UserExamQuestionsFormProps {
  questions: IQuestion[];
  currentStep: number;
  onStepChange: (step: number) => void;
  initialAnswers: Record<string, string>;
  onSubmit: (answers: Record<string, string>) => void;
  isSubmitting?: boolean;
}

export function UserExamQuestionsForm({
  questions,
  currentStep,
  onStepChange,
  initialAnswers,
  onSubmit,
  isSubmitting,
}: UserExamQuestionsFormProps) {
  const methods = useForm<UserExamFormValues>({
    defaultValues: {
      answers: initialAnswers || {},
    },
    values: {
      answers: initialAnswers || {},
    },
  });

  return (
    <FormProvider {...methods}>
      <QuestionsList
        questions={questions}
        currentStep={currentStep}
        onStepChange={onStepChange}
        onSubmit={(answers) => onSubmit(answers)}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
  );
}
