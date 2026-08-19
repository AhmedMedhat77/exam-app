import { ROUTES } from '@/app/routes';
import { Button } from '@/shared/ui/button';
import { Home, SearchX } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <div className="text-primary mb-6 flex size-20 items-center justify-center rounded-full bg-blue-50">
        <SearchX className="size-10" />
      </div>

      {/* Error Code */}
      <h1 className="mb-2 text-6xl font-extrabold tracking-tight text-gray-900">
        404
      </h1>

      {/* Message */}
      <p className="mb-1 text-lg font-semibold text-gray-700">Page Not Found</p>
      <p className="mb-8 max-w-md text-sm text-gray-500">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      {/* Action */}
      <Button
        size="lg"
        className="max-w-48 gap-2"
        onClick={() => navigate(ROUTES.HOME, { replace: true })}
      >
        <Home data-icon="inline-start" className="size-4" />
        Back to Home
      </Button>
    </div>
  );
}
