import { SCALE_LABELS } from "@/lib/assessmentConstants";

/**
 * Compact orientation shown at the start of the quiz (enterprise diagnostic tone).
 */
export function QuizIntro() {
  return (
    <div className="border-b border-surface-border pb-6">
      <p className="text-sm leading-relaxed text-ink-muted">
        Answer each question using the scale below. Select the option that best
        reflects your organization today—there are no trick questions.
      </p>
      <dl className="mt-4 grid gap-2 text-xs text-ink-muted sm:grid-cols-2">
        {Object.entries(SCALE_LABELS).map(([value, label]) => (
          <div key={value} className="flex gap-2">
            <dt className="shrink-0 font-medium text-ink">{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
