import { AssessmentExperience } from "@/components/assessment/AssessmentExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Risk Assessment | CoDojo",
  description:
    "10-question diagnostic for technical debt, delivery friction, modernization, and AI readiness.",
};

export default function AssessmentPage() {
  return <AssessmentExperience />;
}
