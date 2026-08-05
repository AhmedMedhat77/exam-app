import { useGetAllExams } from '@/features/exam/hooks/use-get-all-exams';
import { useDebounce } from '@/shared/hooks/use-debounce';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import {
  Controller,
  get,
  useFormContext,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface ExamDropDownProps<TFieldValues extends FieldValues = FieldValues> {
  name?: Path<TFieldValues>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  control?: Control<TFieldValues>;
  error?: string;
  limit?: number;
}

export default function ExamDropDown<
  TFieldValues extends FieldValues = FieldValues,
>({
  name = 'examId' as Path<TFieldValues>,
  label = 'Exam',
  required = true,
  disabled = false,
  control: propControl,
  error: propError,
  limit = 10,
}: ExamDropDownProps<TFieldValues>) {
  const formContext = useFormContext<TFieldValues>();
  const control = propControl ?? formContext?.control;
  const formErrors = formContext?.formState?.errors;

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const errorMessage =
    propError ??
    (formErrors
      ? (get(formErrors, `${name}.message`) as string | undefined)
      : undefined);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetAllExams({ limit, search: debouncedSearch });

  const exams = data?.pages.flatMap((page) => page.payload?.data ?? []) ?? [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 25) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <Field>
      {label && (
        <FieldLabel className="font-mono text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      {control ? (
        <ControllerWrapper
          name={name}
          control={control}
          disabled={disabled || isLoading}
          isLoading={isLoading}
          exams={exams}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          handleScroll={handleScroll}
          onSearchChange={setSearch}
        />
      ) : (
        <p className="text-destructive font-mono text-xs">
          Error: ExamDropDown must be used within a FormProvider or passed a
          control prop.
        </p>
      )}

      {errorMessage && (
        <FieldError className="text-destructive font-mono text-xs">
          {errorMessage}
        </FieldError>
      )}
    </Field>
  );
}

interface ControllerWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  disabled: boolean;
  isLoading: boolean;
  exams: Array<{ id: string; title: string }>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onSearchChange: (value: string) => void;
}

function ControllerWrapper<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  disabled,
  isLoading,
  exams,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  handleScroll,
  onSearchChange,
}: ControllerWrapperProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedExam = exams.find((exam) => exam.id === field.value);

        return (
          <Combobox
            items={exams}
            value={
              selectedExam ||
              (field.value ? { id: field.value, title: field.value } : null)
            }
            onValueChange={(val: { id: string; title: string } | null) => {
              field.onChange(val ? val.id : '');
            }}
            itemToStringLabel={(item) => (item ? item.title : '')}
          >
            <ComboboxInput
              placeholder={isLoading ? 'Loading exams...' : 'Select exam...'}
              disabled={disabled}
              className="h-10 border-gray-300 font-mono text-xs"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
              showClear
              onReset={() => {
                onSearchChange('');
                field.onChange(null);
              }}
            />

            <ComboboxContent>
              <ComboboxList onScroll={handleScroll}>
                {exams.map((exam) => (
                  <ComboboxItem
                    key={exam.id}
                    value={exam}
                    className="cursor-pointer font-mono text-xs"
                  >
                    {exam.title}
                  </ComboboxItem>
                ))}

                <ComboboxEmpty className="font-mono text-xs">
                  {isLoading ? 'Loading exams...' : 'No exams found'}
                </ComboboxEmpty>

                {isFetchingNextPage && (
                  <div className="text-muted-foreground flex items-center justify-center p-2 font-mono text-xs">
                    <Loader className="mr-1.5 size-3.5 animate-spin" />
                    <span>Loading more...</span>
                  </div>
                )}

                {hasNextPage && !isFetchingNextPage && (
                  <div
                    onClick={() => fetchNextPage()}
                    className="text-primary hover:bg-accent flex cursor-pointer items-center justify-center p-2 font-mono text-xs transition-colors"
                  >
                    <span>Load more...</span>
                  </div>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        );
      }}
    />
  );
}
