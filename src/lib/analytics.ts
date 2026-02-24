// ============================================================
// ANALYTICS CONFIG – Központi tracking beállítások
// Google Tag (gtag.js / GA4) + GTM
//
// Használat:
//   1. GOOGLE_TAG_ID → Google Analytics 4 mérési azonosító (G-XXXXXXXXXX)
//   2. GTM_ID → Google Tag Manager container (GTM-XXXXXXX)
//   3. A BaseLayout.astro automatikusan beilleszti, CSAK production-ban
//   4. Ha GTM-et használsz, a GA4-et GTM-en belül konfiguráld!
// ============================================================

// ─── Google Analytics 4 (gtag.js) ────────────────────────────
// Formátum: "G-XXXXXXXXXX"  |  "" = kikapcsolva
export const GOOGLE_TAG_ID = "G-GGJNWNYZ5G";

// ─── Google Tag Manager ──────────────────────────────────────
// Formátum: "GTM-XXXXXXX"  |  "" = kikapcsolva
export const GTM_ID = "";

// ─── Google Consent Mode v2 (GDPR) ──────────────────────────
// true = denied default → consent banner kell az engedélyezéshez
export const CONSENT_MODE_ENABLED = true;

// ─── Helperek ────────────────────────────────────────────────
export function hasGoogleTag(): boolean { return GOOGLE_TAG_ID.length > 0; }
export function hasGTM(): boolean { return GTM_ID.length > 0; }

// ─── GA4 event tracking ─────────────────────────────────────
type ToolAction = "convert_start" | "convert_done" | "download" | "zip_download" | "error" | "reset";

/**
 * Tool használat esemény naplózása (GA4 gtag / GTM dataLayer).
 * Csak production-ban fut – dev módban console.log-gal helyettesíti.
 */
export function trackToolEvent(toolSlug: string, action: ToolAction, props?: Record<string, string | number>): void {
  if (typeof window === "undefined") return;

  const eventProps = { tool: toolSlug, ...props };

  if (import.meta.env.PROD) {
    // @ts-expect-error – gtag globális callback
    window.gtag?.("event", "tool_" + action, eventProps);
  } else {
    console.debug("[Analytics]", "tool_" + action, eventProps);
  }
}

/**
 * Kategória oldal látogatás.
 */
export function trackCategoryView(category: string): void {
  if (typeof window === "undefined") return;
  if (import.meta.env.PROD) {
    // @ts-expect-error
    window.gtag?.("event", "category_view", { category });
  }
}
