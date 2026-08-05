import { ROUTES } from '@/app/routes';
import AdminQuestionDetailsHeader from '@/features/question/components/admin/admin-question-details-header';
import { useDeleteQuestion } from '@/features/question/hooks/use-delete-question';
import { useGetQuestionById } from '@/features/question/hooks/use-get-question-by-id';
import { useUpdateQuestionImmutable } from '@/features/question/hooks/use-update-question-immutable';
import type { IQuestion } from '@/features/question/types/questions';
import DeleteConfirmDialog from '@/shared/components/delete-confirm-dialog';
import ImmutableStatusDialog from '@/shared/components/immutable-status-dialog';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import { Button } from '@/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function AdminQuestionDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImmutableStatusDialogOpen, setIsImmutableStatusDialogOpen] =
    useState(false);

  // ====================== APIS ======================
  const { data, isLoading, isError } = useGetQuestionById(id);
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteQuestion();
  const { mutate: updateImmutable, isPending: isToggling } =
    useUpdateQuestionImmutable();

  const questionPayload = data?.payload;
  const question: IQuestion | undefined =
    questionPayload && 'question' in questionPayload
      ? (questionPayload as { question: IQuestion }).question
      : (questionPayload as IQuestion | undefined);

  useBreadcrumb({
    items: [
      { title: 'Questions', href: ROUTES.EXAMS },
      {
        title: question?.exam?.title || 'Exam',
        href: question?.examId ? `/exams/${question.examId}` : ROUTES.EXAMS,
      },
      { title: question?.text || 'Question View' },
    ],
  });

  const handleConfirmDelete = () => {
    if (!id) return;
    deleteQuestion(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        if (question?.examId) {
          navigate(`/exams/${question.examId}`);
        } else {
          navigate(ROUTES.EXAMS);
        }
      },
    });
  };

  const handleToggleImmutable = () => {
    if (!question) return;
    updateImmutable(
      {
        id: question.id,
        immutable: !question.immutable,
      },
      {
        onSuccess: () => {
          setIsImmutableStatusDialogOpen(false);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-sm text-gray-500">
        Loading question details...
      </div>
    );
  }

  if (isError || !question) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-12 text-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <h3 className="font-mono text-base font-semibold">
            Question Not Found
          </h3>
          <p className="mt-1 font-mono text-xs text-red-600">
            The requested question could not be loaded or does not exist.
          </p>
        </div>
        <Button
          onClick={() => navigate(-1)}
          className="mx-auto w-auto gap-2 bg-gray-900 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Delete Question Modal */}
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Question"
        description={`Are you sure you want to delete "${question?.text}"? This action cannot be undone.`}
        confirmLabel="Delete Question"
      />

      <ImmutableStatusDialog
        isOpen={isImmutableStatusDialogOpen}
        onClose={() => setIsImmutableStatusDialogOpen(false)}
        onConfirm={handleToggleImmutable}
        currentImmutable={question.immutable}
        entityName={question.text}
        isLoading={isToggling}
      />

      <div className="max-w-full space-y-6">
        {/* Top Header Navigation */}
        <div className="-mx-4 -mt-7 border-b border-gray-100 bg-white px-4 py-5">
          <Breadcrumb
            items={[
              { title: 'Exams', href: ROUTES.EXAMS },
              {
                title: question.exam?.title || 'Exam Details',
                href: `/exams/${question.examId}`,
              },
              { title: question.text },
            ]}
          />
          <AdminQuestionDetailsHeader
            question={question}
            onDelete={() => setIsDeleteModalOpen(true)}
            onEdit={() => navigate(`/questions/${question.id}/manage`)}
            onToggleImmutable={() => setIsImmutableStatusDialogOpen(true)}
          />
        </div>

        <div className="space-y-4 bg-white p-4">
          <DetailsItem label="Headline" value={question.text} />
          <DetailsItem
            label="Exam"
            value={String(question.exam?.title || '')}
          />
          <DetailsItem
            label="Answers"
            value={String(question.answers.length)}
          />
        </div>
      </div>
    </>
  );
}

function DetailsItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h5 className="text-sm text-gray-400">{label}</h5>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}
