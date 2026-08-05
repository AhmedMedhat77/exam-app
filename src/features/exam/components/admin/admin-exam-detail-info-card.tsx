import type { IExam } from '@/features/exam/types/exams.d';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface AdminExamDetailInfoCardProps {
  exam: IExam;
}

export default function AdminExamDetailInfoCard({
  exam,
}: AdminExamDetailInfoCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-6 rounded-md border border-gray-200 bg-white p-6 shadow-2xs sm:p-8">
      <div className="space-y-2">
        <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
          Image
        </p>
        <div className="w-full max-w-sm overflow-hidden rounded-md border border-gray-200 bg-gray-50">
          {!imageError && exam.image ? (
            <img
              src={exam.image}
              alt={exam.title}
              className="size-75 w-full object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center bg-gray-100 font-mono text-xs text-gray-400">
              No image available
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
          Title
        </p>
        <p className="font-mono text-sm font-semibold text-gray-900 sm:text-base">
          {exam.title}
        </p>
      </div>

      <div className="space-y-1">
        <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
          Description
        </p>
        <p className="font-mono text-xs leading-relaxed text-gray-700 sm:text-sm">
          {exam.description || 'No description provided.'}
        </p>
      </div>

      <div className="space-y-1">
        <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
          Diploma
        </p>
        <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-gray-800 sm:text-sm">
          <span>{exam.diploma?.title || 'Full Stack Development'}</span>
          <ExternalLink className="size-3.5 cursor-pointer text-gray-400 hover:text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-2">
        <div className="space-y-1">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            Duration
          </p>
          <p className="font-mono text-xs font-semibold text-gray-800 sm:text-sm">
            {exam.duration} Minutes
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-mono text-xs font-medium tracking-wide text-gray-400">
            No. of Questions
          </p>
          <p className="font-mono text-xs font-semibold text-gray-800 sm:text-sm">
            {exam.questionsCount || 10}
          </p>
        </div>
      </div>
    </div>
  );
}
