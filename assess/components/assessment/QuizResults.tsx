import type { AssessmentScoreSnapshot } from "@/hooks/useAssessmentScoring";

interface QuizResultsProps {
  snapshot: AssessmentScoreSnapshot;
}

export function QuizResults({ snapshot }: QuizResultsProps) {
  const { total, minScore, maxScore, band, topThemeInsights } = snapshot;

  return (
    <section
      className="rounded-xl border border-surface-border bg-surface p-6 shadow-card sm:p-8"
      aria-labelledby="results-heading"
    >
      <h2
        id="results-heading"
        className="text-lg font-semibold tracking-tight text-ink"
      >
        Your assessment result
      </h2>
      <div className="mt-6 flex flex-wrap items-baseline gap-2">
        <span
          className="text-4xl font-semibold tabular-nums tracking-tight text-ink"
          aria-label={`Total score ${total} out of ${maxScore}`}
        >
          {total}
        </span>
        <span className="text-sm text-ink-muted">
          / {maxScore}
          <span className="sr-only">{`, scale from ${minScore} to ${maxScore}`}</span>
        </span>
      </div>
      <p className="mt-2 text-sm font-medium text-ink">{band.label}</p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          Your score suggests that your environment is carrying measurable
          friction.
        </p>
        <p>
          That friction may be showing up as slower delivery, more rework, more
          operational stress, or greater risk every time you try to change
          something important.
        </p>
        <p>
          You do not need a full rewrite to improve this. In most cases, the
          right next move is to identify the highest-leverage issues and
          sequence the work carefully.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-semibold text-ink">
          Highest-priority focus areas
        </h3>
        <ul className="mt-3 space-y-3">
          {topThemeInsights.map(({ label, insight }) => (
            <li
              key={label}
              className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-muted"
            >
              <span className="font-medium text-ink">{label}.</span> {insight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
