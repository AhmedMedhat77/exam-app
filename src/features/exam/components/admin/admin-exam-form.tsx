import { useGetDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import type { ExamFormValues } from '@/features/exam/schemas/exam.schema';
import DiplomaDropDown from '@/shared/components/diploma-dropdown';
import CustomInput from '@/shared/ui/custom-input';
import { Field, FieldLabel } from '@/shared/ui/field';
import FileUpload from '@/shared/ui/file-upload';
import { Controller, useFormContext } from 'react-hook-form';

export default function AdminExamForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ExamFormValues>();

  const { data: diplomaData } = useGetDiplomas();
  const diplomas = diplomaData?.payload?.data ?? [];
  const diplomaItems = diplomas.map((d) => ({
    value: d.id,
    label: d.title,
  }));

  return (
    <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-2xs">
      {/* Top Banner Header */}
      <div className="bg-primary px-5 py-3 text-white">
        <h2 className="font-mono text-sm font-semibold tracking-wide">
          Exam Information
        </h2>
      </div>

      {/* Card Content Body */}
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Title Input */}
          <div className="flex flex-col">
            <CustomInput
              label="Title"
              {...register('title')}
              error={errors.title?.message}
              placeholder="e.g. Final Full Stack Development Certification Exam"
              className="h-9 font-mono text-xs sm:text-sm"
            />
          </div>

          {/* Diploma Select */}
          <div className="flex flex-col">
            <DiplomaDropDown control={control} name="diplomaId" />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {/* Image File Upload */}
          <div className="flex flex-col">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileUpload
                  label="Image"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.image?.message as string | undefined}
                  fileName="Image_wlb0jw3b0jmw1b0.png"
                  fileSize="1.48 MB"
                />
              )}
            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col">
            <Field className="flex flex-col gap-1.5">
              <FieldLabel className="font-mono text-xs font-medium text-gray-700">
                Description
              </FieldLabel>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Comprehensive exam covering all full stack development topics in this diploma."
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 font-mono text-xs text-gray-900 transition-colors outline-none hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
              {errors.description && (
                <span className="font-mono text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Duration (min) Input */}
          <div className="flex flex-col">
            <CustomInput
              label="Duration (min)"
              type="number"
              min={1}
              // max={300}
              {...register('duration')}
              error={errors.duration?.message}
              placeholder="20"
              className="h-9 font-mono text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
