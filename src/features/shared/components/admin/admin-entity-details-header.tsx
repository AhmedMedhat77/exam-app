import { useIsSuperAdmin } from '@/features/user/store/user.store';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { Button } from '@/shared/ui/button';
import { Ban, Pencil, Trash2 } from 'lucide-react';

interface AdminEntityDetailsHeaderProps {
  title: string;
  immutable: boolean;
  isDeleting: boolean;
  isTogglingImmutable: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleImmutable: () => void;
  breadcrumbItems: Array<{ title: string; href?: string }>;
}

export default function AdminEntityDetailsHeader({
  title,
  immutable,
  isDeleting,
  isTogglingImmutable,
  onEdit,
  onDelete,
  onToggleImmutable,
  breadcrumbItems,
}: AdminEntityDetailsHeaderProps) {
  const isSuperAdmin = useIsSuperAdmin();

  return (
    <div className="-mx-4 -mt-7 space-y-2 bg-white px-4 pb-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col gap-4 border-t border-t-gray-100 pt-1.5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          {title}
        </h1>
        <div
          className={`grid items-center gap-2.5 ${isSuperAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}
        >
          {isSuperAdmin && (
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
          )}
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
    </div>
  );
}
