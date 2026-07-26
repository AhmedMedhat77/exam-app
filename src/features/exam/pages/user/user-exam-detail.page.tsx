import { ROUTES } from '@/app/routes';
import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import DonutBar from '@/features/exam/components/user/donut-bar';
import ProgressBar from '@/features/exam/components/user/progressbar';
import QuestionStepCounter from '@/features/exam/components/user/question-step-counter';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import useGetExamSubmissions from '@/features/submission/hooks/use-get-exam-submissions';
import useSubmitExam from '@/features/submission/hooks/use-submit-exam';
import QuestionsList from '@/features/question/components/user/questions-list';
import useGetExamQuestions from '@/features/question/hooks/use-get-exam-questions';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, CircleQuestionMark, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function UserExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const storageKey = `exam_session_${id}`;

  const [startedAt, setStartedAt] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const hasSubmittedRef = useRef<boolean>(false);

  const { data, isLoading, isError, error } = useGetExamById(id);
  const examData = data?.payload;

  // API fetching questions
  const { data: questionsData } = useGetExamQuestions({
    examId: examData?.exam.id,
  });

  // API fetching submissions if exam is submitted
  const { data: submissionsData } = useGetExamSubmissions({
    examId: id,
  });

  const submitExamMutation = useSubmitExam();
  const questions = questionsData?.payload?.questions ?? [];
  const latestSubmission = submissionsData?.payload?.data?.[0];

  // 1. Initialize or restore session from localStorage
  useEffect(() => {
    if (!id) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isSubmitted) {
          setIsSubmitted(true);
          hasSubmittedRef.current = true;
        }
        if (parsed.startedAt) setStartedAt(parsed.startedAt);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      } catch {
        const newStart = new Date().toISOString();
        setStartedAt(newStart);
      }
    } else {
      const newStart = new Date().toISOString();
      setStartedAt(newStart);
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          examId: id,
          startedAt: newStart,
          answers: {},
          currentStep: 1,
          isSubmitted: false,
        })
      );
    }
    setIsInitialized(true);
  }, [id, storageKey]);

  // 2. Persist progress to localStorage whenever answers or step changes
  useEffect(() => {
    if (!id || !startedAt || !isInitialized || isSubmitted) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        examId: id,
        startedAt,
        answers,
        currentStep,
        isSubmitted,
      })
    );
  }, [
    id,
    startedAt,
    answers,
    currentStep,
    isSubmitted,
    isInitialized,
    storageKey,
  ]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmitExam = useCallback(
    (selectedAnswers?: Record<string, string>) => {
      const targetAnswers = selectedAnswers ?? answers;
      if (!examData?.exam.id || hasSubmittedRef.current) return;
      hasSubmittedRef.current = true;

      const answersPayload = Object.entries(targetAnswers).map(
        ([questionId, answerId]) => ({
          questionId,
          answerId,
        })
      );

      submitExamMutation.mutate(
        {
          examId: examData.exam.id,
          answers: answersPayload,
          startedAt: startedAt || new Date().toISOString(),
        },
        {
          onSuccess: (res) => {
            localStorage.removeItem(storageKey);
            setIsSubmitted(true);
            const resPayload = res?.payload as
              { id?: string; submission?: { id?: string } } | undefined;
            const subId =
              resPayload?.id ||
              resPayload?.submission?.id ||
              latestSubmission?.id;
            if (subId) {
              navigate(`/submissions/${subId}`);
            }
          },
          onError: () => {
            hasSubmittedRef.current = false;
            setIsSubmitted(false);
          },
        }
      );
    },
    [
      answers,
      examData?.exam.id,
      latestSubmission?.id,
      navigate,
      startedAt,
      storageKey,
      submitExamMutation,
    ]
  );

  // Redirect to submission result page if exam session was already submitted
  useEffect(() => {
    if (isInitialized && isSubmitted && latestSubmission?.id) {
      navigate(`/submissions/${latestSubmission.id}`, { replace: true });
    }
  }, [isInitialized, isSubmitted, latestSubmission?.id, navigate]);

  const handleExitExam = () => {
    localStorage.removeItem(storageKey);
    navigate(ROUTES.EXAMS);
  };

  // 3. Time calculations
  const totalDurationSeconds = (examData?.exam.duration || 0) * 60;
  const elapsedSeconds = startedAt
    ? Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)
    : 0;
  const remainingSeconds = Math.max(0, totalDurationSeconds - elapsedSeconds);

  // 4. Auto submit if remaining time is 0 upon load or expiration
  useEffect(() => {
    if (
      isInitialized &&
      !isSubmitted &&
      examData &&
      totalDurationSeconds > 0 &&
      remainingSeconds <= 0 &&
      !hasSubmittedRef.current
    ) {
      handleSubmitExam(answers);
    }
  }, [
    isInitialized,
    isSubmitted,
    examData,
    totalDurationSeconds,
    remainingSeconds,
    answers,
    handleSubmitExam,
  ]);

  const totalSteps = examData?.exam.questionsCount || 0;

  if (isLoading || !isInitialized) {
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
      <Button
        variant="outline"
        onClick={handleExitExam}
        className="flex cursor-pointer items-center gap-2 text-xs"
      >
        <ArrowLeft className="h-4 w-4" /> Exit exam
      </Button>
      <UserDashboardHeader
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
          <DonutBar
            time={totalDurationSeconds}
            remainingTime={remainingSeconds}
            onTimeUp={() => handleSubmitExam(answers)}
          />
        </div>
      </div>

      {/* Questions List */}
      <QuestionsList
        questions={questions}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        answers={answers}
        onAnswerSelect={handleAnswerSelect}
        onSubmit={handleSubmitExam}
        isSubmitting={submitExamMutation.isPending}
      />
    </div>
  );
}
