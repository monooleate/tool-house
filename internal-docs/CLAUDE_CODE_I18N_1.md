# Claude Code Prompt – i18n Többnyelvűsítés

> Kontextus: Astro 4 SSG + Svelte 5, meglévő scaffold.
> Cél: egy kódbázisból több nyelvi build, domain alapú szétválasztással.
> Jelenlegi nyelv: hu. Első új nyelv: ro (román).
> Bővítés később: új JSON + új Netlify site + új domain – a kód NEM változik.

---

## ARCHITEKTÚRA ÁTTEKINTÉS

```
GitHub (1 repo)
    │
    ├── pnpm build  (SITE_LANG=hu, PUBLIC_SITE_URL=https://konvertalo.hu)
    │       └──→ dist/ → Netlify Site #1 → konvertalo.hu
    │
    └── pnpm build  (SITE_LANG=ro, PUBLIC_SITE_URL=https://instrumenteonline.ro)
            └──→ dist/ → Netlify Site #2 → instrumenteonline.ro

Új nyelv hozzáadása később (pl. sk):
    1. src/i18n/sk.json létrehozása (hu.json másolata + fordítás)
    2. Netlify Site #3 létrehozása SITE_LANG=sk env-vel
    3. Új domain bekötése
    → A kód egyetlen sorát sem kell módosítani.
```

---

## FELADAT 1 — i18n infrastruktúra

### 1.1 Könyvtárstruktúra

Hozd létre az alábbi fájlokat és könyvtárakat:

```
src/i18n/
├── hu.json          ← magyar szövegek (forrásnyelv)
├── ro.json          ← román szövegek (AI-fordítás alapja)
└── index.ts         ← t() helper, lang detektálás
```

---

### 1.2 `src/i18n/index.ts` — a fordítási helper

```ts
// src/i18n/index.ts
// ============================================================
// i18n helper – build-time language resolution
// SITE_LANG env változó határozza meg melyik JSON töltődik be.
// Alapértelmezett: "hu"
// ============================================================

// Támogatott nyelvek – ide vedd fel az újakat
export type SupportedLang = "hu" | "ro";

// Build-time: melyik nyelven buildel most
export const CURRENT_LANG: SupportedLang =
  (import.meta.env.SITE_LANG as SupportedLang) ?? "hu";

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
}

export const LANG_CONFIG: Record<SupportedLang, LangConfig> = {
  hu: {
    lang: "hu",
    locale: "hu_HU",
    siteName: "Konvertáló",
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://konvertalo.hu",
    dir: "ltr",
  },
  ro: {
    lang: "ro",
    locale: "ro_RO",
    siteName: "InstrumenteOnline",
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://instrumenteonline.ro",
    dir: "ltr",
  },
};

export const CURRENT_CONFIG: LangConfig = LANG_CONFIG[CURRENT_LANG];
```

---

### 1.3 `src/i18n/hu.json` — magyar szövegek

```json
{
  "nav.search_label": "Keresés az eszközök között",
  "nav.search_text": "Keresés",
  "nav.theme_toggle": "Téma váltása",

  "footer.tagline": "{{count}} ingyenes online eszköz – szerverfeltöltés nélkül, teljesen privát.",
  "footer.copyright": "Minden feldolgozás a böngésződben történik",
  "footer.privacy": "Adatvédelem",
  "footer.sitemap": "Sitemap",

  "hero.title": "Ingyenes online eszközök",
  "hero.subtitle": "Képek, PDF, adat, szöveg – mind a böngésződben fut. Szerverre nem kerül semmi.",
  "hero.badge_private": "🔒 Privát",
  "hero.badge_instant": "⚡ Azonnali",
  "hero.badge_free": "🆓 Ingyenes",
  "hero.tools_ready": "{{active}} kész eszköz",
  "hero.tools_coming": "{{total}} eszköz összesen",

  "category.all_tools": "Összes eszköz",
  "category.coming_soon": "Hamarosan",
  "category.active_badge": "Kész",

  "tool.convert_button": "Konvertálás",
  "tool.download_button": "Letöltés",
  "tool.upload_prompt": "Húzd ide a fájlt, vagy kattints a tallózáshoz",
  "tool.upload_multiple": "Több fájl is feltölthető",
  "tool.processing": "Feldolgozás…",
  "tool.done": "Kész!",
  "tool.reset": "Új konverzió",
  "tool.error": "Hiba történt",
  "tool.coming_soon_title": "Hamarosan elérhető",
  "tool.coming_soon_desc": "Ez az eszköz még fejlesztés alatt áll. Értesítünk, ha elkészül.",
  "tool.related": "Kapcsolódó eszközök",
  "tool.privacy_note": "🔒 A fájlok nem kerülnek szerverre – minden feldolgozás a böngésződben történik.",

  "tool.how_to_title": "Hogyan használd a(z) {{name}}-t?",
  "tool.use_cases_title": "Mikor van rá szükséged?",
  "tool.about_title": "Tudnivalók",
  "tool.tips_title": "Hasznos tippek",

  "faq.title": "Gyakori kérdések",

  "404.title": "Az oldal nem található",
  "404.subtitle": "A keresett oldal nem létezik vagy áthelyezték.",
  "404.back_home": "Vissza a főoldalra",
  "404.suggestions": "Próbáld ezeket az eszközöket",

  "meta.separator": "|",
  "meta.free_suffix": "Ingyenes, szervermentes",

  "ad.label": "Hirdetés",

  "schema.how_to_name": "Hogyan használd a(z) {{name}}-t?",
  "schema.total_time": "PT1M",
  "schema.cost_currency": "HUF",
  "schema.browser_req": "Requires JavaScript. Requires HTML5 File API.",
  "schema.feature_private": "Privát – fájlok nem hagyják el a böngészőt",
  "schema.feature_worker": "Web Worker technológiával",
  "schema.feature_free": "Teljesen ingyenes"
}
```

---

### 1.4 `src/i18n/ro.json` — román szövegek

```json
{
  "nav.search_label": "Caută printre instrumente",
  "nav.search_text": "Căutare",
  "nav.theme_toggle": "Schimbă tema",

  "footer.tagline": "{{count}} instrumente online gratuite – fără încărcare pe server, complet privat.",
  "footer.copyright": "Toată procesarea se face în browserul tău",
  "footer.privacy": "Confidențialitate",
  "footer.sitemap": "Sitemap",

  "hero.title": "Instrumente online gratuite",
  "hero.subtitle": "Imagini, PDF, date, text – totul rulează în browser. Nimic nu ajunge pe server.",
  "hero.badge_private": "🔒 Privat",
  "hero.badge_instant": "⚡ Instant",
  "hero.badge_free": "🆓 Gratuit",
  "hero.tools_ready": "{{active}} instrumente gata",
  "hero.tools_coming": "{{total}} instrumente în total",

  "category.all_tools": "Toate instrumentele",
  "category.coming_soon": "În curând",
  "category.active_badge": "Gata",

  "tool.convert_button": "Convertește",
  "tool.download_button": "Descarcă",
  "tool.upload_prompt": "Trage fișierul aici sau apasă pentru a căuta",
  "tool.upload_multiple": "Poți încărca mai multe fișiere",
  "tool.processing": "Se procesează…",
  "tool.done": "Gata!",
  "tool.reset": "Conversie nouă",
  "tool.error": "A apărut o eroare",
  "tool.coming_soon_title": "În curând disponibil",
  "tool.coming_soon_desc": "Acest instrument este încă în dezvoltare. Te vom anunța când va fi gata.",
  "tool.related": "Instrumente similare",
  "tool.privacy_note": "🔒 Fișierele nu ajung pe server – toată procesarea se face în browserul tău.",

  "tool.how_to_title": "Cum să folosești {{name}}?",
  "tool.use_cases_title": "Când ai nevoie de el?",
  "tool.about_title": "Informații",
  "tool.tips_title": "Sfaturi utile",

  "faq.title": "Întrebări frecvente",

  "404.title": "Pagina nu a fost găsită",
  "404.subtitle": "Pagina căutată nu există sau a fost mutată.",
  "404.back_home": "Înapoi la pagina principală",
  "404.suggestions": "Încearcă aceste instrumente",

  "meta.separator": "|",
  "meta.free_suffix": "Gratuit, fără server",

  "ad.label": "Publicitate",

  "schema.how_to_name": "Cum să folosești {{name}}?",
  "schema.total_time": "PT1M",
  "schema.cost_currency": "RON",
  "schema.browser_req": "Requires JavaScript. Requires HTML5 File API.",
  "schema.feature_private": "Privat – fișierele nu părăsesc browserul",
  "schema.feature_worker": "Tehnologie Web Worker",
  "schema.feature_free": "Complet gratuit"
}
```

---

### 1.5 Tool registry i18n bővítés

A `src/lib/tool-registry.ts`-ben a `Tool` és `Category` interface-eket bővítsd
`i18n` mezővel, ami nyelvenkénti fordítást tárolja az összes szövegmezőhöz.

**Fontos:** A meglévő `title`, `h1`, `description` stb. mezők maradnak — ezek
a `hu` fallback értékek. Az `i18n` opcionális, csak ha van fordítás.

```ts
// Tool interface bővítés – add hozzá a meglévő interface-hez:

export interface ToolI18n {
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  faq: ToolFAQ[];
  // content opcionális – ha van SEO szöveg lefordítva
  content?: ToolContent;
}

export interface Tool {
  // ... meglévő mezők változatlanul ...

  /** Nyelvenkénti fordítások. Ha nincs megadva az adott nyelvhez,
   *  fallback a hu (alapértelmezett) mezőkre. */
  i18n?: Partial<Record<SupportedLang, Partial<ToolI18n>>>;
}

export interface Category {
  // ... meglévő mezők változatlanul ...

  /** Kategória label és description fordítások */
  i18n?: Partial<Record<SupportedLang, { label: string; description: string }>>;
}
```

**Példa egy tool bejegyzésben** (opcionális, fokozatosan tölthető):

```ts
{
  slug: "jpg-webp",
  // ... meglévő hu mezők ...
  i18n: {
    ro: {
      title: "Convertor JPG → WebP | Gratuit, fără server",
      h1: "Convertor JPG → WebP",
      description: "Convertește imagini JPG/PNG în format WebP în browser – fără server. Calitate și dimensiune reglabile.",
      keywords: ["jpg webp", "convertor imagini", "webp online gratuit"],
      faq: [
        { q: "Fișierele mele se încarcă pe server?", a: "Nu. Conversia rulează 100% în browserul tău cu Web Worker. Fișierele nu părăsesc calculatorul tău." },
        { q: "Câte fișiere pot procesa simultan?", a: "Fără limită – în modul batch poți încărca oricâte JPG-uri, rezultatul se descarcă în ZIP." },
      ],
    },
  },
},
```

---

### 1.6 `getLocalizedTool()` és `getLocalizedCategory()` helperek

Add hozzá a `tool-registry.ts`-be a következő exportokat:

```ts
// src/lib/tool-registry.ts — ÚJ exportok a fájl végén

import { CURRENT_LANG } from "../i18n/index.ts";
import type { SupportedLang } from "../i18n/index.ts";

/**
 * Visszaadja a tool-t az aktuális nyelvre lokalizálva.
 * Ha nincs i18n fordítás az adott nyelvhez, az eredeti hu mezők maradnak.
 */
export function getLocalizedTool(tool: Tool, lang: SupportedLang = CURRENT_LANG): Tool {
  const langOverride = tool.i18n?.[lang];
  if (!langOverride) return tool;
  return { ...tool, ...langOverride };
}

/**
 * Visszaadja a kategóriát az aktuális nyelvre lokalizálva.
 */
export function getLocalizedCategory(cat: Category, lang: SupportedLang = CURRENT_LANG): Category {
  const langOverride = cat.i18n?.[lang];
  if (!langOverride) return cat;
  return { ...cat, ...langOverride };
}

/**
 * Visszaadja az összes kategóriát lokalizálva.
 */
export function getLocalizedCategories(lang: SupportedLang = CURRENT_LANG): Category[] {
  return CATEGORIES.map(cat => getLocalizedCategory(cat, lang));
}
```

---

## FELADAT 2 — Layout fájlok frissítése

### 2.1 `src/lib/seo.ts` frissítése

A `SITE_URL` és `SITE_NAME` konstansokat cseréld le a `CURRENT_CONFIG`-ra:

```ts
// src/lib/seo.ts — frissített importok és konstansok

import { CURRENT_CONFIG } from "../i18n/index.ts";

// RÉGI sorok törlése:
// export const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? "https://eszkoztár.hu";
// export const SITE_NAME = "EszközTár";
// export const SITE_DESCRIPTION = "...";

// ÚJ:
export const SITE_URL = CURRENT_CONFIG.siteUrl;
export const SITE_NAME = CURRENT_CONFIG.siteName;
// SITE_DESCRIPTION marad a tool-registry-ből jön vagy t() kulcsból

// A többi függvény (buildCanonical, breadcrumbSchema, stb.) változatlan marad –
// automatikusan az új SITE_URL-t használja.
```

---

### 2.2 `src/layouts/BaseLayout.astro` frissítése

Cseréld le az összes hardcoded magyar szöveget `t()` hívásokra:

```astro
---
// Új importok a meglévők mellé:
import { t, tpl, CURRENT_CONFIG, CURRENT_LANG } from "../i18n/index.ts";
import { getLocalizedCategories } from "../lib/tool-registry.ts";

// Kategóriák lokalizálva:
const localizedCategories = getLocalizedCategories(CURRENT_LANG);

// SITE_NAME és SITE_URL a CURRENT_CONFIG-ból:
const { siteName, siteUrl, lang, locale } = CURRENT_CONFIG;
---
```

**HTML lang attribútum** — cseréld ki:
```astro
<!-- RÉGI: -->
<html lang="hu" class="no-js">

<!-- ÚJ: -->
<html lang={lang} class="no-js" dir={CURRENT_CONFIG.dir}>
```

**OG locale** — frissítsd:
```astro
<!-- RÉGI: -->
<meta property="og:locale" content="hu_HU" />

<!-- ÚJ: -->
<meta property="og:locale" content={locale} />
```

**Nav keresés gomb:**
```astro
<!-- RÉGI: -->
aria-label="Keresés az eszközök között"
...
<span class="nav-search-label">Keresés</span>

<!-- ÚJ: -->
aria-label={t("nav.search_label")}
...
<span class="nav-search-label">{t("nav.search_text")}</span>
```

**Dark mode toggle:**
```astro
<!-- RÉGI: -->
aria-label="Téma váltása" title="Téma váltása"

<!-- ÚJ: -->
aria-label={t("nav.theme_toggle")} title={t("nav.theme_toggle")}
```

**Footer tagline:**
```astro
<!-- RÉGI: -->
{totalCount} ingyenes online eszköz – szerverfeltöltés nélkül, teljesen privát.

<!-- ÚJ: -->
{tpl("footer.tagline", { count: String(totalCount) })}
```

**Footer copyright:**
```astro
<!-- RÉGI: -->
© {new Date().getFullYear()} {SITE_NAME} · Minden feldolgozás a böngésződben történik

<!-- ÚJ: -->
© {new Date().getFullYear()} {siteName} · {t("footer.copyright")}
```

**Footer linkek:**
```astro
<!-- RÉGI: -->
<a href="/adatvedelmi-nyilatkozat">Adatvédelem</a>

<!-- ÚJ: -->
<a href="/adatvedelmi-nyilatkozat">{t("footer.privacy")}</a>
<a href="/sitemap.xml">{t("footer.sitemap")}</a>
```

**Kategória nav** — cseréld `CATEGORIES`-t `localizedCategories`-re:
```astro
<!-- RÉGI: -->
{CATEGORIES.map((cat) => (

<!-- ÚJ: -->
{localizedCategories.map((cat) => (
```

---

### 2.3 `src/layouts/ToolLayout.astro` frissítése

Importáld a `t()` és `tpl()` helpereket, és cseréld ki a hardcoded szövegeket:

```astro
---
import { t, tpl, CURRENT_LANG } from "../i18n/index.ts";
import { getLocalizedTool } from "../lib/tool-registry.ts";

// Tool lokalizálása:
const localizedTool = getLocalizedTool(tool, CURRENT_LANG);
// Ezután localizedTool-t használj tool helyett az összes szövegnél
---
```

**Privacy note:**
```astro
<!-- RÉGI: -->
🔒 A fájlok nem kerülnek szerverre...

<!-- ÚJ: -->
{t("tool.privacy_note")}
```

**Coming soon szövegek:**
```astro
<!-- RÉGI: -->
Hamarosan elérhető / Ez az eszköz még fejlesztés alatt áll...

<!-- ÚJ: -->
{t("tool.coming_soon_title")} / {t("tool.coming_soon_desc")}
```

**Kapcsolódó eszközök:**
```astro
<!-- RÉGI: -->
Kapcsolódó eszközök

<!-- ÚJ: -->
{t("tool.related")}
```

**FAQ szekció cím:**
```astro
<!-- RÉGI: -->
Gyakori kérdések

<!-- ÚJ: -->
{t("faq.title")}
```

---

### 2.4 `src/components/sections/ToolContentSection.astro` frissítése

```astro
---
import { t, tpl } from "../../i18n/index.ts";
---

<!-- RÉGI: -->
<h2>Hogyan használd a {toolName}-t?</h2>

<!-- ÚJ: -->
<h2>{tpl("tool.how_to_title", { name: toolName })}</h2>

<!-- Hasonlóan: -->
<!-- "Mikor van rá szükséged?" → t("tool.use_cases_title") -->
<!-- "Hasznos tippek" → t("tool.tips_title") -->
```

---

### 2.5 `src/pages/404.astro` frissítése

```astro
---
import { t } from "../i18n/index.ts";
---

<!-- Minden hardcoded szöveget cseréld t() hívásokra -->
<!-- 404.title, 404.subtitle, 404.back_home, 404.suggestions -->
```

---

### 2.6 `src/lib/seo.ts` — schema szövegek lokalizálása

A `howToSchema()` és `techArticleSchema()` függvényekben cseréld ki a hardcoded magyar szövegeket:

```ts
import { t, tpl, CURRENT_CONFIG } from "../i18n/index.ts";

// howToSchema()-ban:
name: tpl("schema.how_to_name", { name: tool.h1 }),
totalTime: t("schema.total_time"),
estimatedCost: {
  "@type": "MonetaryAmount",
  currency: t("schema.cost_currency"),
  value: "0",
},
browserRequirements: t("schema.browser_req"),

// featureList-ben:
featureList: [
  t("schema.feature_private"),
  t("schema.feature_worker"),
  t("schema.feature_free"),
],

// inLanguage mindenhol:
inLanguage: CURRENT_CONFIG.lang,
```

---

## FELADAT 3 — Build konfiguráció

### 3.1 `astro.config.mjs` frissítése

```js
// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// SITE_LANG env változó határozza meg a nyelvet
// Alapértelmezett: "hu"
const SITE_LANG = process.env.SITE_LANG ?? "hu";
const SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://konvertalo.hu";

export default defineConfig({
  output: "static",
  site: SITE_URL,

  // Astro vite define – build-time konstansok
  // FONTOS: az import.meta.env.SITE_LANG ezt olvassa
  vite: {
    define: {
      // Ezek build-kor beégetődnek a JS-be
    },
    worker: { format: "es" },
    build: {
      rollupOptions: {
        output: { manualChunks: { svelte: ["svelte"] } },
      },
    },
    optimizeDeps: { exclude: ["fflate", "jszip"] },
  },

  integrations: [svelte()],

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  build: {
    inlineStylesheets: "auto",
  },
});
```

### 3.2 `.env` fájlok

Hozd létre (nem kerülnek Git-be, csak lokális dev-hez):

```bash
# .env.hu (magyar fejlesztés)
SITE_LANG=hu
PUBLIC_SITE_URL=https://konvertalo.hu

# .env.ro (román fejlesztés)
SITE_LANG=ro
PUBLIC_SITE_URL=https://instrumenteonline.ro
```

`.gitignore`-ba add hozzá:
```
.env.hu
.env.ro
.env.local
```

### 3.3 `package.json` scripts bővítése

```json
{
  "scripts": {
    "dev": "astro dev",
    "dev:ro": "SITE_LANG=ro PUBLIC_SITE_URL=https://instrumenteonline.ro astro dev",
    "build": "astro build",
    "build:hu": "SITE_LANG=hu PUBLIC_SITE_URL=https://konvertalo.hu astro build",
    "build:ro": "SITE_LANG=ro PUBLIC_SITE_URL=https://instrumenteonline.ro astro build",
    "build:all": "pnpm build:hu && pnpm build:ro",
    "preview": "astro preview",
    "gen-pages": "node scripts/gen-pages.mjs",
    "gen-pages:force": "node scripts/gen-pages.mjs --force",
    "gen-pages:dry": "node scripts/gen-pages.mjs --dry-run"
  }
}
```

---

## FELADAT 4 — Netlify konfiguráció

### 4.1 `netlify.hu.toml` — magyar site

```toml
[build]
  command = "pnpm build:hu"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9"
  SITE_LANG = "hu"
  PUBLIC_SITE_URL = "https://konvertalo.hu"

[[redirects]]
  from = "/jpg-to-webp"
  to = "/kep/jpg-webp"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 4.2 `netlify.ro.toml` — román site

```toml
[build]
  command = "pnpm build:ro"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9"
  SITE_LANG = "ro"
  PUBLIC_SITE_URL = "https://instrumenteonline.ro"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 4.3 Netlify deploy beállítás (manuálisan a Netlify UI-ban)

**Site #1 (konvertalo.hu):**
- Repository: ugyanaz a GitHub repo
- Base directory: (üres)
- Build command: `pnpm build:hu`
- Publish directory: `dist`
- Environment variables: `SITE_LANG=hu`, `PUBLIC_SITE_URL=https://konvertalo.hu`
- Custom domain: `konvertalo.hu`

**Site #2 (instrumenteonline.ro):**
- Repository: ugyanaz a GitHub repo
- Base directory: (üres)
- Build command: `pnpm build:ro`
- Publish directory: `dist`
- Environment variables: `SITE_LANG=ro`, `PUBLIC_SITE_URL=https://instrumenteonline.ro`
- Custom domain: `instrumenteonline.ro`

---

## FELADAT 5 — GitHub Actions dual-deploy

Hozd létre: `.github/workflows/deploy.yml`

```yaml
# .github/workflows/deploy.yml
# Minden main branch push után mindkét site újra deployol

name: Deploy All Sites

on:
  push:
    branches: [main]
  workflow_dispatch:  # Manuális trigger is lehetséges

jobs:
  deploy-hu:
    name: Deploy konvertalo.hu
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:hu
        env:
          SITE_LANG: hu
          PUBLIC_SITE_URL: https://konvertalo.hu
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist --site=${{ secrets.NETLIFY_SITE_ID_HU }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}

  deploy-ro:
    name: Deploy instrumenteonline.ro
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:ro
        env:
          SITE_LANG: ro
          PUBLIC_SITE_URL: https://instrumenteonline.ro
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist --site=${{ secrets.NETLIFY_SITE_ID_RO }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

**GitHub Secrets beállítása** (Settings → Secrets → Actions):
- `NETLIFY_AUTH_TOKEN` — Netlify User Settings → Personal access tokens
- `NETLIFY_SITE_ID_HU` — konvertalo.hu Netlify site ID (Site settings → General)
- `NETLIFY_SITE_ID_RO` — instrumenteonline.ro Netlify site ID

---

## FELADAT 6 — ÚJ NYELV HOZZÁADÁSA (jövőbeli bővítés)

Ha pl. szlovák (`sk`) nyelvet akarsz hozzáadni, **csak ezt a 4 lépést kell megtenni:**

```
1. src/i18n/sk.json  ← hu.json másolata + AI-fordítás
2. src/i18n/index.ts → SupportedLang típusba: "hu" | "ro" | "sk"
   → LANG_CONFIG-ba: sk: { lang: "sk", locale: "sk_SK", siteName: "...", siteUrl: "..." }
   → TRANSLATIONS-ba: import skTranslations from "./sk.json";
3. package.json → "build:sk": "SITE_LANG=sk PUBLIC_SITE_URL=https://... astro build"
4. Netlify Site #3 létrehozása + GitHub Secret hozzáadása
```

A teljes scaffold kódjából **egyetlen fájlt sem kell módosítani** — az `index.ts`-en kívül.

---

## FELADAT 7 — Ellenőrzőlista

### Build tesztek
```bash
pnpm build:hu  # Sikeres? dist/ tartalmaz hu tartalmat?
pnpm build:ro  # Sikeres? dist/ tartalmaz ro tartalmat?
pnpm dev:ro    # localhost:4321 románul jelenik meg?
```

### Vizuális ellenőrzés
- [ ] `<html lang="ro">` a román buildben
- [ ] `<meta property="og:locale" content="ro_RO">` román buildben
- [ ] Nav gombok románul: "Căutare", "Schimbă tema"
- [ ] Footer tagline románul
- [ ] FAQ szekció cím románul: "Întrebări frecvente"
- [ ] SITE_NAME román buildben: "InstrumenteOnline" (nem "EszközTár")
- [ ] Canonical URL: `https://instrumenteonline.ro/...` (nem konvertalo.hu)

### SEO ellenőrzés
- [ ] `sitemap.xml` román buildben `https://instrumenteonline.ro/` URL-eket tartalmaz
- [ ] Schema `inLanguage: "ro"` a román buildben
- [ ] `estimatedCost.currency: "RON"` a román buildben

### Amit NEM kell fordítani (azonos marad):
- Tool UI komponensek (Svelte) belső logikája
- Worker fájlok (adat feldolgozás, nyelvfüggetlen)
- CSS stílusok
- Képformátumok, fájlkiterjesztések

---

## FELADAT 8 — Nyelv-specifikus tartalom szűrés

### Koncepció

Két szintű szűrés, öröklési logikával:

```
Kategória languages: ["hu"]
    → az egész kategória (landing page + összes tool) csak hu-n jelenik meg
    → nav-ban sem szerepel ro buildben
    → sitemap-ből is kimarad

Tool languages: ["hu"]
    → csak ez az egy tool van kizárva ro-ról
    → a kategória többi toolja megjelenik ro-n

Prioritás: tool szintű felülírja a kategória szintűt
    → ha kategória ["hu","ro"] de tool ["hu"] → a tool csak hu-n jelenik meg
```

---

### 8.1 Interface bővítések — `src/lib/tool-registry.ts`

```ts
// Category interface bővítés:
export interface Category {
  // ... meglévő mezők változatlanul ...

  /** Melyik nyelveken jelenjen meg ez a kategória (landing + összes tool).
   *  Ha nincs megadva = minden támogatott nyelven megjelenik.
   *  Példa: languages: ["hu"] → csak magyar buildben szerepel */
  languages?: SupportedLang[];
}

// Tool interface bővítés:
export interface Tool {
  // ... meglévő mezők változatlanul ...

  /** Melyik nyelveken jelenjen meg ez a tool.
   *  Ha nincs megadva = örökli a szülő kategória beállítását.
   *  Ha a kategória sincs korlátozva = minden nyelven megjelenik.
   *  Tool szintű beállítás felülírja a kategória szintűt.
   *  Példa: languages: ["hu"] → csak magyar buildben szerepel */
  languages?: SupportedLang[];
}
```

---

### 8.2 Szűrő helperek — `src/lib/tool-registry.ts`

Add hozzá a fájl végén lévő helperek mellé:

```ts
// src/lib/tool-registry.ts — ÚJ szűrő helperek

import { CURRENT_LANG } from "../i18n/index.ts";
import type { SupportedLang } from "../i18n/index.ts";

/**
 * Meghatározza hogy az adott tool megjelenik-e az aktuális nyelven.
 * Öröklési logika:
 *   1. Ha a tool-on van languages mező → azt nézi
 *   2. Ha nincs → a szülő kategória languages mezőjét nézi
 *   3. Ha egyik sincs → megjelenik minden nyelven
 */
export function isToolVisibleInLang(
  tool: Tool,
  lang: SupportedLang = CURRENT_LANG
): boolean {
  // Tool szintű korlátozás
  if (tool.languages && tool.languages.length > 0) {
    return tool.languages.includes(lang);
  }
  // Kategória szintű öröklés
  const category = CATEGORIES.find(c => c.id === tool.category);
  if (category?.languages && category.languages.length > 0) {
    return category.languages.includes(lang);
  }
  // Nincs korlátozás → megjelenik
  return true;
}

/**
 * Meghatározza hogy az adott kategória megjelenik-e az aktuális nyelven.
 * Ha a kategória ki van zárva, a nav-ból és a sitemap-ből is kimarad.
 */
export function isCategoryVisibleInLang(
  category: Category,
  lang: SupportedLang = CURRENT_LANG
): boolean {
  if (category.languages && category.languages.length > 0) {
    return category.languages.includes(lang);
  }
  return true;
}

/**
 * Visszaadja az aktuális nyelvhez tartozó aktív tool-okat.
 * Felülírja a meglévő getActiveTools() függvényt — azt cseréld le erre.
 */
export function getVisibleActiveTools(lang: SupportedLang = CURRENT_LANG): Tool[] {
  return tools.filter(
    t => t.status === "active" && isToolVisibleInLang(t, lang)
  );
}

/**
 * Visszaadja az aktuális nyelvhez tartozó összes tool-t (active + coming-soon).
 */
export function getVisibleTools(lang: SupportedLang = CURRENT_LANG): Tool[] {
  return tools.filter(t => isToolVisibleInLang(t, lang));
}

/**
 * Visszaadja az aktuális nyelvhez tartozó kategóriákat.
 * Csak azok a kategóriák szerepelnek amikben van legalább 1 visible tool.
 */
export function getVisibleCategories(lang: SupportedLang = CURRENT_LANG): Category[] {
  return CATEGORIES.filter(cat => {
    // Kategória szintű szűrés
    if (!isCategoryVisibleInLang(cat, lang)) return false;
    // Csak akkor szerepel ha van benne legalább 1 visible tool
    const hasVisibleTool = tools.some(
      t => t.category === cat.id && isToolVisibleInLang(t, lang)
    );
    return hasVisibleTool;
  });
}
```

---

### 8.3 Meglévő helyhivatkozások frissítése

Minden helyen ahol `getActiveTools()`, `getAllTools()` vagy `CATEGORIES` van használva,
cseréld le a nyelv-tudatos verziókra:

| Régi | Új |
|---|---|
| `getActiveTools()` | `getVisibleActiveTools(CURRENT_LANG)` |
| `getAllTools()` | `getVisibleTools(CURRENT_LANG)` |
| `CATEGORIES` (nav-ban) | `getVisibleCategories(CURRENT_LANG)` |
| `CATEGORIES` (sitemap-ben) | `getVisibleCategories(CURRENT_LANG)` |

**Érintett fájlok:**
- `src/layouts/BaseLayout.astro` — nav kategória lista
- `src/pages/index.astro` — főoldal tool lista
- `src/pages/sitemap.xml.ts` — sitemap generálás
- `src/pages/404.astro` — javasolt toolok
- `src/pages/og/[category]/[slug].png.ts` — OG kép generálás

---

### 8.4 Kategória landing page szűrés

A kategória landing page-eken (`src/pages/[category]/index.astro` vagy `CategoryLayout.astro`)
a tool lista generálásakor szűrd a visible tool-okat:

```astro
---
import { getVisibleTools, isCategoryVisibleInLang } from "../../lib/tool-registry.ts";
import { CURRENT_LANG } from "../../i18n/index.ts";

// Ha a kategória nem látható az aktuális nyelvben → 404
if (!isCategoryVisibleInLang(category, CURRENT_LANG)) {
  return Astro.redirect("/404");
}

// Csak a visible tool-ok jelennek meg
const categoryTools = getVisibleTools(CURRENT_LANG)
  .filter(t => t.category === category.id);
---
```

---

### 8.5 Tool oldal szűrés

Az egyedi tool oldalakon (`src/pages/[category]/[slug].astro`) add hozzá:

```astro
---
import { isToolVisibleInLang } from "../../lib/tool-registry.ts";
import { CURRENT_LANG } from "../../i18n/index.ts";

// Ha a tool nem látható az aktuális nyelvben → 404
if (!isToolVisibleInLang(tool, CURRENT_LANG)) {
  return Astro.redirect("/404");
}
---
```

---

### 8.6 Példák a registry-ben

```ts
// PÉLDA 1: Egész kategória csak magyar oldalon
{
  id: "seo",
  label: "SEO",
  languages: ["hu"],   // ← az összes SEO tool csak hu-n jelenik meg
  // ...
},

// PÉLDA 2: Egy konkrét tool csak magyar oldalon
{
  slug: "mertekegyseg-atvalto",
  category: "szoveg",
  languages: ["hu"],   // ← csak hu buildben generálódik oldal
  // ...
},

// PÉLDA 3: Egy tool ami ro-n is megjelenik, de a kategória alapból hu-only
{
  slug: "jpg-webp",
  category: "kep",
  languages: ["hu", "ro"],  // ← felülírja a kategória szintű korlátozást
  // ...
},

// PÉLDA 4: Nincs languages mező → minden nyelven megjelenik (alapértelmezett)
{
  slug: "csv-json",
  category: "adat",
  // languages nincs megadva → hu + ro + minden jövőbeli nyelv
  // ...
},
```

---

### 8.7 Sitemap szűrés

A `src/pages/sitemap.xml.ts`-ben a tool és kategória lista generálásakor
használd a visible helpereket:

```ts
import { getVisibleTools, getVisibleCategories } from "../lib/tool-registry.ts";
import { CURRENT_LANG } from "../i18n/index.ts";

const visibleTools = getVisibleTools(CURRENT_LANG);
const visibleCategories = getVisibleCategories(CURRENT_LANG);

// Ezek alapján generáld a sitemap URL-eket
// → ki nem zárja a hu-only tool-okat a ro sitemap-ből automatikusan
```

---

### 8.8 Ellenőrzőlista

```bash
pnpm build:hu  # SEO kategória megjelenik
pnpm build:ro  # SEO kategória NEM jelenik meg (ha languages: ["hu"])
```

- [ ] `getVisibleCategories("ro")` nem tartalmazza a hu-only kategóriákat
- [ ] A ro buildben a hu-only tool URL-ekre 404 jön (nem üres oldal)
- [ ] A ro sitemap nem tartalmaz hu-only URL-eket
- [ ] A nav-ban ro buildben nem látszik a hu-only kategória
- [ ] Új nyelv hozzáadásakor a `languages: ["hu"]` tool-ok automatikusan ki vannak zárva

---

## Összefoglalás – módosított fájlok

| Fájl | Változás |
|---|---|
| `src/i18n/index.ts` | ÚJ – t(), tpl(), CURRENT_LANG, LANG_CONFIG |
| `src/i18n/hu.json` | ÚJ – magyar szövegek |
| `src/i18n/ro.json` | ÚJ – román szövegek |
| `src/lib/tool-registry.ts` | MÓDOSÍTVA – ToolI18n interface, languages mező, getLocalizedTool(), isToolVisibleInLang(), getVisibleCategories() |
| `src/lib/seo.ts` | MÓDOSÍTVA – SITE_URL/SITE_NAME CURRENT_CONFIG-ból |
| `src/layouts/BaseLayout.astro` | MÓDOSÍTVA – t() hívások, lang attrib, lokalizált kategóriák |
| `src/layouts/ToolLayout.astro` | MÓDOSÍTVA – t() hívások, getLocalizedTool() |
| `src/components/sections/ToolContentSection.astro` | MÓDOSÍTVA – t()/tpl() hívások |
| `src/pages/404.astro` | MÓDOSÍTVA – t() hívások |
| `astro.config.mjs` | MÓDOSÍTVA – SITE_LANG/PUBLIC_SITE_URL env kezelés |
| `package.json` | MÓDOSÍTVA – build:hu, build:ro, dev:ro scripts |
| `netlify.hu.toml` | ÚJ – magyar Netlify konfig |
| `netlify.ro.toml` | ÚJ – román Netlify konfig |
| `.github/workflows/deploy.yml` | ÚJ – dual-deploy GitHub Actions |
