import { useDeleteAuditLog } from '@/features/audit/hooks/use-delete-audit-log';
import type {
  AuditAction,
  AuditRole,
  AuditSortBy,
  IAdminAuditLog,
} from '@/features/audit/types/audit.d';
import AdminSortDropdown, {
  type SortOption,
} from '@/features/shared/components/admin/admin-sort-dropdown';
import AdminTable, {
  type AdminTableColumn,
} from '@/features/shared/components/admin/admin-table';
import { ROLE_ENUM } from '@/features/profile/types/user';
import DeleteConfirmDialog from '@/shared/components/delete-confirm-dialog';
import RoleProtection from '@/shared/lib/role-protection';
import toastUtil from '@/shared/lib/toast';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ExternalLink, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface AuditListTableProps {
  logs: IAdminAuditLog[];
  isLoading?: boolean;
}

const SORT_OPTIONS: SortOption<AuditSortBy>[] = [
  { label: 'Newest First', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Oldest First', sortBy: 'createdAt', sortOrder: 'asc' },
  { label: 'Action', sortBy: 'action', sortOrder: 'asc' },
  { label: 'Action', sortBy: 'action', sortOrder: 'desc' },
  { label: 'User', sortBy: 'user', sortOrder: 'asc' },
  { label: 'User', sortBy: 'user', sortOrder: 'desc' },
  { label: 'Entity', sortBy: 'entity', sortOrder: 'asc' },
  { label: 'Entity', sortBy: 'entity', sortOrder: 'desc' },
];

export default function AuditListTable({
  logs,
  isLoading = false,
}: AuditListTableProps) {
  const navigate = useNavigate();
  const { mutate: deleteLog, isPending: isDeleting } = useDeleteAuditLog();

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteLog(deleteTargetId, {
        onSuccess: () => {
          setDeleteTargetId(null);
        },
      });
    }
  };

  const handleCopyId = (id?: string | null) => {
    if (id) {
      navigator.clipboard.writeText(id);
      toastUtil('ID copied to clipboard', 'info');
    }
  };

  const getActionBadge = (action: AuditAction) => {
    switch (action) {
      case 'CREATE':
        return 'text-emerald-600';
      case 'UPDATE':
        return 'text-amber-600';
      case 'DELETE':
        return 'text-rose-600';
      case 'SET_IMMUTABLE':
        return 'text-sky-600';
      case 'SEED_DATA':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRoleBadge = (role: AuditRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'text-rose-600 font-semibold';
      case 'ADMIN':
        return 'text-primary font-semibold';
      default:
        return 'text-gray-500 font-normal';
    }
  };

  const formatRoleLabel = (role: AuditRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMIN':
        return 'Admin';
      default:
        return 'User';
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const columns: AdminTableColumn<IAdminAuditLog>[] = [
    {
      header: 'Action',
      key: 'action',
      colClassName: 'w-44 sm:w-52',
      cell: (item) => (
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              'w-fit px-2 py-0.5 font-mono text-xs font-semibold tracking-wide uppercase',
              getActionBadge(item.action)
            )}
          >
            {item.action}
          </span>
          {item.httpMethod && (
            <span className="font-mono text-[11px] text-gray-400">
              Method: {item.httpMethod}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'User',
      key: 'user',
      colClassName: 'w-56 sm:w-64',
      cell: (item) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs font-bold text-gray-800">
            {item.actorUsername || 'Unknown User'}
          </span>
          <span className="font-mono text-[11px] text-gray-400">
            {item.actorEmail || 'No Email'}
          </span>
          <span
            className={cn(
              'font-mono text-[11px]',
              getRoleBadge(item.actorRole)
            )}
          >
            {formatRoleLabel(item.actorRole)}
          </span>
        </div>
      ),
    },
    {
      header: 'Entity',
      key: 'entity',
      colClassName: 'w-56 sm:w-64',
      cell: (item) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs font-semibold text-gray-800 capitalize">
            {item.entityType}
          </span>
          {item.entityId && (
            <div className="flex items-center gap-1 font-mono text-[11px] text-gray-400">
              <span className="max-w-44 truncate" title={item.entityId}>
                {item.entityId}
              </span>
              <button
                type="button"
                onClick={() => handleCopyId(item.entityId)}
                className="cursor-pointer text-gray-400 transition-colors hover:text-gray-500"
                title="Copy Entity ID"
              >
                <ExternalLink className="size-3" />
              </button>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Time',
      key: 'time',
      colClassName: 'w-48 sm:w-56',
      cell: (item) => (
        <div className="flex flex-col font-mono text-xs leading-snug text-gray-800">
          <span>{formatTime(item.createdAt)}</span>
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      header: (
        <div className="flex items-center justify-end">
          <AdminSortDropdown options={SORT_OPTIONS} triggerLabel="Sort" />
        </div>
      ),
      key: 'actions',
      align: 'right',
      colClassName: 'w-24 sm:w-28',
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-8 cursor-pointer rounded-xs border border-gray-200 bg-gray-50 hover:bg-gray-100"
              />
            }
          >
            <MoreHorizontal className="size-4 text-gray-600" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 p-1">
            <DropdownMenuItem
              onClick={() => navigate(`/logs/${item.id}`)}
              className="flex cursor-pointer items-center gap-2 font-mono text-xs"
            >
              <Eye className="size-3.5 text-emerald-500" />
              <span>View Details</span>
            </DropdownMenuItem>

            <RoleProtection allowedRoles={[ROLE_ENUM.SUPER_ADMIN]}>
              <DropdownMenuItem
                onClick={() => handleDeleteClick(item.id)}
                className="flex cursor-pointer items-center gap-2 font-mono text-xs text-rose-600 focus:text-rose-600"
              >
                <Trash2 className="size-3.5" />
                <span>Delete Log</span>
              </DropdownMenuItem>
            </RoleProtection>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        columns={columns}
        data={logs}
        isLoading={isLoading}
        loadingMessage="Loading audit logs..."
        emptyMessage="No audit log entries found."
        minWidthClassName="min-w-200"
      />

      <DeleteConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Audit Log Entry"
        description="Are you sure you want to delete this audit log entry? This action cannot be undone."
      />
    </>
  );
}
