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
  nativeName: string;     // Nyelv saját nevén (pl. "Magyar", "Română")
  flag: string;           // Emoji zászló
  gtagId: string;         // Google Analytics 4 mérési ID (G-XXXXXXXXXX), "" = kikapcsolva
  gtmId: string;          // Google Tag Manager ID (GTM-XXXXXXX), "" = kikapcsolva
}

// FONTOS: A siteUrl-ek hardcode-oltak, hogy a keresztlinkelés
// (footer nyelvi linkek, hreflang) mindig a helyes domainre mutasson.
// A PUBLIC_SITE_URL env var csak a CURRENT build siteUrl-jét írja felül
// (pl. staging/preview domain esetén).
export const LANG_CONFIG: Record<SupportedLang, LangConfig> = {
  hu: {
    lang: "hu",
    locale: "hu_HU",
    siteName: "Konvertalo.hu",
    siteUrl: "https://konvertalo.hu",
    dir: "ltr",
    nativeName: "Magyar",
    flag: "🇭🇺",
    gtagId: "",  // GA4 kikapcsolva – cookie consent nem szükséges
    gtmId: "",
  },
  ro: {
    lang: "ro",
    locale: "ro_RO",
    siteName: "InstrumenteOnline",
    siteUrl: "https://instrumenteonline.ro",
    dir: "ltr",
    nativeName: "Română",
    flag: "🇷🇴",
    gtagId: "",  // GA4 kikapcsolva – cookie consent nem szükséges
    gtmId: "",
  },
};

// Az aktuális nyelv konfigja – PUBLIC_SITE_URL env var felülírhatja
// (pl. staging/preview URL-ek esetén)
export const CURRENT_CONFIG: LangConfig = {
  ...LANG_CONFIG[CURRENT_LANG],
  ...(import.meta.env.PUBLIC_SITE_URL
    ? { siteUrl: import.meta.env.PUBLIC_SITE_URL }
    : {}
  ),
};
