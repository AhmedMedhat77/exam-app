import { Button } from '@/shared/ui/button';
import { Ban, Pencil, Trash2 } from 'lucide-react';

interface AdminExamDetailHeaderProps {
  title: string;
  immutable: boolean;
  isDeleting: boolean;
  isTogglingImmutable?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleImmutable?: () => void;
}

export default function AdminExamDetailHeader({
  title,
  immutable,
  isDeleting,
  isTogglingImmutable,
  onEdit,
  onDelete,
  onToggleImmutable,
}: AdminExamDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        {title}
      </h1>
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleImmutable}
          disabled={isTogglingImmutable}
          className="h-9 w-auto cursor-pointer gap-1.5 border-gray-200 bg-gray-100 px-3.5 font-mono text-xs font-medium text-gray-700 hover:bg-gray-200"
        >
          <Ban className="size-3.5 text-gray-600" />
          <span>
            {isTogglingImmutable
              ? 'Updating...'
              : immutable
                ? 'Immutable'
                : 'Mutable'}
          </span>
        </Button>
        <Button
          size="sm"
          className="bg-primary h-9 w-auto gap-1.5 px-4 font-mono text-xs font-medium text-white hover:bg-blue-700"
          onClick={onEdit}
        >
          <Pencil className="size-3.5" />
          <span>Edit</span>
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="h-9 w-auto gap-1.5 bg-red-600 px-4 font-mono text-xs font-medium text-white hover:bg-red-700"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <Trash2 className="size-3.5" />
          <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
        </Button>
      </div>
    </div>
  );
}
