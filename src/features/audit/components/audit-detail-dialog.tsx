import type { IAdminAuditLog } from '@/features/audit/types/audit.d';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Calendar, Globe, Layers, Shield, Terminal, User } from 'lucide-react';

interface AuditDetailDialogProps {
  log: IAdminAuditLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuditDetailDialog({
  log,
  open,
  onOpenChange,
}: AuditDetailDialogProps) {
  if (!log) return null;

  const formattedDate = new Date(log.createdAt).toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl font-mono">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Shield className="size-5 text-primary" />
            Audit Log Entry Details
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Log ID: {log.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Action & Category */}
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">
                Action & Method
              </span>
              <div className="mt-1 flex items-center gap-2 font-semibold">
                <span className="rounded-xs bg-primary/10 px-2 py-0.5 text-primary">
                  {log.action}
                </span>
                {log.httpMethod && (
                  <span className="text-gray-600">[{log.httpMethod}]</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">
                Category
              </span>
              <div className="mt-1 font-semibold text-gray-800">
                {log.category}
              </div>
            </div>
          </div>

          {/* Actor Info */}
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
            <div className="flex items-center gap-1.5 font-semibold text-gray-700">
              <User className="size-4 text-gray-500" />
              Actor User
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-gray-600">
              <div>
                <span className="text-[10px] text-gray-400">Username:</span>
                <p className="font-medium text-gray-900">{log.actorUsername}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400">Email:</span>
                <p className="font-medium text-gray-900">{log.actorEmail}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400">Role:</span>
                <p className="font-medium text-gray-900">{log.actorRole}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400">User ID:</span>
                <p className="truncate font-mono text-gray-900">
                  {log.actorUserId || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Entity Info */}
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
            <div className="flex items-center gap-1.5 font-semibold text-gray-700">
              <Layers className="size-4 text-gray-500" />
              Entity Information
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-gray-600">
              <div>
                <span className="text-[10px] text-gray-400">Entity Type:</span>
                <p className="font-medium text-gray-900 capitalize">
                  {log.entityType}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400">Entity ID:</span>
                <p className="truncate font-mono text-gray-900">
                  {log.entityId || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Request Metadata */}
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
            <div className="flex items-center gap-1.5 font-semibold text-gray-700">
              <Globe className="size-4 text-gray-500" />
              Request Metadata
            </div>
            <div className="mt-2 space-y-1.5 text-gray-600">
              <div>
                <span className="text-[10px] text-gray-400">Path:</span>
                <p className="break-all font-mono text-gray-900">
                  {log.path || 'N/A'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400">IP Address:</span>
                  <p className="font-mono text-gray-900">
                    {log.ipAddress || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400">Time:</span>
                  <p className="flex items-center gap-1 font-mono text-gray-900">
                    <Calendar className="size-3 text-gray-400" />
                    {formattedDate}
                  </p>
                </div>
              </div>
              {log.userAgent && (
                <div>
                  <span className="text-[10px] text-gray-400">User Agent:</span>
                  <p className="break-all font-mono text-[11px] text-gray-700">
                    {log.userAgent}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* JSON Metadata */}
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                <Terminal className="size-4 text-gray-500" />
                Additional Payload Metadata
              </div>
              <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-900 p-2.5 font-mono text-[11px] text-emerald-400">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <DialogFooter showCloseButton>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
