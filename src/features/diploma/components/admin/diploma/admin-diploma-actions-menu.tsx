import type { IDiploma } from '@/features/diploma/types/diploma';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react';

interface AdminDiplomaActionsMenuProps {
  diploma: IDiploma;
  onView?: (diploma?: IDiploma) => void;
  onEdit?: (diploma?: IDiploma) => void;
  onDelete?: (diploma?: IDiploma) => void;
}

export function AdminDiplomaActionsMenu({
  diploma,
  onView,
  onEdit,
  onDelete,
}: AdminDiplomaActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-100 text-gray-600 transition-colors outline-none hover:bg-gray-200">
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 p-1 shadow-md">
        <DropdownMenuItem
          onClick={() => onView?.(diploma)}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
        >
          <Eye className="size-4 text-emerald-500" />
          <span>Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onEdit?.(diploma)}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        >
          <Pencil className="size-4 text-blue-500" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete?.(diploma)}
          variant="destructive"
          className="flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-red-600 hover:bg-red-50"
        >
          <Trash2 className="size-4 text-red-500" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
