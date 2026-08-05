import { cn } from '@/shared/lib/utils';
import { Trash2 } from 'lucide-react';

interface BulkQuestionTabProps {
  isActive: boolean;
  hasError?: boolean;
  onRemove: (event: React.MouseEvent) => void;
  onSelect: () => void;
  index: number;
  questionCount: number;
}

export default function BulkQuestionTab({
  isActive,
  hasError,
  onRemove,
  onSelect,
  index,
  questionCount,
}: BulkQuestionTabProps) {
  const displayText = `Q${index + 1}`;

  return (
    <div
      className={cn(
        'group relative flex max-w-48 min-w-16 items-center justify-center gap-1.5 border-r border-gray-200 px-2 font-mono text-xs font-semibold whitespace-nowrap transition-colors select-none',
        isActive
          ? 'bg-primary/10 text-primary border-b-primary border-b-2 font-bold'
          : 'bg-white text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
        hasError &&
          'bg-destructive/10 text-destructive border-b-destructive border-b-2'
      )}
    >
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={onSelect}
        className="h-full min-w-8 cursor-pointer px-2"
      >
        <span className="truncate">{displayText}</span>
      </button>
      {questionCount > 1 && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:bg-destructive/10 hover:text-destructive flex size-5 shrink-0 items-center justify-center rounded text-gray-400 transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          aria-label={`Delete question ${index + 1}`}
        >
          <Trash2 className="size-3" />
        </button>
      )}
    </div>
  );
}
