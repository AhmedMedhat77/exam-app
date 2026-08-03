import { Controller, useFormContext } from 'react-hook-form';
import CustomInput from '@/shared/ui/custom-input';
import { Field, FieldLabel } from '@/shared/ui/field';
import FileUpload from '@/shared/ui/file-upload';
import type { DiplomaInput } from '@/features/diploma/schemas/diploma.schema';

export default function AdminDiplomaInformationCard() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<DiplomaInput>();

  return (
    <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-2xs">
      {/* Top Banner Header */}
      <div className="bg-blue-600 px-4 py-3">
        <h2 className="font-mono text-sm font-semibold tracking-wide text-white">
          Diploma Information
        </h2>
      </div>

      {/* Card Content Body */}
      <div className="space-y-6 p-6">
        {/* Image Drag and Drop Upload */}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Image"
              value={field.value}
              onChange={field.onChange}
              error={errors.image?.message as string | undefined}
            />
          )}
        />

        {/* Title Input */}
        <CustomInput
          label="Title"
          {...register('title')}
          error={errors.title?.message}
          className="font-mono text-sm"
        />

        {/* Description Textarea */}
        <Field className="flex flex-col gap-1.5">
          <FieldLabel className="font-mono text-sm font-medium text-gray-700">
            Description
          </FieldLabel>
          <textarea
            {...register('description')}
            rows={5}
            className="w-full rounded-xs border border-gray-200 bg-transparent px-3 py-2 font-mono text-sm text-gray-900 transition-colors outline-none hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.description && (
            <span className="font-mono text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </Field>
      </div>
    </div>
  );
}
