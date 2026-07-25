import ResultActions from '@/features/exam/components/user/result-actions';
import ResultHeaderProgress from '@/features/exam/components/user/result-header-progress';
import ResultQuestionsList from '@/features/exam/components/user/result-questions-list';
import ResultSummaryCard from '@/features/exam/components/user/result-summary-card';
import type {
  ISubmission,
  ISubmissionAnalytic,
} from '@/features/exam/types/submissions';
import type { IQuestion } from '@/features/question/types/questions';

interface ExamResultProps {
  submission: ISubmission;
  questions?: IQuestion[];
  userAnswers?: Record<string, string>;
  analytics?: ISubmissionAnalytic[];
  onRestart?: () => void;
}

export default function ExamResult({
  submission,
  questions: propQuestions,
  userAnswers = {},
  analytics = [],
  onRestart,
}: ExamResultProps) {
  const totalQuestions =
    submission.totalQuestions ||
    submission.correctAnswers + submission.wrongAnswers ||
    propQuestions?.length ||
    analytics.length;

  const displayQuestions: IQuestion[] =
    propQuestions && propQuestions.length > 0
      ? propQuestions
      : analytics.map((a) => ({
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

  const examTitle = submission.examTitle || submission.exam?.title || 'Exam';

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
          userAnswers={userAnswers}
        />
      </div>

      {/* Action Buttons */}
      <ResultActions onRestart={onRestart} />
    </div>
  );
}
