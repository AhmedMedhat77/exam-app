import { cn } from '@/shared/lib/utils';
import { Trash2 } from 'lucide-react';

interface IProps {
  isActive: boolean;
  hasError?: boolean;
  handleRemoveQuestionTab: (e: React.MouseEvent) => void;
  setActiveTabIndex: () => void;
  index: number;
  fields: Array<unknown>;
}

export default function AdminBulkTableCell({
  isActive,
  hasError,
  handleRemoveQuestionTab,
  setActiveTabIndex,
  index,
  fields,
}: IProps) {
  const displayText = `Q${index + 1}`;

  return (
    <div
      onClick={setActiveTabIndex}
      className={cn(
        'group relative flex max-w-48 min-w-16 cursor-pointer items-center justify-center gap-1.5 border-r border-gray-200 px-4 font-mono text-xs font-semibold whitespace-nowrap transition-colors select-none',
        isActive
          ? 'bg-primary/10 text-primary border-b-primary border-b-2 font-bold'
          : 'bg-white text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
        hasError &&
          'bg-destructive/10 text-destructive border-b-destructive border-b-2'
      )}
    >
      <span className="truncate">{displayText}</span>
      {fields.length > 1 && (
        <button
          type="button"
          onClick={handleRemoveQuestionTab}
          className="hover:bg-destructive/10 hover:text-destructive flex size-4 shrink-0 items-center justify-center rounded text-gray-400 opacity-0 transition-all group-hover:opacity-100"
          title="Delete Tab"
        >
          <Trash2 className="size-3" />
        </button>
      )}
    </div>
  );
}
