import ResultDonutChart from '@/features/exam/components/user/result-donnut-chart';

interface ResultSummaryCardProps {
  correctAnswers: number;
  wrongAnswers: number;
}

export default function ResultSummaryCard({
  correctAnswers,
  wrongAnswers,
}: ResultSummaryCardProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-blue-100/60 bg-blue-50/40 p-6 md:w-80">
      <ResultDonutChart correct={correctAnswers} incorrect={wrongAnswers} />

      <div className="w-full space-y-2 font-mono text-sm">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <span className="size-3.5 rounded-xs bg-emerald-500" />
          <span>Correct: {correctAnswers}</span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <span className="size-3.5 rounded-xs bg-red-500" />
          <span>Incorrect: {wrongAnswers}</span>
        </div>
      </div>
    </div>
  );
}
