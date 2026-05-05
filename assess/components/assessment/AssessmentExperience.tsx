"use client";

import { useAssessmentScoring } from "@/hooks/useAssessmentScoring";
import { QUESTIONS } from "@/lib/assessmentConstants";
import { trackEvent } from "@/lib/analytics";
import type { LeadFormValues } from "@/components/assessment/LeadCaptureForm";
import { AssessmentLandingPage } from "@/components/assessment/AssessmentLandingPage";
import { LeadCaptureForm } from "@/components/assessment/LeadCaptureForm";
import { QuizIntro } from "@/components/assessment/QuizIntro";
import { QuizProgressBar } from "@/components/assessment/QuizProgressBar";
import { QuizQuestion } from "@/components/assessment/QuizQuestion";
import { QuizResults } from "@/components/assessment/QuizResults";
import { ThankYouState } from "@/components/assessment/ThankYouState";
import { sumAnswers } from "@/lib/assessmentScoring";
import type { LeadPayload, ScoreValue } from "@/lib/assessmentTypes";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "landing" | "quiz" | "outcome" | "thanks";

function emptyAnswers(): Array<ScoreValue | undefined> {
  return Array.from({ length: QUESTIONS.length }, () => undefined);
}

export function AssessmentExperience() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [answers, setAnswers] = useState<Array<ScoreValue | undefined>>(
    emptyAnswers,
  );
  const [index, setIndex] = useState(0);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const leadTracked = useRef(false);

  const snapshot = useAssessmentScoring(answers);
  const current = QUESTIONS[index];
  const currentAnswer = answers[index];

  useEffect(() => {
    trackEvent("page_view", { path: "/assessment" });
  }, []);

  const startQuiz = useCallback(() => {
    setAnswers(emptyAnswers());
    setIndex(0);
    setPhase("quiz");
    trackEvent("quiz_start", { path: "/assessment" });
  }, []);

  const setAnswerAt = useCallback((i: number, value: ScoreValue) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
    trackEvent("question_answered", {
      questionIndex: i,
      questionId: QUESTIONS[i]?.id,
      scoreValue: value,
    });
  }, []);

  const goNext = useCallback(() => {
    if (currentAnswer === undefined) return;
    if (index < QUESTIONS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    setPhase("outcome");
    trackEvent("quiz_completed", {
      totalScore: sumAnswers([...answers.slice(0, index), currentAnswer]),
    });
  }, [currentAnswer, index, answers]);

  const goBack = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
      return;
    }
    setPhase("landing");
    setAnswers(emptyAnswers());
  }, [index]);

  useEffect(() => {
    if (phase !== "outcome") {
      leadTracked.current = false;
      return;
    }
    if (leadTracked.current) return;
    leadTracked.current = true;
    trackEvent("quiz_completed", { totalScore: snapshot.total });
    trackEvent("lead_form_viewed", { totalScore: snapshot.total });
  }, [phase, snapshot.total]);

  const submitLead = useCallback(
    async (form: LeadFormValues) => {
      const payload: LeadPayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        role: form.role.trim(),
        totalScore: snapshot.total,
        scoreBand: snapshot.band.id,
        scoreBandLabel: snapshot.band.label,
        answers: answers as ScoreValue[],
        topRiskThemes: snapshot.topThemes,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      trackEvent("lead_submitted", {
        email: payload.email,
        totalScore: payload.totalScore,
      });
      setPhase("thanks");
    },
    [answers, snapshot],
  );

  useEffect(() => {
    if (phase === "outcome" && outcomeRef.current) {
      outcomeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [phase]);

  return (
    <div className="min-h-screen bg-surface-subtle">
      <header className="border-b border-surface-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold tracking-tight text-ink">
            CoDojo
          </span>
          <span className="text-xs text-ink-faint">Fractional CTO</span>
        </div>
      </header>

      <main>
        {phase === "landing" && (
          <AssessmentLandingPage onStart={startQuiz} />
        )}

        {phase === "quiz" && (
          <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
            <div className="transition-opacity duration-300 ease-out motion-reduce:transition-none">
              {index === 0 && <QuizIntro />}
              <div className={index === 0 ? "mt-8" : ""}>
                <QuizProgressBar
                  currentIndex={index}
                  total={QUESTIONS.length}
                />
              </div>
              <div className="mt-8 rounded-xl border border-surface-border bg-surface p-5 shadow-card sm:p-7">
                <QuizQuestion
                  questionIndex={index}
                  totalQuestions={QUESTIONS.length}
                  questionText={current.text}
                  name={current.id}
                  value={currentAnswer}
                  onChange={(v) => setAnswerAt(index, v)}
                />
                <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-surface-border bg-surface px-5 text-sm font-medium text-ink-muted transition-colors hover:border-ink-faint hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={currentAnswer === undefined}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40"
                  >
                    {index === QUESTIONS.length - 1 ? "View results" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === "outcome" && (
          <div
            ref={outcomeRef}
            className="mx-auto max-w-lg space-y-10 px-4 py-12 sm:py-16"
          >
            <QuizResults snapshot={snapshot} />
            <LeadCaptureForm onSubmit={submitLead} />
          </div>
        )}

        {phase === "thanks" && (
          <div className="mx-auto max-w-lg px-4 py-16 sm:py-24">
            <ThankYouState />
          </div>
        )}
      </main>

      <footer className="border-t border-surface-border py-8 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} CoDojo · codojo.me
      </footer>
    </div>
  );
}
