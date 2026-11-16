/**
 * Privacy-First Analytics Module for Sattva Pathology Laboratory
 *
 * PRIVACY GUARANTEES:
 * 1. NEVER captures or forwards Personally Identifiable Information (PII) such as patient
 *    names, phone numbers, postal addresses, or email addresses.
 * 2. NEVER sends sensitive medical/clinical details (such as individual test names, health conditions,
 *    or diagnostic reasons) in event payloads, URL parameters, or event labels.
 * 3. Events strictly record generic, privacy-safe UI interactions (e.g. click to call, open WhatsApp,
 *    view directions, request home collection).
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      action: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export type SafeAnalyticsEvent =
  | { name: "phone_call_click"; location?: string }
  | { name: "whatsapp_click"; section?: string }
  | { name: "directions_click" }
  | { name: "home_collection_submitted" }
  | { name: "report_status_inquiry" };

/**
 * Dispatches an event to Google Analytics 4 (gtag.js) if initialized.
 * Gracefully no-ops in SSR, environments without gtag, or when tracking is blocked.
 */
export function trackEvent(event: SafeAnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    switch (event.name) {
      case "phone_call_click":
        window.gtag("event", "contact_phone_call", {
          event_category: "conversion",
          placement: event.location ?? "unknown",
        });
        break;

      case "whatsapp_click":
        window.gtag("event", "contact_whatsapp", {
          event_category: "conversion",
          placement: event.section ?? "unknown",
        });
        break;

      case "directions_click":
        window.gtag("event", "view_directions", {
          event_category: "conversion",
          placement: "google_maps_directions",
        });
        break;

      case "home_collection_submitted":
        window.gtag("event", "home_collection_lead", {
          event_category: "lead",
        });
        break;

      case "report_status_inquiry":
        window.gtag("event", "report_status_inquiry", {
          event_category: "service",
        });
        break;
    }
  } catch (err) {
    // Fail silently in user browser
    console.debug("[Analytics] event dispatch suppressed:", err);
  }
}
