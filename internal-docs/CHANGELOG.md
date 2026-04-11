# Changelog

## [Nem kiadott] – 2026-04-11

### Hozzáadva
- `internal-docs/adsense-manual-slots.md` – leírás a manuális AdSense slot aktiváláshoz (Auto ads → manuális slotok átváltás lépései)

### Módosítva
- `astro.config.mjs` – explicit `trailingSlash: "always"` beállítás hozzáadva; Google ne kezelje duplikátumnak a `/path` és `/path/` URL-eket
- `src/lib/timing-config.ts` – `showAdSlot: false` visszaállítva (Auto ads mód aktív, manuális slotok kikapcsolva)

---

## [2026-04-06] – AdSense CSP javítások

### Módosítva
- `public/_headers` – Content Security Policy bővítve AdSense szükséges domain-jeivel:
  - `script-src`: `pagead2.googlesyndication.com`, `partner.googleadservices.com`, `tpc.googlesyndication.com`, `fundingchoicesmessages.google.com`, `www.googletagservices.com`, `*.adtrafficquality.google`
  - `connect-src`: `googleads.g.doubleclick.net`, `pagead2.googlesyndication.com`, `fundingchoicesmessages.google.com`, `*.adtrafficquality.google`
  - `frame-src`: `googleads.g.doubleclick.net`, `tpc.googlesyndication.com`, `*.adtrafficquality.google`, `www.google.com`
- `src/middleware.ts` – ugyanazok a CSP változtatások a dev szerver számára
- `src/lib/timing-config.ts` – `showAdSlot` flag kezelés (Auto ads módhoz visszaállítva)
- `internal-docs/adsense-manual-slots.md` – létrehozva

---

## [2026-04-01] – Trailing slash + SEO javítások

### Módosítva
- `src/lib/url-utils.ts` – `toolUrl()`, `categoryUrl()`, `staticUrl()` mindig trailing slash-sel tér vissza; sitemap és Netlify viselkedéssel konzisztens
- `src/lib/seo.ts` – `buildCanonical()` bővítve: fájl kiterjesztésre (`.png`, `.jpg` stb.) és fragment URL-re (`#`) nem tesz trailing slash-t; `toolSoftwareSchema()` és `techArticleSchema()` opcionális `rawSlug?` paramétert kapott
- `src/layouts/ToolLayout.astro` – `ogImage`, `toolSoftwareSchema()`, `techArticleSchema()` most `rawTool.slug`-ot használ (nem lokalizált slug-ot), hogy a HU buildben generált képfájlok neve egyezzen a RO buildben hivatkozott URL-ekkel
- `src/pages/[category]/index.astro` – trailing slash eltávolítva a route param-ból (`catSlug` cleanup)
- `netlify.toml` / `netlify.hu.toml` – redirect célok trailing slash-sel: `/kep/jpg-webp/`, `/adat/csv-json/`
- `src/components/static-pages/KapcsolatPage.astro` – `hreflangPaths` hozzáadva
- `src/components/static-pages/RolunkPage.astro` – `hreflangPaths` hozzáadva
- `src/components/static-pages/AdatvedelmiPage.astro` – `hreflangPaths` hozzáadva
- `src/components/static-pages/AszfPage.astro` – `hreflangPaths` hozzáadva
- `src/components/static-pages/KeresPage.astro` – `hreflangPaths` hozzáadva; `noIndex={true}` megtartva (keresési oldal szándékosan kizárva az indexből)

### Javítva
- **Román slug 404-ek konvertalo.hu-n**: A statikus oldalakon hiányzó `hreflangPaths` miatt a Google `hreflang="hu"` bejegyzésként `/contact/`, `/despre-noi/` stb. román slug-okat kapott a magyar domain-en → 404. Megoldás: explicit `hreflangPaths` minden statikus oldalon.
- **OG/hero képek helytelen slug-gal**: Lokalizált (román) slug helyett most mindig az eredeti HU slug alapján generálódik a képfájl URL.

---

## [2026-03-22] – Google Ads alapok + GEO + trailing slash build

### Hozzáadva
- `public/ads.txt` – AdSense publisher ID bejegyzés
- `internal-docs/GEO-AUDIT-REPORT-konvertalo-v2.md` – frissített GEO audit riport
- `src/components/static-pages/AszfPage.astro` – ÁSZF statikus oldal komponens
- `.env.example` – dokumentált env változók (AdSense, Brevo, build-time)

### Módosítva
- `src/lib/timing-config.ts` – `showAdSlot` flag bevezetve
- `src/layouts/BaseLayout.astro` – AdSense script tag hozzáadva (ENV guard-dal)
- `src/lib/seo.ts` – SEO séma javítások
- `src/lib/url-map.ts` – új statikus URL mapping bejegyzések
- `src/pages/[staticPage].astro` – ÁSZF oldal route kezelés
- `src/pages/sitemap.xml.ts` – `ensureTrailingSlash()` helper hozzáadva
- `src/i18n/hu.json` / `src/i18n/ro.json` – fordítási kulcsok bővítve
- `internal-docs/ARCHITECTURE.md` – frissítve

---

## [2026-03-19] – Új képeszközök + SEO

### Hozzáadva
- Új kép konverziós eszközök (PNG/JPG/AVIF/WEBP variánsok)

### Módosítva
- SEO meta adatok és schema javítások

---

## [2026-03-16] – PDF eszközök v2

### Hozzáadva
- Új PDF eszközök: oldalak forgatása, kiválasztása, sorrendje, törlése, vízjel, aláírás, redact, oldalszámozás, jelszóvédelem, jelszó eltávolítás

---

## [2026-03-03] – Google Tag Manager + Email

### Hozzáadva
- GTM integráció (`GTM_ID` env változó)
- Brevo email feliratkozás javítás

---

## [2026-03-01] – Teljesítmény + HU/RO cross-linking

### Hozzáadva
- HU ↔ RO hreflang kereszt-hivatkozások
- GTag RO domain konfiguráció

### Módosítva
- Teljesítmény optimalizálások (bundle, lazy load)

---

## [2026-02-28] – HU+RO dual-domain alap

### Hozzáadva
- Dual-domain architektúra: `netlify.hu.toml` + `netlify.ro.toml`
- Build-time `PUBLIC_SITE_LANG` + `PUBLIC_SITE_URL` env változók
- `src/i18n/` – HU és RO fordítások
- `src/lib/url-utils.ts` – `toolUrl()`, `categoryUrl()`, `staticUrl()` URL helper-ek

---

## [2026-02-24] – Első commit

### Hozzáadva
- Astro 5.x SSG alap projekt
- Svelte 5.x Islands architektúra
- Analytics alap (Google Tag)
- Alap eszközkategóriák és tool registry
