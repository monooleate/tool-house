# ⚡ EszközTár – File Transformer Tool Hub

> Ingyenes, 100% client-side online eszközök képekhez, PDF-ekhez, adatokhoz és szövegekhez.  
> Szerverfeltöltés nélkül. Privát. Villámgyors.

---

## Tech stack

| Réteg | Technológia |
|---|---|
| Framework | [Astro](https://astro.build) (SSG) |
| UI islands | [Svelte 5](https://svelte.dev) |
| Feldolgozás | Web Workers (+ opcionális WASM) |
| ZIP | fflate, JSZip |
| Deploy | Netlify / Vercel / Cloudflare Pages |
| Stílus | Vanilla CSS + CSS custom properties |

---

## Gyors start

```bash
# 1. Klónozás
git clone https://github.com/yourorg/eszkoztár.git
cd eszkoztár

# 2. Függőségek (pnpm ajánlott)
pnpm install
# vagy: npm install

# 3. Dev szerver (http://localhost:4321)
pnpm dev

# 4. Production build
pnpm build

# 5. Preview (a build kimenet tesztelése)
pnpm preview
```

---

## Projekt struktúra

```
/
├── public/                  # Statikus fájlok (favicon, manifest, robots.txt)
├── src/
│   ├── pages/               # Astro oldalak – minden URL egy .astro fájl
│   │   ├── index.astro      # Főoldal
│   │   ├── kep/
│   │   │   ├── index.astro  # /kep kategória landing
│   │   │   ├── jpg-webp.astro   # ✅ Működő tool
│   │   │   └── ...
│   │   ├── adat/
│   │   │   ├── csv-json.astro   # ✅ Működő tool
│   │   │   └── ...
│   │   ├── szoveg/
│   │   │   ├── slug-generator.astro  # ✅ Működő tool
│   │   │   └── ...
│   │   └── pdf/ excel/ fejleszto/ markdown/ html/ fajl/ seo/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML skeleton, SEO meta, dark mode, nav
│   │   ├── ToolLayout.astro      # Tool oldal: breadcrumb, FAQ, related
│   │   └── CategoryLayout.astro  # Kategória landing
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Dropzone.svelte      # Drag&drop fájlfeltöltő
│   │   │   └── ProgressQueue.svelte # Batch feldolgozás UI
│   │   └── tools/
│   │       ├── kep/JpgWebpTool.svelte
│   │       ├── adat/CsvJsonTool.svelte
│   │       └── szoveg/SlugGeneratorTool.svelte
│   │
│   ├── lib/
│   │   ├── tool-registry.ts  # 🎯 Single source of truth – MINDEN tool metaadata
│   │   ├── seo.ts            # Schema.org JSON-LD, canonical, OG helpers
│   │   └── download.ts       # Blob/ZIP letöltési helperek
│   │
│   ├── workers/
│   │   ├── image.worker.ts   # Képkonverzió (Canvas API, OffscreenCanvas)
│   │   ├── data.worker.ts    # CSV/JSON parsing
│   │   └── text.worker.ts    # Szöveg transzformációk
│   │
│   └── styles/
│       └── global.css        # Design tokens, dark mode, utility classes
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Új tool hozzáadása (3 lépés)

### 1. Tool regisztrálása (tool-registry.ts)

```ts
{
  slug: "jpg-avif",
  category: "kep",
  title: "JPG → AVIF konvertáló | Ingyenes online",
  h1: "JPG → AVIF konvertáló",
  description: "JPG képek konvertálása AVIF formátumba – max. tömörítés.",
  keywords: ["jpg avif", "avif converter"],
  status: "active",
  component: "JpgAvifTool",
  inputFormats: ["image/jpeg"],
  outputFormat: "image/avif",
  acceptMultiple: true,
  related: ["jpg-webp", "tomorites"],
  faq: [
    { q: "Mi az AVIF?", a: "Az AVIF egy modern képformátum, ami 50%-kal kisebb..." }
  ],
},
```

### 2. Svelte komponens (src/components/tools/kep/JpgAvifTool.svelte)

A `JpgWebpTool.svelte`-t másolhatod kiindulópontként – csak az outputFormat-ot változtasd.

### 3. Astro page (src/pages/kep/jpg-avif.astro)

```astro
---
import ToolLayout from "../../layouts/ToolLayout.astro";
import JpgAvifTool from "../../components/tools/kep/JpgAvifTool.svelte";
import { getToolBySlug } from "../../lib/tool-registry.ts";
const tool = getToolBySlug("kep", "jpg-avif")!;
---
<ToolLayout tool={tool}>
  <JpgAvifTool client:load />
</ToolLayout>
```

**Kész.** Az oldal SEO-ja, a breadcrumb, a FAQ és a kapcsolódó eszközök automatikusan megjelennek.

---

## SEO architektúra

Minden tool oldalon automatikusan generálódik:

| Schema | Leírás |
|---|---|
| `SoftwareApplication` | Tool neve, ára (ingyenes), operációs rendszer (Web) |
| `FAQPage` | A registry faq[] mezőből |
| `BreadcrumbList` | Főoldal → Kategória → Tool |
| `WebSite` | Főoldalon, SearchAction-nel |
| `Organization` | Főoldalon |
| `ItemList` | Kategória oldalakon és főoldalon |

### Meta tagek
- `<title>` – tool.title (registry)
- `<meta description>` – tool.description (registry)
- `<link rel="canonical">` – automatikus
- Open Graph: title, description, image, type
- Twitter Card: summary_large_image

---

## Dark mode

- CSS `prefers-color-scheme` automatikusan felismeri a rendszer beállítást
- Manual toggle: `<html class="dark">` vagy `<html class="light">`
- LocalStorage-ban mentett preferencia
- FOUC (villanás) megelőzve inline script-tel a `<head>`-ben

---

## Deploy

### Netlify (ajánlott)
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"
```

### Vercel
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist"
}
```

### Cloudflare Pages
- Build command: `pnpm build`
- Output directory: `dist`
- Node version: 20+

---

## Kötelező teendők deploy előtt

- [ ] `src/lib/seo.ts` – `SITE_URL` frissítése a végleges domain-re
- [ ] `astro.config.mjs` – `site:` frissítése
- [ ] `public/robots.txt` – sitemap URL frissítése
- [ ] OG kép elkészítése: `public/og-default.png` (1200×630px)
- [ ] Favicon: `public/icon-192.png`, `public/icon-512.png`
- [ ] Google Search Console verifikáció (meta tag vagy fájl)

---

## Aktív eszközök

| URL | Tool | Státusz |
|---|---|---|
| `/kep/jpg-webp` | JPG→WebP konvertáló | ✅ Aktív |
| `/adat/csv-json` | CSV→JSON konvertáló | ✅ Aktív |
| `/szoveg/slug-generator` | Slug generátor | ✅ Aktív |
| Minden más | Coming soon | 🚧 |

---

## License

MIT
