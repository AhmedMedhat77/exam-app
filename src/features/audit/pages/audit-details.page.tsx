import { ROUTES } from '@/app/routes';
import { useDeleteAuditLog } from '@/features/audit/hooks/use-delete-audit-log';
import { useGetAuditLogById } from '@/features/audit/hooks/use-get-audit-log-by-id';
import type {
  AuditAction,
  AuditRole,
  IAdminAuditLog,
} from '@/features/audit/types/audit.d';
import { ROLE_ENUM } from '@/features/profile/types/user';
import DeleteConfirmDialog from '@/shared/components/delete-confirm-dialog';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import RoleProtection from '@/shared/lib/role-protection';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, ExternalLink, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function AuditLogDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetAuditLogById(id);
  const { mutate: deleteLog, isPending: isDeleting } = useDeleteAuditLog();

  const rawPayload = data?.payload;
  const log: IAdminAuditLog | undefined =
    rawPayload && 'auditLog' in rawPayload
      ? (rawPayload as { auditLog: IAdminAuditLog }).auditLog
      : (rawPayload as IAdminAuditLog | undefined);

  const formatEntityTitle = (type?: string) => {
    if (!type) return '';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const formatActionTitle = (act?: AuditAction) => {
    if (!act) return '';
    if (act === 'SET_IMMUTABLE') return 'Immutable Toggle';
    if (act === 'SEED_DATA') return 'Data Seed';
    return act.charAt(0).toUpperCase() + act.slice(1).toLowerCase();
  };

  const pageTitle = log
    ? `${formatEntityTitle(log.entityType)} ${formatActionTitle(log.action)} By ${log.actorUsername}`
    : 'Audit Log Details';

  useBreadcrumb({
    items: [{ title: 'Audit Log', href: ROUTES.LOGS }, { title: pageTitle }],
  });

  const handleConfirmDelete = () => {
    if (!log?.id) return;
    deleteLog(log.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        navigate(ROUTES.LOGS);
      },
    });
  };

  const getActionColor = (action?: AuditAction) => {
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
        return 'text-gray-700';
    }
  };

  const formatRoleLabel = (role?: AuditRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <span className="font-semibold text-rose-600">Super Admin</span>;
      case 'ADMIN':
        return <span className="text-primary font-semibold">Admin</span>;
      default:
        return <span className="text-gray-600">User</span>;
    }
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return '';
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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-full animate-pulse space-y-6">
        <div className="h-12 w-full rounded-md bg-gray-100" />
        <div className="h-96 w-full rounded-md bg-gray-100" />
      </div>
    );
  }

  if (isError || !log) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-12 text-center font-mono">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <h3 className="text-base font-semibold">Audit Log Entry Not Found</h3>
          <p className="mt-1 text-xs text-red-600">
            The requested audit log entry could not be loaded or does not exist.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.LOGS)}
          className="mx-auto w-auto gap-2 bg-gray-900 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
          Back to Audit Logs
        </Button>
      </div>
    );
  }

  const updatedFieldsList = log.metadata
    ? Object.keys(log.metadata).join(', ')
    : 'None';

  return (
    <div className="max-w-full space-y-6">
      {/* Header Section */}
      <div className="-mx-4 -mt-7 space-y-2 border-b border-gray-100 bg-white px-4 pb-4">
        <Breadcrumb
          items={[
            { title: 'Audit Log', href: ROUTES.LOGS },
            { title: pageTitle },
          ]}
        />

        <div className="flex flex-col gap-4 pt-1.5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1 font-mono">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {pageTitle}
            </h1>
            {log.entityId && (
              <p className="flex items-center gap-1 text-xs text-gray-500">
                Entity:{' '}
                <span className="text-gray-700">
                  {formatEntityTitle(log.entityType)} [{log.entityId}]
                </span>
                <ExternalLink className="size-3.5 text-gray-400" />
              </p>
            )}
          </div>

          <RoleProtection allowedRoles={[ROLE_ENUM.SUPER_ADMIN]}>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-fit cursor-pointer self-start"
            >
              <Trash2 className="size-4" />
              <span>Delete</span>
            </Button>
          </RoleProtection>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 font-mono shadow-2xs">
        {/* Action */}
        <div className="space-y-1 border-b border-dashed border-gray-200 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Action
          </p>
          <p
            className={cn(
              'text-sm font-bold tracking-wide uppercase',
              getActionColor(log.action)
            )}
          >
            {log.action}
          </p>
        </div>

        {/* Method */}
        <div className="space-y-1 border-b border-dashed border-gray-200 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Method
          </p>
          <p className="text-sm font-bold text-gray-900">
            {log.httpMethod || 'N/A'}
          </p>
        </div>

        {/* User */}
        <div className="space-y-1.5 border-b border-dashed border-gray-200 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">User</p>
          <div className="space-y-0.5 text-xs text-gray-800">
            <p className="text-sm font-bold text-gray-900">
              {log.actorUsername}
            </p>
            <p>
              <span className="text-gray-500">Email:</span> {log.actorEmail}
            </p>
            <p>
              <span className="text-gray-500">IP Address:</span>{' '}
              {log.ipAddress || 'N/A'}
            </p>
            <p>
              <span className="text-gray-500">Role:</span>{' '}
              {formatRoleLabel(log.actorRole)}
            </p>
          </div>
        </div>

        {/* Entity */}
        <div className="space-y-1 border-b border-dashed border-gray-200 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Entity
          </p>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
            <span>
              {formatEntityTitle(log.entityType)}: {log.entityId || 'N/A'}
            </span>
            {log.entityId && (
              <ExternalLink className="size-3.5 text-gray-400" />
            )}
          </p>
        </div>

        {/* Date & Time */}
        <div className="space-y-1 border-b border-dashed border-gray-200 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Date & Time
          </p>
          <p className="text-xs font-semibold text-gray-900">
            {formatTime(log.createdAt)} | {formatDate(log.createdAt)}
          </p>
        </div>

        {/* Updated Fields */}
        <div className="space-y-1 border-b border-dashed border-gray-200 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Updated Fields
          </p>
          <p className="text-xs text-gray-800">{updatedFieldsList}</p>
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Metadata
          </p>
          <div className="overflow-x-auto rounded-md border border-gray-200 bg-gray-100/70 p-4 font-mono text-xs text-gray-800">
            {log.metadata && Object.keys(log.metadata).length > 0 ? (
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-400 italic">No metadata available</p>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Audit Log Entry"
        description="Are you sure you want to delete this audit log entry? This action cannot be undone."
      />
    </div>
  );
}
