import { useClearAllAuditLogs } from '@/features/audit/hooks/use-clear-all-audit-logs';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { AlertTriangle, Shredder } from 'lucide-react';

interface ClearAllAuditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ClearAllAuditDialog({
  open,
  onOpenChange,
}: ClearAllAuditDialogProps) {
  const { mutate: clearAll, isPending } = useClearAllAuditLogs();

  const handleConfirmClear = () => {
    clearAll(undefined, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="size-5" />
            Clear All Audit Logs
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm text-gray-600">
            Are you sure you want to permanently delete every row from the audit
            log table?
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md border border-red-100 bg-red-50 p-3 text-xs text-red-700">
          <p className="font-semibold">
            Warning: This action cannot be undone.
          </p>
          <p className="mt-1">
            This operation will clear all mutation trail history across
            diplomas, exams, questions, users, and system activities.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmClear}
            disabled={isPending}
            className="flex items-center gap-1.5"
          >
            <Shredder className="size-4" />
            {isPending ? 'Clearing...' : 'Permanently Clear All'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
