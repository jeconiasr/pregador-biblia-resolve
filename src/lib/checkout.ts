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

    // Enforce affiliate parameter if on direct checkout domain
    if (!checkout.hostname.includes("go.hotmart.com")) {
      checkout.searchParams.set("ref", OFFER_CONFIG.affiliateRef);
    }
    return checkout.toString();
  } catch {
    return OFFER_CONFIG.checkoutUrl;
  }
}

/**
 * Navigates to checkout. On mobile, opens in the same tab (_self).
 * On desktop, can open in a clean new tab or current tab, defaulting to _self on mobile.
 */
export function navigateToCheckout(searchParams: string = "", onCheckoutClick?: () => void): void {
  if (onCheckoutClick) {
    onCheckoutClick();
  }

  const url = buildCheckoutUrl(searchParams);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
