import type { LeadPayload } from "./assessmentTypes";

/**
 * Persist lead + assessment outcome. Replace with API route / Edge function / DB.
 */
export async function storeLeadRecord(payload: LeadPayload): Promise<void> {
  // TODO: POST /api/leads or insert into Supabase/Postgres
  if (process.env.NODE_ENV === "development") {
    console.info("[backend] storeLeadRecord", payload);
  }
}

/** Notify operator via transactional email (Resend, SES, etc.) */
export async function sendLeadNotificationEmail(
  payload: LeadPayload,
): Promise<void> {
  // TODO: await fetch('/api/notify', { method: 'POST', body: JSON.stringify(payload) })
  if (process.env.NODE_ENV === "development") {
    console.info("[backend] sendLeadNotificationEmail", payload.email);
  }
}

/** Push to HubSpot, Salesforce, webhook, etc. */
export async function syncLeadToCrm(payload: LeadPayload): Promise<void> {
  // TODO: CRM SDK or webhook
  if (process.env.NODE_ENV === "development") {
    console.info("[backend] syncLeadToCrm", payload.company);
  }
}

/** Optional: full quiz answers archived alongside lead */
export async function archiveAssessmentResponses(
  payload: LeadPayload,
): Promise<void> {
  // TODO: object storage or analytics warehouse
  if (process.env.NODE_ENV === "development") {
    console.info("[backend] archiveAssessmentResponses", payload.totalScore);
  }
}

export async function submitLeadPipeline(payload: LeadPayload): Promise<void> {
  await storeLeadRecord(payload);
  await Promise.all([
    sendLeadNotificationEmail(payload),
    syncLeadToCrm(payload),
    archiveAssessmentResponses(payload),
  ]);
}
