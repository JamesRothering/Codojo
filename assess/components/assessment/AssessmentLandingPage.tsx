interface AssessmentLandingPageProps {
  onStart: () => void;
}

export function AssessmentLandingPage({ onStart }: AssessmentLandingPageProps) {
  return (
    <section
      className="mx-auto max-w-2xl px-4 py-16 sm:py-20 md:py-24"
      aria-labelledby="hero-heading"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
        Technical diagnostic
      </p>
      <h1
        id="hero-heading"
        className="mt-4 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-[2rem] md:leading-tight"
      >
        Find the hidden cost of technical debt, modernization drag, and
        delivery friction in your systems.
      </h1>
      <p className="mt-6 text-pretty text-base leading-relaxed text-ink-muted">
        Take a 10-question assessment to see where your organization is losing
        time, increasing risk, and making future change more expensive than it
        should be.
      </p>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-muted">
        If your team is shipping slower than it should, firefighting too often,
        or struggling to modernize without disruption, this assessment will help
        you see where the friction is coming from. Answer one question at a
        time. At the end, you&apos;ll get a score, a short interpretation, and
        an invitation to book a free initial consultation.
      </p>
      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white shadow-card transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start the Free Assessment
        </button>
        <p className="text-center text-xs text-ink-faint sm:text-left">
          10 questions • about 2 minutes
        </p>
      </div>
    </section>
  );
}
