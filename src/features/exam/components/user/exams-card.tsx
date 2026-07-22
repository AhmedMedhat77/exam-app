import type { IExam } from '@/features/exam/types/exams.types';
import { Clock, HelpCircle } from 'lucide-react';

export default function UserExamsCard(props: Partial<IExam>) {
  return (
    <div className="w-full bg-blue-50 px-4 py-4.5 flex flex-col sm:flex-row items-start  gap-4 transition-all hover:shadow-sm">
      {/* Thumbnail Box */}
      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 border border-blue-300 bg-blue-100 p-2 flex items-center justify-center overflow-hidden">
        {props.image ? (
          <img
            src={props.image}
            alt={props.title || 'Exam'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-yellow-400 font-bold text-black flex items-center justify-center text-xl">
            {props.title?.substring(0, 2).toUpperCase() || 'EX'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Header: Title & Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400 line-clamp-1">
            {props.title}
          </h3>

          <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-700 shrink-0">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-gray-600" />
              <span>{props.questionsCount ?? 0} Questions</span>
            </div>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-600" />
              <span>{props.duration ?? 0} minutes</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
          {props.description}
        </p>
      </div>
    </div>
  );
}
