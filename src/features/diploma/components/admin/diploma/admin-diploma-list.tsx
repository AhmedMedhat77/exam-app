import { ROUTES } from '@/app/routes';
import { AdminDiplomaActionsMenu } from '@/features/diploma/components/admin/diploma/admin-diploma-actions-menu';
import { AdminDiplomaSortDropdown } from '@/features/diploma/components/admin/diploma/admin-diploma-sort-dropdown';
import { useDeleteDiploma } from '@/features/diploma/hooks/use-delete-diploma';
import type { IDiploma } from '@/features/diploma/types/diploma.d';
import {
  AdminTable,
  type AdminTableColumn,
} from '@/features/shared/components/admin/admin-table';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

interface AdminDiplomaListProps {
  diplomas?: IDiploma[];
  isLoading?: boolean;
  onView?: (diploma?: IDiploma) => void;
  onEdit?: (diploma?: IDiploma) => void;
  onDelete?: (diploma?: IDiploma) => void;
}

function DiplomaImageCell({
  image,
  title,
}: {
  image?: string;
  title?: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="size-18 overflow-hidden rounded-xs border border-gray-100 bg-gray-100">
      {!hasError && image ? (
        <img
          src={image}
          alt={title || 'Diploma'}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
          No image
        </div>
      )}
    </div>
  );
}

const EMPTY_DIPLOMAS: IDiploma[] = [];

export default function AdminDiplomaList({
  diplomas = EMPTY_DIPLOMAS,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: AdminDiplomaListProps) {
  const navigate = useNavigate();
  const { mutate: deleteDiploma } = useDeleteDiploma();

  const handleView = useCallback(
    (diploma?: IDiploma) => {
      if (onView) {
        onView(diploma);
      } else if (diploma?.id) {
        navigate(ROUTES.DIPLOMA_DETAIL.replace(':id', diploma.id));
      }
    },
    [onView, navigate]
  );

  const handleEdit = useCallback(
    (diploma?: IDiploma) => {
      if (onEdit) {
        onEdit(diploma);
      } else if (diploma?.id) {
        navigate(ROUTES.DIPLOMA_MANAGE.replace(/:id\??/, diploma.id));
      }
    },
    [onEdit, navigate]
  );

  const handleDelete = useCallback(
    (diploma?: IDiploma) => {
      if (onDelete) {
        onDelete(diploma);
      } else if (diploma?.id) {
        if (confirm(`Are you sure you want to delete "${diploma.title}"?`)) {
          deleteDiploma(diploma.id);
        }
      }
    },
    [onDelete, deleteDiploma]
  );

  const columns: AdminTableColumn<IDiploma>[] = useMemo(
    () => [
      {
        header: 'Image',
        colClassName: 'w-24 sm:w-28',
        cell: (item) => (
          <DiplomaImageCell image={item?.image} title={item?.title} />
        ),
      },
      {
        header: 'Title',
        colClassName: 'w-48 sm:w-64',
        cellClassName:
          'break-words pr-4 font-mono text-sm font-semibold whitespace-normal text-gray-900',
        cell: (item) => item?.title,
      },
      {
        header: 'Description',
        cellClassName:
          'break-words font-mono text-xs leading-relaxed whitespace-normal text-gray-500',
        cell: (item) => <p className="line-clamp-4">{item?.description}</p>,
      },
      {
        header: <AdminDiplomaSortDropdown />,
        colClassName: 'w-24 sm:w-28',
        align: 'right',
        cell: (item) => (
          <AdminDiplomaActionsMenu
            diploma={item}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  return (
    <AdminTable<IDiploma>
      columns={columns}
      data={diplomas}
      isLoading={isLoading}
      loadingMessage="Loading diplomas..."
      emptyMessage="No diplomas found."
      getRowKey={(item, index) => item?.id ?? index}
    />
  );
}
