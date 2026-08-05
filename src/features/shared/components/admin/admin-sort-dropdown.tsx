import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  ArrowDown,
  ArrowDownNarrowWideIcon,
  ArrowUp,
  CalendarArrowDown,
  CalendarArrowUp,
} from 'lucide-react';
import React from 'react';
import { useSearchParams } from 'react-router';

export interface SortOption<TKey extends string = string> {
  label: string;
  sortBy: TKey;
  sortOrder: 'asc' | 'desc';
  subLabel?: string;
  icon?: React.ReactNode;
}

export interface AdminSortDropdownProps<TKey extends string = string> {
  options: SortOption<TKey>[];
  sortByParamKey?: string;
  sortOrderParamKey?: string;
  value?: { sortBy?: TKey | null; sortOrder?: 'asc' | 'desc' | null };
  onChange?: (sortBy: TKey, sortOrder: 'asc' | 'desc') => void;
  triggerLabel?: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function AdminSortDropdown<TKey extends string = string>({
  options,
  sortByParamKey = 'sortBy',
  sortOrderParamKey = 'sortOrder',
  value,
  onChange,
  triggerLabel = 'Sort',
  className,
  align = 'end',
}: AdminSortDropdownProps<TKey>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isControlled = value !== undefined && onChange !== undefined;

  const currentSortBy = isControlled
    ? value?.sortBy
    : (searchParams.get(sortByParamKey) as TKey | null);
  const currentSortOrder = isControlled
    ? value?.sortOrder
    : (searchParams.get(sortOrderParamKey) as 'asc' | 'desc' | null);

  const handleSort = (sortBy: TKey, sortOrder: 'asc' | 'desc') => {
    if (onChange) {
      onChange(sortBy, sortOrder);
    }
    if (!isControlled) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(sortByParamKey, sortBy);
        next.set(sortOrderParamKey, sortOrder);
        return next;
      });
    }
  };

  const isSelected = (sortBy: TKey, sortOrder: 'asc' | 'desc') => {
    return currentSortBy === sortBy && currentSortOrder === sortOrder;
  };

  const renderOptionIcon = (option: SortOption<TKey>) => {
    if (option.icon) return option.icon;
    const isDateKey = /date|created|updated|time/i.test(option.sortBy);
    if (isDateKey) {
      return option.sortOrder === 'desc' ? (
        <CalendarArrowUp className="size-4 text-gray-500" />
      ) : (
        <CalendarArrowDown className="size-4 text-gray-500" />
      );
    }
    return option.sortOrder === 'desc' ? (
      <ArrowDown className="size-4 text-gray-500" />
    ) : (
      <ArrowUp className="size-4 text-gray-500" />
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex cursor-pointer items-center justify-end gap-1.5 font-mono text-sm text-white outline-none hover:opacity-90',
          className
        )}
      >
        {typeof triggerLabel === 'string' ? (
          <span>{triggerLabel}</span>
        ) : (
          triggerLabel
        )}
        <ArrowDownNarrowWideIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-52 p-1.5 shadow-lg">
        {options.map((option, index) => {
          const selected = isSelected(option.sortBy, option.sortOrder);
          const subLabelText =
            option.subLabel ??
            (option.sortOrder === 'desc' ? '(descending)' : '(ascending)');

          return (
            <DropdownMenuItem
              key={`${option.sortBy}-${option.sortOrder}-${index}`}
              onClick={() => handleSort(option.sortBy, option.sortOrder)}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 px-3 py-2 font-mono text-xs text-gray-700',
                selected && 'bg-accent text-primary font-semibold'
              )}
            >
              {renderOptionIcon(option)}
              <span>
                {option.label}{' '}
                {subLabelText && (
                  <span className="text-[10px] text-gray-400">
                    {subLabelText}
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminSortDropdown;
