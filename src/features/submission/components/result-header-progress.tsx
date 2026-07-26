import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import { CircleQuestionMark } from 'lucide-react';

interface ResultHeaderProgressProps {
  title: string;
  totalQuestions: number;
}

export default function ResultHeaderProgress({
  title,
  totalQuestions,
}: ResultHeaderProgressProps) {
  return (
    <>
      <UserDashboardHeader
        icon={<CircleQuestionMark size={45} className="text-white" />}
        title={`${title || 'Exam'} Questions`}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-mono text-gray-500">{title}</span>
          <span className="font-mono font-bold text-gray-800">
            Question {totalQuestions} of {totalQuestions}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-blue-600" />
      </div>
    </>
  );
}
