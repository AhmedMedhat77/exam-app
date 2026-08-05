import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

interface IDiplomaHeaderProps {
  title: string;
  icon: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function UserDashboardHeader({
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
    <div className="flex flex-col gap-2">
      <Breadcrumb />
      <div className="flex items-center gap-3">
        {shouldShowBackButton && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="border-primary text-primary hover:bg-primary/10 flex h-19.25 w-12 shrink-0 cursor-pointer items-center justify-center border bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <div className="bg-primary flex h-19.25 flex-1 items-center gap-5 px-4">
          <div className="flex items-center gap-3">
            {icon}
            <h4 className="font-heading text-3xl leading-8 font-semibold text-white">
              {title}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
