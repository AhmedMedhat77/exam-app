import { cn } from '@/shared/lib/utils';
import { Field, FieldLabel } from '@/shared/ui/field';
import { CloudUpload, Download, Trash2 } from 'lucide-react';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';

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
  fileName?: string;
  fileSize?: string;
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
  fileName: customFileName,
  fileSize: customFileSize,
}: FileUploadProps) {
  const generatedId = useId();
  const id = customId || generatedId;
  const [isDragOver, setIsDragOver] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    setObjectUrl(null);
  }, [value]);

  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof File) return objectUrl;
    return null;
  }, [value, objectUrl]);

  const fileName = useMemo(() => {
    if (customFileName) return customFileName;
    if (value instanceof File) return value.name;
    if (typeof value === 'string') {
      const parts = value.split('/');
      return parts[parts.length - 1] || 'Image_upload.png';
    }
    return 'Image_upload.png';
  }, [value, customFileName]);

  const fileSize = useMemo(() => {
    if (customFileSize) return customFileSize;
    if (value instanceof File) {
      const mb = value.size / (1024 * 1024);
      return `${mb.toFixed(2)} MB`;
    }
    return '1.48 MB';
  }, [value, customFileSize]);

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
          className="font-mono text-xs font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-20 w-full items-center gap-4 rounded-md border border-gray-200 bg-white p-3 transition-colors',
          isDragOver && 'ring-primary/20 border-primary bg-blue-50/40 ring-2',
          disabled && 'cursor-not-allowed bg-gray-50 opacity-60',
          error && 'border-destructive',
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

        {previewUrl ? (
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <p className="truncate font-mono text-xs font-medium text-gray-800">
                  {fileName}
                </p>
                <p className="font-mono text-[11px] text-gray-400">
                  {fileSize}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xs border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                aria-label="Download image"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-3.5 w-3.5" />
              </a>
              {!disabled && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex h-8 w-8 items-center justify-center rounded-xs border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  aria-label="Remove image"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center gap-3 py-2 text-center sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <CloudUpload className="h-5 w-5 stroke-[1.75]" />
            </div>
            <label
              htmlFor={id}
              className="cursor-pointer font-mono text-xs text-gray-600 hover:text-gray-800"
            >
              {placeholderText || (
                <>
                  Drop an image here or{' '}
                  <span className="font-semibold text-blue-600 hover:underline">
                    select from your computer
                  </span>
                </>
              )}
            </label>
          </div>
        )}
      </div>

      {error && (
        <span className="text-destructive font-mono text-xs">{error}</span>
      )}
    </Field>
  );
}

export default FileUpload;
