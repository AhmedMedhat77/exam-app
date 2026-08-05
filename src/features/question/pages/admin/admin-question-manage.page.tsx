import { ROUTES } from '@/app/routes';
import AdminBulkQuestionForm from '@/features/question/components/admin/admin-bulk-question-form';
import AdminQuestionAnswersManager from '@/features/question/components/admin/admin-question-answers-manager';
import AdminQuestionInfoCard from '@/features/question/components/admin/admin-question-info-card';
import { useCreateBulkQuestions } from '@/features/question/hooks/use-create-bulk-questions';
import { useCreateQuestion } from '@/features/question/hooks/use-create-question';
import { useGetQuestionById } from '@/features/question/hooks/use-get-question-by-id';
import { useUpdateQuestion } from '@/features/question/hooks/use-update-question';
import {
  bulkQuestionSchema,
  questionSchema,
  type AnswerFormValues,
  type BulkQuestionFormValues,
  type QuestionFormValues,
} from '@/features/question/schemas/question.schema';
import type {
  IAnswer,
  ICreateAnswerPayload,
  IQuestion,
} from '@/features/question/types/questions';
import CustomError from '@/shared/components/custom-error';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';
import { Button } from '@/shared/ui/button';
import { Switch } from '@/shared/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function AdminQuestionManagePage() {
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
  const singleForm = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
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
  const bulkForm = useForm<BulkQuestionFormValues>({
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
      answers: values.answers.map((a: AnswerFormValues) => ({
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
          answers: q.answers.map((a: AnswerFormValues) => ({
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
        <BreadCrumb
          items={[
            { title: 'Questions', href: ROUTES.EXAMS },
            { title: isEdit ? 'Edit Question' : 'Create New Question' },
          ]}
        />
      </div>

      {/* Top Actions & Toggle Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Bulk Add Mode Switch */}
        <div className="flex items-center gap-3">
          {!isEdit && (
            <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 shadow-2xs">
              <Switch
                checked={isBulkMode}
                onCheckedChange={setIsBulkMode}
                id="bulk-mode-toggle"
              />
              <label
                htmlFor="bulk-mode-toggle"
                className="cursor-pointer font-mono text-xs font-semibold text-gray-800 select-none"
              >
                Bulk Add Mode
              </label>
            </div>
          )}
        </div>

        {/* Right: Cancel and Save Action Buttons */}
        <div className="flex items-center gap-3">
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

          <Button
            variant="success"
            size="sm"
            type="button"
            disabled={isSubmitting}
            onClick={(e) => {
              if (isBulkMode && !isEdit) {
                handleBulkSubmit(e);
              } else {
                handleSingleSubmit(e);
              }
            }}
            className="h-9 w-auto gap-1.5 px-4 font-mono text-xs font-medium"
          >
            <Save className="size-3.5" />
            <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
          </Button>
        </div>
      </div>

      <CustomError error={apiError} />

      {/* Conditional Form Rendering */}
      {isBulkMode && !isEdit ? (
        <FormProvider {...bulkForm}>
          <form onSubmit={handleBulkSubmit} className="space-y-6">
            <AdminBulkQuestionForm />
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...singleForm}>
          <form onSubmit={handleSingleSubmit} className="space-y-6">
            {/* Card 1: Question Information */}
            <AdminQuestionInfoCard />

            {/* Card 2: Question Answers */}
            <AdminQuestionAnswersManager />
          </form>
        </FormProvider>
      )}
    </div>
  );
}
