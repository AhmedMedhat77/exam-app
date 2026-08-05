import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface DeleteQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteQuestionModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteQuestionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md font-mono">
        <DialogHeader className="flex flex-col items-center gap-2 text-center sm:text-left">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle className="size-6 stroke-[2]" />
          </div>
          <DialogTitle className="text-lg font-bold text-gray-900">
            Delete Question
          </DialogTitle>
          <DialogDescription className="text-center font-mono text-xs text-gray-500">
            Are you sure you want to delete this question? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="h-9 border-gray-200 font-mono text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-9 bg-red-600 font-mono text-xs text-white hover:bg-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Delete Question'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
