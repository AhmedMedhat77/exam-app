import type { IQuestion } from '@/features/question/types/questions';
import { useIsSuperAdmin } from '@/features/user/store/user.store';
import { Button } from '@/shared/ui/button';
import { Ban, ExternalLink, PenLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

interface IProps {
  question?: IQuestion;
  onToggleImmutable?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminQuestionDetailsHeader({
  question,
  onDelete,
  onEdit,
  onToggleImmutable,
}: IProps) {
  const isSuperAdmin = useIsSuperAdmin();

  return (
    <div className="flex items-center justify-between border-t border-t-gray-50 bg-white pt-0.5">
      <div>
        <h2 className="font-heading text-xl font-medium text-gray-800">
          {question?.text}
        </h2>
        <Link
          to={`/exams/${question?.examId}`}
          className="flex items-center gap-2 text-xs text-gray-500 hover:underline"
        >
          Exam:{question?.exam?.title} <ExternalLink className="size-3" />
        </Link>
      </div>
      <div className={`grid gap-2.5 ${isSuperAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {isSuperAdmin && (
          <Button onClick={onToggleImmutable} size="lg" variant="secondary">
            <Ban className="size-4" />
            Immutable
          </Button>
        )}
        <Button onClick={onEdit} size="lg" variant="default">
          <PenLine className="size-4" />
          Edit
        </Button>
        <Button onClick={onDelete} size="lg" variant="destructive">
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
