import {
  QUESTION_FORM_MODES,
  type QuestionFormMode,
} from '@/features/question/constants/search-params.keys';
import ExamDropDown from '@/shared/components/exam-dropdown';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { useFormContext, type Control } from 'react-hook-form';

interface AdminQuestionInfoCardProps {
  examId?: string;
  hideExamSelect?: boolean;
  hideQuestionInput?: boolean;
  isBulk?: boolean;
  mode?: QuestionFormMode;
  control?: Control<any>;
}

export default function AdminQuestionInfoCard({
  hideExamSelect = false,
  hideQuestionInput = false,
  isBulk = false,
  mode,
  control: propControl,
}: AdminQuestionInfoCardProps) {
  const formContext = useFormContext();
  const control = propControl ?? formContext?.control;
  const register = formContext?.register;
  const errors = formContext?.formState?.errors;

  const isBulkMode =
    isBulk || mode === QUESTION_FORM_MODES.BULK || hideQuestionInput;

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* Header Banner */}
      <div className="bg-primary px-5 py-3 text-white">
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          {isBulkMode ? 'Exam Info' : 'Question Information'}
        </h3>
      </div>

      <div className="space-y-4 p-5">
        {/* Exam Select */}
        {!hideExamSelect && (
          <ExamDropDown name="examId" control={control} label="Exam" />
        )}

        {/* Question Headline Text Input */}
        {!isBulkMode && register && (
          <Field>
            <FieldLabel className="font-mono text-xs font-semibold text-gray-700">
              Question Headline <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              {...register('text')}
              placeholder="Enter question text..."
              className="focus:border-primary focus:ring-primary h-10 border-gray-300 font-mono text-sm focus:ring-1"
            />
            {errors?.text && (
              <FieldError className="text-destructive font-mono text-xs">
                {errors.text.message as string}
              </FieldError>
            )}
          </Field>
        )}
      </div>
    </div>
  );
}
