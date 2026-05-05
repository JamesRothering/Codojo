"use client";

interface QuizProgressBarProps {
  currentIndex: number;
  total: number;
  id?: string;
}

export function QuizProgressBar({
  currentIndex,
  total,
  id = "assessment-progress",
}: QuizProgressBarProps) {
  const pct = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
        <span id={`${id}-label`}>Progress</span>
        <span aria-live="polite">
          Question {currentIndex + 1} of {total}
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-border"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={currentIndex + 1}
        aria-labelledby={`${id}-label`}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
