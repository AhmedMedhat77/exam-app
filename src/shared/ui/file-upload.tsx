import { cn } from '@/shared/lib/utils';
import { Field, FieldLabel } from '@/shared/ui/field';
import { CloudUpload, Image as ImageIcon, X } from 'lucide-react';
import React, { useCallback, useId, useMemo, useState } from 'react';

export interface FileUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  required?: boolean;
  placeholderText?: React.ReactNode;
}

export function FileUpload({
  value,
  onChange,
  accept = 'image/*',
  label,
  error,
  disabled = false,
  className,
  id: customId,
  required,
  placeholderText,
}: FileUploadProps) {
  const generatedId = useId();
  const id = customId || generatedId;
  const [isDragOver, setIsDragOver] = useState(false);

  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  }, [value]);

  const handleFile = useCallback(
    (file: File | null) => {
      if (disabled) return;
      if (onChange) {
        onChange(file);
      }
    },
    [disabled, onChange]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      handleFile(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFile(null);
  };

  return (
    <Field className="flex flex-col gap-1.5">
      {label && (
        <FieldLabel
          className="font-mono text-sm font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </FieldLabel>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-[100px] w-full items-center gap-6 rounded-md border border-gray-200 bg-white p-4 transition-colors',
          isDragOver && 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20',
          disabled && 'cursor-not-allowed bg-gray-50 opacity-60',
          error && 'border-red-500',
          className
        )}
      >
        <input
          id={id}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
        />

        {/* Left Preview Box / Placeholder Icon */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-50">
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="h-full w-full object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </>
          ) : (
            <ImageIcon className="h-8 w-8 stroke-[1.5] text-gray-300" />
          )}
        </div>

        {/* Right Dropzone Text / Trigger */}
        <div className="flex flex-1 items-center justify-center gap-2 text-center sm:text-left">
          <CloudUpload className="h-5 w-5 shrink-0 stroke-[1.75] text-gray-400" />
          <label
            htmlFor={id}
            className="cursor-pointer font-mono text-xs text-gray-600 hover:text-gray-800 sm:text-sm"
          >
            {placeholderText || (
              <>
                Drop an image here or{' '}
                <span className="font-medium text-blue-600 hover:underline">
                  select from your computer
                </span>
              </>
            )}
          </label>
        </div>
      </div>

      {error && <span className="font-mono text-xs text-red-500">{error}</span>}
    </Field>
  );
}

export default FileUpload;
