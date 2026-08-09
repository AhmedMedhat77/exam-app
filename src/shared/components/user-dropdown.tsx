import { useGetPaginatedUsers } from '@/features/user/hooks/use-get-users';
import type { IUserItem } from '@/features/user/types/user-api.d';
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
import React, { useState } from 'react';
import {
  Controller,
  get,
  useFormContext,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface UserDropDownProps<TFieldValues extends FieldValues = FieldValues> {
  name?: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  control?: Control<TFieldValues>;
  error?: string;
  limit?: number;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export default function UserDropDown<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  label,
  placeholder = 'User',
  required = false,
  disabled = false,
  control: propControl,
  error: propError,
  limit = 10,
  value: controlledValue,
  onChange: controlledOnChange,
  className,
}: UserDropDownProps<TFieldValues>) {
  const formContext = useFormContext<TFieldValues>();
  const control = name ? (propControl ?? formContext?.control) : undefined;
  const formErrors = formContext?.formState?.errors;

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const errorMessage =
    propError ??
    (name && formErrors
      ? (get(formErrors, `${name}.message`) as string | undefined)
      : undefined);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetPaginatedUsers({ limit, search: debouncedSearch });

  const users = data?.pages.flatMap((page) => page.payload?.data ?? []) ?? [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 25) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const isFormControllerMode = Boolean(control && name);

  return (
    <Field className="w-full">
      {label && (
        <FieldLabel className="font-mono text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      {isFormControllerMode && name && control ? (
        <ControllerWrapper
          name={name}
          control={control}
          disabled={disabled || isLoading}
          isLoading={isLoading}
          users={users}
          placeholder={placeholder}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          handleScroll={handleScroll}
          onSearchChange={setSearch}
          className={className}
        />
      ) : (
        <ControlledUserCombobox
          value={controlledValue || ''}
          onChange={controlledOnChange || (() => {})}
          disabled={disabled || isLoading}
          isLoading={isLoading}
          users={users}
          placeholder={placeholder}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          handleScroll={handleScroll}
          onSearchChange={setSearch}
          className={className}
        />
      )}

      {errorMessage && (
        <FieldError className="text-destructive font-mono text-xs">
          {errorMessage}
        </FieldError>
      )}
    </Field>
  );
}

interface ControlledUserComboboxProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  isLoading: boolean;
  users: IUserItem[];
  placeholder: string;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onSearchChange: (value: string) => void;
  className?: string;
}

function ControlledUserCombobox({
  value,
  onChange,
  disabled,
  isLoading,
  users,
  placeholder,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  handleScroll,
  onSearchChange,
  className,
}: ControlledUserComboboxProps) {
  const selectedUser = users.find(
    (u) => u.id === value || u.username === value || u.email === value
  );

  return (
    <Combobox
      items={users}
      value={
        selectedUser ||
        (value
          ? ({ id: value, username: value, email: value } as IUserItem)
          : null)
      }
      onValueChange={(val: IUserItem | null) => {
        onChange(val ? val.id : '');
      }}
      itemToStringLabel={(item) =>
        item
          ? item.email
            ? `${item.username} (${item.email})`
            : item.username
          : ''
      }
    >
      <ComboboxInput
        placeholder={isLoading ? 'Loading users...' : placeholder}
        disabled={disabled}
        className={`h-11 border-gray-200 font-mono text-xs ${className || ''}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchChange(e.target.value)
        }
        showClear
        onReset={() => {
          onSearchChange('');
          onChange('');
        }}
      />

      <ComboboxContent className="max-h-60 overflow-y-auto">
        <ComboboxList onScroll={handleScroll}>
          {users.map((user) => (
            <ComboboxItem
              key={user.id}
              value={user}
              className="flex cursor-pointer flex-col items-start py-1.5 font-mono text-xs"
            >
              <span className="font-semibold text-gray-900">
                {user.username}
              </span>
              <span className="text-[11px] text-gray-500">{user.email}</span>
            </ComboboxItem>
          ))}

          <ComboboxEmpty className="font-mono text-xs">
            {isLoading ? 'Loading users...' : 'No users found'}
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
}

interface ControllerWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  disabled: boolean;
  isLoading: boolean;
  users: IUserItem[];
  placeholder: string;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onSearchChange: (value: string) => void;
  className?: string;
}

function ControllerWrapper<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  disabled,
  isLoading,
  users,
  placeholder,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  handleScroll,
  onSearchChange,
  className,
}: ControllerWrapperProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ControlledUserCombobox
          value={field.value || ''}
          onChange={field.onChange}
          disabled={disabled}
          isLoading={isLoading}
          users={users}
          placeholder={placeholder}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          handleScroll={handleScroll}
          onSearchChange={onSearchChange}
          className={className}
        />
      )}
    />
  );
}
