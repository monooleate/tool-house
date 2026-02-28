// ============================================================
// URL UTILS – Lokalizált URL generálás tool, kategória és statikus oldalakhoz
// ============================================================

import type { SupportedLang } from "../i18n/index.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import { getCategoryUrl, getStaticUrl } from "./url-map.ts";
import type { Tool, CategoryId } from "./tool-registry.ts";

/**
 * Tool oldal lokalizált URL-je: /{localizedCategory}/{localizedSlug}
 * Példa HU: /kep/jpg-webp
 * Példa RO: /imagine/convertor-jpg-webp
 */
export function toolUrl(tool: Tool, lang: SupportedLang = CURRENT_LANG): string {
  const catSlug = getCategoryUrl(tool.category, lang);
  const toolSlug = (lang !== "hu" && tool.i18n?.[lang]?.slug) || tool.slug;
  return `/${catSlug}/${toolSlug}`;
}

/**
 * Kategória oldal lokalizált URL-je: /{localizedCategory}
 * Példa HU: /kep
 * Példa RO: /imagine
 */
export function categoryUrl(catId: CategoryId, lang: SupportedLang = CURRENT_LANG): string {
  return `/${getCategoryUrl(catId, lang)}`;
}

/**
 * Statikus oldal lokalizált URL-je: /{localizedSlug}
 * Példa HU: /rolunk
 * Példa RO: /despre-noi
 */
export function staticUrl(key: string, lang: SupportedLang = CURRENT_LANG): string {
  return `/${getStaticUrl(key, lang)}`;
}
