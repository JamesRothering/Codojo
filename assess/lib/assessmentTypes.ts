export type ScoreValue = 1 | 2 | 3 | 4 | 5;

export type ThemeId =
  | "architectureClarity"
  | "technicalDebtBurden"
  | "deliveryFriction"
  | "operationalResilience"
  | "modernizationReadiness"
  | "aiReadinessGovernance";

export type ScoreBandId = "healthy" | "material" | "highRisk";

export interface AssessmentQuestion {
  id: string;
  text: string;
  theme: ThemeId;
}

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  shortInsight: string;
}

export interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  totalScore: number;
  scoreBand: ScoreBandId;
  scoreBandLabel: string;
  answers: ScoreValue[];
  topRiskThemes: ThemeId[];
  submittedAt: string;
}
