import { ROUTES } from '@/app/routes';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import ResultActions from '@/features/exam/components/user/result-actions';
import ResultHeaderProgress from '@/features/exam/components/user/result-header-progress';
import ResultQuestionsList from '@/features/exam/components/user/result-questions-list';
import ResultSummaryCard from '@/features/exam/components/user/result-summary-card';
import useGetSubmissionById from '@/features/exam/hooks/use-get-submission-by-id';
import ExamResultSkeleton from '@/features/exam/skeletons/user/exam-result-skeleton';
import type { IQuestion } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import {
  AlertCircle,
  CircleQuestionMark,
  FileSearch,
  RotateCcw,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function UserExamResultPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, refetch } = useGetSubmissionById(id);
  const payload = data?.payload;

  if (isLoading) {
    return <ExamResultSkeleton />;
  }

  if (isError || !payload) {
    return (
      <div className="w-full space-y-4 py-8 text-center">
        <DiplomaHeader
          icon={<CircleQuestionMark size={45} className="text-white" />}
          title="Submission Results"
        />
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="size-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Failed to load submission results
        </h3>
        <p className="mx-auto max-w-md text-sm text-gray-500">
          {error?.message ||
            'Submission details could not be found or fetched.'}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="cursor-pointer gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Retry
          </Button>
          <Button
            variant="default"
            onClick={() => navigate(ROUTES.EXAMS)}
            className="cursor-pointer gap-2"
          >
            <FileSearch className="h-4 w-4" /> Explore Exams
          </Button>
        </div>
      </div>
    );
  }

  const { submission, analytics = [] } = payload;
  const examTitle = submission.examTitle || submission.exam?.title || 'Exam';
  const totalQuestions =
    submission.totalQuestions ||
    submission.correctAnswers + submission.wrongAnswers ||
    analytics.length;

  const displayQuestions: IQuestion[] = analytics.map((a) => ({
    id: a.questionId,
    text: a.questionText,
    examId: submission.examId,
    immutable: true,
    createdAt: '',
    updatedAt: '',
    answers: [
      ...(typeof a.selectedAnswer === 'object' &&
      a.selectedAnswer &&
      a.selectedAnswer.text
        ? [
            {
              id:
                (a.selectedAnswer.id as string) ||
                (a.selectedAnswer.key as string) ||
                'selected',
              text: a.selectedAnswer.text,
              isCorrect: a.isCorrect,
            },
          ]
        : []),
      ...(typeof a.correctAnswer === 'object' &&
      a.correctAnswer &&
      a.correctAnswer.text &&
      !a.isCorrect
        ? [
            {
              id:
                (a.correctAnswer.id as string) ||
                (a.correctAnswer.key as string) ||
                'correct',
              text: a.correctAnswer.text,
              isCorrect: true,
            },
          ]
        : []),
    ],
    exam: { id: submission.examId, title: submission.examTitle },
  }));

  return (
    <div className="w-full space-y-6 py-4">
      {/* Header & Progress */}
      <ResultHeaderProgress title={examTitle} totalQuestions={totalQuestions} />

      {/* Title */}
      <h3 className="font-mono text-lg font-bold text-blue-600">Results:</h3>

      {/* Main Results Container */}
      <div className="flex flex-col gap-6 rounded-lg border border-blue-100 bg-white p-6 shadow-xs md:flex-row">
        {/* Donut Chart & Legend Card */}
        <ResultSummaryCard
          correctAnswers={submission.correctAnswers || 0}
          wrongAnswers={submission.wrongAnswers || 0}
        />

        {/* Questions & Answers List */}
        <ResultQuestionsList
          questions={displayQuestions}
          analytics={analytics}
        />
      </div>

      {/* Action Buttons */}
      <ResultActions />
    </div>
  );
}
