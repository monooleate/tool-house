// ============================================================
// URL UTILS – Lokalizált URL generálás tool, kategória és statikus oldalakhoz
// ============================================================

import type { SupportedLang } from "../i18n/index.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import { getCategoryUrl, getStaticUrl } from "./url-map.ts";
import type { Tool, CategoryId } from "./tool-registry.ts";
import { getSubcatForTool } from "./content/ro/conversii-hubs.ts";

/**
 * Tool oldal lokalizált URL-je.
 *
 * Sztenderd: `/{localizedCategory}/{localizedSlug}/`
 *  HU: `/kep/jpg-webp/`
 *  RO: `/imagine/convertor-jpg-webp/`
 *
 * RO `conversii` kategóriában 3-szegmensű URL: `/conversii/{subcat}/{slug}/`
 *  pl. `/conversii/lungime/cm-metri/`
 *
 * Trailing slash: egyezik a sitemap-pel és a szerver viselkedésével.
 */
export function toolUrl(tool: Tool, lang: SupportedLang = CURRENT_LANG): string {
  const catSlug = getCategoryUrl(tool.category, lang);
  const toolSlug = (lang !== "hu" && tool.i18n?.[lang]?.slug) || tool.slug;

  // Conversii kategória RO-ban hierarchikus: /conversii/{subcat}/{slug}/
  if (tool.category === "conversii" && lang === "ro") {
    const subcat = getSubcatForTool(tool.slug);
    if (subcat) return `/${catSlug}/${subcat}/${toolSlug}/`;
  }

  return `/${catSlug}/${toolSlug}/`;
}

/**
 * Kategória oldal lokalizált URL-je: /{localizedCategory}/
 * Példa HU: /kep/
 * Példa RO: /imagine/
 */
export function categoryUrl(catId: CategoryId, lang: SupportedLang = CURRENT_LANG): string {
  return `/${getCategoryUrl(catId, lang)}/`;
}

/**
 * Conversii sub-hub URL-je: /conversii/{subcat}/
 * Csak RO-build-en érvényes — a `conversii` kategória ezt a 3-szegmensű mintát követi.
 */
export function subcatUrl(subcatSlug: string, lang: SupportedLang = CURRENT_LANG): string {
  const catSlug = getCategoryUrl("conversii", lang);
  return `/${catSlug}/${subcatSlug}/`;
}

/**
 * Instant-answer oldal URL-je: /conversii/{subcat}/{instant-slug}/
 * Csak RO-build-en érvényes (programmatic SEO oldalak).
 */
export function instantAnswerUrl(
  subcatSlug: string,
  instantSlug: string,
  lang: SupportedLang = CURRENT_LANG
): string {
  const catSlug = getCategoryUrl("conversii", lang);
  return `/${catSlug}/${subcatSlug}/${instantSlug}/`;
}

/**
 * Statikus oldal lokalizált URL-je: /{localizedSlug}/
 * Példa HU: /rolunk/
 * Példa RO: /despre-noi/
 */
export function staticUrl(key: string, lang: SupportedLang = CURRENT_LANG): string {
  return `/${getStaticUrl(key, lang)}/`;
}
