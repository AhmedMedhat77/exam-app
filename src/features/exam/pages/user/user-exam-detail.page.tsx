import DiplomaHeader from '@/features/diploma/components/shared/header';
import { useGetExamById } from '@/features/exam/hooks/use-get-exam-by-id';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, CircleQuestionMark, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function UserExamDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetExamById(id);

  const exam = data && 'payload' in data ? data.payload : null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm  text-slate-500">Loading exam details...</p>
      </div>
    );
  }

  if (isError || !exam) {
    return (
      <div className="w-full space-y-4 py-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2  text-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="p-6 rounded border border-red-200 bg-red-50 text-red-600 text-center  text-sm">
          {error?.message || 'Exam not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 py-4">
      <DiplomaHeader
        icon={<CircleQuestionMark size={45} className="text-white" />}
        title={exam.exam.title || ''}
      />
    </div>
  );
}
