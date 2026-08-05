import { cn } from '@/shared/lib/utils';
import { ChevronsDownUp } from 'lucide-react';
import { useState } from 'react';

interface AdminFiltersPanelProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
}

export default function AdminFiltersPanel({
  children,
  icon,
  title,
}: AdminFiltersPanelProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleOpened = () => {
    setIsOpened((prev) => !prev);
  };
  return (
    <div className="flex w-full flex-col">
      <div className="bg-primary flex w-full items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-2 text-white">
          {icon}
          <span className="font-heading font-semibold">{title}</span>
        </div>

        <button
          type="button"
          onClick={handleToggleOpened}
          aria-label={isOpened ? 'Close filters' : 'Open filters'}
          className="flex items-center gap-1 text-lg font-semibold text-white"
        >
          <ChevronsDownUp
            className={`size-4 transition-transform ${isOpened ? 'rotate-180' : ''}`}
          />
          {isOpened ? 'Hide' : 'Show'}
        </button>
      </div>

      <div
        className={cn(
          'flex flex-col gap-4 bg-white p-4 transition-all duration-500 ease-in-out',
          isOpened
            ? 'max-h-auto opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}
