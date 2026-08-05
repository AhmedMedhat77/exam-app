import DeleteConfirmModal from '@/shared/components/delete-confirm-modal';

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
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isDeleting={isDeleting}
      title="Delete Question"
      description="Are you sure you want to delete this question? This action cannot be undone."
      confirmLabel="Delete Question"
    />
  );
}
