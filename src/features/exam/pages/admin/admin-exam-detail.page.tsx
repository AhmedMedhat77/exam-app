import { ROUTES } from '@/app/routes';
import AdminExamDetailHeader from '@/features/exam/components/admin/admin-exam-detail-header';
import AdminExamDetailInfoCard from '@/features/exam/components/admin/admin-exam-detail-info-card';
import AdminExamQuestionsCard from '@/features/exam/components/admin/admin-exam-questions-card';
import {
  IMMUTABLE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/exam/components/constants/search-params.keys';
import { useDeleteExam } from '@/features/exam/hooks/use-delete-exam';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import { useUpdateExamImmutable } from '@/features/exam/hooks/use-update-exam-immutable';
import type { IExam } from '@/features/exam/types/exams.d';
import AddQuestionModal from '@/features/question/components/admin/add-question-modal';
import DeleteQuestionModal from '@/features/question/components/admin/delete-question-modal';
import ToggleImmutableModal from '@/features/exam/components/admin/toggle-immutable-modal';
import { useDeleteQuestion } from '@/features/question/hooks/use-delete-question';
import useGetExamQuestions from '@/features/question/hooks/use-get-exam-questions';
import type {
  QuestionSortBy,
  QuestionSortOrder,
} from '@/features/question/types/questions';
import DeleteConfirmModal from '@/shared/components/delete-confirm-modal';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';

import { Button } from '@/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isToggleImmutableOpen, setIsToggleImmutableOpen] = useState(false);
  const [isDeleteExamOpen, setIsDeleteExamOpen] = useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState<string | null>(
    null
  );

  const search = searchParams.get(SEARCH_QUERY_KEY) || undefined;
  const sortBy = (searchParams.get(SORT_BY_KEY) as QuestionSortBy) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as QuestionSortOrder) || undefined;
  const immutableParam = searchParams.get(IMMUTABLE_QUERY_KEY);
  const immutable =
    immutableParam !== null ? immutableParam === 'true' : undefined;

  // ========================== APIS ==========================
  const { data, isLoading, isError } = useGetExamById(id);
  const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();
  const { mutate: updateImmutable, isPending: isUpdatingImmutable } =
    useUpdateExamImmutable();
  const { mutate: deleteQuestion, isPending: isDeletingQuestion } =
    useDeleteQuestion();
  const { data: examQuestions } = useGetExamQuestions({
    examId: id,
    search,
    sortBy,
    sortOrder,
    immutable,
  });

  // ========================== MEMOS ==========================
  const examPayload = data?.payload;
  const fetchedExam: IExam | undefined =
    examPayload && 'exam' in examPayload
      ? (examPayload as { exam: IExam }).exam
      : (examPayload as IExam | undefined);

  const exam = fetchedExam;

  // ========================== USEBREADCRUMB ==========================
  useBreadcrumb({
    items: [
      { title: 'Exams', href: ROUTES.EXAMS },
      { title: exam?.title || 'Exam Details' },
    ],
  });

  // ========================== HANDLERS ==========================

  const handleDelete = () => {
    setIsDeleteExamOpen(true);
  };

  const handleConfirmDeleteExam = () => {
    if (!exam?.id) return;
    deleteExam(exam.id, {
      onSuccess: () => {
        setIsDeleteExamOpen(false);
        navigate(ROUTES.EXAMS);
      },
      onError: () => {
        setIsDeleteExamOpen(false);
      },
    });
  };

  const handleConfirmToggleImmutable = () => {
    if (!exam?.id) return;
    updateImmutable(
      { id: exam.id, immutable: !exam.immutable },
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

  const handleRemoveQuestion = (questionId: string) => {
    setQuestionToDeleteId(questionId);
  };

  const handleConfirmDeleteQuestion = () => {
    if (!questionToDeleteId) return;
    deleteQuestion(questionToDeleteId, {
      onSuccess: () => {
        setQuestionToDeleteId(null);
      },
      onError: () => {
        setQuestionToDeleteId(null);
      },
    });
  };

  const handleAddQuestion = () => {
    setIsAddQuestionOpen(true);
  };

  // ========================== RENDER ==========================
  if (isLoading && !fetchedExam && id !== 'final-fullstack-exam') {
    return (
      <div className="flex h-64 items-center justify-center font-mono text-sm text-gray-500">
        Loading exam details...
      </div>
    );
  }

  if (isError && !exam) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-12 text-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <h3 className="font-mono text-base font-semibold">Exam Not Found</h3>
          <p className="mt-1 font-mono text-xs text-red-600">
            The requested exam could not be loaded or does not exist.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.EXAMS)}
          className="mx-auto w-auto gap-2 bg-gray-900 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
          Back to Exams
        </Button>
      </div>
    );
  }

  // Handle the case where exam is not found (isError is false but exam is undefined)
  if (!exam) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-12 text-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
          <h3 className="font-mono text-base font-semibold">Exam Not Found</h3>
          <p className="mt-1 font-mono text-xs text-red-600">
            The requested exam could not be loaded or does not exist.
          </p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.EXAMS)}
          className="mx-auto w-auto gap-2 bg-gray-900 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
          Back to Exams
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
            { title: exam.title },
          ]}
        />
      </div>

      {/* Top Controls Bar */}
      <AdminExamDetailHeader
        title={exam.title}
        immutable={exam.immutable}
        isDeleting={isDeleting}
        isTogglingImmutable={isUpdatingImmutable}
        onEdit={() => navigate(`/exams/${exam.id}/manage`)}
        onDelete={handleDelete}
        onToggleImmutable={() => setIsToggleImmutableOpen(true)}
      />

      {/* Exam Detail Info Card */}
      <AdminExamDetailInfoCard exam={exam} />

      {/* Exam Questions Section Card */}
      <AdminExamQuestionsCard
        questions={examQuestions?.payload?.questions}
        onAddQuestion={handleAddQuestion}
        onRemoveQuestion={handleRemoveQuestion}
      />

      <AddQuestionModal
        isOpen={isAddQuestionOpen}
        onClose={() => setIsAddQuestionOpen(false)}
        examId={id}
      />

      <DeleteQuestionModal
        isOpen={!!questionToDeleteId}
        onClose={() => setQuestionToDeleteId(null)}
        onConfirm={handleConfirmDeleteQuestion}
        isDeleting={isDeletingQuestion}
      />

      <ToggleImmutableModal
        isOpen={isToggleImmutableOpen}
        onClose={() => setIsToggleImmutableOpen(false)}
        onConfirm={handleConfirmToggleImmutable}
        currentImmutable={Boolean(exam.immutable)}
        isLoading={isUpdatingImmutable}
      />

      <DeleteConfirmModal
        isOpen={isDeleteExamOpen}
        onClose={() => setIsDeleteExamOpen(false)}
        onConfirm={handleConfirmDeleteExam}
        isDeleting={isDeleting}
        title="Delete Exam"
        description={`Are you sure you want to delete "${exam.title}"? This action cannot be undone.`}
        confirmLabel="Delete Exam"
      />
    </div>
  );
}
