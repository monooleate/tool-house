# Math Content → InstrumenteOnline.ro (RO) Migration Plan

> **Scope:** Bővíteni **csak** a román oldalt (`PUBLIC_SITE_LANG=ro`, `instrumenteonline.ro`) a `matekmegoldasok.hu` (Deno Fresh) kalkulátoraival, átváltóival és SEO-tartalmával. A HU site (`konvertalo.hu`) érintetlen marad, kivéve a megosztott infrastruktúrát (KaTeX renderer, új Svelte komponensek, tool-registry bővítések).
>
> **Nem tükörfordítás** — RO piacra (TVA 19%/9%/5%, salariu minim, hectare/metru pătrat, locale `ro_RO`, diakritikus "ă â î ș ț"), RO-s példákkal, RO-s jogi/adózási keretek.

---

## 1. Projekt-illesztés (Deno Fresh → Astro+Svelte)

| Szempont | Math site (forrás) | InstrumenteOnline.ro (cél) |
|---|---|---|
| Framework | Deno Fresh 2 | Astro 5 SSG |
| Islands | Preact (`islands/*.tsx`) | Svelte 5 (`components/tools/**/*.svelte`) |
| Routing | `[...slug].tsx` dinamikus | Statikus `src/pages/**/*.astro` |
| Markdown | `marked` + custom KaTeX extension | Astro Content Collections **VAGY** build-idős marked+katex pipeline |
| i18n | Külön fájlok `hu.json` / `sk.json` | Meglévő `CURRENT_LANG` + `PUBLIC_SITE_LANG` + `languages: ["ro"]` scope |
| Stílus | TailwindCSS v4 | Vanilla CSS + design tokens (`src/styles/global.css`) |
| KaTeX | Server-side render `katex.renderToString()` build-time | **Ugyanez**: Astro integration során build-idős KaTeX → statikus HTML (nincs client JS) |

**Fontos:** a meglévő RO architektúra (tool-registry, `languages?: SupportedLang[]` mező kategóriákon és tool-okon, `CATEGORY_URLS.ro` URL map, `i18n/ro-tools-*.ts` fordítás-fájlok) már támogatja a nyelvspecifikus tartalmakat — nem kell új rendszer, csak bővíteni.

---

## 2. Kategóriajavaslat (csak RO — `languages: ["ro"]`)

Új `CategoryId` értékek a `tool-registry.ts` `CategoryId` típushoz:

| RO slug (URL) | `CategoryId` | Ikon | Leírás |
|---|---|---|---|
| `calculator` | `calculator` | 🧮 | Calculatoare matematice (procente, ecuații, statistici) |
| `geometrie` | `geometrie` | 📐 | Cerc, triunghi, dreptunghi, funcții trigonometrice |
| `conversii` | `conversii` | ⇄ | Convertoare unități (lungime, masă, volum, suprafață, temperatură, densitate) |
| `finante` | `finante` | 💰 | TVA, credit, dobândă compusă, discount, marjă, salariu RO |
| `sanatate` | `sanatate` | ⚖️ | IMC (BMI), greutate ideală, calorii |
| `timp` | `timp` | 📅 | Diferență date, countdown-uri, ore lucrătoare |

Minden új kategóriát `languages: ["ro"]`-val kell regisztrálni → a HU build automatikusan kiszűri (`isCategoryVisibleInLang`, `getVisibleCategories` meglévő logika).

URL példa: `https://instrumenteonline.ro/calculator/procent-calculator/`

**Miért új kategóriák és nem a meglévőkbe (pl. `adat`)?** A matek-tartalom független SEO-klaszter, hreflang nélkül (HU oldalon nincs párja), külön kategória-landing = erősebb topical authority + belső linkelési gyűrű.

---

## 3. Tartalom-inventár (51 kalkulátor) — migrációs döntések

Jelmagyarázat: ✅ migrálni, 🔄 lokalizálni (RO-specifikus adatok), ❌ HU-specifikus, kihagyni, 🆕 új RO-variáns készíteni.

### 3.1 Algebra / Calculator (5)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `algebra/szazalekszamitas` → Százalék kalkulátor | `/calculator/procent-calculator/` | ✅ Universal — 4 mód (procent din, procent ca, creștere, diferență) |
| `algebra/masodfoku-egyenlet-megoldasa` → Másodfokú egyenlet | `/calculator/ecuatie-grad-doi/` | ✅ Universal + pași de rezolvare (Δ diszkrimináns) |
| `algebra/exponencialis-egyenletek` → Exponenciális egyenlet | `/calculator/ecuatii-exponentiale/` | ✅ Universal |
| `statisztika/atlag-kalkulator` → Átlag kalkulátor | `/calculator/medie-aritmetica/` | ✅ Universal — medie, mediană, mod, abatere |
| — | `/calculator/regula-de-trei-simpla/` | 🆕 **RO-klasszikus, nagy keresési volumen** — új tool |

### 3.2 Geometrie (5)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `geometria/haromszogek/derekszogu-haromszog-kalkulator` | `/geometrie/triunghi-dreptunghic/` | ✅ Pitagora |
| `geometria/szogfuggveny-kalkulator` | `/geometrie/functii-trigonometrice/` | ✅ sin/cos/tan |
| `geometria/radian-fok-atvaltas-kalkulator` | `/geometrie/radiani-grade/` | ✅ Universal |
| `geometria/korok/kor-kalkulator` | `/geometrie/cerc-calculator/` | ✅ SVG-s vizualizáció átvihető |
| `geometria/negyszogek/teglalap-kalkulator` | `/geometrie/dreptunghi-calculator/` | ✅ Aureum-detekció maradhat |

### 3.3 Conversii (15)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `atvaltasok/hossz/centimeter-meter` | `/conversii/cm-metri/` | ✅ |
| `atvaltasok/hossz/inch-centimeter` | `/conversii/inch-cm/` | ✅ — kijelző+DIY |
| `atvaltasok/hossz/foot-centimeter` | `/conversii/picioare-cm/` | ✅ — 5'9" → cm |
| `atvaltasok/hossz/kilometer-meter` | `/conversii/km-metri/` | ✅ |
| `algebra/cm-inch-kalkulator` | `/conversii/cm-inch/` | ✅ |
| `atvaltasok/tomeg/kilogramm-gramm` | `/conversii/kg-grame/` | ✅ |
| `atvaltasok/tomeg/kilogramm-font` | `/conversii/kg-livre/` | ✅ (pound/lbs) |
| `atvaltasok/tomeg/tonna-kilogramm` | `/conversii/tone-kg/` | ✅ |
| `atvaltasok/terulet/hektar-negyzetmeter` | `/conversii/hectare-metri-patrati/` | ✅ — agricol RO |
| `atvaltasok/terulet/hold-negyzetmeter` | ❌ | ❌ Magyar hold = HU-specifikus, RO-ban nincs megfelelő |
| `atvaltasok/terulet/negyzetol-negyzetmeter` | ❌ | ❌ Magyar négyszögöl = HU-specifikus |
| `atvaltasok/terfogat/liter-milliliter` | `/conversii/litri-mililitri/` | ✅ |
| `atvaltasok/terfogat/liter-deciliter` | `/conversii/litri-decilitri/` | ✅ |
| `atvaltasok/terfogat/liter-kobmeter` | `/conversii/litri-metri-cubi/` | ✅ |
| `atvaltasok/terfogat/gallon-liter` | `/conversii/galon-litri/` | ✅ |
| `atvaltasok/homerseklet/celsius-fahrenheit-atvaltas` | `/conversii/celsius-fahrenheit/` | ✅ |
| `atvaltasok/suruseg/beton-suly-terfogat-atvalto` | `/conversii/beton-greutate-volum/` | ✅ |
| `atvaltasok/suruseg/homok-suly-terfogat-atvalto` | `/conversii/nisip-greutate-volum/` | ✅ |
| `atvaltasok/suruseg/kavics-suly-terfogat-atvalto` | `/conversii/pietris-greutate-volum/` | ✅ |
| `atvaltasok/suruseg/soder-suly-terfogat-atvalto` | `/conversii/balast-greutate-volum/` | ✅ |
| `atvaltasok/suruseg/kg-m3-g-cm3-atvalto` | `/conversii/densitate-kg-m3-g-cm3/` | ✅ |
| `algebra/uzemanyag-fogyasztas-kalkulator` | `/conversii/consum-combustibil/` | ✅ |
| — | `/conversii/ari-metri-patrati/` | 🆕 **Ar / hectare / metru pătrat** (RO ingatlanpiac kedvelt mértékegysége) |

### 3.4 Finanțe (6)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `algebra/hitel-kalkulator` | `/finante/calculator-credit/` | ✅ Annuitás — univerzális |
| `algebra/kamatos-kamat-kalkulator` | `/finante/dobanda-compusa/` | ✅ |
| `penzugy/afa-kalkulator` (HU 27%, 18%, 5%) | `/finante/calculator-tva/` | 🔄 **RO TVA: 19%, 9%, 5%** — ratele alapértelmezetten cseréje |
| `penzugy/kedvezmeny-kalkulator` | `/finante/calculator-reducere/` | ✅ |
| `penzugy/arres-haszonkulcs-kalkulator` | `/finante/marja-adaos/` | ✅ |
| `penzugy/berkalkulator` (HU bér 2026) | ❌ | ❌ **Nem migráljuk** — HU-specifikus adózás, RO változat sem készül (túl karbantartás-intenzív, évi adóváltozások). |
| `penzugy/oraber-kalkulator` | `/finante/calculator-salariu-ora/` | ✅ Alap logika (havi→órabér osztás) universal, RO szám-formátum |

### 3.5 Sănătate (3)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `egeszseg/bmi-kalkulator` | `/sanatate/calculator-imc/` | ✅ WHO universal |
| `egeszseg/idealis-testsuly-kalkulator` | `/sanatate/greutate-ideala/` | ✅ Devine/Robinson/Miller/Hamwi |
| `egeszseg/kaloria-kalkulator` | `/sanatate/calculator-calorii/` | ✅ Mifflin-St Jeor |

### 3.6 Timp (3 + countdown-ok szelektív)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `idopont/datum-kulonbseg-kalkulator` | `/timp/diferenta-date/` | ✅ |
| `visszaszamlalo/unnepek/karacsonyig` | `/timp/craciun-numaratoare/` | ✅ RO Crăciun — ortodox + catolic |
| `visszaszamlalo/unnepek/szilveszterig` | `/timp/revelion-numaratoare/` | ✅ Revelion |
| `visszaszamlalo/unnepek/husvetig` | `/timp/pasti-numaratoare/` | 🔄 **Ortodox Paști** — Gauss algoritmus ortodox verzió (≠ katolikus) |
| `visszaszamlalo/szemelyes/szuletesnapig` | `/timp/zi-de-nastere/` | ✅ |
| `visszaszamlalo/sajat/visszaszamlalo-keszito` | `/timp/generator-numaratoare/` | ✅ Custom countdown, oszthatósággal |
| `visszaszamlalo/sajat/hany-napos-vagyok` | `/timp/cate-zile-am/` | ✅ |
| `visszaszamlalo/iskolai/nyari-szunetig` | ❌ | ❌ HU iskolai naptár — RO-s `/timp/vacanta-de-vara/` → 🆕 RO naptár |
| `visszaszamlalo/iskolai/erettsegiig` | ❌ → 🆕 | 🆕 **Bacalaureat** countdown (RO érettségi) |
| `visszaszamlalo/*` többi (matek játék, anyák napja, babaváró, mikulás, navnap, kávé…) | ❌ | ❌ HU kultúra/nyelv-specifikus |

### 3.7 Dezvoltator (meglévő kategóriába)
| Forrás | Cél URL | Döntés |
|---|---|---|
| `kodolas-es-azonositas/vonalkod/vonalkod-generator` | `/dezvoltator/generator-cod-bare/` | ✅ **Meglévő `dezvoltator` kategóriába** (nem új), `jsbarcode` lib, EAN-13/CODE-128/UPC-A/ITF-14. Csak RO-build-en (`languages: ["ro"]` a tool szintjén). |

### 3.8 Nem migráljuk
- `penzugy/berkalkulator` (HU Bérkalkulátor 2026) — 2. pont szerint NEM készítünk RO változatot sem.
- Affiliate/product oldalak, `docs/matek-pelda-megoldo/*` osztályos feladatgyűjtemény (taneszköz-wiki, más termékkontextus).

---

## 4. Homepage hatás — új főoldali komponensek

A jelenlegi `src/pages/index.astro` `TOP_TOOL_SLUGS` tömbben csak fájlkonvertáló eszközök szerepelnek. Javaslat RO-specifikus kibővítésre (csak RO-n jelenjenek meg):

### 4.1 Új komponens: `MathToolsHero.svelte` (RO-only)
Helye a főoldalon: **trust-row után, "Featured tools" előtt**.
```
┌───────────────────────────────────────────────────────┐
│ Calculatoare & Convertoare                            │
│ [TVA] [IMC] [Credit] [Procent] [Cm↔Inch] [Salariu]    │
│ 28 calculatoare gratuite →                            │
└───────────────────────────────────────────────────────┘
```
6 kártyás grid, minden kártya hero-ikon + RO cím + micro-CTA. A szekció blokk `{CURRENT_LANG === "ro" && ...}` feltétellel jelenjen meg.

### 4.2 Új szekció: `CategoryBlocks` kibővítése
A meglévő `CATEGORIES` lista végére kerülnek az új 6 kategória; `getVisibleCategories("ro")` automatikusan visszaadja őket, a főoldali grid nő 10-ről 16-ra (RO only).

### 4.3 Új footer nav csoport
RO-s footer (külön `ro.json`) kapjon új szekciót: **"Calculatoare"** → 6 top kalkulátor link.

---

## 5. URL struktúra és aloldalak

### 5.1 Kategória-aloldalak
Meglévő `src/pages/[category]/index.astro` és `[category]/[slug].astro` **nem változik**. Új kategóriák automatikusan generálódnak a `CATEGORIES` tömbből + `CATEGORY_URLS.ro` bővítésével.

### 5.2 Pilléroldalak (pillar pages) — SEO húzóerő
Három nagy hub-oldal SEO-klaszterhez:

| URL | Tartalom | Célkulcsszavak |
|---|---|---|
| `/calculator/` | Landing: minden kalkulátor + témakör-bevezető + GYIK | "calculator online", "calculator matematic" |
| `/conversii/` | Landing: unit hub + nagyságrend-táblák | "convertor online", "transformare unități" |
| `/finante/` | Landing: pénzügyi eszközök + RO adózás gyakorlati vezető | "calculator financiar", "calculator TVA" |

Minden pilléroldal kap: **intro (3 bek.)**, **kalkulátor-grid**, **kapcsolódó témák**, **FAQ (5-8 kérdés)**, **JSON-LD `ItemList` + `WebPage` schema** — ugyanazon mintára, mint a meglévő kategóriák.

### 5.3 Belső linkelés
- Minden kalkulátor oldalon **"Calculatoare conexe"** szekció (3-5 link) → meglévő `related: string[]` mező a tool-registry-ben.
- Minden kalkulátor oldalon **"Despre ..."** long-form SEO szekció → a `ToolContent` `aboutSection.paragraphs` mintájára (ld. `src/lib/content/ro/*.ts`).

---

## 6. Tartalom-architektúra (content files)

### 6.1 Új fájlok (RO-only)
```
src/lib/content/ro/
├── calculator-content.ts      # CALCULATOR_RO_CONTENT: ToolContent per calc
├── geometrie-content.ts
├── conversii-content.ts
├── finante-content.ts
├── sanatate-content.ts
└── timp-content.ts

src/lib/i18n/
├── ro-tools-calculator.ts     # { slug, title, h1, description, keywords }
├── ro-tools-geometrie.ts
├── ro-tools-conversii.ts
├── ro-tools-finante.ts
├── ro-tools-sanatate.ts
└── ro-tools-timp.ts

src/components/tools/calculator/
├── ProcentCalculator.svelte
├── EcuatieGradDoiCalculator.svelte
├── EcuatiiExponentialeCalculator.svelte
├── MedieAritmeticaCalculator.svelte
└── RegulaDeTreiCalculator.svelte

src/components/tools/geometrie/
src/components/tools/conversii/
src/components/tools/finante/
src/components/tools/sanatate/
src/components/tools/timp/

src/components/tools/shared/
├── KatexFormula.svelte        # univerzális KaTeX block renderer (SSR-safe)
├── ConversionSlider.svelte    # shared unit-conversion UI (liter↔ml, cm↔m stb.)
└── CountdownBase.svelte       # countdown váz, eseményekkel
```

### 6.2 Minden új Svelte tool-komponens mintája (Preact → Svelte 5 port)

**Forrás (Preact):** `useState` hooks, inline logic, Tailwind classes.
**Cél (Svelte 5):** `$state`/`$derived` runes, vanilla CSS (a meglévő design-tokenekkel), lásd [SlugGeneratorTool.svelte](src/components/tools/szoveg/SlugGeneratorTool.svelte) mintáját.

Konverziós szabályok:
```
useState('x')           →  let x = $state('')
const calc = () => ...  →  const calc = $derived(...)
onInput={e => ...}      →  oninput={(e) => ...}
class="..."             →  class="..."  (CSS modulok, nincs Tailwind)
```

### 6.3 KaTeX stratégia

**Megoldás:** **build-idős SSR**, nincs client-side JS. A KaTeX fontokat és CSS-t beillesztjük a `BaseLayout.astro` `<head>`-be **csak akkor**, ha a route math kategóriába esik.

Implementáció:
1. Új modul `src/lib/katex.ts`:
   ```ts
   import katex from "katex";
   export function renderMath(tex: string, displayMode = false): string {
     return katex.renderToString(tex, {
       displayMode, throwOnError: false, output: "html", strict: "ignore",
     });
   }
   ```
2. Új Svelte komponens `KatexFormula.svelte`:
   ```svelte
   <script>
     import { renderMath } from "../../../lib/katex.ts";
     let { tex = "", block = false } = $props();
     const html = renderMath(tex, block);
   </script>
   {@html html}
   ```
   **Hívás:** `<KatexFormula tex="ax^2 + bx + c = 0" block />` → static HTML a build során.
3. `public/katex/` mappába a KaTeX CSS + WOFF2 fontok letöltve (self-hosted, nincs CDN).
4. `package.json` + `katex@^0.16`.
5. **Markdown tartalomhoz:** új Astro Content Collection `math/` amely marked + katex-extension pipeline-t használja → re-use a math site `utils/markdown.ts` KaTeX extension kódját (MIT-kompatibilis).

**Miért SSR és nem client-render?**
- Nincs CLS (layout shift), Lighthouse-barát
- Nincs extra JS a tool-oldalak elsődleges eszközén kívül
- SEO-barát: a keresők látják a renderelt képletet `<span class="katex">…</span>` szemantikus HTML-ként
- `math site` már ezt a mintát követi — konzisztens

---

## 7. Tool-registry bővítés (minimális diff-terv)

### 7.1 `CategoryId` bővítése ([src/lib/tool-registry.ts:44](src/lib/tool-registry.ts:44))
```ts
export type CategoryId =
  | "kep" | "pdf" | "adat" | "szoveg"
  | "fejleszto" | "markdown" | "html" | "excel"
  | "fajl" | "seo"
  | "calculator" | "geometrie" | "conversii"   // ← új (RO)
  | "finante" | "sanatate" | "timp";             // ← új (RO)
```

### 7.2 `CATEGORIES` tömb bővítése ([src/lib/tool-registry.ts:126](src/lib/tool-registry.ts:126))
Minden új kategória: `languages: ["ro"]` → HU-n nem jelenik meg.

### 7.3 `CATEGORY_URLS.ro` bővítése ([src/lib/url-map.ts:23](src/lib/url-map.ts:23))
```ts
ro: {
  ...meglévő,
  calculator: "calculator",
  geometrie:  "geometrie",
  conversii:  "conversii",
  finante:    "finante",
  sanatate:   "sanatate",
  timp:       "timp",
},
hu: {
  ...meglévő,
  calculator: "calculator",  // placeholder, nem látható (languages: ["ro"])
  // ...
},
```
(Minden `CategoryId`-hez kell HU slug a `Record<CategoryId,string>` miatt, de mivel `languages: ["ro"]`, build-időben HU-ra nem generálódik oldal.)

### 7.4 Új tool-regisztrációk
~51 új tool entry a `rawTools` tömbben. Mintasor (egyetlen kalkulátor):
```ts
{
  slug: "procent-calculator",
  category: "calculator",
  title: "placeholder",  // HU-n nem jelenik meg
  h1: "placeholder",
  description: "",
  keywords: [],
  status: "active",
  component: "ProcentCalculator",
  languages: ["ro"],                    // ← CSAK RO build-en
  related: ["ecuatie-grad-doi", "medie-aritmetica"],
  updatedAt: "2026-04-25",
  launchedAt: "2026-04-25",
  faq: [],
},
```
Az `i18n/ro-tools-calculator.ts` tartalmazza a **valódi** címet, description-t, kulcsszavakat, FAQ-t, `ToolContent` struktúrát — minden RO-ul, a meglévő `content/ro/*.ts` mintájára.

---

## 7b. Hosszú markdown tartalmak migrációja (Astro Content Collection)

**Döntés (4):** a `matekmegoldasok.hu/docs/*` alatti pedagógiai/SEO longform markdown fájlokat átvisszük.

### 7b.1 Cél-struktúra
```
src/content/
├── config.ts                     # új: math collection schema (frontmatter validálás)
└── math/
    └── ro/
        ├── algebra/
        │   ├── procent.md         # forrás: docs/algebra/szazalekszamitas.md (RO fordítás)
        │   ├── ecuatie-grad-doi.md
        │   ├── ecuatii-exponentiale.md
        │   └── ...
        ├── geometrie/
        ├── conversii/
        ├── finante/
        ├── sanatate/
        └── timp/
```

### 7b.2 Renderelés
- **Két integráció-opció** (döntendő implementációkor):
  - **A) Astro Content Collection + remark plugin** — `@astrojs/markdown-remark` + `remark-math` + `rehype-katex` (SSR HTML-ben már renderelt KaTeX)
  - **B) Marked + custom extension a math site-ról** — közvetlenül átemeljük a `internal-docs/mathSEO_reference/utils/markdown.ts` KaTeX extension-jét (MIT-kompatibilis), Astro `fetchContent()`/`Astro.glob` + helperen át renderelve
- **Javaslat: A)** — natív Astro-way, kevesebb custom kód, beépített TOC/heading-extraction
- Minden markdown oldal a kalkulátor-oldalába **be-embed-elve** jelenik meg (hosszú longform alatt), **VAGY** külön `/calculator/procent-calculator/ghid/` útvonalon (döntendő oldalról oldalra)
- Javaslat: **a kalkulátor-oldal alá embed** (egy URL = egy cluster), kivéve ha a markdown > 2000 szó, akkor külön útvonal

### 7b.3 Frontmatter séma
A math site frontmatter struktúrája (title, description, published_at, refreshed_at, articleSchema, softwareSchema, faqPageSchema) **1:1 megtartandó**, RO-ra fordítva — ld. 8.1 alatt.

---

## 7c-bis. Schema.org duplikáció elkerülése (KÖTELEZŐ szabály)

**Probléma:** Két `SoftwareApplication` vagy két `FAQPage` ugyanazon az oldalon → Google bizonytalan, vagy csak az egyiket veszi figyelembe → hibás Rich Results. `Article` + `TechArticle` ugyanúgy redundáns (TechArticle = Article alosztálya).

**Szabály:** ha math longform létezik egy oldalra, **a longform-frontmatter schema-i a canonical**, az auto-generált schema-k ki vannak hagyva. Implementáció a [src/layouts/ToolLayout.astro](src/layouts/ToolLayout.astro) `hasLongform` ágában:

```ts
const hasLongform = mathSchemaScripts.length > 0;
const schemas: string[] = [
  breadcrumbSchema(breadcrumbs),       // mindig
];
if (hasLongform) {
  schemas.push(...mathSchemaScripts);  // longform: Article + Software + FAQ
} else {
  schemas.push(toolSoftwareSchema(...)); // non-math: auto Software
  if (tool.faq.length > 0) schemas.push(faqSchema(tool.faq));
  schemas.push(techArticleSchema(...));  // non-math: auto TechArticle
}
const useCaseList = useCaseListSchema(tool); // mindig (ItemList önálló)
if (useCaseList) schemas.push(useCaseList);
```

**Eredmény pages-enként:**
| Oldaltípus | Schema-szám | Tartalom |
|---|---|---|
| Math (pl. `/conversii/cm-metri/`) | **5** | Breadcrumb + Article (longform) + SoftwareApplication (longform) + FAQPage (longform) + ItemList (auto useCases) |
| Non-math (pl. `/imagine/jpg-webp/`) | **4–5** | Software (auto) + Breadcrumb + FAQPage (registry) + TechArticle (auto) + ItemList (ha vannak useCases) |

**Soha NE legyen** egy oldalon:
- 2× `SoftwareApplication`
- 2× `FAQPage`
- `Article` + `TechArticle` (egy oldalon mindig 1)

**Audit script:** [scripts/audit-schemas.mjs](scripts/audit-schemas.mjs) — minden új oldal után `node scripts/audit-schemas.mjs` futtatandó, **0 errors, 0 warnings** kötelező a deploy előtt.

---

## 7c. Schema.org markup migráció (RO-ra lokalizálva)

**Döntés (7):** a math site `articleSchema` + `softwareSchema` + `faqPageSchema` struktúráit átvesszük, RO-specifikus értékekkel.

### 7c.1 Mi kerül át és mi változik
| Mező | Math (HU) | RO változat |
|---|---|---|
| `inLanguage` | `"hu"` | `"ro"` |
| `url`, `@id` | `matekmegoldasok.hu/...` | `instrumenteonline.ro/...` |
| `priceCurrency` (offers) | `"HUF"` | `"RON"` |
| `publisher.name` | `"MatekMegoldások"` | `"InstrumenteOnline"` |
| `publisher.url` | `"https://matekmegoldasok.hu"` | `"https://instrumenteonline.ro"` |
| `author`, `founder` | HU Person | **RO build `CURRENT_CONFIG` alapján**, vagy ugyanaz a Person `sameAs`-szel |
| `datePublished` | HU eredeti | **RO: migráció napja** (2026-04 körül) |
| `dateModified` | HU eredeti | RO frissítés dátuma |
| `name`, `headline`, `description` | HU szöveg | **RO natív fordítás, nem tükör** |
| `aggregateRating` (ha van) | HU review count | **nem másolható**, új RO számok vagy elhagyni (hamis rating = Google manual action kockázat) |
| `featureList` | HU | RO |
| `applicationCategory` | `EducationalApplication` / `HealthApplication` / `FinanceApplication` / `BusinessApplication` | **Változatlan** (enum) |

### 7c.2 Hol generálódnak
- **Tool-oldalakon (nem markdown):** a `ToolLayout.astro` + `src/lib/seo.ts` bővítése új `softwareApplicationSchema(tool, lang)` + `articleSchema(tool, lang)` helperekkel, amelyek RO-ra építik a schema JSON-LD-t a `ToolI18n` + `ToolContent` mezőkből
- **Markdown oldalakon (long-form):** az Astro Content Collection frontmatterben tárolt `articleSchema` / `softwareSchema` / `faqPageSchema` objektumokat közvetlenül `<script type="application/ld+json">` blokkban emittáljuk a layout-ban
- **FAQ schema:** automatikus a tool `faq[]` mezőből (már működik, RO fordítás az i18n-fájlokban)

### 7c.3 Validálás
- `@context: https://schema.org` minden blokkban
- Rich Results Test (search.google.com/test/rich-results) futtatása deploy előtt legalább 3-3 oldalra kategóriánként
- Schema.org Validator (validator.schema.org) a teljes oldalra

---

## 7d. OG képek (satori+resvg pipeline bővítés)

**Döntés (5):** meglévő `src/pages/og/[category]/[slug].png.ts` rutint használjuk, **pixel-tökéletes** kimenettel.

### 7d.1 Szükséges bővítések
- **Kategória-szín paletta** kibővítése a 6 új kategóriára:
  - `calculator`: kék-indigó (`#4f46e5`)
  - `geometrie`: smaragd (`#10b981`)
  - `conversii`: lila (`#8b5cf6`)
  - `finante`: arany-smaragd (`#059669`)
  - `sanatate`: rózsa (`#e11d48`)
  - `timp`: narancs (`#f97316`)
- **Math-specifikus ikonográfia**: SVG-re Satori-barát ikonok — `𝑥²` (algebra), `△` (geometria), `⇄` (conversii), `€` vagy `lei` badge (finante), `⚖️` (sanatate), `📅` (timp)
- **KaTeX mini-formula preview**: math kategóriáknál az OG-ba beágyazott renderelt formula-snippet (pl. `ax² + bx + c = 0`) — a `renderMath()` helper build-időben → SVG → Satori
- **Logo konzisztencia**: `InstrumenteOnline` wordmark bal felül, ugyanaz a tipográfia, mint a meglévő képkonverter OG-knál

### 7d.2 Ellenőrzőlista (pixel-tökéletesség)
- [ ] 1200×630 px pontos
- [ ] Magyar/román diakritikák (ă â î ș ț) kerülése a fontokban (Noto Sans / Inter font subset betöltés)
- [ ] LTR szöveg, center-aligned hierarchia
- [ ] `font-display: block` a Satori számára (nincs fallback)
- [ ] LinkedIn/Twitter/Facebook preview tool-okban validálva (mindhárom render különbözik)
- [ ] Dark/Light verzió **nem kell** — mindig azonos (keresőmotorok nem detektálnak dark mode-ot)
- [ ] File size cél: < 150 KB per OG kép

---

## 8. SEO / GEO stratégia (RO-piac)

| Aspektus | Megoldás |
|---|---|
| **Hreflang** | **Nincs** — a math-tartalomnak nincs HU párja (RO-exkluzív). Önálló RO-tartalom. |
| **Canonical** | `https://instrumenteonline.ro/{category}/{slug}/` (trailing slash a meglévő konvenció, `vercel.json` / `netlify.ro.toml` konfigurálva) |
| **Schema.org** | Minden kalkulátor: `SoftwareApplication` (applicationCategory `EducationalApplication` / `FinanceApplication` / `HealthApplication`) + `FAQPage` + `BreadcrumbList`. A forrás `articleSchema` + `softwareSchema` mintája átvihető. |
| **Key focus kulcsszavak (RO)** | "calculator TVA", "calculator IMC", "convertor cm inch", "calculator procent", "calculator credit", "calculator salariu" — mindegyik havi 10k+ RO keresés |
| **E-E-A-T** | Minden RO-s content.ts-ben: `aboutSection` (3-5 bek. szakértői), `tips`, `formatComparison` → meglévő `ToolContent` mezők teljes kitöltése |
| **Internal linking** | Pillar page (`/calculator/`, `/conversii/`, `/finante/`) → kalkulátor (cluster) → pillar page (kapcsolódó linkek); minden kalkulátor 3-5 `related` |
| **llms.txt** | A meglévő llms.txt-be új szekció: `## Calculators & Converters (RO)` — 51 új entry |
| **AI-citability** | Minden kalkulátor oldalon: **"Cum funcționează"** TL;DR rövid bekezdés (40-60 szó) + **"Formulă"** KaTeX blokk — jól idézhető ChatGPT/Perplexity által |

---

## 9. Ütemterv (ajánlott sorrend)

### Fázis 0 — Infrastruktúra (1-2 nap)
1. `katex` dependency `package.json`-ba + `public/katex/` self-hosted fontok
2. `src/lib/katex.ts` + `KatexFormula.svelte`
3. `CategoryId` bővítés, 6 új kategória `CATEGORIES`-ben (`languages: ["ro"]`)
4. `CATEGORY_URLS` 6 új RO slug
5. Új üres content/i18n fájlok létrehozása (vázas)
6. HU build futtatása — **ellenőrzés: HU oldalra nulla új oldal generálódik**

### Fázis 0b — Schema + Markdown pipeline (1 nap)
- `src/lib/seo.ts` bővítés: `softwareApplicationSchemaMath(tool, lang)`, `articleSchemaMath(page, lang)` helperek
- `src/content/config.ts` math collection frontmatter-séma definíció (articleSchema, softwareSchema, faqPageSchema objektumok `z.object(…)`-ban)
- Astro Content Collection + `remark-math` + `rehype-katex` beállítása `astro.config.mjs`-ben
- OG pipeline bővítés: 6 új kategória-szín paletta + math ikonográfia

### Fázis 1 — Convertoare pilot (3-4 nap)
Cél: 5-6 converter **MVP-ként** (cm-m, kg-g, celsius-fahrenheit, liter-ml, cm-inch, kg-font).
- Egy `UnitConverter.svelte` **generikus komponens** készítése (factor-alapú, reverse-irányú), mintához ld. `CmMeterCalculator.tsx` → Svelte port.
- `componentProps`-szal konfigurálás (mint a meglévő `ImageConvertTool` a képkonvertálóknál) — **újrafelhasználható 15+ konverterhez**.
- `/conversii/` pillar page elkészítése.
- Deploy RO staging → Search Console submit → mérés 1 hétig.

### Fázis 2 — Calculator + Geometrie (1 hét)
- 5 algebra/statistics + 5 geometry kalkulátor portolása Preact→Svelte
- `/calculator/` és `/geometrie/` pillar pages
- KaTeX formulák minden oldalon

### Fázis 3 — Finanțe **RO-lokalizáció** (4-5 nap)
- TVA RO-ratákkal (19%, 9%, 5%), credit (annuitás), dobândă compusă, discount, marjă, salariu-ora
- **NINCS** Salariu calculator (döntés 3)
- `/finante/` pillar page + RO TVA / credit gyakorlati útmutató longform

### Fázis 4 — Sănătate + Timp (3-5 nap)
- IMC, greutate ideală, calorii
- 5-7 countdown (Crăciun, Revelion, Paști ortodox, zi de naștere, custom, câte zile am, Bacalaureat)

### Fázis 5 — Optimalizáció (folyamatos)
- Schema.org validálás (Rich Results Test)
- llms.txt frissítés
- Belső linkelés sűrítés
- OG képek generálása (`scripts/gen-pages.mjs` mintára)

**Teljes becsült idő:** ~3-4 hét aktív fejlesztéssel.

---

## 9b. Fázis 2-5 részletes specifikáció (komponensenként)

> **Cél:** Minden fázis szállítja:
> 1) **Custom Svelte komponens** (egy-egy fájl `src/components/tools/<kategória>/`)
> 2) **Long-form markdown** RO-ul (`src/content/math/ro/<kategória>/<slug>.md`) frontmatter schema-val
> 3) **i18n + content** entry (`src/lib/i18n/ro-tools-<kat>.ts` + `src/lib/content/ro/<kat>-content.ts`)
> 4) **Tool-registry entry** `languages: ["ro"]` + komponensnév
> 5) **DynamicTool import**
>
> **Minta:** ld. Fázis 1 lezárt 6 oldal (`/conversii/cm-metri/`, …, `/conversii/celsius-fahrenheit/`).

### Fázis 2 — Calculator (Algebra, Statisztika) — 5 + 1 új tool

| Slug | Komponens | UI elemek (math reference átültetve) | KaTeX-tartalom |
|---|---|---|---|
| `procent-calculator` | **`ProcentCalculator.svelte`** (port: PercentageCalculator.tsx) | 4 számítási mód (4 különálló kártya): (1) X% din Y, (2) X cât % din Y, (3) creștere/scădere %, (4) diferență % | `\text{Procent} = \frac{Parte}{Total} \times 100`, képletek mind a 4 módra |
| `ecuatie-grad-doi` | **`EcuatieGradDoiCalculator.svelte`** (port: CalcQuadratic.tsx) | a/b/c slider-input + lépésenkénti levezetés (diszkrimináns, sqrt, gyökök), grafikus preview (canvas parabola) | `D = b^2 - 4ac`, `x_{1,2} = \frac{-b \pm \sqrt{D}}{2a}` |
| `ecuatii-exponentiale` | **`EcuatieExponentialaCalculator.svelte`** (port: CalcExponential.tsx) | a, b, c input + log10 kalkuláció + lépések | `a \cdot b^x = c \Rightarrow x = \log_b(c/a)` |
| `medie-aritmetica` | **`MedieCalculator.svelte`** (port: AtlagKalkulator.tsx) | dinamikus sor add/remove, számtani átlag + medián + módusz + szórás kártyák | `\bar{x} = \frac{\sum x_i}{n}`, `\sigma = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n}}` |
| `regula-de-trei-simpla` | **`RegulaDeTrei.svelte`** (új RO-specifikus, nincs HU referencia) | 3-input grid (A:B = C:?), megfordítható (egyenes/fordított arány) | `\frac{A}{B} = \frac{C}{x} \Rightarrow x = \frac{B \cdot C}{A}` |

**Markdown / oldal/ ~250 sor**, struktúra: intro (RO szakmai) → "Formula" KaTeX-szel → "Exemple pas cu pas" (3-5 példa) → "Tabel rapid" → "Aplicații tipice" → "Greșeli frecvente" → "Conversii înrudite". Frontmatter: `articleSchema` + `softwareSchema` (`applicationCategory: "EducationalApplication"`) + `faqPageSchema` (8-12 kérdés).

### Fázis 3 — Geometrie — 5 tool

| Slug | Komponens | UI elemek | KaTeX |
|---|---|---|---|
| `triunghi-dreptunghic` | **`TriunghiDreptCalculator.svelte`** (port: TriangleCalculator.tsx) | 3 input (a, b, c bármelyik 2-ből számolva) + élő SVG triangle vizualizáció méretarányosan + kiszámolt szögek | `c^2 = a^2 + b^2`, `\sin α = \frac{a}{c}`, terület `T = \frac{a \cdot b}{2}` |
| `functii-trigonometrice` | **`FunctiiTrigCalculator.svelte`** (port: AngleFunctions.tsx) | szög-input (fok vagy rad toggle) + sin/cos/tan/cot eredmény-kártyák + **élő SinCosAnimation** SVG (port: SinCosAnimation.tsx — egységkör forgó vektorral) | `\sin(α) = \frac{ellenfekvő}{átfogó}`, mind a 4 függvény |
| `radiani-grade` | **`RadianiGradeCalculator.svelte`** (port: RadToAngleCalc.tsx) | 2-irányú input + körcikk SVG vizuálisan kitöltve a beírt szögig | `rad = grade \cdot \frac{\pi}{180}` |
| `cerc-calculator` | **`CercCalculator.svelte`** (port: KorKalkulator.tsx) | input: rază/diametru/perimetru/arie bármelyikből számolva, **körcikk + körszelet mód**, SVG live | `A = \pi r^2`, `P = 2\pi r`, körcikk `A_{sector} = \frac{α}{360°} \pi r^2` |
| `dreptunghi-calculator` | **`DreptunghiCalculator.svelte`** (port: TeglalapKalkulator.tsx) | input: oldalak vagy átló, élő SVG dreptunghi méretarányosan, **négyzet + arany metszés detektor** | `d = \sqrt{a^2 + b^2}`, `T = a \cdot b` |

### Fázis 4 — Conversii (kibővítés) — 11 új converter

Cél: bővíteni a már meglévő 6-ot további 11-vel, **TELJES** átváltási szettért. Minden új a meglévő pattern szerint (custom Svelte komponens, `presets` chips, longform).

| Slug | Komponens (új) | Source |
|---|---|---|
| `picioare-cm` | `FootCmCalculator.svelte` (port: FeetCmCalculator.tsx) — ft+inch komb-input |
| `inch-cm` | `InchCmCalculator.svelte` (port: InchCmCalculator.tsx) — sima input + cipő-méret presets |
| `kg-livre` | `KgLivreCalculator.svelte` (port: KgFontCalculator.tsx) — testsúly presets |
| `tone-kg` | `ToneKgCalculator.svelte` (port: TonnaKgCalculator.tsx) — szállítás/ipar presets |
| `hectare-metri-patrati` | `HectareCalculator.svelte` (port: HektarM2Calculator.tsx) — agricultură RO presets |
| `ari-metri-patrati` | 🆕 `AriCalculator.svelte` (RO ingatlan kedvelt) — telkek presets |
| `litri-decilitri` | `LitriDlCalculator.svelte` (port: LiterDlCalculator.tsx) — RO recept presets |
| `litri-metri-cubi` | `LitriM3Calculator.svelte` (port: LiterKobmeterCalculator.tsx) — közüzem presets |
| `galon-litri` | `GalonLitriCalculator.svelte` (port: GallonLiterCalculator.tsx) — auto/üzemanyag |
| `beton-greutate-volum` | `BetonCalculator.svelte` (port: BetonSulyTerfogatCalculator.tsx) — építkezés |
| `nisip-greutate-volum`, `pietris-greutate-volum`, `balast-greutate-volum`, `densitate-kg-m3-g-cm3`, `consum-combustibil` | hasonló pattern (port a math reference site-ról) |

### Fázis 5 — Finanțe (RO-lokalizált) — 5 tool

> **Megjegyzés:** Bér / Salariu calculator döntés szerint NINCS.

| Slug | Komponens | RO-lokalizációs fókusz |
|---|---|---|
| `calculator-tva` | **`TvaCalculator.svelte`** | RO TVA kulcsok: **19%** (alap), **9%** (alimente, medicamente, hoteluri), **5%** (locuințe, manuale) — toggle + auto kalkuláció (net→brut, brut→net, TVA-kiemelés) |
| `calculator-credit` | **`CreditCalculator.svelte`** (port: LoanCalculator_2.tsx) | Annuitás, Robor/IRCC alap, RO bank-példák (BCR/BRD/Raiffeisen tipikus rate-k) |
| `dobanda-compusa` | **`DobandaCompusaCalculator.svelte`** (port: KamatosKamatKalkulator.tsx) | Compounding frequency selector, RO depozit-kamatok mintaként |
| `calculator-reducere` | **`ReducereCalculator.svelte`** (port: KedvezmenyKalkulator.tsx) | Black Friday-style scenario, befordítható (új ár → eredeti ár) |
| `marja-adaos` | **`MarjaCalculator.svelte`** (port: ArresHaszonkulcsKalkulator.tsx) | Margin (%) vs. markup (%) átváltás, comerț e-commerce célközönség |
| `calculator-salariu-ora` | **`SalariuOraCalculator.svelte`** (port: OraberKalkulator.tsx) | Lunar → orar/zilnic/săptămânal split, RO típikus 168 óra/hó norma |

`applicationCategory`: `"FinanceApplication"` (vagy `"BusinessApplication"` marja-nál). Frontmatter `articleSchema` + RO TVA / credit gyakorlati GHID longform.

### Fázis 6 — Sănătate (3 tool)

| Slug | Komponens | UI elemek |
|---|---|---|
| `calculator-imc` | **`ImcCalculator.svelte`** (port: BMIKalkulator.tsx) | input: înălțime + greutate; output: IMC + WHO categorie + greutate ideală-tartomány; **gradient bar marker** (subponderal→obez), referencia WHO szín-kódolva |
| `greutate-ideala` | **`GreutateIdealaCalculator.svelte`** (port: IdealisTestsulyKalkulator.tsx) | 4 tudományos formula párhuzamosan (Devine, Robinson, Miller, Hamwi) + grafikus összehasonlítás |
| `calculator-calorii` | **`CaloriiCalculator.svelte`** (port: KaloriaKalkulator.tsx) | Mifflin-St Jeor BMR + activity-factor TDEE + macro split (P/C/F) — donut chart |

`applicationCategory`: `"HealthApplication"`. Longform: WHO standardok + RO orvosi szövetségek által ajánlott IMC tartományok.

### Fázis 7 — Timp (Countdowns + diferență) — 7-8 tool

| Slug | Komponens | Megjegyzés |
|---|---|---|
| `diferenta-date` | **`DiferentaDateCalculator.svelte`** (port: DatumKulonbsegKalkulator.tsx) | Két dátum közötti napok/hetek/hónapok + munkanapok (RO sărbători legale) |
| `craciun-numaratoare` | **`CraciunCountdown.svelte`** (port: VissszaszamlaKaracsony.tsx) | RO Crăciun (25 dec), élő nap/óra/perc/sec, hópehely SVG animáció |
| `revelion-numaratoare` | **`RevelionCountdown.svelte`** (port: VissszaszamlaUjEv.tsx) | Tűzijáték CSS animáció |
| `pasti-numaratoare` | **`PastiCountdown.svelte`** | 🔄 **Ortodox Paști** — Meausius algoritmus (Julián naptár + 13 nap) |
| `zi-de-nastere` | **`ZiNastereCountdown.svelte`** (port: VissszaszamlaSzuletesnap.tsx) | Date-picker + share link |
| `generator-numaratoare` | **`CountdownGenerator.svelte`** (port: VissszaszamlaSajat.tsx) | Custom event + URL-encoded share |
| `cate-zile-am` | **`CateZileAm.svelte`** (port: VissszaszamlaEletkor.tsx) | Birth-date input → live "ai trăit X zile, Y ore..." mérföldkövek (10 000 zile, 1 milliard secunde, stb.) |
| `bacalaureat-numaratoare` | 🆕 **`BacalaureatCountdown.svelte`** (RO-specifikus) | RO bacalaureat (június közepe) countdown, motivációs üzenetek |

Plus shared **`CountdownBase.svelte`** (port: islands/visszaszamlalo/CountdownBase.tsx) — közös FlipDigit + ProgressBar + ShareButtons sub-komponensek.

### Fázis 8 — Barcode (dezvoltator alá) — 1 tool

| Slug | Komponens | Megjegyzés |
|---|---|---|
| `generator-cod-bare` | **`CodBareGenerator.svelte`** (port: BarcodeGenerator.tsx) | `jsbarcode` lib, formátumok: EAN-13, CODE-128, UPC-A, ITF-14; SVG/PNG export. **Kategoria: `dezvoltator`** (existing), `languages: ["ro"]` tool-szinten |

---

## 9c. Komponens-portolási checklist (mindegyikre)

Minden új Svelte komponensnél kötelezően:
- [ ] Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`)
- [ ] Vanilla CSS `--bg-card`, `--text`, `--text-muted`, `--text-subtle`, `--border`, `--accent`, `--cat-{kategoria}` tokenek (light/dark mode automatikus)
- [ ] Mobile-first: `grid-template-columns: 1fr` mobil, `1fr auto 1fr` desktop (lásd ThermometerConverter mintát)
- [ ] Numerikus inputok: `inputmode="decimal"`, "," és "." mindkettő elfogadva, intelligens kerekítés
- [ ] Ahol értelmes: **preset chips** vagy **referencia-táblázat** kattinthatóan
- [ ] Aria-attribútumok (`aria-label`, `role="slider"` ha drag van, `tabindex` keyboard nav)
- [ ] **Print mód:** ha értelmes, képletek + result kinyomtathatók legyenek
- [ ] DynamicTool import sor (`COMPONENT_IMPORTS` map)

## 9d. Markdown frontmatter kötelező mezők

```yaml
---
title: "..."                     # h2 a longform tetején
description: "..."               # nem render-elt — csak schema-hoz
toolSlug: "<slug>"               # kapcsolja a tool-registry entry-jéhez
category: "calculator|geometrie|conversii|finante|sanatate|timp"
published_at: "2026-04-25T00:00:00.000Z"
refreshed_at: "2026-04-25T00:00:00.000Z"
articleSchema: { ... }           # Article JSON-LD
softwareSchema: { ... }          # SoftwareApplication JSON-LD (NO aggregateRating)
faqPageSchema: { ... }           # FAQPage JSON-LD (4-6 kérdés)
---
```

A `category` Astro-validált — `enum` mező a [src/content/config.ts](src/content/config.ts)-ben.

---

## 10. Kockázatok és döntési pontok

| Kockázat | Enyhítés |
|---|---|
| Tailwind → vanilla CSS port időigényes | Használjuk a meglévő `src/styles/global.css` design tokenjeit + shared komponenseket (ConversionSlider, CountdownBase) |
| KaTeX bundle size (CSS + 4-6 WOFF2 font) | Csak math kategóriákon töltődjön be (route-alapú feltétel a `BaseLayout.astro`-ban), `font-display: swap` |
| Tool-registry ~51 új entry-vel 700 sorból 1200+ | Éri meg — single source of truth. Szükség esetén külön `tool-registry-math.ts` és `tools = [...existing, ...mathTools]` merge |
| RO salariu calculator 2026 adó-változás veszély | `penzugy/berkalkulator-ro.ts`-ben konstansok tetején, `TAX_YEAR: 2026` konstanssal, évenként frissítés |
| Ortodox Paști dátum-algoritmus | Meausius-algoritmus ortodox (Julian naptár + 13 nap) — validálás 10 év előrejelzésével |
| HU-specifikus források véletlenül átkerülnek (Hold, Négyszögöl, Bér HU) | A táblázatban ❌ jelzettek **ne kerüljenek át** — code review pont |

---

## 11. Döntések (lezárt, 2026-04-25)

| # | Kérdés | Döntés |
|---|---|---|
| 1 | Kategória-struktúra | ✅ **6 új kategória** (`calculator`, `geometrie`, `conversii`, `finante`, `sanatate`, `timp`), `languages: ["ro"]` |
| 2 | Barcode generator helye | ✅ **Meglévő `dezvoltator` alá**, `languages: ["ro"]` a tool szintjén |
| 3 | Salariu RO kalkulátor | ❌ **Nem készítjük el** — se HU Bérkalkulátort nem migráljuk, se új RO verziót. |
| 4 | Hosszú markdown tartalmak | ✅ **Migráljuk** Astro Content Collection-be (`src/content/math/ro/`), marked+katex pipeline-nal, `[slug].astro` renderrel |
| 5 | OG képek a ~51 új oldalra | ✅ **Meglévő `src/pages/og/[category]/[slug].png.ts` satori+resvg pipeline** bővítése az új kategóriákkal. Elvárás: **pixel-tökéletes** (math kategóriák kapnak saját color-accent + math-specifikus ikonográfia) |
| 6 | Homepage-módosítás | ✅ **Konzervatív**: új `MathToolsHero.svelte` szekció a trust-row után (CURRENT_LANG === "ro" feltétellel), `CategoryBlocks` grid natúrálisan kibővül |
| 7 | Schema.org markup | ✅ **Minden math-oldal átveszi a math site schema-struktúráit** — `ArticleSchema` + `SoftwareApplicationSchema` + `FAQPageSchema` → RO-ra fordítva (`inLanguage: "ro"`, `priceCurrency: "RON"`, RO publisher, RO datePublished/dateModified) |

---

## 12. Gyors referencia — fájlok, amiket módosítani kell

| Fájl | Változtatás típusa |
|---|---|
| [src/lib/tool-registry.ts](src/lib/tool-registry.ts) | `CategoryId` bővítés, 6 új kategória, ~51 új tool |
| [src/lib/url-map.ts](src/lib/url-map.ts) | `CATEGORY_URLS` 6 új slug per nyelv |
| [src/i18n/ro.json](src/i18n/ro.json) | Homepage copy, footer, kategória-címek |
| [src/lib/content/ro/*.ts](src/lib/content/ro/) | 6 új content fájl |
| [src/lib/i18n/ro-tools-*.ts](src/lib/i18n/) | 6 új fordítás fájl (51 entry) |
| [src/components/tools/](src/components/tools/) | 6 új mappa + ~30-40 új Svelte komponens |
| [src/components/tools/shared/](src/components/tools/shared/) | `KatexFormula.svelte`, `UnitConverter.svelte`, `CountdownBase.svelte` |
| [src/lib/katex.ts](src/lib/katex.ts) | **Új** SSR KaTeX helper |
| [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) | KaTeX CSS feltételes betöltés math-route-okon |
| [src/pages/index.astro](src/pages/index.astro) | `{CURRENT_LANG === "ro" && <MathToolsHero />}` blokk |
| [public/katex/](public/katex/) | **Új** self-hosted KaTeX CSS + WOFF2 fontok |
| [package.json](package.json) | `katex`, `remark-math`, `rehype-katex`, `jsbarcode` dependency-k |
| [public/llms.txt](public/llms.txt) (ha létezik) | Új szekció a kalkulátorokkal |
| [src/content/config.ts](src/content/config.ts) | **Új** Astro Content Collection `math` schema (articleSchema/softwareSchema/faqPageSchema frontmatter) |
| [src/content/math/ro/](src/content/math/ro/) | **Új** hosszú markdown tartalmak (~30-40 fájl kategóriánként) |
| [src/lib/seo.ts](src/lib/seo.ts) | Új helperek: `softwareApplicationSchemaMath()`, `articleSchemaMath()`, `faqPageSchemaFromFrontmatter()` |
| [src/pages/og/\[category\]/\[slug\].png.ts](src/pages/og/[category]/[slug].png.ts) | Kategória-szín paletta + math ikonográfia kiterjesztés |
| [astro.config.mjs](astro.config.mjs) | `remark-math` + `rehype-katex` integration hozzáadása |

---

*Készítve: 2026-04-25. A `internal-docs/mathSEO_reference/` már gitignore-ban — a referencia projekt nem kerül commit-ba.*
