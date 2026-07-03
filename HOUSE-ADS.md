# Saját (house-ad) hirdetési réteg

> Létrehozva: 2026-07-03. A konvertalo.hu (HU) és instrumenteonline.ro (RO)
> **saját (house-ad) hirdetési rétege**: egyetlen JSON-ból (SSOT) vezérelt,
> AdSense-mintára működő banner-motor — cikkbe szúrt bannerek (fölé/közepére/alá),
> site-wide beúszó (anchor) sáv és felugró (interstitial) popup. **Mindkét site-nak
> KÜLÖN beállítása ÉS KÜLÖN bannerei vannak.** Mintája: mathSeo *erdeireka* +
> operex-tudastar *BANNERS* house-ad rétege. Ez a réteg **független** a Google
> AdSense-től ([`AdSlot.svelte`](src/components/ui/AdSlot.svelte)) — azt nem érinti.

## Mi ez?

Egy **egy JSON-ból (SSOT) vezérelt** banner-réteg. A
[`src/config/house-ads.json`](src/config/house-ads.json) mondja meg, **melyik
site** (hu/ro), **mely** felület, **mely nézetben** (desktop/mobil), **milyen
formátumban**, **milyen időzítéssel** és **melyik saját bannert** (kreatívot)
mutassa. A build a `PUBLIC_SITE_LANG` env szerint az adott nyelv (`hu` vagy `ro`)
blokkját olvassa — így a HU és RO oldalon **eltérő** lehet a beállítás és a banner.

- A [`src/lib/house-ads.ts`](src/lib/house-ads.ts) `getHouseAdConfig()` olvassa
  (hiányzó/rossz mezőre defaulttal → a JSON sosem tudja „elrontani" a rendert).
- A [`src/components/HouseAdEngine.astro`](src/components/HouseAdEngine.astro)
  kliens-motor a `BaseLayout` `<body>` végéből, **site-wide** mountolva helyezi el
  a bannereket a config alapján.
- Minden linken `rel="sponsored noopener"` + `target="_blank"` + UTM
  (`utm_source=<domain>&utm_medium=house-ad&utm_campaign=house&utm_content=<placement>`).

## Megjelenés-beállítások (SSOT config)

Minden a **[`src/config/house-ads.json`](src/config/house-ads.json)** `hu` / `ro`
blokkjának `placements` és `creatives` mezőiben.

```jsonc
"hu": {
  "enabled": true,
  "placements": {
    "articleTop":    { "desktop": true,  "mobile": true,  "format": "leaderboard" },
    "articleMiddle": { "desktop": true,  "mobile": true,  "format": "leaderboard" },
    "articleBottom": { "desktop": true,  "mobile": true,  "format": "rectangle" },
    "anchorTop":     { "desktop": false, "mobile": false, "format": "leaderboard", "showDelayMs": 1200 },
    "anchorBottom":  { "desktop": false, "mobile": false, "format": "leaderboard", "showDelayMs": 1200 },
    "interstitial":  { "desktop": false, "mobile": false, "format": "rectangle", "minPageviews": 2, "delayMs": 4000 }
  },
  "creatives": [ { "id": "...", "weight": 2, "href": "https://...", "headline": "...", "subline": "...", "cta": "...", "bgFrom": "#...", "bgTo": "#...", "accent": "#fff", "textOn": "#fff" } ]
}
```

| mező | típus | mit vezérel |
|---|---|---|
| `enabled` | bool | az adott site house-ad rétege be/ki — **de a fő be/ki a `PUBLIC_HOUSE_ADS_ENABLED` env** (lásd lentebb); ez a JSON-mező csak finomhangol, és kell ≥1 kreatív |
| `desktop` / `mobile` | bool | megjelenjen-e az adott nézetben (töréspont: **48rem / 768px**) |
| `format` | enum | `leaderboard` \| `rectangle` |
| `showDelayMs` | szám | *csak anchor*: késleltetett beúszás (ms) |
| `minPageviews` | szám | *csak interstitial*: csak ennyiedik oldalletöltéstől (munkamenet) |
| `delayMs` | szám | *csak interstitial*: késleltetés a felugrás előtt (ms) |

> **Fejlesztői figyelem:** a JSON **build-időben** épül be (a motor inline megkapja),
> ezért módosítás után **`npm run build:hu` / `build:ro`** (élesben) vagy
> **dev-restart** kell — a Vite az import-cache miatt nem frissíti hot-reloaddal.

## Kreatívok (a bannerek)

A `creatives` tömb az adott site saját bannereinek katalógusa. **Több tétel =
súlyozott rotáció** (`weight`) — a motor placementenként húz egyet. Minden tétel
**kép-elsődleges, szöveges fallbackkel**:

- **Szöveges banner** (alapértelmezett): `headline` + `subline` + `cta` +
  `bgFrom`/`bgTo`/`accent`/`textOn` márkaszínekből generált kártya (bal oldali
  accent-rail + színes CTA).
- **Kép-banner:** adj `img`-et (abszolút `/public` útvonal, pl.
  `/house-ads/hu/operex-728x90.webp`) + `imgWidth`/`imgHeight` (CLS=0-hoz), opcionális
  `imgMobile`. Ekkor a kép renderel a szöveg helyett.

Cseréld a placeholder kreatívokat a valódi bannereidre — a `hu` és `ro` blokk
**egymástól függetlenül** szerkeszthető.

## Formátumok

| `format` | alak | hol tipikus |
|---|---|---|
| `leaderboard` | fekvő sáv: `[ikon + cím/szöveg] \| [CTA]` — **mobilon álló kártyára vált** | cikk fölé/közepére, anchor |
| `rectangle` | álló, közepes kártya | cikk alá, popup, mobil |
| `billboard` | nagy, széles fekvő banner (970×250) — **mobilon rectangle-re vált** | főoldal |

## Hirdetési felületek

| Felület | Hol a kódban | Formátum (default) | Alap (HU) |
|---|---|---|---|
| **Főoldal** (a Featured szekció után) | `HouseAdEngine` → a `[data-ha-home]` jelölőbe (`index.astro`) | billboard | **ON** |
| Cikk fölé (a tool UI után) | `HouseAdEngine` → a `.tool-page`-ben a `.tool-ui` után | leaderboard | **ON** |
| Cikk közepére | `HouseAdEngine` → a tartalom függőleges közepéhez legközelebbi `.section-title` szekció elé | leaderboard | **ON** |
| Cikk alá (a kapcsolódó eszközök előtt) | `HouseAdEngine` → a `.related-section` elé (v. a `.tool-page` végére) | rectangle | **ON** |
| Felső anchor (site-wide) | `HouseAdEngine` → `position:fixed` felső sáv | leaderboard | OFF (kész) |
| **Alsó anchor (site-wide)** | `HouseAdEngine` → `position:fixed` alsó sáv, összecsukható nyíllal | leaderboard | **ON** (alulról „úszik" fel) |
| **Felugró popup (interstitial)** | `HouseAdEngine` → modal overlay (2. oldalletöltéstől, 4s késés, 1×/munkamenet) | rectangle | **ON** |

**A cikkbe szúrt bannerek CSAK tool-oldalon** jelennek meg (a `.tool-page`
kell). A **főoldali** banner a főoldal `[data-ha-home]` jelölőjébe kerül. Az
**anchor + popup** minden oldalon (site-wide), ha be van kapcsolva. **HU alapállapot:
főoldal + 3 cikk-banner + alsó anchor + popup BE; csak a felső anchor KI** (JSON-ból bármikor kapcsolható).

## Ideális banner-méretek (IAB / Google)

| Felület | Desktop | Mobil |
|---|---|---|
| Cikk fölé | 728×90 (leaderboard) | 320×100 / 300×250 |
| Cikk közepe | 728×90 | 300×250 (medium rectangle) |
| Cikk alá | 336×280 (large rectangle) | 300×250 |
| Anchor (felül/alul) | 728×90 | 320×100 / 320×50 |
| Popup | 336×280 / 300×250 | 300×250 |

Asset-csere: 2× retina, WebP (PNG/JPG fallback) v. SVG, <150 KB. Fix méret → **CLS=0**.
(A méret-iránymutatás a `house-ads.json` `_MERETEK_IAB` blokkjában is megvan.)

## AdSense-szerű opciók

- **Anchor** (felül/alul) — **ÖSSZECSUKHATÓ**: a banner belső élének közepén egy
  nyíl-fül; rákattintva a sáv kikúszik, egy kis „Hirdetés ▲/▼" fül marad. Az állapotot
  (nyitva/csukva) `sessionStorage` őrzi pozíciónként → ha összecsukod, minden oldalon
  csukva marad; új munkamenetben nyitva indul. **Helyfoglalás (CLS=0):** nyitott
  állapotban a sáv a valós magasságát megmérve tolja a `body`-t (és felül a sticky
  `.site-header`-t) — injektált `<style>`, amit csukáskor törlünk; `ResizeObserver`
  tartja szinkronban a kép késői betöltése után is.
- **Interstitial popup** — KONZERVATÍV (SEO-biztos): csak a `minPageviews`-edik
  oldalletöltéstől, `delayMs` késleltetéssel, **munkamenetenként 1×** (`sessionStorage`);
  desktopon középre igazított modal, **mobilon alsó kártya** (nem teljes képernyős →
  nincs Google „intrusive interstitial" büntetés). Bezárható ✕-szel vagy háttér-kattintással.
- **Reszponzív** — a `desktop`/`mobile` kapcsoló + a leaderboard→kártya váltás a 48rem
  töréspontnál; a motor `matchMedia`-val átrendez a nézet váltásakor.
- **Reduced-motion** — `prefers-reduced-motion` esetén az animációk kikapcsolnak.
- **Súlyozott rotáció** — több `creatives` tétel közül `weight` szerint húz.
- **Biztonság** — a `href` csak `http(s)` lehet (a reader szűri); a badge/CTA/close
  feliratok a látogató nyelvén (HU „Hirdetés", RO „Publicitate").

## Fájlok

**Új:**
- [`src/config/house-ads.json`](src/config/house-ads.json) — a MEGJELENÍTÉSI SSOT (`hu` + `ro`, `_README`, `_FORMATUMOK`, `_MERETEK_IAB`, `_PLACEMENT_HELP`, `_CREATIVE_HELP`).
- [`src/lib/house-ads.ts`](src/lib/house-ads.ts) — config-olvasó defaultokkal (`getHouseAdConfig`, `getHouseAdEngineData`), per-site feloldás + kreatív-validálás.
- [`src/styles/house-ads.css`](src/styles/house-ads.css) — közös banner-stílus (kártya, formátumok, helyek, anchor, popup) a globális design-tokenekre.
- [`src/components/HouseAdEngine.astro`](src/components/HouseAdEngine.astro) — a kliens-motor (config inline + elhelyező JS).

**Módosított:**
- [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) — `house-ads.css` import + a `HouseAdEngine` mountolása a `<body>` végén (site-wide).

## FŐKAPCSOLÓ (env) — `PUBLIC_HOUSE_ADS_ENABLED`

A réteg **alapból KI van kapcsolva**. Csak akkor jelenik meg bármi, ha a
build-környezetben **`PUBLIC_HOUSE_ADS_ENABLED=true`**. Ha az env hiányzik vagy
nem `"true"` → a motor **meg sem renderel** (a reader `enabled=false`-t ad vissza).

A tényleges feltétel: **env (`true`) ÉS a site JSON `enabled` ÉS van ≥1 kreatív**.

**Oldalanként külön deploy-env → oldalanként külön kapcsoló:**

| Site | Hol állítod be | Megjegyzés |
|---|---|---|
| **HU** (konvertalo.hu) | **default `netlify.toml`** → `[build.environment]` | konvertalo.hu ÉLESBEN EZT olvassa (nem a `netlify.hu.toml`-t) |
| **RO** (instrumenteonline.ro) | `netlify.ro.toml` `[build.environment]` **és/vagy** a RO Netlify site **dashboard env-je** | amelyiket a RO build ténylegesen használja |
| **lokál** | `.env.local` → `PUBLIC_HOUSE_ADS_ENABLED=true` | dev-restart kell |

> Mindhárom `netlify*.toml`-ban benne van a sor `"false"` értékkel — bekapcsoláshoz
> írd át `"true"`-ra és pushold (a Netlify újrabuildel).

### AdSense + saját hirdetés — függetlenek, oldalanként kombinálhatók

A két réteg **teljesen külön env-en** fut, ezért **oldalanként bármilyen kombináció**:

| | Google AdSense | Saját (house-ad) |
|---|---|---|
| kapcsoló | `PUBLIC_ADSENSE_CLIENT_ID` (ha be van állítva → betölt) | `PUBLIC_HOUSE_ADS_ENABLED="true"` |
| komponens | `AdSlot.svelte` (tool-okba ágyazva) + AdSense auto-ads | `HouseAdEngine.astro` (site-wide) |

Példák: HU-n AdSense, RO-n saját hirdetés → HU-nál csak a `PUBLIC_ADSENSE_CLIENT_ID`
legyen beállítva (a house env `false`/hiányzik), RO-nál fordítva. Ha egy oldalon
**csak** AdSense kell (semmi saját): hagyd a house env-et `false`-on. Ha egy oldalon
**csak** saját hirdetés: vedd ki onnan a `PUBLIC_ADSENSE_CLIENT_ID`-t és tedd a house
env-et `true`-ra. Egyszerre mindkettő is mehet ugyanazon az oldalon.

> Jelenleg az AdSense ID **mindkét** site configjában szerepel (HU: `netlify.toml`,
> RO: `netlify.ro.toml`) → az AdSense mindkét oldalon él. A saját réteg env-je
> mindkettőn `"false"` → a saját hirdetés sehol nem látszik, amíg át nem kapcsolod.

## Finomhangolás (a főkapcsoló BEKAPCSOLT állapotában)

- **Egy site teljes rétege ki:** `house-ads.json` → az adott nyelv `enabled: false` (az env `true` mellett is ez felülír), majd **build**.
- **Egy felület ki/be:** az adott placement `desktop`/`mobile` = `true`/`false`.
- **Anchor / popup bekapcsolása:** állítsd `true`-ra a kívánt nézetben (a viselkedés-paraméterek — `showDelayMs`, `minPageviews`, `delayMs` — is a JSON-ban).
- **Banner csere:** a `creatives` tömb szerkesztése (szöveg vagy `img`), site-onként külön.
