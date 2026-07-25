import AnswerCard from '@/features/submission/components/answer-card';
import type { ISubmissionAnalytic } from '@/features/submission/types/submission';
import type { IQuestion } from '@/features/question/types/questions';

interface ResultQuestionsListProps {
  questions: IQuestion[];
  analytics?: ISubmissionAnalytic[];
  userAnswers?: Record<string, string>;
}

export default function ResultQuestionsList({
  questions,
  analytics = [],
  userAnswers = {},
}: ResultQuestionsListProps) {
  return (
    <div className="max-h-125 flex-1 space-y-6 overflow-y-auto pr-2">
      {questions.map((question, index) => {
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
  );
}
