import { ROUTES } from '@/app/routes';
import AdminQuestionFormHeader from '@/features/question/components/admin/admin-question-form-header';
import AdminQuestionInfoCard from '@/features/question/components/admin/admin-question-info-card';
import BulkQuestionForm from '@/features/question/components/admin/bulk-question-form';
import SingleQuestionForm from '@/features/question/components/admin/single-question-form';
import {
  EXAM_ID_QUERY_KEY,
  QUESTION_FORM_MODES,
  QUESTION_MODE_QUERY_KEY,
  QUESTION_MODE_STORAGE_KEY,
  type QuestionFormMode,
} from '@/features/question/constants/search-params.keys';
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
  getFormErrorMessages,
  toBulkQuestionPayload,
  toQuestionFormValues,
  toQuestionPayload,
} from '@/features/question/utils/question-form.utils';
import ErrorAlert from '@/shared/components/error-alert';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminQuestionFormPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultExamId = searchParams.get(EXAM_ID_QUERY_KEY) || '';
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const paramMode = searchParams.get(QUESTION_MODE_QUERY_KEY);
  const storedMode =
    typeof window !== 'undefined'
      ? sessionStorage.getItem(QUESTION_MODE_STORAGE_KEY)
      : null;

  const mode: QuestionFormMode =
    paramMode === QUESTION_FORM_MODES.BULK ||
    paramMode === QUESTION_FORM_MODES.SINGLE
      ? paramMode
      : storedMode === QUESTION_FORM_MODES.BULK ||
          storedMode === QUESTION_FORM_MODES.SINGLE
        ? (storedMode as QuestionFormMode)
        : QUESTION_FORM_MODES.SINGLE;

  useEffect(() => {
    sessionStorage.setItem(QUESTION_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const handleModeChange = (newMode: QuestionFormMode) => {
    sessionStorage.setItem(QUESTION_MODE_STORAGE_KEY, newMode);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(QUESTION_MODE_QUERY_KEY, newMode);
        return next;
      },
      { replace: true }
    );
  };

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

  // Keep examId in sync between single and bulk forms
  const singleExamId = singleForm.watch('examId');
  const bulkExamId = bulkForm.watch('examId');

  useEffect(() => {
    if (singleExamId && singleExamId !== bulkForm.getValues('examId')) {
      bulkForm.setValue('examId', singleExamId, { shouldValidate: true });
    }
  }, [singleExamId, bulkForm]);

  useEffect(() => {
    if (bulkExamId && bulkExamId !== singleForm.getValues('examId')) {
      singleForm.setValue('examId', bulkExamId, { shouldValidate: true });
    }
  }, [bulkExamId, singleForm]);

  // ========================== Breadcrumb ==========================
  useBreadcrumb({
    items: [
      { title: 'Questions', href: ROUTES.EXAMS },
      { title: isEdit ? 'Edit Question' : 'Create New Question' },
    ],
  });

  const isBulkMode = mode === QUESTION_FORM_MODES.BULK;
  const activeFormId = isBulkMode
    ? 'bulk-question-form'
    : 'single-question-form';
  const isSubmitting = isBulkMode
    ? isCreatingBulk
    : isCreatingSingle || isUpdatingSingle;
  const apiError = isBulkMode ? bulkError : createError || updateError;

  const activeForm = isBulkMode ? bulkForm : singleForm;
  const formValidationErrors =
    activeForm.formState.submitCount > 0
      ? getFormErrorMessages(activeForm.formState.errors)
      : [];

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
        onModeChange={handleModeChange}
        activeFormId={activeFormId}
        isSubmitting={isSubmitting}
      />

      <ErrorAlert error={apiError} />

      {formValidationErrors.length > 0 && (
        <ErrorAlert>
          <div className="flex flex-col items-center gap-1">
            {formValidationErrors.map((msg, idx) => (
              <span key={idx}>{msg}</span>
            ))}
          </div>
        </ErrorAlert>
      )}

      {/* Shared Question Info Card (renders continuously so ExamDropDown doesn't unmount/refetch) */}
      <FormProvider {...((isBulkMode ? bulkForm : singleForm) as any)}>
        <AdminQuestionInfoCard mode={mode} />
      </FormProvider>

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
