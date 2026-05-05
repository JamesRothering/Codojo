/**
 * Analytics placeholders — wire to GA4, Segment, PostHog, etc.
 */
export type AnalyticsEventName =
  | "page_view"
  | "quiz_start"
  | "question_answered"
  | "quiz_completed"
  | "lead_form_viewed"
  | "lead_submitted";

export interface AnalyticsPayload {
  path?: string;
  questionIndex?: number;
  questionId?: string;
  scoreValue?: number;
  totalScore?: number;
  [key: string]: unknown;
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload, ts: Date.now() };

  try {
    window.dispatchEvent(new CustomEvent("codojo:analytics", { detail }));
  } catch {
    /* ignore */
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, payload);
  }

  const w = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer?.push({ event, ...payload });
  if (typeof w.gtag === "function") {
    w.gtag("event", event, payload);
  }
}
