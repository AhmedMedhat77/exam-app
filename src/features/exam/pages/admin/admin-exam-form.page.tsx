import { ROUTES } from '@/app/routes';
import AdminExamForm from '@/features/exam/components/admin/admin-exam-form';
import AdminExamQuestionsTable from '@/features/exam/components/admin/admin-exam-questions-table';
import {
  IMMUTABLE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
} from '@/features/exam/components/constants/search-params.keys';
import { useCreateExam } from '@/features/exam/hooks/use-create-exam';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import { useUpdateExam } from '@/features/exam/hooks/use-update-exam';
import { examSchema } from '@/features/exam/schemas/exam.schema';
import type { IExam } from '@/features/exam/types/exams.d';

import { useDeleteQuestion } from '@/features/question/hooks/use-delete-question';
import useGetExamQuestions from '@/features/question/hooks/use-get-exam-questions';
import type {
  QuestionSortBy,
  QuestionSortOrder,
} from '@/features/question/types/questions';
import ErrorAlert from '@/shared/components/error-alert';
import DeleteConfirmDialog from '@/shared/components/delete-confirm-dialog';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import { UploadService } from '@/shared/services/upload.service';
import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminExamFormPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questionToDeleteId, setQuestionToDeleteId] = useState<string | null>(
    null
  );

  // ========================== PARAMS ==========================

  const [searchParams] = useSearchParams();

  const search = searchParams.get(SEARCH_QUERY_KEY) || undefined;
  const sortBy = (searchParams.get(SORT_BY_KEY) as QuestionSortBy) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as QuestionSortOrder) || undefined;
  const immutableParam = searchParams.get(IMMUTABLE_QUERY_KEY);
  const immutable =
    immutableParam !== null ? immutableParam === 'true' : undefined;

  // ========================== APIS ==========================

  const { data, isLoading, error: getError } = useGetExamById(id);
  const {
    mutate: createExam,
    isPending: isCreating,
    error: createError,
  } = useCreateExam();
  const {
    mutate: updateExam,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateExam();

  const { data: examQuestions } = useGetExamQuestions({
    examId: id,
    search,
    sortBy,
    sortOrder,
    immutable,
  });

  const { mutate: deleteQuestion, isPending: isDeletingQuestion } =
    useDeleteQuestion();

  const isSubmitting = isCreating || isUpdating;
  const apiError = createError || updateError || getError;

  const examPayload = data?.payload;
  const fetchedExam: IExam | undefined =
    examPayload && 'exam' in examPayload
      ? (examPayload as { exam: IExam }).exam
      : (examPayload as IExam | undefined);

  const exam = fetchedExam;

  useBreadcrumb({
    items: [
      { title: 'Exams', href: ROUTES.EXAMS },
      { title: exam?.title || 'Exam' },
      { title: id ? 'Edit' : 'Add' },
    ],
  });

  const form = useForm({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: exam?.title || '',
      description: exam?.description || '',
      diplomaId: exam?.diplomaId || '',
      duration: exam?.duration || 20,
      image: exam?.image || null,
    },
    values: exam
      ? {
          title: exam.title,
          description: exam.description || '',
          diplomaId: exam.diplomaId || '',
          duration: exam.duration || 20,
          image: exam.image || null,
        }
      : undefined,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    let imageUrl: string | undefined = undefined;

    if (values.image instanceof File) {
      try {
        imageUrl = await UploadService.uploadApi(values.image);
      } catch (err) {
        console.error('Failed to upload image:', err);
      }
    } else if (typeof values.image === 'string') {
      imageUrl = values.image;
    }

    const payload = {
      title: values.title,
      description: values.description,
      duration: values.duration,
      diplomaId: values.diplomaId,
      image: imageUrl,
    };

    if (id) {
      updateExam(
        { id, payload },
        {
          onSuccess: () => {
            navigate(`/exams/${id}`);
          },
        }
      );
    } else {
      createExam(payload, {
        onSuccess: (res) => {
          const newExam =
            res?.payload && 'exam' in res.payload
              ? res.payload.exam
              : (res?.payload as IExam | undefined);
          const newId = newExam?.id;
          if (newId) {
            navigate(`/exams/${newId}`);
          } else {
            navigate(ROUTES.EXAMS);
          }
        },
      });
    }
  });

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
    navigate(`/questions/manage?examId=${id}`);
  };

  if (id && isLoading && !fetchedExam) {
    return (
      <div className="flex h-48 items-center justify-center font-mono text-sm text-gray-500">
        Loading exam details...
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="max-w-full space-y-6">
        {/* Top Header Navigation */}
        <div className="-mx-4 -mt-7 flex flex-col justify-between gap-4 border-b border-gray-100 bg-white px-4 py-5 sm:flex-row sm:items-center">
          <Breadcrumb
            items={[
              { title: 'Exams', href: ROUTES.EXAMS },
              { title: exam?.title || 'Exam' },
              { title: id ? 'Edit' : 'Add' },
            ]}
          />
        </div>

        {/* Action Header Title & Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-mono text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {exam?.title || (id ? 'Edit Exam' : 'Add Exam')}
            </h1>
            {exam?.diploma?.title && (
              <p className="mt-0.5 font-mono text-xs text-gray-500">
                Diploma:{' '}
                <span className="font-semibold text-gray-700">
                  {exam.diploma.title}
                </span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Cancel Button */}
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => navigate(-1)}
              className="h-9 w-auto gap-1.5 border-gray-300 bg-white px-4 font-mono text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <X className="size-3.5" />
              <span>Cancel</span>
            </Button>

            {/* Save Button (Success variant) */}
            <Button
              variant="success"
              size="sm"
              type="submit"
              disabled={isSubmitting}
              className="h-9 w-auto gap-1.5 px-4 font-mono text-xs font-medium"
            >
              <Save className="size-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
            </Button>
          </div>
        </div>

        <ErrorAlert error={apiError} />

        {/* Section 1: Exam Information Card */}
        <AdminExamForm />

        {/* Section 2: Exam Questions Card */}
        {id && (
          <AdminExamQuestionsTable
            questions={examQuestions?.payload?.questions}
            onRemoveQuestion={handleRemoveQuestion}
            onAddQuestion={handleAddQuestion}
          />
        )}
      </form>

      {id && (
        <DeleteConfirmDialog
          isOpen={!!questionToDeleteId}
          onClose={() => setQuestionToDeleteId(null)}
          onConfirm={handleConfirmDeleteQuestion}
          isDeleting={isDeletingQuestion}
          title="Delete Exam"
          description="Are you sure you want to delete this exam? This action cannot be undone."
          confirmLabel="Delete Exam"
        />
      )}
    </FormProvider>
  );
}
