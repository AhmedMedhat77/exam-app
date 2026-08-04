import { ROUTES } from '@/app/routes';
import AdminExamQuestionsCard from '@/features/exam/components/admin/admin-exam-questions-card';
import { useDeleteExam } from '@/features/exam/hooks/use-delete-exam';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import type { IExam } from '@/features/exam/types/exams.d';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';

import { Button } from '@/shared/ui/button';
import { ArrowLeft, Ban, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// Sample fallback mock for initial view demonstration matching mockup
const MOCK_EXAM: IExam = {
  id: 'final-fullstack-exam',
  title: 'Final Full Stack Development Certification Exam',
  description:
    'Comprehensive exam covering all full stack development topics in this diploma.',
  image:
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  duration: 20,
  questionsCount: 10,
  diplomaId: 'full-stack-dev',
  diploma: {
    id: 'full-stack-dev',
    title: 'Full Stack Development',
  },
  immutable: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function AdminExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const { data, isLoading, isError } = useGetExamById(id);
  const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();

  const examPayload = data?.payload;
  const fetchedExam: IExam | undefined =
    examPayload && 'exam' in examPayload
      ? (examPayload as { exam: IExam }).exam
      : (examPayload as IExam | undefined);

  const exam: IExam = fetchedExam || MOCK_EXAM;

  useBreadcrumb({
    items: [
      { title: 'Exams', href: ROUTES.EXAMS },
      { title: exam.title || 'Exam Details' },
    ],
  });

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
      <AdminExamQuestionsCard />
    </div>
  );
}
