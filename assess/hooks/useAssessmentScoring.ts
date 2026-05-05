"use client";

import { useMemo } from "react";
import { QUESTIONS, THEMES } from "@/lib/assessmentConstants";
import {
  getScoreBand,
  getTopWeakThemes,
  isQuizComplete,
  sumAnswers,
  themeInsight,
} from "@/lib/assessmentScoring";
import type { ScoreValue, ThemeId } from "@/lib/assessmentTypes";

export interface AssessmentScoreSnapshot {
  total: number;
  minScore: number;
  maxScore: number;
  band: ReturnType<typeof getScoreBand>;
  topThemes: ThemeId[];
  topThemeInsights: { themeId: ThemeId; label: string; insight: string }[];
  complete: boolean;
}

function themeLabel(id: ThemeId): string {
  return THEMES.find((t) => t.id === id)?.label ?? id;
}

/**
 * Derives banding, totals, and weakest themes from the in-progress answer array.
 */
export function useAssessmentScoring(
  answers: Array<ScoreValue | undefined>,
): AssessmentScoreSnapshot {
  return useMemo(() => {
    const complete = isQuizComplete(answers);
    const total = sumAnswers(answers);
    const band = complete
      ? getScoreBand(total)
      : { id: "healthy" as const, label: "" };
    const topThemes = complete ? getTopWeakThemes(answers, 3) : [];
    const topThemeInsights = topThemes.map((themeId) => ({
      themeId,
      label: themeLabel(themeId),
      insight: themeInsight(themeId),
    }));

    return {
      total,
      minScore: QUESTIONS.length,
      maxScore: QUESTIONS.length * 5,
      band,
      topThemes,
      topThemeInsights,
      complete,
    };
  }, [answers]);
}
