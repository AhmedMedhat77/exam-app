import { cn } from '@/shared/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import React from 'react';

export interface AdminTableColumn<T> {
  /** Column header label or ReactNode (e.g. Title, or Sort Dropdown) */
  header: React.ReactNode;
  /** Optional column key used for key prop in iteration */
  key?: string;
  /** Width or column class for <col> element in <colgroup> (e.g. "w-24 sm:w-28", "w-48 sm:w-64") */
  colClassName?: string;
  /** Custom class for header cell <TableHead> */
  headerClassName?: string;
  /** Custom class for body cell <TableCell> */
  cellClassName?: string;
  /** Alignment of column text/content: 'left' | 'center' | 'right' (default 'left') */
  align?: 'left' | 'center' | 'right';
  /** Property key of data item to display automatically if `cell` is not provided */
  accessorKey?: keyof T;
  /** Render function for cell content given item and index */
  cell?: (item: T, index: number) => React.ReactNode;
}

export interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  data?: T[];
  isLoading?: boolean;
  loadingMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  getRowKey?: (item: T, index: number) => string | number;
  /** Custom row renderer if you want complete control over <TableRow> */
  renderRow?: (item: T, index: number) => React.ReactNode;
  tableClassName?: string;
  containerClassName?: string;
  minWidthClassName?: string;
  rowClassName?: string | ((item: T, index: number) => string);
}

export function AdminTable<T>({
  columns,
  data = [],
  isLoading = false,
  loadingMessage = 'Loading...',
  emptyMessage = 'No data found.',
  getRowKey,
  renderRow,
  tableClassName,
  containerClassName,
  minWidthClassName = 'min-w-175',
  rowClassName,
}: AdminTableProps<T>) {
  const colSpan = columns.length;

  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-md border border-gray-200 bg-white shadow-xs',
        containerClassName
      )}
    >
      <Table
        className={cn('w-full table-fixed', minWidthClassName, tableClassName)}
      >
        {columns.some((col) => col.colClassName) && (
          <colgroup>
            {columns.map((col, idx) => (
              <col key={col.key || idx} className={col.colClassName} />
            ))}
          </colgroup>
        )}

        <TableHeader className="bg-primary border-b-0">
          <TableRow className="hover:bg-primary border-b-0">
            {columns.map((col, idx) => {
              const alignClass =
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                    ? 'text-center'
                    : 'text-left';

              return (
                <TableHead
                  key={col.key || idx}
                  className={cn(
                    'px-6 py-3.5 font-mono font-medium text-white',
                    alignClass,
                    col.headerClassName
                  )}
                >
                  {col.header}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="py-10 text-center font-mono text-sm text-gray-400"
              >
                {loadingMessage}
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="py-10 text-center font-mono text-sm text-gray-400"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => {
              if (renderRow) {
                return renderRow(item, index);
              }

              const rowKey =
                getRowKey?.(item, index) ??
                (item && typeof item === 'object' && 'id' in item
                  ? String((item as { id: unknown }).id)
                  : index);

              const computedRowClassName =
                typeof rowClassName === 'function'
                  ? rowClassName(item, index)
                  : rowClassName;

              return (
                <TableRow
                  key={rowKey}
                  className={cn(
                    'border-b border-gray-100 transition-colors hover:bg-gray-50/80',
                    computedRowClassName
                  )}
                >
                  {columns.map((col, colIdx) => {
                    const alignClass =
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                          ? 'text-center'
                          : 'text-left';

                    const cellContent = col.cell
                      ? col.cell(item, index)
                      : col.accessorKey && item
                        ? String(item[col.accessorKey] ?? '')
                        : null;

                    return (
                      <TableCell
                        key={col.key || colIdx}
                        className={cn(
                          'px-6 py-4 align-top',
                          alignClass,
                          col.cellClassName
                        )}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminTable;
