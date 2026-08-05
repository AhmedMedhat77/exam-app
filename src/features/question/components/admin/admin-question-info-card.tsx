import { useGetExamsSelect } from '@/features/exam/hooks/use-get-exams-select';
import type { IExam } from '@/features/exam/types/exams.d';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Controller, useFormContext } from 'react-hook-form';

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

  const { data: examsData, isLoading: isLoadingExams } = useGetExamsSelect();

  const exams: IExam[] =
    examsData?.payload?.data ||
    (Array.isArray(examsData?.payload) ? (examsData?.payload as IExam[]) : []);

  const examItems = exams.map((exam) => ({
    value: exam.id,
    label: exam.title,
  }));

  return (
    <div className="overflow-hidden  border border-gray-200 bg-white shadow-sm">
      {/* Header Banner */}
      <div className="bg-primary px-5 py-3 text-white">
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          Question Information
        </h3>
      </div>

      <div className="space-y-4 p-5">
        {/* Exam Select */}
        {!hideExamSelect && (
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
                  <SelectTrigger className="border-gray-300 font-mono text-xs">
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
                {errors.examId.message as string}
              </FieldError>
            )}
          </Field>
        )}

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
