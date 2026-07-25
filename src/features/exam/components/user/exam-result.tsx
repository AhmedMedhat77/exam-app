import { ROUTES } from '@/app/routes';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import AnswerCard from '@/features/exam/components/user/answer-card';
import ResultDonutChart from '@/features/exam/components/user/result-donnut-chart';
import type {
  ISubmission,
  ISubmissionAnalytic,
} from '@/features/exam/types/submissions';
import type { IQuestion } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import { CircleQuestionMark, Compass, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

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

  return (
    <div className="w-full space-y-6 py-4">
      {/* Header */}
      <DiplomaHeader
        icon={<CircleQuestionMark size={45} className="text-white" />}
        title={`${submission.examTitle || submission.exam?.title || 'Exam'} Questions`}
      />

      {/* Progress & Subheader */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-mono text-gray-500">
            {submission.examTitle || submission.exam?.title}
          </span>
          <span className="font-mono font-bold text-gray-800">
            Question {totalQuestions} of {totalQuestions}
          </span>
        </div>
        {/* 100% Completed Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-blue-600" />
      </div>

      {/* Title */}
      <h3 className="font-mono text-lg font-bold text-blue-600">Results:</h3>

      {/* Main Results Container */}
      <div className="flex flex-col gap-6 rounded-lg border border-blue-100 bg-white p-6 shadow-xs md:flex-row">
        {/* Left Column: Donut Chart & Legend */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-blue-100/60 bg-blue-50/40 p-6 md:w-80">
          <ResultDonutChart
            correct={submission.correctAnswers || 0}
            incorrect={submission.wrongAnswers || 0}
          />

          <div className="w-full space-y-2 font-mono text-sm">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <span className="size-3.5 rounded-xs bg-emerald-500" />
              <span>Correct: {submission.correctAnswers}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <span className="size-3.5 rounded-xs bg-red-500" />
              <span>Incorrect: {submission.wrongAnswers}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Questions & Answers List */}
        <div className="max-h-125 flex-1 space-y-6 overflow-y-auto pr-2">
          {displayQuestions.map((question, index) => {
            const analytic = analytics.find(
              (a) =>
                a.questionId === question.id || a.questionText === question.text
            );

            return (
              <div key={question.id || index} className="space-y-3">
                <h4 className="text-base font-semibold text-blue-600">
                  {index + 1}. {question.text}
                </h4>

                <div className="space-y-2">
                  {question.answers.map((answer) => (
                    <AnswerCard
                      key={answer.id}
                      answer={answer}
                      analytic={analytic}
                      userAnswerId={userAnswers[question.id]}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {onRestart && (
          <Button
            variant="secondary"
            size="xl"
            className="flex-1 cursor-pointer gap-2"
            onClick={onRestart}
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </Button>
        )}
        <Button
          variant="default"
          size="xl"
          className="flex-1 cursor-pointer gap-2"
          onClick={() => navigate(ROUTES.EXAMS)}
        >
          <Compass className="h-4 w-4" />
          Explore
        </Button>
      </div>
    </div>
  );
}
