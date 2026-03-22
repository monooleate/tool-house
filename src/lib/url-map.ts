// ============================================================
// URL MAP – Nyelv-specifikus URL slug-ok kategóriákhoz és statikus oldalakhoz
// ============================================================

import type { SupportedLang } from "../i18n/index.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import type { CategoryId } from "./tool-registry.ts";

// ─── Kategória URL slug-ok nyelvenként ──────────────────────
export const CATEGORY_URLS: Record<SupportedLang, Record<CategoryId, string>> = {
  hu: {
    kep: "kep",
    pdf: "pdf",
    adat: "adat",
    szoveg: "szoveg",
    fejleszto: "fejleszto",
    markdown: "markdown",
    html: "html",
    excel: "excel",
    fajl: "fajl",
    seo: "seo",
  },
  ro: {
    kep: "imagine",
    pdf: "pdf",
    adat: "date",
    szoveg: "text",
    fejleszto: "dezvoltator",
    markdown: "markdown",
    html: "html",
    excel: "excel",
    fajl: "fisiere",
    seo: "seo",
  },
};

// ─── Statikus oldalak URL slug-ok ──────────────────────────
export const STATIC_URLS: Record<SupportedLang, Record<string, string>> = {
  hu: {
    rolunk: "rolunk",
    kapcsolat: "kapcsolat",
    adatvedelmi: "adatvedelmi-nyilatkozat",
    koszonjuk: "koszonjuk",
    kereses: "kereses",
    aszf: "felhasznalasi-feltetelek",
  },
  ro: {
    rolunk: "despre-noi",
    kapcsolat: "contact",
    adatvedelmi: "politica-confidentialitate",
    koszonjuk: "multumim",
    kereses: "cautare",
    aszf: "termeni-conditii",
  },
};

// ─── Helper függvények ──────────────────────────────────────

/** Kategória URL slug lekérése nyelv alapján */
export function getCategoryUrl(catId: CategoryId, lang: SupportedLang = CURRENT_LANG): string {
  return CATEGORY_URLS[lang]?.[catId] ?? CATEGORY_URLS.hu[catId] ?? catId;
}

/** Statikus oldal URL slug lekérése nyelv alapján */
export function getStaticUrl(key: string, lang: SupportedLang = CURRENT_LANG): string {
  return STATIC_URLS[lang]?.[key] ?? STATIC_URLS.hu[key] ?? key;
}

/** Reverse lookup: URL slug → CategoryId */
export function getCategoryIdFromUrl(urlSlug: string, lang: SupportedLang = CURRENT_LANG): CategoryId | undefined {
  const map = CATEGORY_URLS[lang];
  for (const [catId, slug] of Object.entries(map)) {
    if (slug === urlSlug) return catId as CategoryId;
  }
  // Fallback: magyar URL-ből is keresünk
  if (lang !== "hu") {
    for (const [catId, slug] of Object.entries(CATEGORY_URLS.hu)) {
      if (slug === urlSlug) return catId as CategoryId;
    }
  }
  return undefined;
}

/** Reverse lookup: statikus oldal URL slug → kulcs */
export function getStaticKeyFromUrl(urlSlug: string, lang: SupportedLang = CURRENT_LANG): string | undefined {
  const map = STATIC_URLS[lang];
  for (const [key, slug] of Object.entries(map)) {
    if (slug === urlSlug) return key;
  }
  return undefined;
}
