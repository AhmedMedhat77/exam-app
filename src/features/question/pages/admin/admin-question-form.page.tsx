import { ROUTES } from '@/app/routes';
import AdminQuestionFormHeader, {
  type QuestionFormMode,
} from '@/features/question/components/admin/admin-question-form-header';
import BulkQuestionForm from '@/features/question/components/admin/bulk-question-form';
import SingleQuestionForm from '@/features/question/components/admin/single-question-form';
import { useCreateBulkQuestions } from '@/features/question/hooks/use-create-bulk-questions';
import { useCreateQuestion } from '@/features/question/hooks/use-create-question';
import { useGetQuestionById } from '@/features/question/hooks/use-get-question-by-id';
import { useUpdateQuestion } from '@/features/question/hooks/use-update-question';
import {
  bulkQuestionSchema,
  QuestionSchema,
  type IBulkQuestionFormValues,
  type IQuestionFormValues,
} from '@/features/question/schemas/question.schema';
import type { IQuestion } from '@/features/question/types/questions';
import {
  createBulkQuestionDefaults,
  createSingleQuestionDefaults,
  toBulkQuestionPayload,
  toQuestionFormValues,
  toQuestionPayload,
} from '@/features/question/utils/question-form.utils';
import ErrorAlert from '@/shared/components/error-alert';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminQuestionFormPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultExamId = searchParams.get('examId') || '';
  const navigate = useNavigate();

  const isEdit = Boolean(id);
  const [mode, setMode] = useState<QuestionFormMode>('single');

  // ==================== APIs  ====================
  const { data: fetchedData, isLoading: isLoadingQuestion } =
    useGetQuestionById(id);

  const {
    mutate: createQuestion,
    isPending: isCreatingSingle,
    error: createError,
  } = useCreateQuestion();

  const {
    mutate: updateQuestion,
    isPending: isUpdatingSingle,
    error: updateError,
  } = useUpdateQuestion();

  const {
    mutate: createBulkQuestions,
    isPending: isCreatingBulk,
    error: bulkError,
  } = useCreateBulkQuestions();

  // ========================== Helper variables ==========================
  const questionPayload = fetchedData?.payload;
  const question: IQuestion | undefined =
    questionPayload && 'question' in questionPayload
      ? (questionPayload as { question: IQuestion }).question
      : (questionPayload as IQuestion | undefined);

  // ========================== Forms ==========================
  const singleForm = useForm<IQuestionFormValues>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: createSingleQuestionDefaults(defaultExamId),
  });

  const bulkForm = useForm<IBulkQuestionFormValues>({
    resolver: zodResolver(bulkQuestionSchema),
    defaultValues: createBulkQuestionDefaults(defaultExamId),
  });

  // ========================== Breadcrumb ==========================
  useBreadcrumb({
    items: [
      { title: 'Questions', href: ROUTES.EXAMS },
      { title: isEdit ? 'Edit Question' : 'Create New Question' },
    ],
  });

  const isBulkMode = mode === 'bulk';
  const activeFormId = isBulkMode
    ? 'bulk-question-form'
    : 'single-question-form';
  const isSubmitting = isBulkMode
    ? isCreatingBulk
    : isCreatingSingle || isUpdatingSingle;
  const apiError = isBulkMode ? bulkError : createError || updateError;

  // ========================== Form handlers ==========================
  const handleSingleSubmit = singleForm.handleSubmit((values) => {
    const payload = toQuestionPayload(values);

    if (isEdit) {
      updateQuestion(
        { id, payload },
        {
          onSuccess: () => {
            navigate(`/questions/${id}`);
          },
        }
      );
    } else {
      createQuestion(payload, {
        onSuccess: (res) => {
          const newQ =
            res?.payload && 'question' in res.payload
              ? res.payload.question
              : (res?.payload as IQuestion | undefined);
          if (newQ?.id) {
            navigate(`/questions/${newQ.id}`);
          } else if (values.examId) {
            navigate(`/exams/${values.examId}`);
          } else {
            navigate(ROUTES.EXAMS);
          }
        },
      });
    }
  });

  // Bulk Question Form Submit Handler
  const handleBulkSubmit = bulkForm.handleSubmit((values) => {
    createBulkQuestions(toBulkQuestionPayload(values), {
      onSuccess: () => {
        if (values.examId) {
          navigate(`/exams/${values.examId}`);
        } else {
          navigate(ROUTES.EXAMS);
        }
      },
    });
  });

  // Sync existing question for Edit mode
  useEffect(() => {
    if (question) {
      singleForm.reset(toQuestionFormValues(question));
    } else if (defaultExamId) {
      singleForm.setValue('examId', defaultExamId);
      bulkForm.setValue('examId', defaultExamId);
    }
  }, [question, defaultExamId, singleForm, bulkForm]);

  if (isEdit && isLoadingQuestion) {
    return (
      <div className="flex h-48 items-center justify-center font-mono text-sm text-gray-500">
        Loading question details...
      </div>
    );
  }

  return (
    <div className="max-w-full space-y-6">
      {/* Top Header Navigation */}
      <div className="-mx-4 -mt-7 flex flex-col justify-between gap-4 border-b border-gray-100 bg-white px-4 py-5 sm:flex-row sm:items-center">
        <Breadcrumb
          items={[
            { title: 'Questions', href: ROUTES.EXAMS },
            { title: isEdit ? 'Edit Question' : 'Create New Question' },
          ]}
        />
      </div>

      {/* Header */}
      <AdminQuestionFormHeader
        mode={mode}
        onModeChange={setMode}
        activeFormId={activeFormId}
        isSubmitting={isSubmitting}
      />

      <ErrorAlert error={apiError} />

      {/* Bulk mode Form */}
      {isBulkMode ? (
        <BulkQuestionForm
          formId={activeFormId}
          form={bulkForm}
          onSubmit={handleBulkSubmit}
        />
      ) : (
        <SingleQuestionForm
          formId={activeFormId}
          form={singleForm}
          onSubmit={handleSingleSubmit}
        />
      )}
    </div>
  );
}
