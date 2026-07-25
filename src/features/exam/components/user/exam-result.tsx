import { ROUTES } from '@/app/routes';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import type {
  ISubmission,
  ISubmissionAnalytic,
  ISubmissionAnalyticAnswer,
} from '@/features/exam/types/submissions';
import type { IAnswer, IQuestion } from '@/features/question/types/questions';
import { Button } from '@/shared/ui/button';
import { Check, CircleQuestionMark, Compass, RotateCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ExamResultProps {
  submission: ISubmission;
  questions: IQuestion[];
  userAnswers?: Record<string, string>;
  analytics?: ISubmissionAnalytic[];
  onRestart: () => void;
}

function isMatchingAnswer(
  answer: IAnswer,
  target?: ISubmissionAnalyticAnswer | Record<string, unknown> | string
): boolean {
  if (!target) return false;
  if (typeof target === 'string') {
    return target === answer.id || target === answer.text;
  }
  if (typeof target === 'object' && target !== null) {
    const t = target as Record<string, unknown>;
    if (t.id && (t.id === answer.id || t.id === answer.text)) return true;
    if (t._id && (t._id === answer.id || t._id === answer.text)) return true;
    if (t.key && (t.key === answer.id || t.key === answer.text)) return true;
    if (t.text && t.text === answer.text) return true;
  }
  return false;
}

function ResultDonutChart({
  correct,
  incorrect,
}: {
  correct: number;
  incorrect: number;
}) {
  const total = Math.max(1, correct + incorrect);
  const correctRatio = correct / total;
  const incorrectRatio = incorrect / total;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const correctStroke = circumference * correctRatio;
  const incorrectStroke = circumference * incorrectRatio;

  return (
    <div className="relative flex size-48 items-center justify-center">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90 transform">
        {/* Background base track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="18"
        />
        {/* Correct Segment (Emerald/Green) */}
        {correct > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="18"
            strokeDasharray={`${correctStroke} ${circumference - correctStroke}`}
            strokeDashoffset={0}
          />
        )}
        {/* Incorrect Segment (Red) */}
        {incorrect > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth="18"
            strokeDasharray={`${incorrectStroke} ${circumference - incorrectStroke}`}
            strokeDashoffset={-correctStroke}
          />
        )}
      </svg>
    </div>
  );
}

export default function ExamResult({
  submission,
  questions,
  userAnswers = {},
  analytics = [],
  onRestart,
}: ExamResultProps) {
  const navigate = useNavigate();
  const totalQuestions =
    submission.totalQuestions ||
    submission.correctAnswers + submission.wrongAnswers ||
    questions.length;

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
            correct={submission.correctAnswers}
            incorrect={submission.wrongAnswers}
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
        <div className="max-h-[500px] flex-1 space-y-6 overflow-y-auto pr-2">
          {questions.map((question, index) => {
            const selectedAnswerId = userAnswers[question.id];
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
                  {question.answers.map((answer) => {
                    const isSelected =
                      selectedAnswerId === answer.id ||
                      isMatchingAnswer(answer, analytic?.selectedAnswer);
                    const isCorrect =
                      Boolean(answer.isCorrect) ||
                      isMatchingAnswer(answer, analytic?.correctAnswer);

                    let bgClass = 'bg-gray-50 border-gray-200 text-gray-800';
                    let dotClass = 'border-gray-300';
                    let showCheck = false;
                    let showX = false;

                    if (isCorrect) {
                      bgClass =
                        'bg-emerald-50/70 border-emerald-300 text-gray-800';
                      if (isSelected) {
                        dotClass = 'border-emerald-500 bg-emerald-500 text-white';
                        showCheck = true;
                      } else {
                        dotClass = 'border-emerald-500 bg-emerald-100';
                      }
                    } else if (isSelected) {
                      bgClass = 'bg-red-50/70 border-red-200 text-gray-800';
                      dotClass = 'border-red-500 bg-red-500 text-white';
                      showX = true;
                    }

                    return (
                      <div
                        key={answer.id}
                        className={`flex min-h-12.5 items-center gap-3 border px-4 py-3 font-mono transition-colors select-none ${bgClass}`}
                      >
                        <div
                          className={`flex size-4 items-center justify-center rounded-full border ${dotClass}`}
                        >
                          {showCheck && <Check className="size-3 stroke-[3]" />}
                          {showX && <X className="size-3 stroke-[3]" />}
                        </div>
                        <span className="text-sm">{answer.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="xl"
          className="flex-1 cursor-pointer gap-2"
          onClick={onRestart}
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>
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
