import type {
  IQuestion,
  QuestionSortBy,
} from '@/features/question/types/questions';
import AdminSortDropdown, {
  type SortOption,
} from '@/features/shared/components/admin/admin-sort-dropdown';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const questionSortOptions: SortOption<QuestionSortBy>[] = [
  { label: 'Title (A-Z)', sortBy: 'title', sortOrder: 'asc' },
  { label: 'Title (Z-A)', sortBy: 'title', sortOrder: 'desc' },
  { label: 'Newest First', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Oldest First', sortBy: 'createdAt', sortOrder: 'asc' },
];

interface AdminExamQuestionsCardProps {
  questions?: IQuestion[];
  onAddQuestion?: () => void;
  onRemoveQuestion?: (id: string) => void;
}

export default function AdminExamQuestionsTable({
  questions,
  onAddQuestion,
  onRemoveQuestion,
}: AdminExamQuestionsCardProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-2xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-blue-600 px-5 py-3 text-white">
        <h3 className="font-mono text-sm font-semibold tracking-wide">
          Exam Questions
        </h3>
        <Button
          type="button"
          onClick={onAddQuestion}
          size="lg"
          className="w-fit"
        >
          <Plus className="size-3.5" />
          <span>Add Questions</span>
        </Button>
      </div>

      {/* Questions Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-200 bg-gray-100/70">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-2.5 font-mono text-xs font-semibold text-gray-700">
                Title
              </TableHead>
              <TableHead className="px-6 py-2.5 text-end font-mono text-xs font-semibold text-gray-800">
                <AdminSortDropdown<QuestionSortBy>
                  options={questionSortOptions}
                  triggerLabel="Sort"
                  className="text-gray-800"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="py-8 text-center font-mono text-xs text-gray-400"
                >
                  No questions added yet. Click &quot;+ Add Questions&quot; to
                  add questions.
                </TableCell>
              </TableRow>
            ) : (
              questions?.map((q) => (
                <TableRow
                  key={q.id}
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50/60"
                >
                  <TableCell
                    onClick={() => navigate(`/questions/${q.id}`)}
                    className="cursor-pointer px-6 py-3 font-mono text-xs font-medium text-gray-800 hover:text-blue-600 hover:underline"
                  >
                    {q.text}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                        aria-label="Question options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 font-mono text-xs"
                      >
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => navigate(`/questions/${q.id}`)}
                        >
                          <Eye className="size-3.5" />
                          View Question
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => navigate(`/questions/${q.id}/manage`)}
                        >
                          <Pencil className="size-3.5" />
                          Edit Question
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-danger cursor-pointer gap-2 focus:bg-red-50 focus:text-red-700"
                          onClick={() => onRemoveQuestion?.(q.id)}
                        >
                          <Trash2 className="size-3.5" />
                          Remove Question
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
