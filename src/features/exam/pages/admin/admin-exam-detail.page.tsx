import { ROUTES } from '@/app/routes';
import AdminExamQuestionsCard from '@/features/exam/components/admin/admin-exam-questions-card';
import {
  IMMUTABLE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/exam/components/constants/search-params.keys';
import { useDeleteExam } from '@/features/exam/hooks/use-delete-exam';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import type { IExam } from '@/features/exam/types/exams.d';
import useGetExamQuestions from '@/features/question/hooks/use-get-exam-questions';
import type {
  QuestionSortBy,
  QuestionSortOrder,
} from '@/features/question/types/questions';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';

import { Button } from '@/shared/ui/button';
import { ArrowLeft, Ban, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [imageError, setImageError] = useState(false);

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
    if (!exam?.id) return;
    if (confirm(`Are you sure you want to delete "${exam.title}"?`)) {
      deleteExam(exam.id, {
        onSuccess: () => {
          navigate(ROUTES.EXAMS);
        },
      });
    }
  };

  const handleAddExam = () => {
    navigate({ pathname: ROUTES.EXAM_CREATE });
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          {exam.title}
        </h1>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-auto cursor-default gap-1.5 border-gray-200 bg-gray-100 px-3.5 font-mono text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            <Ban className="size-3.5 text-gray-600" />
            <span>{exam.immutable ? 'Immutable' : 'In-active'}</span>
          </Button>
          <Button
            size="sm"
            className="h-9 w-auto gap-1.5 bg-blue-600 px-4 font-mono text-xs font-medium text-white hover:bg-blue-700"
            onClick={() => navigate(`/exams/${exam.id}/manage`)}
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

      {/* Exam Detail Info Card */}
      <div className="space-y-6 rounded-md border border-gray-200 bg-white p-6 shadow-2xs sm:p-8">
        <div className="space-y-2">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Image
          </p>
          <div className="w-full max-w-sm overflow-hidden rounded-md border border-gray-200 bg-gray-50">
            {!imageError && exam.image ? (
              <img
                src={exam.image}
                alt={exam.title}
                className="size-75 w-full object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-gray-100 font-mono text-xs text-gray-400">
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
            {exam.title}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Description
          </p>
          <p className="font-mono text-xs leading-relaxed text-gray-700 sm:text-sm">
            {exam.description || 'No description provided.'}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Diploma
          </p>
          <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-gray-800 sm:text-sm">
            <span>{exam.diploma?.title || 'Full Stack Development'}</span>
            <ExternalLink className="size-3.5 cursor-pointer text-gray-400 hover:text-blue-600" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2">
          <div className="space-y-1">
            <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
              Duration
            </p>
            <p className="font-mono text-xs font-semibold text-gray-800 sm:text-sm">
              {exam.duration} Minutes
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
              No. of Questions
            </p>
            <p className="font-mono text-xs font-semibold text-gray-800 sm:text-sm">
              {exam.questionsCount || 10}
            </p>
          </div>
        </div>
      </div>

      {/* Exam Questions Section Card */}
      <AdminExamQuestionsCard
        questions={examQuestions?.payload?.questions}
        onAddQuestion={handleAddExam}
        onRemoveQuestion={() => {}}
      />
    </div>
  );
}
