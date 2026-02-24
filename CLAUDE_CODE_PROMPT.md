# Claude Code Prompt – EszközTár Tool Hub fejlesztés

## Projekt kontextus

Az EszközTár egy 100% client-side, szervermentes online eszközportál.
- Framework: **Astro 4 (SSG) + Svelte 5 islands**
- Feldolgozás: **Web Workers** (UI soha nem fagy le)
- SEO: **Schema.org JSON-LD** (SoftwareApplication, FAQPage, BreadcrumbList)
- Dark mode: CSS custom properties, class-based + prefers-color-scheme
- Minden tool metaadata: **src/lib/tool-registry.ts** (single source of truth)

## Architektúra szabályok (NE törd meg ezeket!)

1. **SOHA ne tegyél hardcode title/description/faq adatot .astro page-be** – minden a tool-registry.ts-ből jön
2. **Minden tool page 3-5 sor** – csak importál és renderel: `<ToolLayout tool={tool}><XTool client:load /></ToolLayout>`
3. **Minden heavy feldolgozás Web Workerbe** – src/workers/*.worker.ts
4. **Schema-k automatikusan generálódnak** a ToolLayout-ban és CategoryLayout-ban – ne add hozzá manuálisan
5. **Új tool hozzáadása = 3 lépés:** registry → Svelte komponens → Astro page (ennyi)

## Könyvtárszerkezet referencia

```
src/lib/tool-registry.ts    ← tool metaadatok (cím, leírás, FAQ, related, status)
src/lib/seo.ts              ← JSON-LD schema generátorok
src/lib/download.ts         ← blob/zip letöltési helperek
src/workers/image.worker.ts ← képkonverzió (OffscreenCanvas)
src/workers/data.worker.ts  ← CSV/JSON feldolgozás
src/workers/text.worker.ts  ← szöveg transzformációk
src/layouts/BaseLayout.astro      ← HTML wrapper, nav, dark mode
src/layouts/ToolLayout.astro      ← breadcrumb, FAQ accordion, related tools
src/layouts/CategoryLayout.astro  ← kategória landing oldal
src/components/ui/Dropzone.svelte      ← drag&drop + validáció
src/components/ui/ProgressQueue.svelte ← batch feldolgozás UI
```

---

## 1. feladat: PNG → WebP tool implementálása

Fájlok amikbe bele kell nyúlni:
- `src/lib/tool-registry.ts` → a `png-webp` tool `status: "coming-soon"` → `"active"` és `component: "PngWebpTool"` felvétele
- Új: `src/components/tools/kep/PngWebpTool.svelte` → másolhatod a JpgWebpTool.svelte-t, egyetlen különbség: az `accept` prop `"image/png,.png"` és hozzáadsz egy opciót: **veszteségmentes WebP** (quality=100) vs. **veszteséges** (quality slider)
- `src/pages/kep/png-webp.astro` → már létezik (coming-soon), cseréld ki a komponenst

**Worker:** az `image.worker.ts` már kezeli a PNG-t – nem kell módosítani.

---

## 2. feladat: JSON → CSV tool implementálása

- `src/lib/tool-registry.ts` → `json-csv` → `status: "active"`, `component: "JsonCsvTool"`
- Új: `src/components/tools/adat/JsonCsvTool.svelte`
  - Input: textarea (JSON beillesztés) VAGY file upload (.json)
  - Opciók: delimiter választás (,/;/tab), include header toggle
  - Output: CSV preview (first 20 row) + letöltés gomb
  - Worker: `data.worker.ts`-be kell hozzáadni egy `json-to-csv` message type-ot

**Worker kiegészítés (data.worker.ts):**
```ts
// Hozzáadandó interface:
interface JsonToCsvMessage {
  type: "json-to-csv";
  id: string;
  json: string;
  filename: string;
  options: { delimiter: string; includeHeader: boolean };
}

// Handler logika: JSON.parse → Object.keys headers → sorok map → join
```

---

## 3. feladat: Fejlesztő tools – JSON formázó

- `src/lib/tool-registry.ts` → `json-formazas` → `status: "active"`, `component: "JsonFormazasTool"`
- Új: `src/components/tools/fejleszto/JsonFormazasTool.svelte`
  - Input textarea (JSON szöveg direkt bevitel, nem fájl – fejlesztőknek gyorsabb)
  - Indent beállítás: 2 / 4 / tab
  - Szintaxiskiemelés: alap CSS-sel (string = zöld, number = kék, key = fehér)
  - Valós idejű validálás – ha érvénytelen JSON, piros keret + hibaüzenet sorcímmel
  - Minify gomb is legyen benne (ugyanabban a komponensben)
  - **NINCS worker szükség** – JSON.parse/stringify szinkron, gyors

---

## 4. feladat: SEO – title/meta hossz ellenőrző

- `src/lib/tool-registry.ts` → `title-meta-hossz` → `status: "active"`, `component: "TitleMetaHosszTool"`
- Új: `src/components/tools/seo/TitleMetaHosszTool.svelte`
  - Input: title textarea + meta description textarea
  - Output valós időben:
    - Karakter számláló (title: max 60, meta: max 160)
    - Pixel szélesség becslése (title: max ~600px, fontonként ~7px átlag)
    - SERP előnézet mockup (Google-szerű keresési eredmény preview)
    - Sávos jelzés: zöld / sárga / piros
  - **NINCS worker** – szinkron számítás

---

## 5. feladat: Sitemap generálása (astro.config.mjs)

Az Astro `@astrojs/sitemap` integráció hozzáadása:

```bash
pnpm add @astrojs/sitemap
```

```js
// astro.config.mjs
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://eszkoztár.hu",
  integrations: [svelte(), sitemap()],
});
```

A `sitemap-index.xml` automatikusan generálódik a build során.
**Coming-soon oldalakat is indexelje** (vannak FAQ és leíró tartalmak, értékesek a Google-nek).

---

## 6. feladat: Batch képfeldolgozás – ZIP letöltés (JSZip eltávolítása)

A `JpgWebpTool.svelte`-ben jelenleg `jszip` van a ZIP-hez. Cseréld le `fflate`-re (már dependency, kisebb):

```ts
// Régi:
const { default: JSZip } = await import("jszip");

// Új:
import { downloadZip } from "../../lib/download.ts";
// A downloadZip már fflate-et használ
```

---

## 7. feladat: Új kategória oldalak – összes coming-soon tool page generálása

Minden `tool-registry.ts`-ben szereplő tool-hoz kell .astro page. Írj egy Node.js scriptet:

```js
// scripts/gen-pages.mjs
import { getAllTools } from "../src/lib/tool-registry.ts";
import { writeFileSync, mkdirSync } from "fs";

for (const tool of getAllTools()) {
  const dir = `src/pages/${tool.category}`;
  mkdirSync(dir, { recursive: true });
  const path = `${dir}/${tool.slug}.astro`;
  
  const content = tool.status === "active" && tool.component
    ? `---
import ToolLayout from "../../layouts/ToolLayout.astro";
import ${tool.component} from "../../components/tools/${tool.category}/${tool.component}.svelte";
import { getToolBySlug } from "../../lib/tool-registry.ts";
const tool = getToolBySlug("${tool.category}", "${tool.slug}")!;
---
<ToolLayout tool={tool}>
  <${tool.component} client:load />
</ToolLayout>`
    : `---
import ToolLayout from "../../layouts/ToolLayout.astro";
import { getToolBySlug } from "../../lib/tool-registry.ts";
const tool = getToolBySlug("${tool.category}", "${tool.slug}")!;
---
<ToolLayout tool={tool}><!-- coming soon --></ToolLayout>`;

  writeFileSync(path, content);
  console.log(`✓ ${path}`);
}
```

Futtatás: `node scripts/gen-pages.mjs`

---

## Általános kódminőségi elvárások

- **TypeScript strict** – nincs `any`, nincs implicit
- **Svelte komponensek** state-je reaktív ($: számítások)
- **Worker kommunikáció** mindig transferable objects-szel (ArrayBuffer transfer)
- **Accessibility**: minden form input-nak `id`+`label`, minden gombnak `aria-label` ha csak ikon
- **CSS**: csak CSS custom properties-t használj, ne hardcode-olj hex színt
- **Dark mode**: soha ne tegyél `color: #xxx` vagy `background: #xxx` direktet – mindig `var(--text)`, `var(--bg-card)` stb.
- **Tool page**: maxmum 10 sor legyen az .astro fájlban – ha több, valami rossz
- **SEO**: minden tool oldalhoz kell legalább 2 FAQ kérdés a registrybe

---

## Tesztelési checklist (minden új toolnál)

- [ ] Desktop Chrome/Firefox/Safari vizuális ellenőrzés
- [ ] Mobile (375px) responsive
- [ ] Dark mode toggle – nincs flash, minden elem sötétedik
- [ ] Worker: nagy fájl (>5MB) feltöltésnél az UI NEM fagy
- [ ] Batch: 10+ fájl egyszerre – sor megfelelően működik
- [ ] ZIP letöltés – kicsomagolás után helyes fájlok
- [ ] Schema validálás: https://validator.schema.org/ (JSON-LD)
- [ ] Lighthouse score: Performance ≥90, Accessibility ≥95, SEO ≥95
- [ ] Console error nélkül
