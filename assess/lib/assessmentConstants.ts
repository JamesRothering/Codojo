import type { AssessmentQuestion, ThemeDefinition } from "./assessmentTypes";

export const SCALE_LABELS: Record<number, string> = {
  1: "Strong / low concern",
  2: "Mostly strong",
  3: "Mixed",
  4: "Concerning",
  5: "High risk / urgent",
};

export const QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q1",
    text: "How clear are your system boundaries and dependencies to the team?",
    theme: "architectureClarity",
  },
  {
    id: "q2",
    text: "How often does technical debt slow feature delivery?",
    theme: "technicalDebtBurden",
  },
  {
    id: "q3",
    text:
      "How frequently do releases get delayed by integration, environment, or deployment issues?",
    theme: "deliveryFriction",
  },
  {
    id: "q4",
    text: "How resilient are your systems when something fails in production?",
    theme: "operationalResilience",
  },
  {
    id: "q5",
    text: "How realistic is your current modernization roadmap?",
    theme: "modernizationReadiness",
  },
  {
    id: "q6",
    text:
      "How prepared are you to support AI initiatives without creating governance or data problems?",
    theme: "aiReadinessGovernance",
  },
  {
    id: "q7",
    text: "How quickly can your team make decisions when architectural tradeoffs arise?",
    theme: "architectureClarity",
  },
  {
    id: "q8",
    text: "How confident are you in your test coverage and release process?",
    theme: "deliveryFriction",
  },
  {
    id: "q9",
    text: "How exposed are you to fragile integrations or hidden dependencies?",
    theme: "architectureClarity",
  },
  {
    id: "q10",
    text:
      "If nothing changes in the next 12 months, how much business impact do you expect?",
    theme: "technicalDebtBurden",
  },
];

export const THEMES: ThemeDefinition[] = [
  {
    id: "architectureClarity",
    label: "Architecture clarity",
    shortInsight:
      "Boundaries, dependencies, and tradeoff decisions may be unclear—raising delivery risk when systems evolve.",
  },
  {
    id: "technicalDebtBurden",
    label: "Technical debt burden",
    shortInsight:
      "Accumulated debt may be compounding rework and slowing the roadmap unless deliberately managed.",
  },
  {
    id: "deliveryFriction",
    label: "Delivery friction",
    shortInsight:
      "Pipeline and integration friction can inflate cycle time and make releases harder to predict.",
  },
  {
    id: "operationalResilience",
    label: "Operational resilience",
    shortInsight:
      "Failure modes and recovery paths may need strengthening to reduce customer impact and firefighting.",
  },
  {
    id: "modernizationReadiness",
    label: "Modernization readiness",
    shortInsight:
      "The modernization path may be optimistic or under-supported—increasing cost and disruption risk.",
  },
  {
    id: "aiReadinessGovernance",
    label: "AI readiness and governance",
    shortInsight:
      "AI initiatives may stall without clear data boundaries, controls, and architectural foundations.",
  },
];
