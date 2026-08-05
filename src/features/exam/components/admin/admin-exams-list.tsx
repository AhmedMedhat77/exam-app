import type { IExam } from '@/features/exam/types/exams.d';
import {
  AdminSortDropdown,
  type SortOption,
} from '@/features/shared/components/admin/admin-sort-dropdown';
import {
  AdminTable,
  type AdminTableColumn,
} from '@/features/shared/components/admin/admin-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Eye, MoreHorizontal, Pencil } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

const EXAM_SORT_OPTIONS: SortOption<string>[] = [
  { label: 'Title', sortBy: 'title', sortOrder: 'desc' },
  { label: 'Title', sortBy: 'title', sortOrder: 'asc' },
  { label: 'Newest', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Newest', sortBy: 'createdAt', sortOrder: 'asc' },
  { label: 'Questions', sortBy: 'questions', sortOrder: 'desc' },
  { label: 'Questions', sortBy: 'questions', sortOrder: 'asc' },
];

const EMPTY_EXAMS: IExam[] = [];

interface AdminExamsListProps {
  exams?: IExam[];
  isLoading?: boolean;
  onView?: (exam: IExam) => void;
}

export default function AdminExamsList({
  exams = EMPTY_EXAMS,
  isLoading = false,
  onView,
}: AdminExamsListProps) {
  const navigate = useNavigate();

  const handleView = useCallback(
    (exam: IExam) => {
      if (onView) {
        onView(exam);
      } else {
        navigate(`/exams/${exam.id}`);
      }
    },
    [onView, navigate]
  );

  const handleEdit = useCallback(
    (exam: IExam) => {
      navigate(`/exams/${exam.id}/manage`);
    },
    [navigate]
  );

  const columns: AdminTableColumn<IExam>[] = useMemo(
    () => [
      {
        header: 'Image',
        colClassName: 'w-24 sm:w-28',
        cell: (item) => (
          <button
            type="button"
            onClick={() => handleView(item)}
            className="size-16 cursor-pointer overflow-hidden rounded-xs border border-gray-100 bg-gray-100 text-left transition-opacity hover:opacity-80 focus:outline-none"
          >
            <img
              src={item?.image}
              alt={item?.title || 'Exam'}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </button>
        ),
      },
      {
        header: 'Title',
        colClassName: 'w-48 sm:w-64',
        cellClassName:
          'wrap-break-words pr-4 font-mono text-sm font-semibold whitespace-normal text-gray-900',
        cell: (item) => (
          <button
            type="button"
            onClick={() => handleView(item)}
            className="cursor-pointer text-left hover:text-blue-600 focus:outline-none"
          >
            {item?.title}
          </button>
        ),
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
          <DropdownMenu>
            <DropdownMenuTrigger
              className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
              aria-label="Exam options"
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 font-mono text-xs">
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleView(item)}
              >
                <Eye className="size-3.5" /> View Exam
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleEdit(item)}
              >
                <Pencil className="size-3.5" /> Edit Exam
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleView, handleEdit]
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
