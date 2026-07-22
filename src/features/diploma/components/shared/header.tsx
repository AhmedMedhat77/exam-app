import { useLocation, useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';

interface IDiplomaHeaderProps {
  title: string;
  icon: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function DiplomaHeader({
  title,
  icon,
  showBackButton,
  onBack,
}: IDiplomaHeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathSegments = pathname.split('/').filter(Boolean);
  const isFirstIndex =
    pathSegments.length === 0 ||
    (pathSegments.length === 1 && pathSegments[0] === 'diplomas');
  const hasMoreThanFirstIndex = !isFirstIndex;

  const shouldShowBackButton = showBackButton ?? hasMoreThanFirstIndex;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {shouldShowBackButton && (
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back"
          className="flex h-19.25 w-12 shrink-0 items-center justify-center  border border-primary text-primary transition-colors hover:bg-primary/10 cursor-pointer bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      <div className="flex h-19.25 flex-1 items-center gap-5 px-4 bg-primary ">
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="text-white text-3xl font-semibold leading-8">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
}
