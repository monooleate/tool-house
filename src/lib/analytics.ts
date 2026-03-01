// ============================================================
// ANALYTICS CONFIG – Központi tracking beállítások
// Google Tag (gtag.js / GA4) + GTM
//
// A mérési ID-k nyelvenként eltérőek – a CURRENT_CONFIG-ból olvassuk.
// Így minden domain (konvertalo.hu, instrumenteonline.ro, stb.)
// saját GA4 property-t és/vagy GTM container-t használhat.
//
// Beállítás: src/i18n/index.ts → LANG_CONFIG → gtagId / gtmId
// ============================================================

import { CURRENT_CONFIG } from "../i18n/index.ts";

// ─── Nyelv-specifikus ID-k ─────────────────────────────────
export const GOOGLE_TAG_ID = CURRENT_CONFIG.gtagId;
export const GTM_ID = CURRENT_CONFIG.gtmId;

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
