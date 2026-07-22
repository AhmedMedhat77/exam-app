import { useSearchParams } from 'react-router';
import { useGetAllExams } from '../hooks/use-get-all-exams';

export default function ExamsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('diplomaId') || '';

  const { data } = useGetAllExams({
    diplomaId: id,
  });

  return <div>exams.page</div>;
}
