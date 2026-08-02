import type { IExam } from '@/features/exam/types/exams.d';
import {
  AdminSortDropdown,
  type SortOption,
} from '@/shared/components/admin-sort-dropdown';
import {
  AdminTable,
  type AdminTableColumn,
} from '@/shared/components/admin-table';
import { MoreHorizontal } from 'lucide-react';
import { useMemo } from 'react';

const EXAM_SORT_OPTIONS: SortOption<string>[] = [
  { label: 'Title', sortBy: 'title', sortOrder: 'desc' },
  { label: 'Title', sortBy: 'title', sortOrder: 'asc' },
  { label: 'Newest', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Newest', sortBy: 'createdAt', sortOrder: 'asc' },
  { label: 'Duration', sortBy: 'duration', sortOrder: 'desc' },
  { label: 'Duration', sortBy: 'duration', sortOrder: 'asc' },
];

interface AdminExamsListProps {
  exams?: IExam[];
  isLoading?: boolean;
  onView?: (exam?: IExam) => void;
  onEdit?: (exam?: IExam) => void;
  onDelete?: (exam?: IExam) => void;
}

export default function AdminExamsList({
  exams = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: AdminExamsListProps) {
  const columns: AdminTableColumn<IExam>[] = useMemo(
    () => [
      {
        header: 'Image',
        colClassName: 'w-24 sm:w-28',
        cell: (item) => (
          <div className="size-18 overflow-hidden rounded-xs border border-gray-100 bg-gray-100">
            <img
              src={item?.image}
              alt={item?.title || 'Exam'}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ),
      },
      {
        header: 'Title',
        colClassName: 'w-48 sm:w-64',
        cellClassName:
          'wrap-break-words pr-4 font-mono text-sm font-semibold whitespace-normal text-gray-900',
        cell: (item) => item?.title,
      },
      {
        header: 'Description',
        cellClassName:
          'warp-break-words font-mono text-xs leading-relaxed whitespace-normal text-gray-500',
        cell: (item) => <p className="line-clamp-3">{item?.description}</p>,
      },
      {
        header: 'Duration',
        colClassName: 'w-28',
        cellClassName: 'font-mono text-xs text-gray-700',
        cell: (item) => (item?.duration ? `${item.duration} mins` : '-'),
      },
      {
        header: 'Questions',
        colClassName: 'w-24',
        cellClassName: 'font-mono text-xs text-gray-700',
        cell: (item) => item?.questionsCount ?? 0,
      },
      {
        header: <AdminSortDropdown options={EXAM_SORT_OPTIONS} />,
        colClassName: 'w-24 sm:w-28',
        align: 'right',
        cell: (item) => (
          <button
            onClick={() => onView?.(item)}
            className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            aria-label="Exam options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        ),
      },
    ],
    [onView]
  );

  return (
    <AdminTable<IExam>
      columns={columns}
      data={exams}
      isLoading={isLoading}
      loadingMessage="Loading exams..."
      emptyMessage="No exams found."
      getRowKey={(item, index) => item?.id ?? index}
    />
  );
}
