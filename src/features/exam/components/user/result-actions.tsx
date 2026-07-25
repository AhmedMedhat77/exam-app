import { ROUTES } from '@/app/routes';
import { Button } from '@/shared/ui/button';
import { Compass, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ResultActionsProps {
  onRestart?: () => void;
}

export default function ResultActions({ onRestart }: ResultActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      {onRestart && (
        <Button
          variant="secondary"
          size="xl"
          className="flex-1 cursor-pointer gap-2"
          onClick={onRestart}
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>
      )}
      <Button
        variant="default"
        size="xl"
        className="flex-1 cursor-pointer gap-2"
        onClick={() => navigate(ROUTES.EXAMS)}
      >
        <Compass className="h-4 w-4" />
        Explore
      </Button>
    </div>
  );
}
