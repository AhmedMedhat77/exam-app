import { useEffect, useState } from 'react';

interface IDonutBarProps {
  time: number; // total time in seconds
  remainingTime?: number; // remaining time in seconds
  onTimeUp?: () => void;
}

export default function DonutBar({
  time = 0,
  remainingTime,
  onTimeUp,
}: IDonutBarProps) {
  const initialTime = remainingTime !== undefined ? remainingTime : time;
  const [countDown, setCountDown] = useState<number>(initialTime);

  // Sync state when time or remainingTime prop updates
  useEffect(() => {
    setCountDown(remainingTime !== undefined ? remainingTime : time);
  }, [time, remainingTime]);

  // Countdown timer effect
  useEffect(() => {
    if (countDown <= 0) return;

    const interval = setInterval(() => {
      setCountDown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  // Trigger onTimeUp when countdown reaches 0
  useEffect(() => {
    if (countDown === 0) {
      onTimeUp?.();
    }
  }, [countDown, onTimeUp]);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = time > 0 ? Math.min(Math.max(countDown / time, 0), 1) : 0;
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.max(0, seconds) % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 transform">
        {/* Background track circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-blue-100 dark:text-blue-950/40"
        />
        {/* Animated progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-linear"
        />
      </svg>
      {/* Center time text overlay */}
      <span className="text-primary absolute font-mono text-[13px] font-bold tracking-tight">
        {formatTime(countDown)}
      </span>
    </div>
  );
}
