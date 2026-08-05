import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { ShieldAlert } from 'lucide-react';

export interface ImmutableStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentImmutable: boolean;
  isLoading?: boolean;
  entityName?: string;
}

export default function ImmutableStatusDialog({
  isOpen,
  onClose,
  onConfirm,
  currentImmutable,
  isLoading = false,
  entityName = 'item',
}: ImmutableStatusDialogProps) {
  const targetState = !currentImmutable;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md font-mono">
        <DialogHeader className="flex flex-col items-center gap-2 text-center sm:text-left">
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ShieldAlert className="size-6 stroke-3" />
          </div>
          <DialogTitle className="text-lg font-bold text-gray-900">
            Change Immutability Status
          </DialogTitle>
          <DialogDescription className="text-center font-mono text-xs leading-relaxed text-gray-600">
            Are you sure you want to set this {entityName} status to{' '}
            <span className="font-semibold text-gray-900">
              {targetState ? 'Immutable' : 'Mutable'}
            </span>
            ?
            <br />
            <span className="mt-1 block text-[11px] text-gray-400">
              {targetState
                ? `Immutable ${entityName}s prevent modification.`
                : `Mutable ${entityName}s allow admins to edit details.`}
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="h-9 border-gray-200 font-mono text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-9 bg-blue-600 font-mono text-xs text-white hover:bg-blue-700"
          >
            {isLoading ? 'Updating...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
