// ============================================================
// i18n helper – build-time language resolution
// PUBLIC_SITE_LANG env változó határozza meg melyik JSON töltődik be.
// Alapértelmezett: "hu"
// ============================================================

// Támogatott nyelvek – ide vedd fel az újakat
export type SupportedLang = "hu" | "ro";

// Build-time: melyik nyelven buildel most
export const CURRENT_LANG: SupportedLang =
  (import.meta.env.PUBLIC_SITE_LANG as SupportedLang) ?? "hu";

// Fordítási fájlok betöltése
// Astro SSG build-kor statikusan feloldja ezeket
import huTranslations from "./hu.json";
import roTranslations from "./ro.json";

const TRANSLATIONS: Record<SupportedLang, Record<string, string>> = {
  hu: huTranslations as Record<string, string>,
  ro: roTranslations as Record<string, string>,
};

/**
 * Fordítás lekérése kulcs alapján.
 * Ha a kulcs nem létezik az adott nyelvben, visszaesik hu-ra.
 * Ha hu-ban sem létezik, visszaadja magát a kulcsot (debug segítség).
 *
 * Használat: t("nav.search"), t("footer.tagline")
 */
export function t(key: string): string {
  const langDict = TRANSLATIONS[CURRENT_LANG];
  const fallback = TRANSLATIONS["hu"];
  return langDict?.[key] ?? fallback?.[key] ?? key;
}

/**
 * Fordítás interpolációval – változók behelyettesítése.
 * Használat: tpl("footer.count", { count: "42" })
 * JSON-ban: "footer.count": "{{count}} ingyenes online eszköz"
 */
export function tpl(key: string, vars: Record<string, string>): string {
  let text = t(key);
  for (const [k, v] of Object.entries(vars)) {
    text = text.replaceAll(`{{${k}}}`, v);
  }
  return text;
}

// Nyelv-specifikus site konfiguráció
export interface LangConfig {
  lang: SupportedLang;    // HTML lang attribútum
  locale: string;         // OG locale (pl. "hu_HU")
  siteName: string;       // Site neve az adott piacon
  siteUrl: string;        // Canonical base URL
  dir: "ltr" | "rtl";    // Szöveg iránya
  gtagId: string;         // Google Analytics 4 mérési ID (G-XXXXXXXXXX), "" = kikapcsolva
  gtmId: string;          // Google Tag Manager ID (GTM-XXXXXXX), "" = kikapcsolva
}

export const LANG_CONFIG: Record<SupportedLang, LangConfig> = {
  hu: {
    lang: "hu",
    locale: "hu_HU",
    siteName: "Konvertalo.hu",
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://konvertalo.hu",
    dir: "ltr",
    gtagId: "G-GGJNWNYZ5G",
    gtmId: "",
  },
  ro: {
    lang: "ro",
    locale: "ro_RO",
    siteName: "InstrumenteOnline",
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://instrumenteonline.ro",
    dir: "ltr",
    gtagId: "",   // TODO: RO GA4 mérési ID beállítása
    gtmId: "",
  },
};

export const CURRENT_CONFIG: LangConfig = LANG_CONFIG[CURRENT_LANG];
