import { ROUTES } from '@/app/routes';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import ResultDonutChart from '@/features/exam/components/user/result-donnut-chart';
import type {
  ISubmission,
  ISubmissionAnalytic,
} from '@/features/exam/types/submissions';
import { isMatchingAnswer } from '@/features/exam/utils/is-matching-answer';
import type { IQuestion } from '@/features/question/types/questions';
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
                        dotClass =
                          'border-emerald-500 bg-emerald-500 text-white';
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
                          {showCheck && <Check className="size-3 stroke-3" />}
                          {showX && <X className="size-3 stroke-3" />}
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
