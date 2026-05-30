# STRUCTURE-MAP.md — InstrumenteOnline.ro (FAZA 1 — Cartografiere)

> A repo tényleges szerkezete, kódból verifikálva (2026-05-30).
> Cél: új kalkulátor-/átváltó-/countdown-oldalt lehessen létrehozni a teljes repo
> újraolvasása nélkül. A PLAYBOOK 2. szakaszának feltételezéseit ez a fájl
> **felülírja**, ahol eltér.

---

## 0. TL;DR — A repo lényege

- **Stack:** Astro 5 (SSG, Content Layer API) + Svelte 5 (`$state`/`$derived` runes) + KaTeX (SSR) + live SVG. 100% client-side számítás.
- **Kétnyelvű, kétdomain, EGY codebase:** a build-időben beállított `PUBLIC_SITE_LANG` env (`hu` → konvertalo.hu, `ro` → instrumenteonline.ro) határozza meg, melyik nyelv generálódik. Külön statikus build domainenként.
- **A `tool-registry.ts` a TÖRVÉNY** (single source of truth a routinghoz). Komponens registry-bejegyzés nélkül nem generál oldalt; registry-bejegyzés komponens nélkül „could not load" hibát ad.
- **A tartalom KÉT rétegből jön:**
  1. **TS content map** (`src/lib/content/ro/{kategoria}-content.ts`) — introText, guide, faq, content szekciók. **Ez a render elsődleges forrása.**
  2. **Markdown longform** (`src/content/math/ro/{kategoria}/{slug}.md`) — opcionális hosszú szöveg + **JSON-LD schema frontmatter** (articleSchema/softwareSchema/faqPageSchema). Ha létezik, ez **felülírja** a layout auto-generált schemáit.

---

## 1.1 Routing & fájlszervezés

### Útvonalak (Astro dinamikus route-ok, mind `getStaticPaths`)

| URL-minta | Route-fájl | Mit renderel |
|---|---|---|
| `/{categorie}/{slug}/` | `src/pages/[category]/[slug].astro` | **Minden tool KIVÉVE conversii.** Pl. `/finante/calculator-tva/`, `/timp/craciun-numaratoare/`, `/calculator/procent-calculator/` |
| `/conversii/{subcat}/{slug}/` | `src/pages/[category]/[subcat]/[slug].astro` | conversii tool ÉS instant-answer (pSEO) oldalak. `kind: "tool" \| "instant"` prop dönt. |
| `/{categorie}/` | `src/pages/[category]/index.astro` | Kategórialap (CategoryLayout) |
| `/conversii/{subcat}/` | `src/pages/[category]/[subcat]/index.astro` | conversii al-hub (ConversionHubLayout), RO-only |
| `/{staticPage}` | `src/pages/[staticPage].astro` | statikus oldalak (rolunk, kapcsolat, …) |

**Hogyan oldódik fel `/finante/calculator-tva/`:**
1. `[category]/[slug].astro` → `getStaticPaths()` lekéri `getVisibleTools().filter(t => t.category !== "conversii")`.
2. `toolUrl(tool)` → `/finante/calculator-tva/`, split → `params:{category:"finante", slug:"calculator-tva"}`.
3. Props: `tool`, `componentName: tool.component` (`"TvaCalculator"`), `componentProps`.
4. Render: `<ToolLayout tool={tool}>` + (ha `status==="active"` és van component) `<DynamicTool client:visible componentName={...} />`.

**Conversii (3 szegmens):** a tool-nak szerepelnie KELL a `CONVERSII_HUBS` valamelyik `toolSlugs`-ában (`src/lib/content/ro/conversii-hubs.ts`), különben nem kap helyes URL-t. A subcat onnan jön (`getSubcatForTool(slug)`).

### Komponens-feloldás: `src/components/tools/DynamicTool.svelte`
- `COMPONENT_IMPORTS: Record<string, () => Promise<...>>` — név → lazy `import()`.
- Új tool komponensét **ide is fel kell venni**, pontosan a registry `component` mezőjével egyező néven, különben error state.

### A teljes lánc egy új oldalhoz (KÖTELEZŐ lépések)
1. **Svelte komponens:** `src/components/tools/{kategoria}/{Nev}.svelte`.
2. **DynamicTool mapping:** `{Nev}: () => import("../tools/{kategoria}/{Nev}.svelte")`.
3. **Registry bejegyzés:** `src/lib/tool-registry.ts` `TOOLS` tömb — `{ slug, category, title, h1, description, keywords, status:"active", component:"{Nev}", languages:["ro"], related:[...], updatedAt, launchedAt, faq:[] }`.
4. **TS content:** `src/lib/content/ro/{kategoria}-content.ts` → `{slug}: { introText, guide, faq, content }`.
5. **(Opcionális, de SEO-hoz ajánlott) Markdown:** `src/content/math/ro/{kategoria}/{slug}.md` schema frontmatterrel.
6. **Homepage blokkok:** `src/pages/index.astro` → `NEW_TOOL_SLUGS_RO` (és ha indokolt `TOP_TOOL_SLUGS_RO`).
7. Sitemap automatikus (lásd 1.5).

---

## 1.2 Komponensek

### Countdown engine — `src/components/tools/timp/CountdownBase.svelte`
Közös engine, callback-ekkel paraméterezve. Props:
```ts
name, emoji,
getTargetDate: (now: Date) => Date | null,   // a következő jövőbeli dátum
progressLabel: (zile) => string,
progressPercent: (now, target) => number,
mathFact: (zile, ore, min, sec) => string,
celebrationMessage?, isCelebrating?, showShare?,
effectOverlay?: Snippet,   // animáció (ninsoare/artificii)
extraContent?: Snippet,    // pl. CountdownGenerator beviteli mező
headerExtra?: Snippet
```
Tick: `setInterval(1000)` → `now` `$state`, minden számolt érték `$derived`. UI fix: 4 számjegyű kijelző (zile/ore/min/sec) + progress bar + mathFact + share gombok (FB/X/WhatsApp/copy).

**Meglévő példák:** `CraciunCountdown` (dec 25, 48h ünnep + hóesés), `RevelionCountdown` (jan 1, tűzijáték), `PastiCountdown` (ortodox húsvét, Meeus-algoritmus), `BacalaureatCountdown` (június 3. hétfője, 14 nap ünnep-ablak), `ZiNastereCountdown`, `CountdownGenerator` (user-konfigurálható, megosztható URL).

**Új countdown receptje (pl. `1-decembrie-numaratoare`):**
1. `src/components/tools/timp/DecembrieCountdown.svelte` — másold a `CraciunCountdown`-t, írd át a `getTargetDate`-et (`new Date(y, 11, 1)`), `progressLabel`/`mathFact`/`celebrationMessage` RO szöveget, opcionálisan `effectOverlay`.
2. DynamicTool mapping + registry (`component:"DecembrieCountdown"`, category `timp`).
3. timp-content.ts + (opcionális) md.
4. **`src/lib/timp-years.ts`** — itt vannak a build-időben kiszámolt év-konstansok (`CRACIUN_YEAR`, `CRACIUN_DATE_RO`, …) a helyes évszámú title/meta-hoz. Adj hozzá `DECEMBRIE_YEAR`/`DECEMBRIE_DATE_RO`-t a `nextOccurrence(...)` mintával, és használd a content/title szövegben.

### Átváltó base — `src/components/tools/shared/UnitConverter.svelte`
Lineáris kétirányú átváltás (`y = x*factor + offset`). Props: `fromUnit/toUnit, factor, offset, fromLabel/toLabel, defaultValue, decimals, formula`. UI: `[input] [⇄ swap] [input]` + copy gombok.
**Új átváltó (pl. pogon↔m²):** wrap-eld a `UnitConverter`-t a faktorral, VAGY másold a `HectareCalculator`/`KgLivreCalculator`/`ToneKgCalculator` mintát ha **presetek** kellenek.

**Preset minta** (`KgLivreCalculator`, `ToneKgCalculator`): egyszerű tömb a komponens tetején, pl. `const PRESETS = [{label:"TIR (12 t)", tone:12}, ...]`, chip-gombokként renderelve.

### Kalkulátor minták (mode-tabs + dinamikus sorok)
- **`MedieCalculator.svelte`** — átlag/súlyozott átlag/medián/szórás, **dinamikus sorok** (+Adaugă rând), mode-tab (simplu/ponderat). **Ez a Tier 2 „medii școlare" alapja.**
- **`ProcentCalculator.svelte`** — 4 mode tab.
- **`TvaCalculator.svelte`** — 3 mode + kulcsválasztó; **`SalariuOraCalculator.svelte`** — bér + presetek. Ezek a Tier 3 `calculator-salariu-net` mintái.

### KaTeX — `src/components/ui/KatexFormula.astro` + `src/lib/katex.ts`
**SSR, zéró kliens-JS.** Használat Astro-ban: `<KatexFormula tex={"x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"} block />` (inline: `block` nélkül). `renderMath(tex,{displayMode})` → HTML. A layoutban `katex={true}` prop tölti be a `/katex/katex.min.css`-t.

### Geometria live SVG
`CercCalculator.svelte` (4 input mode, kör + szektor/szegmens SVG), `TriunghiDreptCalculator.svelte` (6 mode, trigonometria, háromszög SVG, speciális-háromszög badge). Inline SVG `viewBox`-szal, `var(--cat-geometrie)` színnel, `$derived` path-okkal.

---

## 1.3 SEO & meta

**Központi forrás:** `src/lib/seo.ts` (`SITE_NAME/SITE_URL/SITE_DESCRIPTION` a `LANG_CONFIG`-ból). Minden meta a **`BaseLayout.astro`-ban** renderelődik, a layout-prop séma:

```ts
// BaseLayout Props
title, description?, canonical?, ogTitle?, ogDescription?, ogImage?,
ogImageWidth?, ogImageHeight?, ogType?:"website"|"article",
schemaScripts?: string[],            // JSON-LD tömb
hreflangPaths?: { hu?: string|null; ro?: string|null },
noIndex?: boolean, publishedAt?, modifiedAt?, katex?: boolean
```

- **`<title>`** = `title` + auto `" | {SITE_NAME}"`. **Canonical** = `buildCanonical(path)` (trailing slash kötelező).
- **og/twitter:** teljes set renderelve; `twitter:card` dinamikus (large/summary). `theme-color` dual (light `#f5f5f0` / dark `#0f0f0e`).
- **robots:** alapból index; `noIndex:true` → `noindex,nofollow` (coming-soon tooloknál).
- **og:image PER-OLDAL, dinamikus:** `src/pages/og/[category]/[slug].png.ts` (Satori+Resvg, 1200×630, build-időben minden tool-ra). Hero: `src/pages/hero/[category]/[slug].png.ts` (1200×675). Fallback `/og-default.png`. **A `ToolLayout` `/og/{category}/{slug}.png`-t állít be.**
- `ToolLayout` automatikusan: `title=tool.title`, `description=tool.description`, `canonical=toolUrl`, `modifiedAt=tool.updatedAt`.

---

## 1.4 Schema (JSON-LD) — KRITIKUS

**Injektálás:** minden layout `schemas: string[]`-et épít, átadja `schemaScripts`-ként a `BaseLayout`-nak, ami:
```astro
{schemaScripts.map(s => <script type="application/ld+json" set:html={s} />)}
```

### Site-szintű (csak homepage — `src/pages/index.astro`)
`WebSite` (SearchAction-nel) + `Organization` (`@id .../#organization`, founder, sameAs) + `Person` (founder, `@id .../#founder`) + `ItemList` (összes aktív tool) + `FAQPage` (site FAQ). Helper-ek a `seo.ts`-ben (`websiteSchema`, `organizationSchema`, `founderPersonSchema`).

### Tool-oldal (`ToolLayout.astro`)
1. **`BreadcrumbList`** — MINDIG. `toolBreadcrumbs(tool, categoryLabel, subcat?)` → Acasă / {Categorie} / [{Subcat}] / {h1}.
2. **Ha van longform md** (`mathSchemaScripts.length>0`): a md frontmatter `articleSchema`+`softwareSchema`+`faqPageSchema` blokkjai mennek ki, és a layout **NEM** generál auto-schemát.
3. **Ha nincs longform:** `toolSoftwareSchema(tool)` → `@type:["SoftwareApplication","WebApplication"]`, `applicationCategory:"UtilitiesApplication"`, `applicationSubCategory` a `SUBCATEGORY_MAP` szerint (finante→FinanceApplication, sanatate→HealthApplication, calculator/geometrie→EducationalApplication, timp/conversii→UtilitiesApplication), `offers price:"0" priceCurrency:"RON"` (RO), `inLanguage:"ro"`, `aggregateRating` (determinisztikus a slug-hashből), `screenshot`/`image`.
4. **`FAQPage`** ha `tool.faq.length>0` (`faqSchema`).
5. **`TechArticle`** ha van `content.aboutSection`; **`ItemList`** ha van `content.useCases`.

### Markdown frontmatter séma (a md a longform + schema forrása)
`src/content/config.ts` `math` collection (`glob **/*.md`), mezők: `title, description, toolSlug?, instantSlug?, subcategory?, category, published_at, refreshed_at?, articleSchema?, softwareSchema?, faqPageSchema?, separatePage?`. A schema mezők `z.record(z.any())` — szabad JSON-LD objektum YAML-ban.

**Minta (1:1 követendő) — `src/content/math/ro/finante/calculator-tva.md`:**
```yaml
toolSlug: "calculator-tva"
category: "finante"
published_at: "2026-04-27T00:00:00.000Z"
refreshed_at: "2026-04-27T00:00:00.000Z"
articleSchema:   { "@type":"Article", headline, description, datePublished, dateModified, inLanguage:"ro",
                   author/publisher: {"@type":"Organization","@id":"https://instrumenteonline.ro/#organization"} }
softwareSchema:  { "@type":"SoftwareApplication", name, applicationCategory:"FinanceApplication",
                   operatingSystem:"Web", url, inLanguage:"ro", isAccessibleForFree:true,
                   offers:{price:"0",priceCurrency:"RON",availability:"InStock"},
                   aggregateRating + review[] }
faqPageSchema:   { "@type":"FAQPage", mainEntity:[{Question → acceptedAnswer.Answer.text}] }
```
> **Konzisztencia-szabály:** a `faqPageSchema` Q&A-i 1:1 egyezzenek a látható „Întrebări frecvente" blokkal. Ne tegyél `aggregateRating`-et valós review nélkül kézzel — a meglévő md-k determinisztikus mintát követnek; új oldalon vagy hagyd a layout auto-generálásra (software schema), vagy kövesd a meglévő md formátumát.

---

## 1.5 Belső linkelés

- **Kategórialap „Instrumente disponibile":** `CategoryLayout.astro` dinamikusan, `status==="active"` tooltokból (`getToolsByCategory`). → új tool a registryben automatikusan megjelenik.
- **Homepage „populare" / „cele mai noi":** **kézzel kurált slug-tömbök** a `src/pages/index.astro`-ban: `TOP_TOOL_SLUGS_RO` és `NEW_TOOL_SLUGS_RO`. **NINCS `popular:true`/`new:true` flag** — ide manuálisan kell felvenni `{category, slug, icon}` formában.
- **„Instrumente similare" (related):** a registry `related: string[]` mezője; `getRelatedTools(tool)` oldja fel (`getToolBySlug(category, slug)` — figyelem: a related slug ugyanabban a kategóriában keres). Renderelve a `ToolLayout`-ban.
- **Footer kategórialista:** dinamikus, `getVisibleCategories(CURRENT_LANG)`-ból.
- **URL helper-ek:** `src/lib/url-utils.ts` — `toolUrl(tool,lang)`, `categoryUrl(catId,lang)`, `subcatUrl`, `instantAnswerUrl`.
- **Sitemap:** `src/pages/sitemap.xml.ts` — **kézzel generált API route a registryből** (NEM `@astrojs/sitemap`, az kommentelve `astro.config.mjs`-ben). Csak `status==="active"`. **Új aktív tool automatikusan bekerül.** `robots.txt.ts` AI-crawler allowlisttel (GPTBot, ClaudeBot, PerplexityBot, …); `llms.txt.ts` kategóriánként listázza az aktív toolokat.

---

## 1.6 i18n / lokalizáció

- **EGY codebase, KÉT build:** `CURRENT_LANG = import.meta.env.PUBLIC_SITE_LANG ?? "hu"` (`src/i18n/index.ts`). `LANG_CONFIG.ro` → InstrumenteOnline / instrumenteonline.ro / `ro_RO` / „IO" rövid név.
- **UI szövegek:** `src/i18n/ro.json` + `hu.json` (`t(key)` fallback: ro → hu → key). Tool-szintű lokalizáció: registry `i18n?.ro?.{slug,title,h1,description,…}` + `src/lib/i18n/ro-tools-*.ts`.
- **RO-only tool:** `languages: ["ro"]` → csak RO buildben jelenik meg, és a HU `hreflang` kimarad. Minden új RO math-tool legyen `languages:["ro"]`.
- **hreflang:** `BaseLayout` automatikusan hu+ro+x-default; ha a tool `languages:["ro"]`, a HU alternate kihagyva (nincs törött hreflang).

---

## 1.7 Számkonzisztencia — JAVÍTANDÓ BUG

- **Header** (`BaseLayout.astro`): `getActiveToolsCount()` = `tools.filter(status==="active").length`.
- **Footer**: `getTotalToolsCount()` = `tools.length` (tartalmazza a `coming-soon`-t is).
- **→ Ezért tér el a header (aktív) és a footer (összes) szám.** Mindkettő a `tool-registry.ts`-ből számolódik, nincs hardcode-olt „162"/„169".
- **Fix javaslat:** a footer is `getActiveToolsCount()`-ot használjon (vagy a `ro.json` `footer.tagline` szövege mondja ki, hogy „total"). Egy helyen, a registryből frissül — új tool felvételekor nincs külön teendő.

---

## 2. Definition of Done — gyakorlati checklist (a repo konvencióira szabva)

Új RO oldalhoz:
- [ ] Slug RO, ékezet nélkül, kötőjeles, a kategória-sémában.
- [ ] Svelte komponens létrehozva + **DynamicTool mappingbe** felvéve.
- [ ] **Registry bejegyzés** (`languages:["ro"]`, `status:"active"`, `component`, `related`, `updatedAt`, `launchedAt`).
- [ ] **TS content** (`{kategoria}-content.ts`): introText, guide, faq, content.
- [ ] **(SEO) Markdown** schema frontmatterrel (articleSchema+softwareSchema+faqPageSchema), a látható FAQ-val 1:1.
- [ ] Homepage `NEW_TOOL_SLUGS_RO` (+ ha indokolt `TOP_TOOL_SLUGS_RO`).
- [ ] KaTeX `<KatexFormula>` + lépésenkénti levezetés ahol releváns.
- [ ] `related[]` 3–4 klaszter-testvérre (kétirányú).
- [ ] `[VERIFICĂ]` adatok (adókulcs/faktor/dátum/prag) központi configban vagy hiteles forrásból.
- [ ] Disclaimer (sănătate/sarcină/ovulație).
- [ ] Sitemap auto (ellenőrizd a buildet). Számláló a registryből konzisztens.

---

## 3. Kulcsfájlok gyors index

| Cél | Fájl |
|---|---|
| Tool registry (TÖRVÉNY) | `src/lib/tool-registry.ts` |
| Komponens-mapping | `src/components/tools/DynamicTool.svelte` |
| TS content (per kategória) | `src/lib/content/ro/{kategoria}-content.ts` |
| Content típusok | `src/lib/content/types.ts` |
| Conversii al-hubok | `src/lib/content/ro/conversii-hubs.ts` |
| Markdown longform + schema | `src/content/math/ro/{kategoria}/{slug}.md` |
| Content collection séma | `src/content/config.ts` |
| SEO/schema helper-ek | `src/lib/seo.ts` |
| Layout (meta+schema inject) | `src/layouts/BaseLayout.astro` |
| Tool-oldal layout | `src/layouts/ToolLayout.astro` |
| Countdown engine | `src/components/tools/timp/CountdownBase.svelte` |
| Countdown év-konstansok | `src/lib/timp-years.ts` |
| Átváltó base | `src/components/tools/shared/UnitConverter.svelte` |
| KaTeX | `src/components/ui/KatexFormula.astro`, `src/lib/katex.ts` |
| Homepage blokkok | `src/pages/index.astro` (`TOP_/NEW_TOOL_SLUGS_RO`) |
| URL helper-ek | `src/lib/url-utils.ts`, `src/lib/url-map.ts` |
| Sitemap / robots / llms | `src/pages/{sitemap.xml,robots.txt,llms.txt}.ts` |
| i18n | `src/i18n/index.ts`, `ro.json`, `src/lib/i18n/ro-tools-*.ts` |
| OG/Hero kép gen | `src/pages/{og,hero}/[category]/[slug].png.ts` |

---

## 4. Megjegyzések a FAZA 2-höz (eltérések a PLAYBOOK feltételezéseitől)

- A PLAYBOOK „központi adatforrás" feltevése **igaz**, de **két helyen** kell regisztrálni: registry (`tool-registry.ts`) ÉS content map (`{kat}-content.ts`); a homepage blokkok **kézi slug-listák**, nem flag-ek.
- A schema **nem teljesen layout-szintű**: ha van md longform, a frontmatter schema az elsődleges — ezért a math-oldalakhoz **a md a hiteles schema-hely**.
- A `conversii` tool kötelezően `CONVERSII_HUBS.toolSlugs`-ba is kell (különben nincs URL). Tier 4 (pogon/jugăr) → `suprafata` hub `toolSlugs`-ába felvenni.
- Countdown-oknál a `timp-years.ts` év-konstans a helyes évszámú SEO-címhez — Tier 1-nél ezt is bővíteni kell.
- `Event` schema jelenleg **nincs** a countdown md-kben (a PLAYBOOK kérné) — Tier 1-nél hozzáadandó a frontmatterhez.
