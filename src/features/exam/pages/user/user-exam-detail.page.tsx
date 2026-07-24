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
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function UserExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const storageKey = `exam_session_${id}`;

  const [startedAt, setStartedAt] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const hasSubmittedRef = useRef<boolean>(false);

  const { data, isLoading, isError, error } = useGetExamById(id);
  const examData = data?.payload;

  // API fetching questions
  const { data: questionsData } = useGetExamQuestions({
    examId: examData?.exam.id,
  });

  const submitExamMutation = useSubmitExam();
  const questions = questionsData?.payload?.questions ?? [];

  // 1. Initialize or restore session from localStorage
  useEffect(() => {
    if (!id) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isSubmitted) {
          // Exam already completed -> prevent re-entry
          navigate(ROUTES.EXAMS, { replace: true });
          return;
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
  }, [id, navigate, storageKey]);

  // 2. Persist progress to localStorage whenever answers or step changes
  useEffect(() => {
    if (!id || !startedAt || !isInitialized) return;

    const saved = localStorage.getItem(storageKey);
    let isSubmitted = false;
    if (saved) {
      try {
        isSubmitted = JSON.parse(saved).isSubmitted || false;
      } catch {
        // ignore
      }
    }

    if (!isSubmitted) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          examId: id,
          startedAt,
          answers,
          currentStep,
          isSubmitted: false,
        })
      );
    }
  }, [id, startedAt, answers, currentStep, isInitialized, storageKey]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmitExam = useCallback(
    (selectedAnswers?: Record<string, string>) => {
      const targetAnswers = selectedAnswers ?? answers;
      if (!examData?.exam.id || hasSubmittedRef.current) return;
      hasSubmittedRef.current = true;

      // Mark exam as submitted in localStorage to block future access on refresh
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          examId: examData.exam.id,
          startedAt,
          answers: targetAnswers,
          currentStep,
          isSubmitted: true,
        })
      );

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
          onSuccess: () => {
            navigate(ROUTES.EXAMS, { replace: true });
          },
          onError: () => {
            hasSubmittedRef.current = false;
          },
        }
      );
    },
    [
      answers,
      examData?.exam.id,
      startedAt,
      currentStep,
      storageKey,
      submitExamMutation,
      navigate,
    ]
  );

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
      examData &&
      totalDurationSeconds > 0 &&
      remainingSeconds <= 0 &&
      !hasSubmittedRef.current
    ) {
      handleSubmitExam(answers);
    }
  }, [
    isInitialized,
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
