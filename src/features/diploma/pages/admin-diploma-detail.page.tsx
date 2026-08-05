import { ROUTES } from '@/app/routes';
import { useDeleteDiploma } from '@/features/diploma/hooks/use-delete-diploma';
import { useGetDiplomaById } from '@/features/diploma/hooks/use-get-diploma-by-id';
import { useUpdateDiplomaImmutable } from '@/features/diploma/hooks/use-update-diploma-immutable';
import AdminDiplomaDetailSkeleton from '@/features/diploma/skeletons/admin-diploma-detail-skeleton';
import type { IDiploma } from '@/features/diploma/types/diploma.d';
import AdminDetailsScreenHeader from '@/features/shared/components/admin/admin-details-screen-header';
import DeleteConfirmModal from '@/shared/components/delete-confirm-modal';
import ToggleImmutableModal from '@/shared/components/toggle-immutable-modal';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';
import { Button } from '@/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function AdminDiplomaDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isDeleteDiplomaOpen, setIsDeleteDiplomaOpen] = useState(false);
  const [isToggleImmutableOpen, setIsToggleImmutableOpen] = useState(false);

  const { data, isLoading, isError } = useGetDiplomaById(id);
  const { mutate: deleteDiploma, isPending: isDeleting } = useDeleteDiploma();
  const { mutate: updateDiplomaImmutable, isPending: isUpdatingImmutable } =
    useUpdateDiplomaImmutable();

  const diplomaPayload = data?.payload;
  const diploma: IDiploma | undefined =
    diplomaPayload && 'diploma' in diplomaPayload
      ? (diplomaPayload as { diploma: IDiploma }).diploma
      : (diplomaPayload as IDiploma | undefined);

  useBreadcrumb({
    items: [
      { title: 'Diplomas', href: ROUTES.DIPLOMAS },
      { title: diploma?.title || 'Diploma Details' },
    ],
  });

  const handleDelete = () => {
    setIsDeleteDiplomaOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!diploma?.id) return;
    deleteDiploma(diploma.id, {
      onSuccess: () => {
        setIsDeleteDiplomaOpen(false);
        navigate(ROUTES.DIPLOMAS);
      },
      onError: () => {
        setIsDeleteDiplomaOpen(false);
      },
    });
  };

  const handleConfirmToggleImmutable = () => {
    if (!diploma?.id) return;
    updateDiplomaImmutable(
      { id: diploma.id, immutable: !diploma.immutable },
      {
        onSuccess: () => {
          setIsToggleImmutableOpen(false);
        },
        onError: () => {
          setIsToggleImmutableOpen(false);
        },
      }
    );
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
      <AdminDetailsScreenHeader
        breadcrumbItems={[
          { title: 'Diplomas', href: ROUTES.DIPLOMAS },
          { title: diploma.title },
        ]}
        title={diploma.title}
        immutable={diploma.immutable}
        isDeleting={isDeleting}
        isTogglingImmutable={isUpdatingImmutable}
        onEdit={() => navigate(`/diplomas/${diploma.id}/manage`)}
        onDelete={handleDelete}
        onToggleImmutable={() => setIsToggleImmutableOpen(true)}
      />

      <div className="space-y-6 rounded-lg border border-gray-100 bg-white p-6 shadow-2xs sm:p-8">
        <div className="space-y-2">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Image
          </p>
          <div className="aspect-4/3 w-full max-w-xs overflow-hidden rounded-md border border-gray-100 bg-gray-50 sm:max-w-sm">
            {diploma.image ? (
              <img
                src={diploma.image}
                alt={diploma.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs text-gray-400">
                No image available
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Title
          </p>
          <p className="font-mono text-sm font-semibold text-gray-900 sm:text-base">
            {diploma.title}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-gray-400">
            Description
          </p>
          <p className="text-xs leading-relaxed whitespace-pre-wrap text-gray-800 sm:text-sm">
            {diploma.description}
          </p>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteDiplomaOpen}
        onClose={() => setIsDeleteDiplomaOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Diploma"
        description={`Are you sure you want to delete "${diploma.title}"? This action cannot be undone.`}
        confirmLabel="Delete Diploma"
      />

      <ToggleImmutableModal
        isOpen={isToggleImmutableOpen}
        onClose={() => setIsToggleImmutableOpen(false)}
        onConfirm={handleConfirmToggleImmutable}
        currentImmutable={Boolean(diploma.immutable)}
        isLoading={isUpdatingImmutable}
        entityName="diploma"
      />
    </div>
  );
}
