import { ROUTES } from '@/app/routes';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import DonutBar from '@/features/exam/components/user/donut-bar';
import ProgressBar from '@/features/exam/components/user/progressbar';
import QuestionStepCounter from '@/features/exam/components/user/question-step-counter';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import useSubmitExam from '@/features/exam/hooks/use-submit-exam';
import QuestionsList from '@/features/question/components/user/questions-list';
import useGetExamQuestions from '@/features/question/hooks/use-get-exam-questions';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, CircleQuestionMark, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function UserExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [startedAt] = useState(() => new Date().toISOString());
  const { data, isLoading, isError, error } = useGetExamById(id);

  const examData = data?.payload;

  // API fetching questions
  const { data: questionsData } = useGetExamQuestions({
    examId: examData?.exam.id,
  });

  const submitExamMutation = useSubmitExam();

  const questions = questionsData?.payload?.questions ?? [];

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = examData?.exam.questionsCount || 0;

  const handleSubmitExam = (selectedAnswers: Record<string, string>) => {
    if (!examData?.exam.id) return;

    const answersPayload = Object.entries(selectedAnswers).map(
      ([questionId, answerId]) => ({
        questionId,
        answerId,
      })
    );

    submitExamMutation.mutate(
      {
        examId: examData.exam.id,
        answers: answersPayload,
        startedAt,
      },
      {
        onSuccess: () => {
          navigate(ROUTES.EXAMS);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-sm text-slate-500">Loading exam details...</p>
      </div>
    );
  }

  if (isError || !examData) {
    return (
      <div className="w-full space-y-4 py-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="rounded border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          {error?.message || 'Exam not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 py-4">
      <DiplomaHeader
        icon={<CircleQuestionMark size={45} className="text-white" />}
        title={examData.exam.title || ''}
      />
      <div className="flex items-center gap-4">
        {/* Header + Progressbar */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gray-800">{examData.exam.title}</h4>
            <QuestionStepCounter
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="size-16 shrink-0">
          <DonutBar time={examData.exam.duration * 60 || 0} />
        </div>
      </div>

      {/* Questions List */}
      <QuestionsList
        questions={questions}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onSubmit={handleSubmitExam}
        isSubmitting={submitExamMutation.isPending}
      />
    </div>
  );
}
