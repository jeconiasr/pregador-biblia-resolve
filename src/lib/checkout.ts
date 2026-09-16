import { OFFER_CONFIG } from "../config/offer";

export const TRACKABLE_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "src",
  "sck",
] as const;

/**
 * Extracts available UTM and tracking parameters as a clean object
 */
export function getAvailableUtmParams(currentSearch: string = ""): Record<string, string> {
  const searchString = currentSearch || (typeof window !== "undefined" ? window.location.search : "");
  const incoming = new URLSearchParams(searchString);
  const result: Record<string, string> = {};

  TRACKABLE_PARAMS.forEach((key) => {
    const value = incoming.get(key)?.trim();
    if (value && value !== "null" && value !== "undefined") {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Builds the secure checkout URL preserving all incoming marketing parameters
 * and strictly enforcing the verified affiliate code ref=N107470566X.
 */
export function buildCheckoutUrl(currentSearch: string = ""): string {
  try {
    const checkout = new URL(OFFER_CONFIG.checkoutUrl);
    const searchString = currentSearch || (typeof window !== "undefined" ? window.location.search : "");
    const incoming = new URLSearchParams(searchString);

    TRACKABLE_PARAMS.forEach((key) => {
      const value = incoming.get(key)?.trim();
      if (value && value !== "null" && value !== "undefined") {
        checkout.searchParams.set(key, value);
      }
    });

    // Always ensure affiliate reference is preserved without duplicates
    checkout.searchParams.set("ref", OFFER_CONFIG.affiliateRef);

    return checkout.toString();
  } catch {
    return OFFER_CONFIG.checkoutUrl;
  }
}

export interface CheckoutNavigationOptions {
  location: string;
  ctaText: string;
  searchParams?: string;
}

/**
 * Navigates to checkout. On mobile, opens in the same tab (_self).
 * On desktop, opens in a clean new tab or current tab, defaulting to _self on mobile.
 */
export function navigateToCheckout(
  optionsOrSearch: CheckoutNavigationOptions | string = "",
  onCheckoutClick?: () => void
): void {
  if (onCheckoutClick) {
    onCheckoutClick();
  }

  const searchParams = typeof optionsOrSearch === "string" ? optionsOrSearch : optionsOrSearch.searchParams || "";
  const url = buildCheckoutUrl(searchParams);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

