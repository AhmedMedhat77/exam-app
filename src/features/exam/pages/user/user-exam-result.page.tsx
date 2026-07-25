import { ROUTES } from '@/app/routes';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import ExamResult from '@/features/exam/components/user/exam-result';
import useGetSubmissionById from '@/features/exam/hooks/use-get-submission-by-id';
import ExamResultSkeleton from '@/features/exam/skeletons/user/exam-result-skeleton';
import { Button } from '@/shared/ui/button';
import {
  AlertCircle,
  CircleQuestionMark,
  FileSearch,
  RotateCcw,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function UserExamResultPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, refetch } = useGetSubmissionById(id);
  const payload = data?.payload;

  if (isLoading) {
    return <ExamResultSkeleton />;
  }

  if (isError || !payload) {
    return (
      <div className="w-full space-y-4 py-8 text-center">
        <DiplomaHeader
          icon={<CircleQuestionMark size={45} className="text-white" />}
          title="Submission Results"
        />
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="size-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Failed to load submission results
        </h3>
        <p className="mx-auto max-w-md text-sm text-gray-500">
          {error?.message ||
            'Submission details could not be found or fetched.'}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="cursor-pointer gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Retry
          </Button>
          <Button
            variant="default"
            onClick={() => navigate(ROUTES.EXAMS)}
            className="cursor-pointer gap-2"
          >
            <FileSearch className="h-4 w-4" /> Explore Exams
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ExamResult submission={payload.submission} analytics={payload.analytics} />
  );
}
