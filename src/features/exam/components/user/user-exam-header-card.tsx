import DonutBar from '@/features/exam/components/user/donut-bar';
import ProgressBar from '@/features/exam/components/user/progressbar';
import QuestionStepCounter from '@/features/exam/components/user/question-step-counter';
import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import { CircleQuestionMark } from 'lucide-react';
import React from 'react';

interface UserExamHeaderCardProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  totalDurationSeconds: number;
  remainingSeconds: number;
  onTimeUp: () => void;
}

function UserExamHeaderCardComponent({
  title,
  currentStep,
  totalSteps,
  totalDurationSeconds,
  remainingSeconds,
  onTimeUp,
}: UserExamHeaderCardProps) {
  return (
    <div className="space-y-6">
      <UserDashboardHeader
        icon={<CircleQuestionMark size={45} className="text-white" />}
        title={title}
      />
      <div className="flex items-center gap-4">
        {/* Header + Progressbar */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-base font-medium text-gray-800">
              {title}
            </h4>
            <QuestionStepCounter
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="size-16 shrink-0">
          {/* This is The counter  */}
          <DonutBar
            time={totalDurationSeconds}
            remainingTime={remainingSeconds}
            onTimeUp={onTimeUp}
          />
        </div>
      </div>
    </div>
  );
}

export const UserExamHeaderCard = React.memo(UserExamHeaderCardComponent);
