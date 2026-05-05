"use client";

import { SCALE_LABELS } from "@/lib/assessmentConstants";
import type { ScoreValue } from "@/lib/assessmentTypes";

interface QuizQuestionProps {
  questionIndex: number;
  totalQuestions: number;
  questionText: string;
  name: string;
  value: ScoreValue | undefined;
  onChange: (v: ScoreValue) => void;
}

export function QuizQuestion({
  questionIndex,
  totalQuestions,
  questionText,
  name,
  value,
  onChange,
}: QuizQuestionProps) {
  const options = [1, 2, 3, 4, 5] as const;

  return (
    <fieldset className="border-0 p-0">
      <legend className="sr-only">
        Question {questionIndex + 1} of {totalQuestions}: {questionText}
      </legend>
      <p
        className="text-base font-medium leading-snug text-ink md:text-lg"
        id={`${name}-prompt`}
      >
        {questionText}
      </p>
      <div
        className="mt-8"
        role="radiogroup"
        aria-labelledby={`${name}-prompt`}
      >
        <ul className="flex flex-col gap-2 sm:gap-2.5">
          {options.map((n) => {
            const selected = value === n;
            const optionId = `${name}-opt-${n}`;
            return (
              <li key={n}>
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={n}
                  checked={selected}
                  onChange={() => onChange(n)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={optionId}
                  className="flex min-h-[52px] cursor-pointer items-center rounded-lg border border-surface-border bg-surface px-4 py-3 text-left text-sm text-ink shadow-none transition-colors hover:border-accent/40 hover:bg-accent-muted/50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-checked:border-accent peer-checked:bg-accent-muted peer-checked:[&_.pill]:border-accent peer-checked:[&_.pill]:bg-accent peer-checked:[&_.pill]:text-white sm:min-h-[56px]"
                >
                  <span
                    className="pill mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-surface-border bg-surface text-xs font-semibold text-ink"
                    aria-hidden
                  >
                    {n}
                  </span>
                  <span className="leading-snug">{SCALE_LABELS[n]}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
}
