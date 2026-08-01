import { AdminDiplomaActionsMenu } from '@/features/diploma/components/admin/diploma/admin-diploma-actions-menu';
import type { IDiploma } from '@/features/diploma/types/diploma';
import { TableCell, TableRow } from '@/shared/ui/table';

interface AdminDiplomaTableRowProps {
  diploma?: IDiploma;
  onView?: (diploma?: IDiploma) => void;
  onEdit?: (diploma?: IDiploma) => void;
  onDelete?: (diploma?: IDiploma) => void;
}

export function AdminDiplomaTableRow({
  diploma,
  onView,
  onEdit,
  onDelete,
}: AdminDiplomaTableRowProps) {
  if (!diploma) return null;
  return (
    <TableRow className="border-b border-gray-100 transition-colors hover:bg-gray-50/80">
      <TableCell className="px-6 py-4 align-top">
        <div className="size-18 overflow-hidden rounded-xs border border-gray-100 bg-gray-100">
          <img
            src={diploma?.image}
            alt={diploma?.title || 'Diploma'}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </TableCell>
      <TableCell className="wrap-break-words px-6 py-4 pr-4 align-top font-mono text-sm font-semibold whitespace-normal text-gray-900">
        {diploma?.title}
      </TableCell>
      <TableCell className="warp-break-words px-6 py-4 align-top font-mono text-xs leading-relaxed whitespace-normal text-gray-500">
        <p className="line-clamp-4">{diploma?.description}</p>
      </TableCell>
      <TableCell className="px-6 py-4 text-right align-top">
        <AdminDiplomaActionsMenu
          diploma={diploma}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
