import { Button } from '@/shared/ui/button';
import { CopyPlus, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AdminQuestionFormHeaderProps {
  isBulkMode: boolean;
  isEdit: boolean;
  isSubmitting: boolean;
  handleBulkClick: () => void;
  handleSubmit: () => void;
}

export default function AdminQuestionFormHeader({
  isBulkMode,
  isEdit,
  isSubmitting,
  handleBulkClick,
  handleSubmit,
}: AdminQuestionFormHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Bulk Add Mode Switch */}
      <div className="flex items-center gap-3">
        {!isEdit && (
          <Button
            size="xl"
            onClick={handleBulkClick}
            variant={isBulkMode ? 'default' : 'secondary'}
          >
            <CopyPlus className="size-4" />
            Bulk Mode
          </Button>
        )}
      </div>

      {/* Right: Cancel and Save Action Buttons */}
      <div className="grid w-max grid-cols-2 gap-3 group-data-closed:w-0 group-data-closed:opacity-0">
        <Button
          variant="outline"
          size="xl"
          type="button"
          onClick={() => navigate(-1)}
        >
          <X className="size-3.5" />
          <span>Cancel</span>
        </Button>

        <Button
          variant="success"
          size="xl"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Save className="size-3.5" />
          <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
        </Button>
      </div>
    </div>
  );
}
