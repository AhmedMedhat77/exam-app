import ExamDropDown from '@/shared/components/exam-dropdown';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { useFormContext } from 'react-hook-form';

interface AdminQuestionInfoCardProps {
  examId?: string;
  hideExamSelect?: boolean;
}

export default function AdminQuestionInfoCard({
  hideExamSelect = false,
}: AdminQuestionInfoCardProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* Header Banner */}
      <div className="bg-primary px-5 py-3 text-white">
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          Question Information
        </h3>
      </div>

      <div className="space-y-4 p-5">
        {/* Exam Select */}
        {!hideExamSelect && <ExamDropDown name="examId" control={control} />}

        {/* Question Headline Text Input */}
        <Field>
          <FieldLabel className="font-mono text-xs font-semibold text-gray-700">
            Question Headline <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            {...register('text')}
            placeholder="Enter question text..."
            className="focus:border-primary focus:ring-primary h-10 border-gray-300 font-mono text-sm focus:ring-1"
          />
          {errors.text && (
            <FieldError className="text-destructive font-mono text-xs">
              {errors.text.message as string}
            </FieldError>
          )}
        </Field>
      </div>
    </div>
  );
}
