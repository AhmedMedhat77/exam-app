export default function ResultDonutChart({
  correct,
  incorrect,
}: {
  correct: number;
  incorrect: number;
}) {
  const total = Math.max(1, correct + incorrect);
  const correctRatio = correct / total;
  const incorrectRatio = incorrect / total;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const correctStroke = circumference * correctRatio;
  const incorrectStroke = circumference * incorrectRatio;

  return (
    <div className="relative flex size-48 items-center justify-center">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90 transform">
        {/* Background base track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="18"
        />
        {/* Correct Segment (Emerald/Green) */}
        {correct > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="18"
            strokeDasharray={`${correctStroke} ${circumference - correctStroke}`}
            strokeDashoffset={0}
          />
        )}
        {/* Incorrect Segment (Red) */}
        {incorrect > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth="18"
            strokeDasharray={`${incorrectStroke} ${circumference - incorrectStroke}`}
            strokeDashoffset={-correctStroke}
          />
        )}
      </svg>
    </div>
  );
}
