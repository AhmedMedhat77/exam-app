import { ROUTES } from '@/app/routes';
import { useDeleteDiploma } from '@/features/diploma/hooks/use-delete-diploma';
import { useGetDiplomaById } from '@/features/diploma/hooks/use-get-diploma-by-id';
import AdminDiplomaDetailSkeleton from '@/features/diploma/skeletons/admin-diploma-detail-skeleton';
import type { IDiploma } from '@/features/diploma/types/diploma.d';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, Ban, Pencil, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function AdminDiplomaDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetDiplomaById(id);
  const { mutate: deleteDiploma, isPending: isDeleting } = useDeleteDiploma();

  const diplomaPayload = data?.payload;
  const diploma: IDiploma | undefined = useMemo(() => {
    if (!diplomaPayload) return undefined;
    if ('diploma' in diplomaPayload && diplomaPayload.diploma) {
      return (diplomaPayload as { diploma: IDiploma }).diploma;
    }
    return diplomaPayload as unknown as IDiploma;
  }, [diplomaPayload]);

  useBreadcrumb({
    items: [
      { title: 'Diplomas', href: ROUTES.DIPLOMAS },
      { title: diploma?.title || 'Diploma Details' },
    ],
  });

  const handleDelete = () => {
    if (!diploma?.id) return;
    if (confirm(`Are you sure you want to delete "${diploma.title}"?`)) {
      deleteDiploma(diploma.id, {
        onSuccess: () => {
          navigate(ROUTES.DIPLOMAS);
        },
      });
    }
  };

  if (isLoading) {
    return <AdminDiplomaDetailSkeleton />;
  }

  if (isError || !diploma) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-12 text-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <h3 className="font-mono text-base font-semibold">
            Diploma Not Found
          </h3>
          <p className="mt-1 font-mono text-xs text-red-600">
            The requested diploma could not be loaded or does not exist.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.DIPLOMAS)}
          className="mx-auto w-auto gap-2 bg-gray-900 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
          Back to Diplomas
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-full space-y-6">
      <div className="-mx-4 -mt-7 bg-white px-4 py-5">
        {/* Top Breadcrumb */}
        <BreadCrumb
          items={[
            { title: 'Diplomas', href: ROUTES.DIPLOMAS },
            { title: diploma.title },
          ]}
        />
      </div>
      {/* Header Title & Actions Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-gray-900">
          {diploma.title}
        </h1>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-auto cursor-default gap-1.5 border-gray-200 bg-gray-100 px-3.5 font-mono text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            <Ban className="size-3.5 text-gray-600" />
            <span>{diploma.immutable ? 'Immutable' : 'Mutable'}</span>
          </Button>
          <Button
            size="sm"
            className="h-9 w-auto gap-1.5 bg-blue-600 px-4 font-mono text-xs font-medium text-white hover:bg-blue-700"
            onClick={() =>
              navigate(ROUTES.DIPLOMA_MANAGE.replace(/:id\??/, diploma.id))
            }
          >
            <Pencil className="size-3.5" />
            <span>Edit</span>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-9 w-auto gap-1.5 bg-red-600 px-4 font-mono text-xs font-medium text-white hover:bg-red-700"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="size-3.5" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </Button>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="space-y-6 rounded-lg border border-gray-100 bg-white p-6 shadow-2xs sm:p-8">
        {/* Image Section */}
        <div className="space-y-2">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Image
          </p>
          <div className="aspect-4/3 w-full max-w-xs overflow-hidden rounded-md border border-gray-100 bg-gray-50 sm:max-w-sm">
            <img
              src={diploma.image}
              alt={diploma.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-1">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Title
          </p>
          <p className="font-mono text-sm font-semibold text-gray-900 sm:text-base">
            {diploma.title}
          </p>
        </div>

        {/* Description Section */}
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-gray-400">
            Description
          </p>
          <p className="text-xs leading-relaxed whitespace-pre-wrap text-gray-800 sm:text-sm">
            {diploma.description}
          </p>
        </div>
      </div>
    </div>
  );
}
