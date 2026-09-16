/**
 * Analytics dispatcher with Google Analytics 4, Meta Pixel, and dataLayer support.
 * Uses environment variables VITE_GA4_ID and VITE_META_PIXEL_ID if provided.
 * If IDs are not configured, degrades gracefully without generating errors or fake events.
 */

import { OFFER_CONFIG } from "../config/offer";
import { getAvailableUtmParams } from "./checkout";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "page_view_lesson"
  | "video_start"
  | "video_25"
  | "video_50"
  | "video_complete"
  | "outline_started"
  | "diagnosis_selected"
  | "blocker_selected"
  | "checkout_click"
  | "hero_watch_click"
  | "video_thumbnail_click"
  | "resume_shared_timestamp_click"
  | "lesson_notes_copy"
  | "lesson_notes_print"
  | "lesson_notes_clear"
  | "course_bridge_view"
  | "course_details_click"
  | "offer_view"
  | "producer_page_click"
  | "faq_open"
  | "video_timed_offer_revealed"
  | "video_timed_offer_clicked"
  | "video_timed_offer_dismissed";

const firedOnceEvents = new Set<string>();
let analyticsInitialized = false;

/**
 * Initializes GA4 and Meta Pixel only if their respective environment variables are defined.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined" || analyticsInitialized) return;
  analyticsInitialized = true;

  const ga4Id = import.meta.env.VITE_GA4_ID?.trim();
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();

  // Initialize GA4 if ID is present
  if (ga4Id) {
    try {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer?.push(arguments as unknown as Record<string, unknown>);
      };
      window.gtag("js", new Date());
      window.gtag("config", ga4Id);
    } catch {
      // Graceful fallback
    }
  }

  // Initialize Meta Pixel if ID is present
  if (metaPixelId) {
    try {
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq?.("init", metaPixelId);
      window.fbq?.("track", "PageView");
    } catch {
      // Graceful fallback
    }
  }
}

export function trackEvent(eventName: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  // Initialize dataLayer safely
  window.dataLayer = window.dataLayer || [];

  const eventObject = {
    event: eventName,
    timestamp: Date.now(),
    page_location: window.location.href,
    ...payload,
  };

  window.dataLayer.push(eventObject);

  // Send to GA4 if gtag is available
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, payload);
    } catch {
      // ignore
    }
  }

  // Send to Meta Pixel if fbq is available
  if (typeof window.fbq === "function") {
    try {
      if (eventName === "checkout_click") {
        window.fbq("track", "InitiateCheckout", {
          content_name: OFFER_CONFIG.productName,
          value: 64.9,
          currency: "BRL",
          ...payload,
        });
      } else {
        window.fbq("trackCustom", eventName, payload);
      }
    } catch {
      // ignore
    }
  }
}

export function trackOnce(eventName: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (firedOnceEvents.has(eventName)) return;
  firedOnceEvents.add(eventName);
  trackEvent(eventName, payload);
}

/**
 * Specifically tracks checkout_click with all mandated fields:
 * button location, CTA text, price, product, current URL, and available UTMs.
 */
export function trackCheckoutClick(buttonLocation: string, ctaText: string): void {
  const utms = getAvailableUtmParams();
  trackEvent("checkout_click", {
    button_location: buttonLocation,
    location: buttonLocation,
    cta_text: ctaText,
    price: OFFER_CONFIG.cashPrice,
    product: OFFER_CONFIG.productName,
    current_url: typeof window !== "undefined" ? window.location.href : "",
    utm_params: utms,
    ...utms,
  });
}

/**
 * Tracks the timed offer revealing at 50% video progress with required parameters:
 * current_time, video_duration, watched_percentage, trigger_source, offer_variant.
 */
export function trackTimedOfferRevealed(params: {
  currentTime: number;
  duration: number;
  watchedPercentage: number;
  triggerSource: "youtube_api" | "fallback_timer" | "local_storage";
  offerVariant: string;
}): void {
  trackOnce("video_timed_offer_revealed", {
    current_time: Math.round(params.currentTime),
    video_duration: Math.round(params.duration),
    watched_percentage: Math.round(params.watchedPercentage),
    trigger_source: params.triggerSource,
    offer_variant: params.offerVariant,
  });
}

/**
 * Tracks CTA click on the timed offer with mandated parameters:
 * button_text, position: "video_midpoint", product, current_url, utm_params.
 */
export function trackTimedOfferClicked(params: {
  buttonText: string;
  offerVariant: string;
}): void {
  const utms = getAvailableUtmParams();
  trackEvent("video_timed_offer_clicked", {
    button_text: params.buttonText,
    position: "video_midpoint",
    product: OFFER_CONFIG.productName,
    current_url: typeof window !== "undefined" ? window.location.href : "",
    offer_variant: params.offerVariant,
    utm_params: utms,
    ...utms,
  });
}

/**
 * Tracks dismissal of the floating notification or secondary action
 */
export function trackTimedOfferDismissed(action: "banner_close" | "continue_watching"): void {
  trackEvent("video_timed_offer_dismissed", {
    action,
    position: "video_midpoint",
  });
}


