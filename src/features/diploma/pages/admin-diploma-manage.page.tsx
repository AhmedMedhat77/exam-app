import { ROUTES } from '@/app/routes';
import AdminDiplomaInformationCard from '@/features/diploma/components/admin/diploma/admin-diploma-information-card';
import AdminDiplomaManageHeader from '@/features/diploma/components/admin/diploma/admin-diploma-manage-header';
import { useCreateDiploma } from '@/features/diploma/hooks/use-create-diploma';
import { useGetDiplomaById } from '@/features/diploma/hooks/use-get-diploma-by-id';
import { useUpdateDiploma } from '@/features/diploma/hooks/use-update-diploma';
import { diplomaSchema } from '@/features/diploma/schemas/diploma.schema';
import type { IDiploma } from '@/features/diploma/types/diploma.d';
import CustomError from '@/shared/components/custom-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export default function AdminDiplomaManagePage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error: getError } = useGetDiplomaById(id);
  const {
    mutate: createDiploma,
    isPending: isCreating,
    error: createError,
  } = useCreateDiploma();
  const {
    mutate: updateDiploma,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateDiploma();

  const isSubmitting = isCreating || isUpdating;
  const apiError = createError || updateError || getError;

  const diplomaPayload = data?.payload;
  const diploma: IDiploma | undefined =
    diplomaPayload && 'diploma' in diplomaPayload
      ? (diplomaPayload as { diploma: IDiploma }).diploma
      : (diplomaPayload as IDiploma | undefined);

  const form = useForm({
    values: diploma ? { ...diploma } : undefined,
    resolver: zodResolver(diplomaSchema),
    defaultValues: {
      title: diploma?.title || '',
      description: diploma?.description || '',
      image: diploma?.image || null,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const payload = {
      title: values.title,
      description: values.description,
      image: values.image,
    };

    if (id) {
      updateDiploma(
        { id, payload },
        {
          onSuccess: () => {
            navigate(ROUTES.DIPLOMA_DETAIL.replace(':id', id));
          },
        }
      );
    } else {
      createDiploma(payload, {
        onSuccess: (res) => {
          const newDiploma =
            res?.payload && 'diploma' in res.payload
              ? res.payload.diploma
              : (res?.payload as IDiploma | undefined);
          const newId = newDiploma?.id;
          if (newId) {
            navigate(ROUTES.DIPLOMA_DETAIL.replace(':id', newId));
          } else {
            navigate(ROUTES.DIPLOMAS);
          }
        },
      });
    }
  });

  if (id && isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-mono text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <AdminDiplomaManageHeader
          diploma={diploma}
          isSubmitting={isSubmitting}
        />
        <div className="mt-10 space-y-4 p-5">
          <CustomError error={apiError} />
          <div className="col-span-12 lg:col-span-8">
            <AdminDiplomaInformationCard />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
