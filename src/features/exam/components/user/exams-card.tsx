import { ROUTES } from '@/app/routes';
import type { IExam } from '@/features/exam/types/exams.types';
import { Button } from '@/shared/ui/button';
import { Clock, HelpCircle, MoveRight } from 'lucide-react';
import { Link } from 'react-router';

export default function UserExamsCard(props: Partial<IExam>) {
  return (
    <div className="group/card relative flex h-34 w-full flex-col items-start gap-4 overflow-hidden bg-blue-50 px-4 py-4.5 transition-all hover:shadow-sm sm:flex-row">
      {/* Thumbnail Box */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-blue-300 bg-blue-100 p-2 md:h-24 md:w-24">
        {props.image ? (
          <img
            src={props.image}
            alt={props.title || 'Exam'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center bg-yellow-400 text-xl font-bold text-black">
            {props.title?.substring(0, 2).toUpperCase() || 'EX'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Header: Title & Info */}
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <h3 className="line-clamp-1 text-base font-bold text-blue-600 md:text-lg dark:text-blue-400">
            {props.title}
          </h3>

          <div className="flex shrink-0 items-center gap-2 text-xs text-gray-800 md:gap-3 md:text-sm">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-gray-600" />
              <span>{props.questionsCount ?? 0} Questions</span>
            </div>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-600" />
              <span>{props.duration ?? 0} minutes</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-4 text-xs leading-relaxed text-gray-600 md:text-sm">
          {props.description}
        </p>
      </div>

      <Link to={ROUTES.EXAM_DETAIL.replace(':id', props.id || '')}>
        <Button className="absolute right-3 -bottom-12 w-fit opacity-0 transition-all duration-300 group-hover/card:bottom-3 group-hover/card:opacity-100">
          START
          <MoveRight />
        </Button>
      </Link>
    </div>
  );
}
