import { ROUTES } from '@/app/routes';
import AdminQuestionViewCard from '@/features/question/components/admin/admin-question-view-card';
import DeleteQuestionModal from '@/features/question/components/admin/delete-question-modal';
import { useDeleteQuestion } from '@/features/question/hooks/use-delete-question';
import { useGetQuestionById } from '@/features/question/hooks/use-get-question-by-id';
import { useUpdateQuestionImmutable } from '@/features/question/hooks/use-update-question-immutable';
import type { IQuestion } from '@/features/question/types/questions';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';
import { Button } from '@/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function AdminQuestionDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ====================== APIS ======================
  const { data, isLoading, isError } = useGetQuestionById(id);
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteQuestion();
  const { mutate: updateImmutable } = useUpdateQuestionImmutable();

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

  const handleToggleSelectable = () => {
    if (!question) return;
    updateImmutable({
      id: question.id,
      immutable: !question.immutable,
    });
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
    <div className="max-w-full space-y-6">
      {/* Top Header Navigation */}
      <div className="-mx-4 -mt-7 border-b border-gray-100 bg-white px-4 py-5">
        <BreadCrumb
          items={[
            { title: 'Exams', href: ROUTES.EXAMS },
            {
              title: question.exam?.title || 'Exam Details',
              href: `/exams/${question.examId}`,
            },
            { title: question.text },
          ]}
        />
      </div>

      {/* Main Question View Card */}

      <AdminQuestionViewCard
        question={question}
        onEdit={() => navigate(`/questions/${question.id}/manage`)}
        onDelete={() => setIsDeleteModalOpen(true)}
        onToggleSelectable={handleToggleSelectable}
        isSelectable={!question.immutable}
      />

      {/* Delete Question Modal */}
      <DeleteQuestionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
