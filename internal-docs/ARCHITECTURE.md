# Tool House -- Fejlesztoi Dokumentacio

> **Belso hasznalatra** -- fejlesztoknek es AI asszisztenseknek, akik a kodbazisat modositjak.
> Utolso frissites: 2026-03-01

---

## Tartalomjegyzek

1. [Projekt Attekintes](#1-projekt-attekintes)
2. [Architektura](#2-architektura)
3. [i18n Rendszer](#3-i18n-rendszer)
4. [URL Rendszer](#4-url-rendszer)
5. [Tool Registry](#5-tool-registry)
6. [Komponens Architektura](#6-komponens-architektura)
7. [SEO](#7-seo)
8. [Analytics](#8-analytics)
9. [Tartalom (Content)](#9-tartalom-content)
10. [Timing es Delay Rendszer](#10-timing-es-delay-rendszer)
11. [Middleware es Biztonsag](#11-middleware-es-biztonsag)
12. [Gyakori Hibak es Tanulsagok](#12-gyakori-hibak-es-tanulsagok)
13. [Uj Nyelv Hozzaadasa (Checklist)](#13-uj-nyelv-hozzaadasa-checklist)
14. [Uj Eszkoz Hozzaadasa (Checklist)](#14-uj-eszkoz-hozzaadasa-checklist)

---

## 1. Projekt Attekintes

### Mi ez?

A Tool House egy **online eszkozgyujtemeny** (ingyenes, szervermentes webes eszkozok), amely a felhasznalok bongeszoiben fut. Minden feldolgozas kliens-oldalon tortenik -- a felhasznalok fajljai soha nem hagynak el a gepet.

### Tech Stack

| Technologia       | Verzio  | Szerep                                    |
|--------------------|---------|-------------------------------------------|
| **Astro**          | 5.x     | SSG framework, oldalak generalasa         |
| **Svelte**         | 5.x     | Interaktiv UI komponensek (islands)       |
| **TypeScript**     | 5.5+    | Tipusbiztos fejlesztes                    |
| **pdf-lib**        | 1.17    | PDF manipulacio bongeszoben               |
| **pdfjs-dist**     | 5.4     | PDF rendereles                            |
| **xlsx**           | 0.18    | Excel fajlok olvasasa/irasa               |
| **jszip / fflate** | -       | ZIP tomoriteshez                          |
| **js-yaml**        | 4.1     | YAML parseolas                            |
| **satori + resvg** | -       | OG kepek generalasa (devDependency)       |

### Ket Domain

A projekt **ket kulonallo weboldalat** szolgal ki, egyetlen kodbazisobol:

| Nyelv  | Domain                     | ENV valtozok                                                    |
|--------|----------------------------|-----------------------------------------------------------------|
| Magyar | `https://konvertalo.hu`    | `PUBLIC_SITE_LANG=hu PUBLIC_SITE_URL=https://konvertalo.hu`     |
| Roman  | `https://instrumenteonline.ro` | `PUBLIC_SITE_LANG=ro PUBLIC_SITE_URL=https://instrumenteonline.ro` |

**FONTOS**: A nyelvvaltas **build-time** tortenik, NEM runtime! Ket kulonallo build fut, ket kulonallo statikus kimenettel.

### Szamok

- **93+ eszkoz** 10 kategoriaban
- Kategoriak: kep, pdf, adat, szoveg, fejleszto, markdown, html, excel, fajl, seo
- Minden eszkoz bongeszoben fut, szerver nelkul

---

## 2. Architektura

### Astro SSG + Svelte Islands

Az alkalmazas az **Astro Islands** architekturan alapul:

- **Astro (.astro fajlok)**: Server-side rendered HTML -- layout, SEO meta, breadcrumb, FAQ szekciok. Ezek build-kor generalt statikus HTML-le valnak.
- **Svelte (.svelte fajlok)**: Kliens-oldali interaktiv komponensek, amelyek `client:visible` direktivaval toltodnek be (lazy hydration). Ezek az eszkozok UI-jai.

```
Browser kap:
  [Statikus HTML (Astro)] + [Svelte island-ok (interaktiv)]
```

### Fajlstruktura

```
C:\dev\tool_house\
|
|-- astro.config.mjs              # Astro konfiguracio (output: static, svelte, vite)
|-- package.json                  # Fuggosegek es npm script-ek
|-- netlify.toml                  # Netlify deploy konfiguracio (alap)
|-- netlify.hu.toml               # HU-specifikus deploy beallitasok
|-- netlify.ro.toml               # RO-specifikus deploy beallitasok
|
|-- src/
|   |-- i18n/
|   |   |-- index.ts              # CURRENT_LANG, t(), tpl(), LangConfig, CURRENT_CONFIG
|   |   |-- hu.json               # Magyar UI forditasok (Astro .astro fajlokhoz)
|   |   +-- ro.json               # Roman UI forditasok (Astro .astro fajlokhoz)
|   |
|   |-- lib/
|   |   |-- tool-registry.ts      # **KOZPONTI REGISTRY** -- minden eszkoz definicioja
|   |   |-- ui-labels.ts          # Svelte komponensek UI szovegei (build-time nyelv)
|   |   |-- url-map.ts            # Kategoria es statikus oldal URL slug-ok nyelvenket
|   |   |-- url-utils.ts          # toolUrl(), categoryUrl(), staticUrl() helperek
|   |   |-- seo.ts                # Schema.org JSON-LD, canonical, breadcrumb
|   |   |-- analytics.ts          # Google Analytics / GTM tracking
|   |   |-- timing-config.ts      # Konvertalas/letoltes delay-ek (AdSense eloterv)
|   |   |
|   |   |-- content/              # Magyar SEO tartalom
|   |   |   |-- types.ts          # ToolSEOData, ContentMap tipusok
|   |   |   |-- kep-content.ts    # Kep eszkozok tartalma
|   |   |   |-- adat-content.ts   # Adat eszkozok tartalma
|   |   |   |-- szoveg-content.ts # Szoveg eszkozok tartalma
|   |   |   |-- fejleszto-content.ts
|   |   |   +-- pdf-excel-other-content.ts
|   |   |
|   |   |-- content/ro/           # Roman SEO tartalom (overlay)
|   |   |   |-- kep-content.ts
|   |   |   |-- adat-content.ts
|   |   |   |-- szoveg-content.ts
|   |   |   |-- fejleszto-content.ts
|   |   |   +-- pdf-excel-other-content.ts
|   |   |
|   |   +-- i18n/                 # Roman tool-szintu forditasok (slug, title, h1, desc)
|   |       |-- ro-tools-kep.ts
|   |       |-- ro-tools-pdf.ts
|   |       |-- ro-tools-adat.ts
|   |       |-- ro-tools-szoveg.ts
|   |       |-- ro-tools-fejleszto.ts
|   |       |-- ro-tools-markdown.ts
|   |       |-- ro-tools-html.ts
|   |       |-- ro-tools-excel.ts
|   |       +-- ro-tools-fajl-seo.ts
|   |
|   |-- layouts/
|   |   |-- BaseLayout.astro      # HTML skeleton, <head>, nav, footer, SEO meta
|   |   |-- ToolLayout.astro      # Tool oldalak: breadcrumb, FAQ, schema, related tools
|   |   +-- CategoryLayout.astro  # Kategoria landing: tool lista, intro szoveg
|   |
|   |-- pages/
|   |   |-- index.astro           # Fooldal (hero + tabbed tool directory)
|   |   |-- 404.astro             # 404 oldal
|   |   |-- sitemap.xml.ts        # Dinamikus sitemap generalas
|   |   |-- [staticPage].astro    # Dinamikus route: rolunk, kapcsolat, kereses, stb.
|   |   |-- [category]/
|   |   |   |-- index.astro       # Dinamikus kategoria landing (10 oldal)
|   |   |   +-- [slug].astro      # Dinamikus tool oldal (93+ oldal)
|   |   |-- og/                   # OG kep generalas (build-time)
|   |   +-- hero/                 # Hero kep generalas
|   |
|   |-- components/
|   |   |-- tools/
|   |   |   |-- DynamicTool.svelte  # Wrapper: dinamikusan importalja a tool komponenst
|   |   |   |-- kep/               # Kep eszkozok Svelte komponensei (21 fajl)
|   |   |   |-- pdf/               # PDF eszkozok
|   |   |   |-- adat/              # Adat eszkozok
|   |   |   |-- szoveg/            # Szoveg eszkozok
|   |   |   |-- fejleszto/         # Fejleszto eszkozok
|   |   |   |-- markdown/          # Markdown eszkozok
|   |   |   |-- html/              # HTML eszkozok
|   |   |   |-- excel/             # Excel eszkozok
|   |   |   |-- fajl/              # Fajl eszkozok
|   |   |   |-- seo/               # SEO eszkozok
|   |   |   +-- shared/            # Megosztott: ImageConvertTool, TextTransformTool, CodeFormatterTool
|   |   |
|   |   |-- ui/                   # Ujrahasznalhato UI komponensek
|   |   |   |-- Dropzone.svelte       # Fajlfeltoltes (drag & drop)
|   |   |   |-- ConvertButton.svelte   # Ketfazisu gomb (delay-ekkel)
|   |   |   |-- ProgressQueue.svelte   # Tomeges feldolgozas progress
|   |   |   |-- SearchOverlay.svelte   # Kereses overlay (Ctrl+K)
|   |   |   |-- SearchPage.svelte      # Kereses oldal
|   |   |   |-- ToastNotification.svelte # Toast ertesitesek
|   |   |   +-- AdSlot.svelte         # AdSense placeholder
|   |   |
|   |   |-- home/
|   |   |   +-- ToolTabs.svelte   # Fooldal tabbed eszkozlista
|   |   |
|   |   |-- sections/
|   |   |   +-- ToolContentSection.astro  # SEO tartalom szekciok (howTo, useCases, stb.)
|   |   |
|   |   +-- static-pages/         # Statikus oldal komponensek
|   |       |-- KeresPage.astro
|   |       |-- RolunkPage.astro
|   |       |-- KapcsolatPage.astro
|   |       |-- KoszonjukPage.astro
|   |       +-- AdatvedelmiPage.astro
|   |
|   |-- styles/
|   |   +-- global.css            # Globalis stilusok, CSS valtozok
|   |
|   +-- middleware.ts             # Security headers + Cache-Control
|
|-- dist/                         # Build kimenet (NE SZERKESZ KEZZEL!)
+-- internal-docs/                # Belso fejlesztoi dokumentacio
```

### Build Folyamat

A ket domain ket **kulonallo** buildet igenyel. A nyelv ENV valtozokon keresztul donti el:

```bash
# Magyar (konvertalo.hu) build
npm run build:hu
# Belso parancs: cross-env PUBLIC_SITE_LANG=hu PUBLIC_SITE_URL=https://konvertalo.hu astro build

# Roman (instrumenteonline.ro) build
npm run build:ro
# Belso parancs: cross-env PUBLIC_SITE_LANG=ro PUBLIC_SITE_URL=https://instrumenteonline.ro astro build

# Mindketto egyszerre
npm run build:all

# Fejlesztoi szerver
npm run dev          # Magyar (alapertelmezett)
npm run dev:ro       # Roman
```

A build soran az Astro a `PUBLIC_SITE_LANG` valtozo alapjan:
1. Betolti a megfelelo forditasi JSON-t (`hu.json` vagy `ro.json`)
2. Alkalmazaa a megfelelo URL slug-okat
3. A Vite `import.meta.env.PUBLIC_SITE_LANG`-ot build-time behelyettesiti a Svelte komponensekbe
4. Generalja a statikus HTML oldalakat a `/dist` mappaba

### Deploy

A deploy Netlify-on tortenik, konfiguracios fajlok:
- `netlify.toml` -- alap beallitasok (build parancs, publish directory)
- `netlify.hu.toml` -- HU-specifikus beallitasok
- `netlify.ro.toml` -- RO-specifikus beallitasok

---

## 3. i18n Rendszer

### Alapelv: Build-time nyelv

A legfontosabb dolog, amit meg kell erteni: a nyelvvaltas **NEM runtime-ban tortenik**. A `PUBLIC_SITE_LANG` env valtozo a build-kor rogzitodik, es minden fajlba bele lesz egetve.

### CURRENT_LANG es CURRENT_CONFIG

**Fajl**: `src/i18n/index.ts`

```typescript
// A build-kor aktiv nyelv
export const CURRENT_LANG: SupportedLang =
  (import.meta.env.PUBLIC_SITE_LANG as SupportedLang) ?? "hu";

// Nyelv-specifikus site konfiguracio
export const CURRENT_CONFIG: LangConfig = LANG_CONFIG[CURRENT_LANG];
```

A `LangConfig` interface:

```typescript
export interface LangConfig {
  lang: SupportedLang;    // HTML lang attribut ("hu" | "ro")
  locale: string;         // OG locale (pl. "hu_HU", "ro_RO")
  siteName: string;       // Site neve ("Konvertalo.hu" | "InstrumenteOnline")
  siteUrl: string;        // Canonical base URL
  dir: "ltr" | "rtl";    // Szoveg iranya
  gtagId: string;         // Google Analytics 4 meresi ID (ures = kikapcsolva)
  gtmId: string;          // Google Tag Manager ID (ures = kikapcsolva)
}
```

### A harom i18n reteg

A rendszer harom kulon retegben kezeli a forditasokat, es **kritikus** megerteni, melyik hol es hogyan mukodik:

#### 1. reteg: Astro forditasok -- `t()` es `tpl()`

**Hol**: Kizarolag `.astro` fajlokban (server-side rendered).
**Fajlok**: `src/i18n/hu.json`, `src/i18n/ro.json`
**Hasznalat**:

```astro
---
import { t, tpl } from "../i18n/index.ts";
---
<h1>{t("home.hero_title_line1")}</h1>
<p>{tpl("footer.count", { count: "42" })}</p>
```

A `t()` kulcs alapjan keres a JSON fajlban, fallback a magyar verzio. A `tpl()` interpolaciot is tamogat (`{{valtozo}}`).

**FONTOS**: A `t()` **NEM hasznalhato Svelte komponensekben**, mert az Astro server-side lefut, a Svelte meg kliens-oldalon.

#### 2. reteg: Svelte UI szovegek -- `ui-labels.ts`

**Hol**: Kizarolag Svelte `.svelte` fajlokban (kliens-oldali).
**Fajl**: `src/lib/ui-labels.ts`

```typescript
const LANG = (import.meta.env.PUBLIC_SITE_LANG as string) || "hu";

const labels = {
  hu: {
    copy: "Masolas",
    download: "Letoltes",
    dragHere: "Huzd ide a fajlt, vagy kattints a tallozashoz",
    // ... 100+ label
  },
  ro: {
    copy: "Copiaza",
    download: "Descarca",
    dragHere: "Trage fisierul aici sau fa clic pentru a rasfi",
    // ... 100+ label
  },
};

export const ui = labels[LANG as keyof typeof labels] ?? labels.hu;
```

**Hasznalat Svelte-ben**:

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
</script>
<button>{ui.download}</button>
```

Az `import.meta.env.PUBLIC_SITE_LANG` build-time Vite altal helyettesitodik, igy a `LANG` konstans lesz. A tree-shaking kidobja a nem hasznalt nyelvi objektumot.

**SZABALY**: Minden felhasznaloi szoveg, amit Svelte komponens jelenitt meg, az `ui-labels.ts`-be kerul. Soha ne hasznald a `t()`-t Svelte-ben!

#### 3. reteg: Tool adatok -- `tool-registry.ts` i18n

**Hol**: Tool meta-adatok (title, h1, description, slug, keywords, faq, content).
**Fajlok**:
- `src/lib/i18n/ro-tools-*.ts` -- Roman tool forditasok (slug, title, h1, desc, keywords)
- `src/lib/content/ro/*.ts` -- Roman SEO tartalom (content, introText, guide, faq)

A tool-registry.ts build-kor **automatikusan raakasztja** a roman forditasokat a `tool.i18n.ro` mezohoz:

```typescript
// 1. lepett: Roman forditas (slug, title, h1, desc, keywords)
for (const tool of rawTools) {
  const roData = RO_TRANSLATIONS[tool.category]?.[tool.slug];
  if (roData) {
    tool.i18n = tool.i18n ?? {};
    tool.i18n.ro = { ...roData, ...(tool.i18n.ro ?? {}) };
  }
}

// 2. lepes: Roman SEO tartalom (content, introText, guide, faq)
for (const tool of rawTools) {
  const roContent = ALL_RO_CONTENT[tool.slug];
  if (roContent) {
    tool.i18n.ro!.content = roContent.content;
    tool.i18n.ro!.introText = roContent.introText;
    tool.i18n.ro!.guide = roContent.guide;
    tool.i18n.ro!.faq = roContent.faq;
  }
}
```

### Kategoriak lokalizacioja

A kategoriak kozvetlenul a `CATEGORIES` tombben tartalmaznak `i18n` override-ot:

```typescript
{
  id: "kep", label: "Kepek", icon: "...", color: "var(--cat-kep)",
  description: "Kepkonvertalas, atmeteretes...",
  i18n: {
    ro: {
      label: "Imagini",
      description: "Conversie, redimensionare...",
      intro: ["Roman bevezeto szoveg..."],
    },
  },
}
```

### Lokalizacio lekerdezese

**KRITIKUS TANULSAG**: A lokalizacio **NEM automatikus**! Explicit meg kell hivni a `getLocalizedTool()` es `getLocalizedCategory()` fuggvenyeket:

```typescript
import { getLocalizedTool, getLocalizedCategory, getCategoryInfo } from "../lib/tool-registry.ts";
import { CURRENT_LANG } from "../i18n/index.ts";

// HELYES: lokalizalt tool lekerese
const tool = getLocalizedTool(rawTool, CURRENT_LANG);

// HELYES: lokalizalt kategoria lekerese
const category = getLocalizedCategory(getCategoryInfo("kep")!, CURRENT_LANG);

// HELYTELEN: getCategoryInfo() NYERS (magyar) adatot ad vissza!
const rawCat = getCategoryInfo("kep"); // <-- mindig magyar label/description!

// HELYTELEN: getRelatedTools() NYERS adatot ad!
const rawRelated = getRelatedTools(tool); // <-- magyar title/h1/desc!

// HELYES: lokalizalni kell manualissan
const related = getRelatedTools(tool).map(t => getLocalizedTool(t, CURRENT_LANG));
```

---

## 4. URL Rendszer

### Dinamikus Route-ok

A korabban 93+ egyedi `.astro` fajl volt, most **3 dinamikus route** generalja az osszes oldalt:

| Route fajl                     | Generalja           | Pelda URL (HU)         | Pelda URL (RO)                  |
|--------------------------------|----------------------|------------------------|---------------------------------|
| `[category]/[slug].astro`      | Tool oldalak (93+)   | `/kep/jpg-webp`        | `/imagine/convertor-jpg-webp`   |
| `[category]/index.astro`       | Kategoria landingek (10) | `/kep`             | `/imagine`                      |
| `[staticPage].astro`           | Statikus oldalak (5) | `/kereses`             | `/cautare`                      |

### URL Map

**Fajl**: `src/lib/url-map.ts`

Kategoria URL slug-ok nyelvenket:

```typescript
export const CATEGORY_URLS: Record<SupportedLang, Record<CategoryId, string>> = {
  hu: { kep: "kep", pdf: "pdf", adat: "adat", szoveg: "szoveg", ... },
  ro: { kep: "imagine", pdf: "pdf", adat: "date", szoveg: "text", ... },
};
```

Statikus oldal slug-ok nyelvenket:

```typescript
export const STATIC_URLS: Record<SupportedLang, Record<string, string>> = {
  hu: { rolunk: "rolunk", kapcsolat: "kapcsolat", kereses: "kereses", ... },
  ro: { rolunk: "despre-noi", kapcsolat: "contact", kereses: "cautare", ... },
};
```

### URL Helper Fuggvenyek

**Fajl**: `src/lib/url-utils.ts`

```typescript
// Tool URL: /{lokalizaltKategoria}/{lokalizaltSlug}
toolUrl(tool)                    // Aktualis nyelv
toolUrl(tool, "hu")              // Explicit magyar
toolUrl(tool, "ro")              // Explicit roman
// Pelda HU: /kep/jpg-webp
// Pelda RO: /imagine/convertor-jpg-webp

// Kategoria URL: /{lokalizaltKategoria}
categoryUrl("kep")               // /kep (HU) vagy /imagine (RO)
categoryUrl("kep", "ro")         // /imagine

// Statikus oldal URL: /{lokalizaltSlug}
staticUrl("kapcsolat")           // /kapcsolat (HU) vagy /contact (RO)
```

### Reverse Lookup

Az URL slug-bol visszakeresheto a belso ID:

```typescript
getCategoryIdFromUrl("imagine", "ro")    // => "kep"
getCategoryIdFromUrl("kep", "hu")        // => "kep"
getStaticKeyFromUrl("cautare", "ro")     // => "kereses"
```

### Hogyan mukodik a dinamikus routing?

**`[category]/[slug].astro`** -- az Astro `getStaticPaths()` fuggvenyenel a `toolUrl()` generalja az URL-t, es abbol kepzodik a `params.category` es `params.slug`:

```typescript
export function getStaticPaths() {
  const tools = getAllTools();
  return tools.map((tool) => {
    const url = toolUrl(tool);                     // pl. "/imagine/convertor-jpg-webp"
    const parts = url.split("/").filter(Boolean);  // ["imagine", "convertor-jpg-webp"]
    return {
      params: { category: parts[0], slug: parts[1] },
      props: { tool, componentName: tool.component ?? "" },
    };
  });
}
```

**`[category]/index.astro`** -- hasonloan:

```typescript
export function getStaticPaths() {
  return CATEGORIES.map((cat) => {
    const url = categoryUrl(cat.id);  // pl. "/imagine"
    const catSlug = url.replace(/^\//, "");
    return {
      params: { category: catSlug },
      props: { categoryId: cat.id },
    };
  });
}
```

---

## 5. Tool Registry

### Kozponti Fajl

**Fajl**: `src/lib/tool-registry.ts`

Ez a **Single Source of Truth** -- minden eszkoz itt van definialva. Soha ne hardcode-olj title/description/faq adatokat mas fajlokban!

### Tool Interface

```typescript
export interface Tool {
  slug: string;              // URL slug (HU): "jpg-webp"
  category: CategoryId;      // Melyik kategoria: "kep"
  title: string;             // <title> tag szoveg
  h1: string;                // Oldalon megjeleno H1
  description: string;       // Meta description (max 160 karakter)
  keywords: string[];        // SEO keywords
  status: ToolStatus;        // "active" | "coming-soon"
  related: string[];         // Kapcsolodo tool slug-ok (max 4 jelenik meg)
  faq: ToolFAQ[];            // FAQ kerdes-valasz parok
  component?: string;        // Svelte komponens neve (pl. "JpgWebpTool")
  componentProps?: Record<string, unknown>;  // Props shared komponensekhez
  inputFormats?: string[];   // MIME tipusok (pl. ["image/jpeg", "image/png"])
  outputFormat?: string;     // Kimeneti formatum
  acceptMultiple?: boolean;  // Tobb fajl feltoltes engedelyezve
  updatedAt?: string;        // ISO datum: "2025-11-15"
  launchedAt?: string;       // ISO datum: "2025-10-01"
  introText?: string;        // Bevezeto szoveg (FAQ elott)
  guide?: string[];          // Hasznalati utmutato lepesek
  content?: ToolContent;     // Reszletes SEO tartalom szekciok
  i18n?: Partial<Record<SupportedLang, Partial<ToolI18n>>>;  // Nyelvi forditasok
  languages?: SupportedLang[];  // Melyik nyelven jelenik meg (ures = mindenhol)
}
```

### ToolI18n Interface

```typescript
export interface ToolI18n {
  slug?: string;        // Lokalizalt URL slug (pl. "convertor-jpg-webp" RO-hoz)
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  faq?: ToolFAQ[];
  introText?: string;
  guide?: string[];
  content?: ToolContent;
}
```

### Category Interface

```typescript
export interface Category {
  id: CategoryId;       // Belso ID: "kep", "pdf", "adat", stb.
  label: string;        // Megjelenites: "Kepek"
  icon: string;         // Emoji ikon: "..."
  description: string;  // Leiras
  color: string;        // CSS szin valtozo: "var(--cat-kep)"
  intro?: string[];     // Bevezeto bekezdesek a kategoria oldalon
  i18n?: Partial<Record<SupportedLang, { label: string; description: string; intro?: string[] }>>;
  languages?: SupportedLang[];  // Lathatosag korlatozas
}
```

### Fontos Export Fuggvenyek

```typescript
// Alap lekerdezesek (NEM lokalizalnak!)
getAllTools(): Tool[]
getToolBySlug(category, slug): Tool | undefined
getToolsByCategory(category): Tool[]
getActiveTools(): Tool[]
getRelatedTools(tool): Tool[]         // Max 4, NEM lokalizalt!
getCategoryInfo(id): Category         // NEM lokalizalt!
getActiveToolsCount(): number
getTotalToolsCount(): number

// Lokalizalo fuggvenyek (EXPLICIT kell hivni!)
getLocalizedTool(tool, lang?): Tool
getLocalizedCategory(cat, lang?): Category
getLocalizedCategories(lang?): Category[]

// Lathatosag (nyelv-specifikus)
isToolVisibleInLang(tool, lang?): boolean
isCategoryVisibleInLang(category, lang?): boolean
getVisibleActiveTools(lang?): Tool[]
getVisibleTools(lang?): Tool[]
getVisibleCategories(lang?): Category[]
```

### Tool Status es Lathatosag

- `status: "active"` -- Mukodo eszkoz, megjelenik a listaban, a Svelte komponens betoltodik
- `status: "coming-soon"` -- "Hamarosan" badge-dzsel jelenik meg, a tool UI nem toltodik be
- `languages: ["hu"]` -- Csak magyar nyelven jelenik meg
- `languages: undefined` -- Minden nyelven megjelenik (oroli a kategoria beallitasat)

### ToolContent (SEO Szekciok)

```typescript
export interface ToolContent {
  howToSteps: Array<{ title: string; description: string }>;      // Hasznalati utmutato
  useCases: Array<{ icon: string; title: string; description: string }>; // Felhasznalasi esetek
  formatComparison?: {                                             // Format osszehasonlitas tablazat
    title: string;
    columns: string[];
    rows: Array<{ feature: string; values: string[] }>;
  };
  aboutSection: {                                                   // "Mi ez?" szekcio
    title: string;
    paragraphs: string[];
  };
  tips?: Array<{ icon: string; tip: string }>;                     // Tippek
}
```

### SEO Tartalom Merge Logika

A `tool-registry.ts` build-kor osszefesuli a nyers tool adatokat a content fajlokbol:

1. A magyar SEO tartalom (`src/lib/content/*.ts`) `ALL_CONTENT` tomb --> merge a `rawTools` tool-okba
2. A roman forditas (`src/lib/i18n/ro-tools-*.ts`) --> merge a `tool.i18n.ro`-ba (slug, title, h1, desc, keywords)
3. A roman SEO tartalom (`src/lib/content/ro/*.ts`) --> merge a `tool.i18n.ro`-ba (content, introText, guide, faq)

---

## 6. Komponens Architektura

### Layout Hierarchia

```
BaseLayout.astro
  |-- HTML <head>: meta, canonical, OG, hreflang, schema JSON-LD
  |-- <nav>: logo, kategoria linkek, keresgomb
  |-- <slot />  <-- ide kerul a ToolLayout / CategoryLayout tartalma
  |-- <footer>
  |-- SearchOverlay.svelte (kliens-oldali kereses, Ctrl+K)
  |
  +-- ToolLayout.astro (tool oldalakhoz)
  |     |-- Breadcrumb navigacio
  |     |-- <h1> (tool.h1)
  |     |-- <slot /> <-- DynamicTool.svelte
  |     |-- IntroText (tool.introText)
  |     |-- Guide (tool.guide)
  |     |-- FAQ Accordion (tool.faq)
  |     |-- ToolContentSection.astro (howTo, useCases, about, tips)
  |     +-- Related Tools
  |
  +-- CategoryLayout.astro (kategoria oldalakhoz)
        |-- Breadcrumb
        |-- <h1> (kategoria.label)
        |-- Intro bekezdesek
        |-- Active tool karytak
        +-- Coming-soon tool karytak
```

### DynamicTool.svelte

A **kozponti wrapper**, amely dinamikusan importalja a megfelelo Svelte tool komponenst:

```svelte
<script lang="ts">
  export let componentName: string = "";
  export let componentProps: Record<string, unknown> = {};

  // Component import map -- meg kell adni MINDEN tool-t!
  const COMPONENT_IMPORTS: Record<string, () => Promise<any>> = {
    JpgWebpTool: () => import("../tools/kep/JpgWebpTool.svelte"),
    PdfMergeTool: () => import("../tools/pdf/PdfMergeTool.svelte"),
    // ... 60+ bejegyzes
  };

  onMount(async () => {
    const mod = await COMPONENT_IMPORTS[componentName]();
    ToolComponent = mod.default;
  });
</script>
```

**FONTOS**: Ha uj tool-t adsz hozza, regisztralni kell a `COMPONENT_IMPORTS` map-ben is!

### Shared Komponensek

Tobb eszkoz ugyanazt a Svelte komponenst hasznalja, kulonbozo `componentProps`-szal:

| Shared komponens       | Hasznalo eszkozok                                           |
|------------------------|-------------------------------------------------------------|
| `ImageConvertTool`     | jpg-png, png-jpg, webp-jpg, webp-png, tomorites, minoseg-allitas |
| `TextTransformTool`    | sorok-rendezese, ismetlodok-torlese, ures-sorok-torlese, case-konverter, stb. |
| `CodeFormatterTool`    | css-formazas, css-minimalas, html-formazas, js-formazas, xml-*, yaml-* |

Pelda a registry-ben:

```typescript
{
  slug: "jpg-png", category: "kep",
  component: "ImageConvertTool",
  componentProps: {
    fromFormat: "image/jpeg",
    toFormat: "image/png",
    fromLabel: "JPG",
    toLabel: "PNG",
  },
}
```

### UI Komponensek

| Komponens              | Szerep                                                    |
|------------------------|-----------------------------------------------------------|
| `Dropzone.svelte`      | Drag & drop fajl feltoltes, validacio, tobbszoros fajl    |
| `ConvertButton.svelte` | Ketfazisu gomb: [delay] Konvertalas -> [delay] Letoltes   |
| `ProgressQueue.svelte` | Tomeges feldolgozas progressbar                            |
| `SearchOverlay.svelte` | Ctrl+K kereses overlay, fuzzy search az osszes tool-on    |
| `SearchPage.svelte`    | /kereses (vagy /cautare) oldal tartalma                   |
| `ToastNotification.svelte` | Toast ertesitesek (masolas, letoltes, hiba)           |
| `AdSlot.svelte`        | AdSense placeholder (jelenleg nem aktiv)                  |
| `ToolTabs.svelte`      | Fooldal -- tabbed tool lista kategoriankett                |

### Svelte Komponensek -- Altalanos Minta

Minden Svelte tool komponens hasonlo mintat kovet:

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";       // UI szovegek
  import Dropzone from "../ui/Dropzone.svelte";       // Fajl feltoltes
  import ConvertButton from "../ui/ConvertButton.svelte"; // Konvertalas gomb
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("jpg-webp");

  let files: File[] = [];
  let result: Blob | null = null;
  // ... tool-specifikus logika
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg" on:files={handleFiles} />
  <ConvertButton {timing} canConvert={files.length > 0} onConvert={convert} onDownload={download} />
  <!-- Eredmeny megjelenites -->
</div>
```

---

## 7. SEO

### Schema.org JSON-LD

**Fajl**: `src/lib/seo.ts`

A rendszer tobb Schema.org tipust is general minden tool oldalra:

| Fuggveny                | Schema tipus          | Leiras                                 |
|-------------------------|-----------------------|----------------------------------------|
| `toolSoftwareSchema()`  | SoftwareApplication   | Tool mint szoftver alkalmazas          |
| `faqSchema()`           | FAQPage               | FAQ kerdes-valasz                      |
| `howToSchema()`         | HowTo                 | Hasznalati utmutato lepesek            |
| `techArticleSchema()`   | TechArticle           | "Mi ez?" szekcio cikkent               |
| `useCaseListSchema()`   | ItemList              | Felhasznalasi esetek listaja           |
| `breadcrumbSchema()`    | BreadcrumbList        | Breadcrumb navigacio                   |
| `websiteSchema()`       | WebSite               | Fooldal (SearchAction-nel)             |
| `organizationSchema()`  | Organization          | Ceg/szervezet adatok                   |
| `toolListSchema()`      | ItemList              | Eszkozlista (fooldal, kategoria)       |

### Rating Generalas

Minden tool kap egy determinisztikus (slug-alapu hash) ertekeelest:
- `ratingValue`: 4.5 -- 4.9 kozott
- `ratingCount`: 8 -- 80 kozott

Ez biztositja, hogy a rating nem valtozik build-rol buildra, de eleg valtozetatos.

### Canonical URL-ek

```typescript
// buildCanonical() mindig abszolut URL-t general
buildCanonical("/kep/jpg-webp")
// => "https://konvertalo.hu/kep/jpg-webp" (HU build)
// => "https://instrumenteonline.ro/imagine/convertor-jpg-webp" (RO build)
```

### hreflang (Cross-language Linkek)

Minden oldalon `<link rel="alternate" hreflang="hu" ...>` es `hreflang="ro"` tag-ek vannak:

```astro
<!-- BaseLayout.astro -->
<link rel="alternate" hreflang="hu" href={`https://konvertalo.hu${huPath}`} />
<link rel="alternate" hreflang="ro" href={`https://instrumenteonline.ro${roPath}`} />
```

A ToolLayout-ban:

```astro
<BaseLayout
  hreflangPaths={{ hu: toolUrl(rawTool, "hu"), ro: toolUrl(rawTool, "ro") }}
>
```

**FONTOS**: A `rawTool`-t hasznaljuk (nem a lokalizaltat!), mert a `toolUrl()` maga vegzi a slug lokalizalast a megadott nyelv alapjan.

### Sitemap

**Fajl**: `src/pages/sitemap.xml.ts`

Dinamikus XML sitemap, amely:
- Figyelembe veszi a nyelv-specifikus URL-eket
- Kategoria-alapu prioritast es changefreq-et allitt be
- `tool.updatedAt`-ot hasznalja `lastmod`-kent
- Csak a latahto (visible) eszkozoket es kategoriakat tartalmazza

### OG Kepek

- `src/pages/og/` -- Open Graph kepek generálása (satori + resvg)
- `src/pages/hero/` -- Hero kepek
- Minta: `/og/{category}/{slug}.png`

---

## 8. Analytics

### Konfiguracio

**Fajl**: `src/lib/analytics.ts`

```typescript
import { CURRENT_CONFIG } from "../i18n/index.ts";

export const GOOGLE_TAG_ID = CURRENT_CONFIG.gtagId;  // Nyelv-specifikus!
export const GTM_ID = CURRENT_CONFIG.gtmId;

export const CONSENT_MODE_ENABLED = true;  // GDPR Consent Mode v2
```

### Nyelv-specifikus ID-k

A Google Analytics ID-k a `LANG_CONFIG`-ban vannak definialva (`src/i18n/index.ts`):

```typescript
LANG_CONFIG = {
  hu: { gtagId: "G-GGJNWNYZ5G", gtmId: "" },
  ro: { gtagId: "",               gtmId: "" },  // TODO
};
```

### Event Tracking

```typescript
// Tool eszkoz hasznalatkor
trackToolEvent("jpg-webp", "convert_start");
trackToolEvent("jpg-webp", "convert_done", { fileSize: 1234 });
trackToolEvent("jpg-webp", "download");
trackToolEvent("jpg-webp", "zip_download");
trackToolEvent("jpg-webp", "error");

// Kategoria oldal megtekintesekor
trackCategoryView("kep");
```

Lehetseges action-ok: `convert_start`, `convert_done`, `download`, `zip_download`, `error`, `reset`.

Dev modban `console.debug`-ot hiv, production-ban a `window.gtag()`-ot.

### Helper Fuggvenyek

```typescript
hasGoogleTag(): boolean  // Van-e beallitva GA4 ID
hasGTM(): boolean        // Van-e beallitva GTM ID
```

---

## 9. Tartalom (Content)

### Magyar Tartalom

**Hely**: `src/lib/content/*.ts`

Fajlok:
- `kep-content.ts` -- Kep eszkozok SEO tartalma
- `adat-content.ts` -- Adat eszkozok
- `szoveg-content.ts` -- Szoveg eszkozok
- `fejleszto-content.ts` -- Fejleszto eszkozok
- `pdf-excel-other-content.ts` -- PDF, Excel, Markdown, HTML, Fajl, SEO

### Roman Tartalom

**Hely**: `src/lib/content/ro/*.ts`

Ugyanaz a struktura, roman nyelven. Ezek **overlay**-knt mukodnek -- a build-kor a tool registry osszefesuli a magyar alappal.

### ToolSEOData Interface

```typescript
export interface ToolSEOData {
  content: ToolContent;    // howToSteps, useCases, formatComparison, aboutSection, tips
  faq: ToolFAQ[];          // Kerdes-valasz parok
  introText: string;       // Bevezeto szoveg
  guide: string[];         // Hasznalati utmutato lepesek
}

export type ContentMap = Record<string, ToolSEOData>;  // slug -> adat
```

### Pelda Content Bejegyzes

```typescript
export const KEP_CONTENT: ContentMap = {
  "jpg-webp": {
    introText: "A JPG-rol WebP-re konvertalo eszkozo...",
    guide: [
      "1. Huzd be vagy tallozd ki a konvertalni kivant JPG fajl(oka)t.",
      "2. Allitsd be a kivant minoseget (1-100).",
      "3. Kattints a Konvertalas gombra.",
      "4. Toltsd le az elkeszult WebP kepet.",
    ],
    faq: [
      { q: "Mire jo a JPG->WebP konvertalas?", a: "A WebP formatm..." },
    ],
    content: {
      howToSteps: [...],
      useCases: [...],
      aboutSection: { title: "...", paragraphs: ["..."] },
      tips: [...],
      formatComparison: { title: "...", columns: [...], rows: [...] },
    },
  },
};
```

### Merge Sorrend

1. `rawTools` tombben megadott alap adat (title, h1, desc, faq)
2. `ALL_CONTENT[slug]` (magyar tartalom) --> merge introText, guide, faq, content
3. `RO_TRANSLATIONS[category][slug]` --> merge i18n.ro (slug, title, h1, desc, keywords)
4. `ALL_RO_CONTENT[slug]` --> merge i18n.ro (content, introText, guide, faq)

---

## 10. Timing es Delay Rendszer

### Cel

A `ConvertButton` komponens ket fazisban mukodik, konfiguralhato delay-ekkel:
1. **delayBeforeConvert**: Fajl feltoltes utan ennyi ms mulva valik aktiva a Konvertalas gomb
2. **delayBeforeDownload**: Konverzio utan ennyi ms mulva valik aktiva a Letoltes gomb

Ez lehetoseget ad reklamok megjelenitesere a varakozas alatt (jelenleg nem aktiv).

### Konfiguracio

**Fajl**: `src/lib/timing-config.ts`

```typescript
// Globalis alapertekek
export const DEFAULT_TIMING: TimingConfig = {
  delayBeforeConvert:  3000,   // 3 mp
  delayBeforeDownload: 3000,   // 3 mp
  showCountdown:       true,
  showAdSlot:          false,
};

// Eszkoz-specifikus feluliras
export const TOOL_TIMING: Record<string, Partial<TimingConfig>> = {
  "slug-generator": { delayBeforeConvert: 0, delayBeforeDownload: 0 },  // Azonnali
  "json-formazas":  { delayBeforeConvert: 0, delayBeforeDownload: 0 },  // Azonnali
  // ... szoveg es kodolo eszkozoknel 0 delay
};

// Hasznalat
export function getTimingConfig(toolSlug: string): TimingConfig {
  const override = TOOL_TIMING[toolSlug] ?? {};
  return { ...DEFAULT_TIMING, ...override };
}
```

Altalanos szabaly: szovegalapu es kodolo eszkozoknel nincs delay (azonnali feedback), kepkonverzio es PDF eszkozoknel 3 mp delay.

---

## 11. Middleware es Biztonsag

### Fajl: `src/middleware.ts`

Astro middleware, amely minden response-ra biztonsagi es cache fejleceket allit be.

### Security Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
X-DNS-Prefetch-Control: on
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' ...
```

### Cache-Control Strategia

| Asset tipus                    | Cache strategia                                          |
|--------------------------------|----------------------------------------------------------|
| `_astro/*.js`, `*.css`         | 1 ev, immutable (Vite hash-elt)                         |
| Fontok (woff2, ttf)            | 1 ev, immutable                                          |
| Kepek (png, jpg, webp, svg)    | 30 nap + stale-while-revalidate                          |
| sitemap.xml                    | 10 perc + s-maxage 1 ora                                 |
| HTML oldalak                   | max-age=0, s-maxage=300, stale-while-revalidate=600      |

**Megjegyzes**: SSG deploy eseten (Netlify) a statikus fajlok nem erintik a middleware-t -- ehhez `_headers` fajl is szukseges.

---

## 12. Gyakori Hibak es Tanulsagok

### 1. getCategoryInfo() NEM lokalizal

```typescript
// ROSSZ:
const cat = getCategoryInfo("kep");
// cat.label === "Kepek" <-- MINDIG magyar!

// JO:
const cat = getLocalizedCategory(getCategoryInfo("kep")!, CURRENT_LANG);
// RO build-nel: cat.label === "Imagini"
```

### 2. getRelatedTools() NEM lokalizal

```typescript
// ROSSZ:
const related = getRelatedTools(tool);
// related[0].title === "PNG -> WebP konvertalo" <-- MINDIG magyar!

// JO:
const related = getRelatedTools(tool).map(t => getLocalizedTool(t, CURRENT_LANG));
```

### 3. getAllTools() NEM lokalizal

```typescript
// ROSSZ:
const allTools = getAllTools();
// allTools[0].h1 === "JPG -> WebP konvertalo" <-- MINDIG magyar!

// JO:
const allTools = getAllTools().map(t => getLocalizedTool(t, CURRENT_LANG));
```

### 4. SearchOverlay es SearchPage: kategorianev keresese

A SearchOverlay-ben es SearchPage-en a kategoria nevet igy kell lekerni:

```typescript
// ROSSZ:
const catName = getCategoryInfo(tool.category)?.label;

// JO:
const localCats = getLocalizedCategories(CURRENT_LANG);
const catName = localCats.find(c => c.id === tool.category)?.label;
```

### 5. Svelte-ben CURRENT_LANG

A Svelte komponensek **nem** hasznalhatjak az `import { t } from "../i18n/index.ts"` fuggvenyt, mert az Astro server-side API. Helyette:

```typescript
// ui-labels.ts-ben a nyelv build-time resolve-olodik:
const LANG = (import.meta.env.PUBLIC_SITE_LANG as string) || "hu";
// A Vite ezt build-kor kicsereli a konkret ertekre ("hu" vagy "ro")
```

### 6. File-based routing --> Dinamikus route

Korabban minden tool-nak kulon `.astro` fajl volt (`src/pages/kep/jpg-webp.astro`). Ez a lokalizacional problema, mert a fajlnev = URL slug. Dinamikus route-okkal (`[category]/[slug].astro`) a slug a `getStaticPaths()`-bol jon, igy lokalizalhato.

### 7. ui-labels.ts: MINDEN Svelte szoveg ide kerul

Felhasznaloi szoveg Svelte komponensben? --> `ui-labels.ts`-be kerul.
Felhasznaloi szoveg Astro layoutban? --> `hu.json` / `ro.json` es `t()`.

### 8. DynamicTool.svelte -- komponens regisztracio

Ha uj Svelte tool komponenst irsz, **harom helyen** kell regisztralni:
1. `src/lib/tool-registry.ts` --> a tool bejegyzes `component` mezoje
2. `src/components/tools/DynamicTool.svelte` --> `COMPONENT_IMPORTS` map
3. A komponens fajlt lerehozni a megfelelo mappaban

### 9. rawTool vs lokalizalt tool

A `ToolLayout.astro`-ban figyeld meg a mintat:

```astro
const { tool: rawTool } = Astro.props;
const tool = getLocalizedTool(rawTool, CURRENT_LANG);  // Lokalizalt verzio

// Megjeleniteshez: tool (lokalizalt)
<h1>{tool.h1}</h1>

// URL generalashoz: rawTool (eredeti slug kell!)
<BaseLayout canonical={toolUrl(rawTool)} />
// A toolUrl() maga lokalizalja a slug-ot a megadott nyelv alapjan
```

---

## 13. Uj Nyelv Hozzaadasa (Checklist)

Pelda: angol (`en`) nyelv hozzaadasa.

### 1. lepes: SupportedLang kiegeszites

**Fajl**: `src/i18n/index.ts`

```typescript
export type SupportedLang = "hu" | "ro" | "en";  // <-- uj nyelv hozzaadasa
```

### 2. lepes: Fordittasi JSON keszitese

Uj fajl: `src/i18n/en.json` (masold a `hu.json`-t es forditsd le az osszes kulcsot).

Importald az `index.ts`-ben:

```typescript
import enTranslations from "./en.json";

const TRANSLATIONS: Record<SupportedLang, Record<string, string>> = {
  hu: huTranslations,
  ro: roTranslations,
  en: enTranslations,  // <-- uj
};
```

### 3. lepes: LangConfig hozzaadasa

```typescript
export const LANG_CONFIG: Record<SupportedLang, LangConfig> = {
  hu: { ... },
  ro: { ... },
  en: {
    lang: "en",
    locale: "en_US",
    siteName: "ToolHouse",
    siteUrl: "https://toolhouse.com",
    dir: "ltr",
    gtagId: "",  // Uj GA4 ID
    gtmId: "",
  },
};
```

### 4. lepes: URL Map kiegeszites

**Fajl**: `src/lib/url-map.ts`

```typescript
export const CATEGORY_URLS = {
  hu: { kep: "kep", ... },
  ro: { kep: "imagine", ... },
  en: { kep: "images", pdf: "pdf", adat: "data", szoveg: "text", ... },  // <-- uj
};

export const STATIC_URLS = {
  hu: { rolunk: "rolunk", ... },
  ro: { rolunk: "despre-noi", ... },
  en: { rolunk: "about", kapcsolat: "contact", kereses: "search", ... },  // <-- uj
};
```

### 5. lepes: UI Labels kiegeszites

**Fajl**: `src/lib/ui-labels.ts`

```typescript
const labels = {
  hu: { copy: "Masolas", ... },
  ro: { copy: "Copiaza", ... },
  en: { copy: "Copy", download: "Download", ... },  // <-- uj
};
```

### 6. lepes: Tool forditasok keszitese

Uj mappak/fajlok:
- `src/lib/i18n/en-tools-kep.ts` -- angol tool slug, title, h1, desc, keywords
- `src/lib/i18n/en-tools-pdf.ts`
- ... (minden kategoriara)

Importald ezeket a `tool-registry.ts`-ben es add hozza az `RO_TRANSLATIONS`-hoz hasonloan egy `EN_TRANSLATIONS` objektumba. Alkalmazd a merge logiat.

### 7. lepes: SEO tartalom keszitese

Uj mappa:
- `src/lib/content/en/kep-content.ts`
- `src/lib/content/en/adat-content.ts`
- ... (minden kategoriara)

Importald es alkalmazd a merge logiat a `tool-registry.ts`-ben.

### 8. lepes: Kategoria i18n kiegeszites

A `CATEGORIES` tombben minden kategorianal add hozza az `en` forditast:

```typescript
{
  id: "kep",
  i18n: {
    ro: { label: "Imagini", ... },
    en: { label: "Images", description: "Image conversion...", intro: [...] },  // <-- uj
  },
}
```

### 9. lepes: Build script kiegeszites

**Fajl**: `package.json`

```json
{
  "scripts": {
    "dev:en": "cross-env PUBLIC_SITE_LANG=en PUBLIC_SITE_URL=https://toolhouse.com astro dev",
    "build:en": "cross-env PUBLIC_SITE_LANG=en PUBLIC_SITE_URL=https://toolhouse.com astro build",
    "build:all": "npm run build:hu && npm run build:ro && npm run build:en"
  }
}
```

### 10. lepes: hreflang kiegeszites

A `BaseLayout.astro`-ban add hozza az uj hreflang linket:

```astro
<link rel="alternate" hreflang="en" href={`https://toolhouse.com${enPath}`} />
```

### 11. lepes: Netlify konfig

Uj fajl: `netlify.en.toml`

### 12. lepes: Tesztelss

```bash
npm run dev:en    # Helyi teszteles
npm run build:en  # Build teszteles
```

Ellenorizd:
- [ ] Minden oldal betoltodik
- [ ] URL-ek helyesek (angol slug-ok)
- [ ] UI szovegek angolul jelennek meg
- [ ] Tool title/h1/description angolul jelenik meg
- [ ] Sitemap helyes URL-eket tartalmaz
- [ ] hreflang linkek mindket iranyban mukodnek

---

## 14. Uj Eszkoz Hozzaadasa (Checklist)

### 1. lepes: Tool regisztracia

**Fajl**: `src/lib/tool-registry.ts`

Add hozza a `rawTools` tombhoz:

```typescript
{
  slug: "uj-eszkoz",                    // URL slug (magyar)
  category: "kep",                      // Kategoria ID
  title: "Uj Eszkoz | Ingyenes online", // <title> tag
  h1: "Uj Eszkoz",                      // H1 az oldalon
  description: "Leiras max 160 karakter.", // Meta description
  keywords: ["kulcsszo1", "kulcsszo2"],
  status: "active",                     // "active" vagy "coming-soon"
  component: "UjEszkozTool",            // Svelte komponens neve
  related: ["masik-eszkoz-slug"],        // Kapcsolodo tool slug-ok
  faq: [
    { q: "Kerdes?", a: "Valasz." },
  ],
  updatedAt: "2026-03-01",
  launchedAt: "2026-03-01",
},
```

### 2. lepes: Svelte komponens letrehozasa

Uj fajl: `src/components/tools/{category}/UjEszkozTool.svelte`

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("uj-eszkoz");

  let file: File | null = null;
  let result: string | null = null;

  function handleFiles(e: CustomEvent<File[]>) {
    file = e.detail[0];
    trackToolEvent("uj-eszkoz", "convert_start");
  }

  async function convert() {
    // Konverzios logika...
    trackToolEvent("uj-eszkoz", "convert_done");
  }

  function download() {
    // Letoltes logika...
    trackToolEvent("uj-eszkoz", "download");
  }
</script>

<div class="tool-ui">
  <Dropzone accept="*/*" on:files={handleFiles} />
  <ConvertButton
    {timing}
    canConvert={!!file}
    onConvert={convert}
    onDownload={download}
  />
  {#if result}
    <div class="tool-result">
      <!-- Eredmeny megjelenites -->
    </div>
  {/if}
</div>
```

### 3. lepes: DynamicTool regisztracio

**Fajl**: `src/components/tools/DynamicTool.svelte`

Add hozza a `COMPONENT_IMPORTS` map-hez:

```typescript
const COMPONENT_IMPORTS = {
  // ... meglevo bejegyzesek
  UjEszkozTool: () => import("../tools/{category}/UjEszkozTool.svelte"),
};
```

### 4. lepes: Timing konfiguracio (opcionalis)

**Fajl**: `src/lib/timing-config.ts`

Ha az eszkoz azonnali feedback-et igenyel (pl. szoveg eszkoz):

```typescript
export const TOOL_TIMING = {
  // ... meglevo
  "uj-eszkoz": { delayBeforeConvert: 0, delayBeforeDownload: 0 },
};
```

### 5. lepes: SEO tartalom

**Fajl**: `src/lib/content/{category}-content.ts`

Add hozza a ContentMap-hez:

```typescript
"uj-eszkoz": {
  introText: "Bevezeto szoveg...",
  guide: ["1. Elso lepes...", "2. Masodik lepes..."],
  faq: [
    { q: "Kerdes?", a: "Valasz." },
  ],
  content: {
    howToSteps: [...],
    useCases: [...],
    aboutSection: { title: "...", paragraphs: ["..."] },
    tips: [...],
  },
},
```

### 6. lepes: Roman forditas (ha mindkét nyelven kell)

**Fajl**: `src/lib/i18n/ro-tools-{category}.ts`

```typescript
"uj-eszkoz": {
  slug: "instrument-nou",                        // Roman URL slug
  title: "Instrument Nou | Gratuit online",
  h1: "Instrument Nou",
  description: "Descriere max 160 caractere.",
  keywords: ["cuvant-cheie1", "cuvant-cheie2"],
},
```

**Fajl**: `src/lib/content/ro/{category}-content.ts`

Add hozza a roman SEO tartalmat (content, introText, guide, faq).

### 7. lepes: ui-labels.ts (ha uj UI szoveg kell)

Ha a tool uj, egyedi UI szoveget hasznal, ami meg nincs az `ui-labels.ts`-ben:

```typescript
const labels = {
  hu: {
    // ... meglevo
    ujLabel: "Uj cimke",
  },
  ro: {
    // ... meglevo
    ujLabel: "Eticheta noua",
  },
};
```

### 8. lepes: Ellenorzesi lista

- [ ] Tool megjelenik a fooldal eszkozlistaban
- [ ] Tool megjelenik a megfelelo kategoria oldalon
- [ ] Tool URL helyes: `/{category}/{slug}`
- [ ] `component` nev megegyezik a `COMPONENT_IMPORTS` bejegyzessel
- [ ] Svelte komponens betoltodik (`client:visible`)
- [ ] Dropzone, ConvertButton mukodik
- [ ] Timing konfiguracio helyes
- [ ] SEO: title, description, h1 megjelenik
- [ ] SEO: FAQ szekcio megjelenik
- [ ] SEO: JSON-LD schema-k generálódnak
- [ ] SEO: breadcrumb helyes
- [ ] SEO: related tools megjelennek
- [ ] SEO: sitemap tartalmazza az uj URL-t
- [ ] Keresesi overlay-ben megjelenik (SearchOverlay)
- [ ] Roman build-ben is mukodik (ha kell)
- [ ] Analytics tracking mukodik
- [ ] Mobile responsive

---

## Egyeb Hasznos Informaciok

### Vite Worker Konfiguracio

Az `astro.config.mjs`-ben konfiguralt worker beallitasok a bongeszoben futo hatter-feldolgozashoz (OffscreenCanvas, PDF rendereles stb.):

```javascript
vite: {
  worker: { format: "es" },
  optimizeDeps: {
    include: ["pdf-lib", "pdfjs-dist", "js-yaml"],
    exclude: ["jszip"],
  },
}
```

### Prefetch Strategia

Hover-re prefetch a gyorsabb navigacioert:

```javascript
prefetch: {
  prefetchAll: false,
  defaultStrategy: "hover",
}
```

### CSS Valtozok

A kategoriak CSS szineket hasznalnak: `var(--cat-kep)`, `var(--cat-pdf)`, stb. Ezek a `global.css`-ben vannak definialva.

### View Transitions

Jelenleg **kikapcsolva** -- link navigacios hibat okozott. Kommentben tartjuk a kodot, ha kesobb ujra be szeretnenk kapcsolni.

### Gen-Pages Script

Legacy tool az oldalak generalasakor hasznalt segod-script:

```bash
npm run gen-pages        # Oldalak generálása
npm run gen-pages:force  # Felülírás kényszerítése
npm run gen-pages:dry    # Száraz futtatás (csak kiírja, mit csinálna)
```

---

> **Kerdesed van?** Nyisd meg a kodot, es nezd meg a hivatkozott fajlokat -- a kommentek altalaban jol dokumentaljak a logika.
