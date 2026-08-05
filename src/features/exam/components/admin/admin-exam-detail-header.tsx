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
      <div className="grid grid-cols-3 items-center gap-2.5">
        <Button
          variant="secondary"
          size="lg"
          onClick={onToggleImmutable}
          disabled={isTogglingImmutable}
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
          size="lg"

          onClick={onEdit}
        >
          <Pencil className="size-3.5" />
          <span>Edit</span>
        </Button>
        <Button
          size="lg"
          variant="destructive"
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
