import { Button } from '@/shared/ui/button';
import { CopyPlus, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router';

export type QuestionFormMode = 'single' | 'bulk';

interface AdminQuestionFormHeaderProps {
  mode: QuestionFormMode;
  isSubmitting: boolean;
  activeFormId: string;
  onModeChange: (mode: QuestionFormMode) => void;
}

export default function AdminQuestionFormHeader({
  mode,
  isSubmitting,
  activeFormId,
  onModeChange,
}: AdminQuestionFormHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex items-center gap-2"
        role="group"
        aria-label="Question creation mode"
      >
        <Button
          type="button"
          size="xl"
          onClick={() => onModeChange(mode === 'single' ? 'bulk' : 'single')}
          variant={mode === 'bulk' ? 'default' : 'secondary'}
          aria-pressed={mode === 'bulk'}
        >
          <CopyPlus className="size-4" />
          Bulk Questions
        </Button>
      </div>

      <div />

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
          type="submit"
          form={activeFormId}
          disabled={isSubmitting}
        >
          <Save className="size-3.5" />
          <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
        </Button>
      </div>
    </div>
  );
}
