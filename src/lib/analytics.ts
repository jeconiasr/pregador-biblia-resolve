/**
 * Analytics dispatcher with Google Tag Manager / dataLayer support
 * Resilient against StrictMode duplicates, respects user privacy (no notes/PII sent)
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "page_view_lesson"
  | "hero_watch_click"
  | "video_thumbnail_click"
  | "video_start"
  | "video_progress_25"
  | "video_progress_50"
  | "video_progress_75"
  | "video_progress_90"
  | "video_complete"
  | "resume_shared_timestamp_click"
  | "lesson_notes_copy"
  | "lesson_notes_print"
  | "blocker_selected"
  | "course_bridge_view"
  | "course_details_click"
  | "offer_view"
  | "checkout_click"
  | "producer_page_click"
  | "faq_open";

const firedOnceEvents = new Set<string>();

export function trackEvent(eventName: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  // Initialize dataLayer safely if not present
  window.dataLayer = window.dataLayer || [];

  const eventObject = {
    event: eventName,
    timestamp: Date.now(),
    page_location: window.location.pathname,
    ...payload,
  };

  window.dataLayer.push(eventObject);

  if (process.env.NODE_ENV !== "production") {
    // Helpful debug in dev environment without spamming
    // console.debug(`[Analytics] ${eventName}`, payload);
  }
}

export function trackOnce(eventName: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (firedOnceEvents.has(eventName)) return;
  firedOnceEvents.add(eventName);
  trackEvent(eventName, payload);
}
