import { Button } from '@/shared/ui/button';
import { ChevronDown, ChevronsDownUp } from 'lucide-react';
import { useState } from 'react';

interface IAdminSearchFiltersContainerProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
}

export default function AdminSearchFiltersContainer({
  children,
  icon,
  title,
}: IAdminSearchFiltersContainerProps) {
  const [isOpened, setIsOpened] = useState(true);

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
      {isOpened && (
        <div className="flex flex-col gap-4 bg-white p-4">{children}</div>
      )}
    </div>
  );
}
