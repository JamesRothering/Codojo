export function ThankYouState() {
  return (
    <section
      className="rounded-xl border border-surface-border bg-surface p-8 shadow-card sm:p-10"
      aria-labelledby="thanks-heading"
    >
      <h2
        id="thanks-heading"
        className="text-xl font-semibold tracking-tight text-ink"
      >
        Thanks — your assessment has been submitted.
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        I&apos;ll review your results and reach out to schedule your free
        initial consultation. In that conversation, we&apos;ll look at the
        highest-friction areas and talk about what to prioritize first.
      </p>
    </section>
  );
}
