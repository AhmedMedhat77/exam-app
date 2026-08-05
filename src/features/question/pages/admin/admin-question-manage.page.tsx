import { ROUTES } from '@/app/routes';
import AdminBulkQuestionForm from '@/features/question/components/admin/admin-bulk-question-form';
import AdminQuestionFormHeader from '@/features/question/components/admin/admin-question-form-header';
import AdminQuestionInfoCard from '@/features/question/components/admin/admin-question-info-card';
import QuestionAnswersField from '@/features/question/components/admin/question-answers-field';
import { useCreateBulkQuestions } from '@/features/question/hooks/use-create-bulk-questions';
import { useCreateQuestion } from '@/features/question/hooks/use-create-question';
import { useGetQuestionById } from '@/features/question/hooks/use-get-question-by-id';
import { useUpdateQuestion } from '@/features/question/hooks/use-update-question';
import {
  bulkQuestionSchema,
  QuestionSchema,
  type IAnswerFormValues,
  type IBulkQuestionFormValues,
  type IQuestionFormValues,
} from '@/features/question/schemas/question.schema';
import type {
  IAnswer,
  ICreateAnswerPayload,
  IQuestion,
} from '@/features/question/types/questions';
import ErrorAlert from '@/shared/components/error-alert';
import Breadcrumb from '@/shared/layouts/dashboard/breadcrumb/breadcrumb-view';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/use-breadcrumb';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminQuestionFormPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultExamId = searchParams.get('examId') || '';
  const navigate = useNavigate();

  const isEdit = Boolean(id);
  const [isBulkMode, setIsBulkMode] = useState(false);

  // APIs
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

  const questionPayload = fetchedData?.payload;
  const question: IQuestion | undefined =
    questionPayload && 'question' in questionPayload
      ? (questionPayload as { question: IQuestion }).question
      : (questionPayload as IQuestion | undefined);

  // Single Question React Hook Form
  const singleForm = useForm<IQuestionFormValues>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      examId: defaultExamId,
      text: '',
      answers: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ] as ICreateAnswerPayload[],
    },
  });

  // Bulk Questions React Hook Form
  const bulkForm = useForm<IBulkQuestionFormValues>({
    resolver: zodResolver(bulkQuestionSchema),
    defaultValues: {
      examId: defaultExamId,
      questions: [
        {
          text: '',
          answers: [
            { text: '', isCorrect: true },
            { text: '', isCorrect: false },
          ],
        },
      ],
    },
  });

  useBreadcrumb({
    items: [
      { title: 'Questions', href: ROUTES.EXAMS },
      { title: isEdit ? 'Edit Question' : 'Create New Question' },
    ],
  });

  const isSubmitting = isCreatingSingle || isUpdatingSingle || isCreatingBulk;
  const apiError = createError || updateError || bulkError;

  // Single Question Form Submit Handler
  const handleSingleSubmit = singleForm.handleSubmit((values) => {
    const payload = {
      examId: values.examId,
      text: values.text,
      answers: values.answers.map((a: IAnswerFormValues) => ({
        text: a.text,
        isCorrect: a.isCorrect,
      })),
    };

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
    createBulkQuestions(
      {
        examId: values.examId,
        questions: values.questions.map((q) => ({
          text: q.text,
          answers: q.answers.map((a: IAnswerFormValues) => ({
            text: a.text,
            isCorrect: a.isCorrect,
          })),
        })),
      },
      {
        onSuccess: () => {
          if (values.examId) {
            navigate(`/exams/${values.examId}`);
          } else {
            navigate(ROUTES.EXAMS);
          }
        },
      }
    );
  });

  // Sync existing question for Edit mode
  useEffect(() => {
    if (question) {
      singleForm.reset({
        examId: question.examId || '',
        text: question.text || '',
        answers:
          question.answers?.map((a: IAnswer) => ({
            id: a.id,
            text: a.text,
            isCorrect: a.isCorrect,
          })) || [],
      });
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
        handleBulkClick={() => setIsBulkMode((prev) => !prev)}
        handleSubmit={handleSingleSubmit}
        isBulkMode={isBulkMode}
        isEdit={isEdit}
        isSubmitting={isSubmitting}
      />

      <ErrorAlert error={apiError} />

      {/* Bulk mode Form */}
      {isBulkMode && !isEdit && (
        <FormProvider {...bulkForm}>
          <form onSubmit={handleBulkSubmit} className="space-y-6">
            <AdminBulkQuestionForm />
          </form>
        </FormProvider>
      )}

      {/* Single Question Form */}
      {!isBulkMode && (
        <FormProvider {...singleForm}>
          <form onSubmit={handleSingleSubmit} className="space-y-6">
            {/* Card 1: Question Information */}
            <AdminQuestionInfoCard />
            {/* Card 2: Question Answers */}
            <QuestionAnswersField />
          </form>
        </FormProvider>
      )}
    </div>
  );
}
