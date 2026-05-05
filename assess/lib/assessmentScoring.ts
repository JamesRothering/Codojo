import { QUESTIONS, THEMES } from "./assessmentConstants";
import type { ScoreBandId, ScoreValue, ThemeId } from "./assessmentTypes";

export const MIN_SCORE = QUESTIONS.length;
export const MAX_SCORE = QUESTIONS.length * 5;

export function sumAnswers(answers: Array<ScoreValue | undefined>): number {
  return answers.reduce<number>((acc, v) => acc + (v ?? 0), 0);
}

export function getScoreBand(total: number): {
  id: ScoreBandId;
  label: string;
} {
  if (total <= 20) {
    return {
      id: "healthy",
      label: "Healthy foundation, with a few watch areas.",
    };
  }
  if (total <= 35) {
    return {
      id: "material",
      label: "Material friction is present and should be addressed.",
    };
  }
  return {
    id: "highRisk",
    label:
      "High risk. Technical drag is likely affecting speed, cost, and change readiness.",
  };
}

export function averageForTheme(
  answers: Array<ScoreValue | undefined>,
  theme: ThemeId,
): number | null {
  const indices = QUESTIONS.map((q, i) => (q.theme === theme ? i : -1)).filter(
    (i) => i >= 0,
  );
  const values = indices
    .map((i) => answers[i])
    .filter((v): v is ScoreValue => v !== undefined);
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function getTopWeakThemes(
  answers: Array<ScoreValue | undefined>,
  count = 3,
): ThemeId[] {
  const averages = THEMES.map((t) => ({
    id: t.id,
    avg: averageForTheme(answers, t.id),
  })).filter((x): x is { id: ThemeId; avg: number } => x.avg !== null);

  averages.sort((a, b) => b.avg - a.avg);

  return averages.slice(0, count).map((x) => x.id);
}

export function themeInsight(themeId: ThemeId): string {
  const t = THEMES.find((x) => x.id === themeId);
  return t?.shortInsight ?? "";
}

export function isQuizComplete(
  answers: Array<ScoreValue | undefined>,
): boolean {
  return answers.length === QUESTIONS.length &&
    answers.every((a) => a !== undefined);
}
