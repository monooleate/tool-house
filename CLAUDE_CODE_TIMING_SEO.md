# Claude Code Prompt – Timing Flow + SEO Content + AdSense

> Kontextus: Astro 4 SSG + Svelte 5 islands, meglévő scaffold.
> Ez a prompt 3 nagy feladatot fed le. Végezd el sorban, ne ugorj előre.

---

## FELADAT 1 — Timing Config rendszer

### 1.1 Globális config fájl

Hozd létre: `src/lib/timing-config.ts`

```ts
// src/lib/timing-config.ts
// ============================================================
// Konvertálás timing konfiguráció
// Minden érték ms-ban. 0 = azonnali (eredeti viselkedés).
// Eszközönként felülírható a tool-registry-ben.
// ============================================================

export interface TimingConfig {
  /** Fájl feltöltése után mennyi ms telik el mire a Konvertálás gomb aktív lesz.
   *  Ez az ablak reklám megjelenítésére is használható.
   *  Default: 2000 (2 mp) */
  delayBeforeConvert: number;

  /** Konverzió befejezése után mennyi ms telik el mire a Letöltés gomb aktív lesz.
   *  Ez a második reklám megjelenítési ablak.
   *  Default: 2000 (2 mp) */
  delayBeforeDownload: number;

  /** Legyen-e vizuálisan látható visszaszámláló a gombokon?
   *  Ha false: a gomb csak disabled állapotban van, szám nélkül.
   *  Default: true */
  showCountdown: boolean;

  /** AdSense placeholder megjelenjen-e?
   *  Ha false: az ad slot teljesen el van rejtve (display:none).
   *  Ha true: megjelenik a placeholder.
   *  Default: false – kapcsolható true-ra ha monetizálni akarsz */
  showAdSlot: boolean;
}

/** Globális alapértékek – minden tool ezt örökli ha nem ír felül */
export const DEFAULT_TIMING: TimingConfig = {
  delayBeforeConvert:  2000,
  delayBeforeDownload: 2000,
  showCountdown:       true,
  showAdSlot:          false,
};

/** Eszközönkénti felülírás – csak a különböző értékeket kell megadni */
export const TOOL_TIMING: Record<string, Partial<TimingConfig>> = {
  // Példa: ha egy tool-nál rövidebb delay kell:
  // "slug-generator": { delayBeforeConvert: 0, delayBeforeDownload: 0 },
  // "jpg-webp": { showAdSlot: true },
};

/** Visszaadja az adott tool timing config-ját (merged globális + egyedi) */
export function getTimingConfig(toolSlug: string): TimingConfig {
  const override = TOOL_TIMING[toolSlug] ?? {};
  return { ...DEFAULT_TIMING, ...override };
}
```

---

### 1.2 Új Svelte komponens: `ConvertButton.svelte`

Hozd létre: `src/components/ui/ConvertButton.svelte`

Ez a komponens kezeli a teljes konvertálás → letöltés flow-t.
**Minden tool Svelte komponens ezt használja a saját gombjai helyett.**

```svelte
<!-- src/components/ui/ConvertButton.svelte -->
<!--
  Kétfázisú gomb: Konvertálás delay → Letöltés delay
  Props:
    - timing: TimingConfig (getTimingConfig(slug) eredménye)
    - canConvert: boolean (van-e feltöltött, feldolgozásra kész fájl)
    - isConverting: boolean (fut-e a worker)
    - isDone: boolean (kész-e a konverzió)
    - onConvert: () => void (callback a tényleges konverzióhoz)
    - onDownload: () => void (callback a letöltéshez)
    - convertLabel: string (pl. "WebP konvertálás")
    - downloadLabel: string (pl. "WebP letöltése")
    - fileCount?: number (batch esetén hány fájl)
-->
<script lang="ts">
  import type { TimingConfig } from "../../lib/timing-config.ts";
  import { onDestroy } from "svelte";

  // ─── Props ───────────────────────────────────────────────
  export let timing: TimingConfig;
  export let canConvert: boolean      = false;
  export let isConverting: boolean    = false;
  export let isDone: boolean          = false;
  export let onConvert: () => void    = () => {};
  export let onDownload: () => void   = () => {};
  export let convertLabel: string     = "Konvertálás";
  export let downloadLabel: string    = "Letöltés";
  export let fileCount: number        = 0;

  // ─── Belső állapot ───────────────────────────────────────
  // Fázisok:
  //   "idle"         – nincs fájl / várakozás feltöltésre
  //   "pre-convert"  – fájl van, delay fut a Konvertálás gomb előtt
  //   "ready"        – Konvertálás gomb aktív
  //   "converting"   – worker fut
  //   "pre-download" – kész, delay fut a Letöltés gomb előtt
  //   "done"         – Letöltés gomb aktív
  type Phase = "idle" | "pre-convert" | "ready" | "converting" | "pre-download" | "done";

  let phase: Phase          = "idle";
  let countdown: number     = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let preConvertDone        = false; // belső flag – lefutott-e a pre-convert delay

  // ─── Reaktív logika ──────────────────────────────────────
  $: {
    if (!canConvert && phase === "idle") {
      // Nincs fájl – marad idle
    } else if (canConvert && !preConvertDone && phase === "idle") {
      // Fájl feltöltve → pre-convert delay indítása
      startPreConvert();
    }
  }

  $: if (isDone && phase === "converting") {
    startPreDownload();
  }

  // ─── Pre-convert delay ───────────────────────────────────
  function startPreConvert(): void {
    if (timing.delayBeforeConvert <= 0) {
      phase = "ready";
      preConvertDone = true;
      return;
    }
    phase = "pre-convert";
    const totalSec = Math.ceil(timing.delayBeforeConvert / 1000);
    countdown = totalSec;
    clearExistingInterval();
    intervalId = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearExistingInterval();
        phase = "ready";
        preConvertDone = true;
      }
    }, 1000);
  }

  // ─── Convert kattintás ───────────────────────────────────
  function handleConvert(): void {
    if (phase !== "ready") return;
    phase = "converting";
    onConvert();
  }

  // ─── Pre-download delay ──────────────────────────────────
  function startPreDownload(): void {
    if (timing.delayBeforeDownload <= 0) {
      phase = "done";
      return;
    }
    phase = "pre-download";
    const totalSec = Math.ceil(timing.delayBeforeDownload / 1000);
    countdown = totalSec;
    clearExistingInterval();
    intervalId = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearExistingInterval();
        phase = "done";
      }
    }, 1000);
  }

  // ─── Download kattintás ──────────────────────────────────
  function handleDownload(): void {
    if (phase !== "done") return;
    onDownload();
  }

  // ─── Reset (új fájl feltöltésekor) ───────────────────────
  export function reset(): void {
    clearExistingInterval();
    phase         = "idle";
    countdown     = 0;
    preConvertDone = false;
  }

  function clearExistingInterval(): void {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onDestroy(clearExistingInterval);

  // ─── Computed megjelenítési értékek ──────────────────────
  $: convertDisabled = phase !== "ready";
  $: downloadDisabled = phase !== "done";
  $: showConvertBtn  = phase !== "pre-download" && phase !== "done";
  $: showDownloadBtn = phase === "pre-download" || phase === "done";

  $: convertBtnLabel = (() => {
    if (phase === "pre-convert" && timing.showCountdown) {
      return `${convertLabel} (${countdown}s)`;
    }
    if (phase === "converting") return "Feldolgozás…";
    const suffix = fileCount > 1 ? ` (${fileCount} fájl)` : "";
    return convertLabel + suffix;
  })();

  $: downloadBtnLabel = (() => {
    if (phase === "pre-download" && timing.showCountdown) {
      return `${downloadLabel} (${countdown}s)`;
    }
    return downloadLabel;
  })();

  $: progressPercent = phase === "pre-convert"
    ? Math.round((1 - countdown / Math.ceil(timing.delayBeforeConvert / 1000)) * 100)
    : phase === "pre-download"
    ? Math.round((1 - countdown / Math.ceil(timing.delayBeforeDownload / 1000)) * 100)
    : 0;
</script>

<div class="convert-actions" role="group" aria-label="Konvertálás műveletek">

  <!-- KONVERTÁLÁS gomb -->
  {#if showConvertBtn}
    <button
      class="btn btn--convert"
      class:btn--disabled={convertDisabled}
      class:btn--loading={phase === "converting"}
      class:btn--countdown={phase === "pre-convert"}
      disabled={convertDisabled}
      on:click={handleConvert}
      aria-busy={phase === "converting"}
      aria-label={convertBtnLabel}
    >
      {#if phase === "converting"}
        <span class="btn__spinner" aria-hidden="true"></span>
        <span>Feldolgozás…</span>
      {:else if phase === "pre-convert"}
        <span class="btn__icon" aria-hidden="true">⏳</span>
        <span>{convertLabel}</span>
        {#if timing.showCountdown}
          <span class="btn__countdown" aria-label="{countdown} másodperc">{countdown}</span>
        {/if}
        <!-- Countdown progress bar a gomb alján -->
        <span
          class="btn__progress-track"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span class="btn__progress-fill" style="width: {progressPercent}%"></span>
        </span>
      {:else}
        <span class="btn__icon" aria-hidden="true">⚡</span>
        <span>{convertBtnLabel}</span>
      {/if}
    </button>
  {/if}

  <!-- LETÖLTÉS gomb -->
  {#if showDownloadBtn}
    <button
      class="btn btn--download"
      class:btn--disabled={downloadDisabled}
      class:btn--countdown={phase === "pre-download"}
      disabled={downloadDisabled}
      on:click={handleDownload}
      aria-label={downloadBtnLabel}
    >
      {#if phase === "pre-download"}
        <span class="btn__icon" aria-hidden="true">⏳</span>
        <span>{downloadLabel}</span>
        {#if timing.showCountdown}
          <span class="btn__countdown" aria-label="{countdown} másodperc">{countdown}</span>
        {/if}
        <span class="btn__progress-track">
          <span class="btn__progress-fill" style="width: {progressPercent}%"></span>
        </span>
      {:else}
        <span class="btn__icon" aria-hidden="true">⬇</span>
        <span>{downloadBtnLabel}</span>
      {/if}
    </button>
  {/if}

</div>

<style>
.convert-actions {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

/* Alap gomb reset – örökli a global .btn-t, csak kiegészítések */
.btn--convert,
.btn--download {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: var(--sp-4) var(--sp-6);
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all var(--t-fast);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  min-height: 52px;
}

.btn--convert {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
}

.btn--convert:not(.btn--disabled):hover {
  background: var(--accent-hover, #00a87e);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 30%, transparent);
}

.btn--download {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.btn--download:not(.btn--disabled):hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  transform: translateY(-1px);
}

/* Disabled állapot */
.btn--disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Countdown állapot */
.btn--countdown {
  opacity: 0.75;
}

/* Countdown badge a gombon belül */
.btn__countdown {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  background: rgba(0,0,0,0.2);
  border-radius: var(--r-sm);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  margin-left: auto;
}

/* Progress bar a gomb alján */
.btn__progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0,0,0,0.15);
}

.btn__progress-fill {
  display: block;
  height: 100%;
  background: rgba(0,0,0,0.4);
  transition: width 0.9s linear;
}

/* Spinner a converting állapothoz */
.btn__spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn__icon {
  font-size: 1.1em;
}
</style>
```

---

### 1.3 AdSlot komponens

Hozd létre: `src/components/ui/AdSlot.svelte`

```svelte
<!-- src/components/ui/AdSlot.svelte -->
<!--
  AdSense placeholder komponens.
  Ha showAdSlot=false: teljesen rejtett, 0 helyet foglal.
  Ha showAdSlot=true: megjelenik a slot (téglalap placeholder vagy éles ad).
  
  Props:
    - show: boolean
    - slot: "before-convert" | "before-download" | "sidebar" | "bottom"
    - adClient?: string  (pl. "ca-pub-XXXXXXXXXX")
    - adSlotId?: string  (pl. "1234567890")
    - label?: string     (fejlesztői label)
-->
<script lang="ts">
  export let show:       boolean = false;
  export let slot:       "before-convert" | "before-download" | "sidebar" | "bottom" = "before-convert";
  export let adClient:   string  = "ca-pub-XXXXXXXXXX";   // ← cseréld le élesben
  export let adSlotId:   string  = "0000000000";          // ← cseréld le élesben
  export let label:      string  = "Hirdetés";

  const isDev  = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;

  // Slot méret konfigurációk
  const SLOT_SIZES = {
    "before-convert":  { w: "100%", h: "90px",  format: "horizontal" },
    "before-download": { w: "100%", h: "90px",  format: "horizontal" },
    "sidebar":         { w: "300px", h: "250px", format: "rectangle" },
    "bottom":          { w: "100%", h: "90px",  format: "horizontal" },
  };

  $: cfg = SLOT_SIZES[slot];
</script>

{#if show}
  <div class="ad-slot ad-slot--{slot}" aria-label={label} role="complementary">
    {#if isDev}
      <!-- Dev módban: vizuális placeholder -->
      <div class="ad-slot__placeholder" style="width:{cfg.w}; height:{cfg.h}">
        <span class="ad-slot__label">📢 {label} [{slot}] – {cfg.w} × {cfg.h}</span>
        <span class="ad-slot__note">AdSense kód csak production-ban fut</span>
      </div>
    {:else}
      <!-- Production: valódi AdSense kód -->
      <!-- 
        HA már van AdSense account, cseréld le:
        adClient = "ca-pub-XXXXXXXXXX"
        adSlotId = "1234567890"
        és vedd ki a kommentet az ins tag körül
      -->
      <!--
      <ins
        class="adsbygoogle"
        style="display:block; width:{cfg.w}; height:{cfg.h}"
        data-ad-client={adClient}
        data-ad-slot={adSlotId}
        data-ad-format={cfg.format}
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
      -->
      <!-- Átmeneti placeholder amíg nincs éles AdSense -->
      <div class="ad-slot__placeholder ad-slot__placeholder--live" style="width:{cfg.w}; height:{cfg.h}">
        <span class="ad-slot__label">{label}</span>
      </div>
    {/if}
  </div>
{/if}

<style>
.ad-slot {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: var(--sp-4) 0;
}

.ad-slot__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-1);
  background: repeating-linear-gradient(
    45deg,
    var(--bg-card),
    var(--bg-card) 10px,
    color-mix(in srgb, var(--border) 40%, transparent) 10px,
    color-mix(in srgb, var(--border) 40%, transparent) 11px
  );
  border: 1px dashed var(--border);
  border-radius: var(--r-sm);
  max-width: 100%;
}

.ad-slot__placeholder--live {
  background: var(--bg-card);
  border-style: solid;
}

.ad-slot__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.ad-slot__note {
  font-size: 0.65rem;
  color: var(--border);
}
</style>
```

---

### 1.4 Meglévő tool komponensek átírása

**Minden meglévő Svelte tool komponenst** (JpgWebpTool.svelte, CsvJsonTool.svelte, SlugGeneratorTool.svelte) **írj át** a következő minta szerint:

#### Változások egy tool komponensben:

```svelte
<!-- RÉGI: direkt convert + download gomb -->
<!-- ÚJ: ConvertButton + AdSlot komponens -->

<script lang="ts">
  import ConvertButton from "../../components/ui/ConvertButton.svelte";
  import AdSlot from "../../components/ui/AdSlot.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  
  // Tool slug – egyezzen a registryvel
  const TOOL_SLUG = "jpg-webp"; // cseréld eszközönként
  const timing = getTimingConfig(TOOL_SLUG);

  // Meglévő state változók maradnak:
  let files: File[] = [];
  let isConverting = false;
  let isDone = false;
  // ... stb

  // ÚJ: ConvertButton ref a reset()-hez
  let convertBtnRef: ConvertButton;

  // Ha új fájl kerül a dropzone-ra → reset
  function handleFilesAdded(newFiles: File[]) {
    files = newFiles;
    isDone = false;
    isConverting = false;
    convertBtnRef?.reset();
  }

  async function doConvert() {
    isConverting = true;
    // ... worker hívás ... 
    isConverting = false;
    isDone = true;
  }

  function doDownload() {
    // ... letöltés logika ...
  }
</script>

<!-- TEMPLATE részlet: -->

<!-- Ad slot a konvertálás előtti ablakban -->
<AdSlot 
  show={timing.showAdSlot} 
  slot="before-convert"
/>

<!-- Konvertálás + letöltés gomb -->
<ConvertButton
  bind:this={convertBtnRef}
  {timing}
  canConvert={files.length > 0}
  {isConverting}
  {isDone}
  onConvert={doConvert}
  onDownload={doDownload}
  convertLabel="WebP konvertálás"
  downloadLabel="WebP letöltése"
  fileCount={files.length}
/>

<!-- Ad slot a letöltés előtti ablakban (pre-download delay alatt) -->
<AdSlot 
  show={timing.showAdSlot} 
  slot="before-download"
/>
```

**Konkrétan az alábbi három fájlt írd át:**
1. `src/components/tools/kep/JpgWebpTool.svelte` — `convertLabel="WebP konvertálás"`, `downloadLabel="WebP letöltése (ZIP)"`
2. `src/components/tools/adat/CsvJsonTool.svelte` — `convertLabel="JSON konvertálás"`, `downloadLabel="JSON letöltése"`
3. `src/components/tools/szoveg/SlugGeneratorTool.svelte` — `convertLabel="Slug generálás"`, `downloadLabel="Másolás vágólapra"` (itt a delay 0 maradhat – szöveg eszköz, nincs letöltés)

---

## FELADAT 2 — SEO Content rendszer

### 2.1 ToolContent típus a registry-be

Bővítsd a `src/lib/tool-registry.ts` `Tool` interface-t:

```ts
// Tool interface bővítés:
export interface ToolContent {
  /** Rövid használati útmutató, 3 lépés */
  howToSteps: Array<{
    title: string;
    description: string;
  }>;
  
  /** Use-case kártyák: mikor érdemes ezt a tool-t használni */
  useCases: Array<{
    icon: string;       // emoji
    title: string;
    description: string;
  }>;
  
  /** Formátum összehasonlítás táblázat */
  formatComparison?: {
    title: string;      // pl. "JPG vs WebP: gyors összehasonlítás"
    columns: string[];  // pl. ["Jellemző", "JPG", "WebP", "PNG"]
    rows: Array<{
      feature: string;
      values: string[];  // ugyanolyan hosszú mint columns[-1]
    }>;
  };
  
  /** Részletes leírás a formátumról / eszközről */
  aboutSection: {
    title: string;
    paragraphs: string[];  // 3-4 mondat per bekezdés, max 2 bekezdés
  };
  
  /** Hasznos tudnivalók / tippek */
  tips?: Array<{
    icon: string;
    tip: string;
  }>;
}

// Tool interface-be add hozzá:
export interface Tool {
  // ... meglévő mezők ...
  content?: ToolContent;   // Opcionális – ha nincs megadva, a layout nem rendereli
}
```

---

### 2.2 Content adatok kitöltése

**Add hozzá az alábbi content adatokat** a tool-registry.ts-ben a 3 aktív tool bejegyzéséhez:

#### jpg-webp tool content:

```ts
content: {
  howToSteps: [
    {
      title: "1. Töltsd fel a képeket",
      description: "Húzd a JPG vagy PNG fájlokat a feltöltési területre, vagy kattints a tallózáshoz. Egyszerre több fájlt is kezelhetsz – nincs darabszám limit.",
    },
    {
      title: "2. Állítsd be a minőséget",
      description: "A minőség csúszkával 1–100 között finomhangolhatod a tömörítést. A 75–85-ös érték a legtöbb webes felhasználáshoz ideális: alig észlelhető minőségromlással 30–50%-os méretcsökkentést érhetsz el.",
    },
    {
      title: "3. Konvertálj és tölts le",
      description: "A konverzió teljesen a böngésződben zajlik – a fájlok nem kerülnek szerverre. Egy képnél közvetlenül töltöd le a WebP-t, több fájlnál ZIP archívumban kapod meg az összeset.",
    },
  ],
  useCases: [
    {
      icon: "🛒",
      title: "E-commerce termékkép",
      description: "Webshop termékképeknél a WebP átlagosan 34%-kal kisebb fájlméretet ad azonos minőség mellett. Ez közvetlen hatással van az oldalsebesség-pontozásra és a konverzióra.",
    },
    {
      icon: "📰",
      title: "Blog és cikk képek",
      description: "Blogbejegyzések hero képeinél és cikkillusztrációknál a WebP érezhetően gyorsítja a betöltési időt. A Google Lighthouse „Use modern image formats" javallata pont erre vonatkozik.",
    },
    {
      icon: "📱",
      title: "Mobilra optimalizált tartalom",
      description: "Mobilhálózaton különösen kritikus a fájlméret. A WebP-re való átállással kevesebb adatot használsz, gyorsabban tölt be az oldal, és jobb lesz a Core Web Vitals LCP értéke.",
    },
    {
      icon: "🎨",
      title: "Portfolio és galériák",
      description: "Fotógalériáknál és portfoliooknál a nagy felbontású képek WebP formátumban tárolva lényegesen gyorsabb galériabetöltést eredményeznek – a vizuális minőség megőrzése mellett.",
    },
  ],
  formatComparison: {
    title: "JPG vs WebP vs PNG – gyors összehasonlítás",
    columns: ["Jellemző", "JPG", "WebP", "PNG"],
    rows: [
      { feature: "Fájlméret (tipikus)", values: ["közepes", "🏆 legkisebb", "legnagyobb"] },
      { feature: "Minőség azonos méret mellett", values: ["jó", "🏆 legjobb", "tökéletes"] },
      { feature: "Átlátszóság (alpha)", values: ["❌ nincs", "✅ van", "✅ van"] },
      { feature: "Animáció", values: ["❌ nincs", "✅ van", "❌ nincs"] },
      { feature: "Böngésző-támogatás", values: ["✅ univerzális", "✅ modern böngészők", "✅ univerzális"] },
      { feature: "Webes optimalizálásra", values: ["megfelelő", "🏆 ajánlott", "nem ajánlott"] },
    ],
  },
  aboutSection: {
    title: "Mi a WebP és miért váltsd rá a JPG képeket?",
    paragraphs: [
      "A WebP a Google által 2010-ben bevezetett modern képformátum, amelyet kifejezetten webhasználatra terveztek. Lossy és lossless tömörítést egyaránt támogat, ráadásul a JPG-vel azonos vizuális minőség eléréséhez átlagosan 25–35%-kal kisebb fájlméretre van szükség. A 2024-es adatok szerint az összes modern böngésző (Chrome, Firefox, Safari, Edge) teljes mértékben támogatja.",
      "Weboldalak és webshopok esetén a képfájlok mérete az egyik legjelentősebb tényező az oldalbetöltési sebesség szempontjából. A Google Core Web Vitals értékelési rendszere – amely a keresőrangsorolást is befolyásolja – kifejezetten méri a képek betöltési idejét (LCP). A JPG helyett WebP használatával nem csak sávszélességet spórolsz, de közvetlen SEO-előnyre is szert tehetsz.",
    ],
  },
  tips: [
    { icon: "💡", tip: "75-85-ös minőség értéknél a legtöbb felhasználó nem érzékeli a különbséget a JPG-hez képest, miközben a fájlméret 30-45%-kal csökken." },
    { icon: "⚡", tip: "Ha WordPress-t használsz, a WebP képeket a native media library 2021 óta kezeli – nem kell plugin hozzá." },
    { icon: "🔍", tip: "A Google Search Console képkeresési adatainál a WebP formátumú képek indexelése ugyanolyan, mint a JPG-é – nincs hátrány az SEO szempontból." },
  ],
},
```

#### csv-json tool content:

```ts
content: {
  howToSteps: [
    {
      title: "1. Töltsd fel a CSV fájlt",
      description: "Húzd a CSV, TSV vagy TXT fájlt a feltöltési területre. Az eszköz automatikusan felismeri az elválasztó karaktert (vessző, pontosvessző, tabulátor, pipe).",
    },
    {
      title: "2. Ellenőrizd az előnézetet",
      description: "A feltöltés után azonnal látod a JSON struktúrát és az első néhány sort. Ha az oszlopnevek vagy a típusdetektálás nem megfelelő, a beállításoknál finomhangolhatsz.",
    },
    {
      title: "3. Töltsd le a JSON-t",
      description: "A konverzió a böngésződben zajlik, szerverfeltöltés nélkül – ez különösen fontos érzékeny adatok esetén. Az eredmény formázott JSON, azonnal felhasználható API fejlesztéshez vagy adatfeldolgozáshoz.",
    },
  ],
  useCases: [
    {
      icon: "🔌",
      title: "API integráció",
      description: "Ha adatbázisból vagy Excel-ből CSV exportot kapsz, de az API JSON inputot vár, ez az eszköz egy kattintással áthidalja a különbséget. Különösen hasznos REST API tesztelésnél és prototípus fejlesztésnél.",
    },
    {
      icon: "📊",
      title: "Adatelemzés előkészítése",
      description: "Python pandas, JavaScript vagy más adatfeldolgozó eszközök JSON-t preferálnak a strukturált adatok kezelésénél. A CSV → JSON átkonvertálás az elemzési pipeline első lépése.",
    },
    {
      icon: "🗄️",
      title: "NoSQL adatbázis import",
      description: "MongoDB, Firestore vagy más dokumentumalapú adatbázisokba való importáláshoz JSON formátum szükséges. A CSV táblázat könnyen alakítható dokumentum-gyűjteménnyé.",
    },
    {
      icon: "⚙️",
      title: "Konfiguráció és seed adatok",
      description: "Fejlesztési környezetekben az alkalmazás kezdeti adatait (seed data) JSON formátumban tárolják. Ha a forrásadat Excelből vagy CSV-ből érkezik, ez az eszköz elvégzi az átalakítást.",
    },
  ],
  formatComparison: {
    title: "CSV vs JSON – mikor melyiket válaszd?",
    columns: ["Szempont", "CSV", "JSON"],
    rows: [
      { feature: "Struktúra", values: ["lapos táblázat", "hierarchikus, beágyazott"] },
      { feature: "Ember által olvasható", values: ["🏆 könnyű", "közepes"] },
      { feature: "API / frontend kompatibilitás", values: ["korlátozott", "🏆 natív"] },
      { feature: "Fájlméret", values: ["🏆 kisebb", "kicsit nagyobb"] },
      { feature: "Típusos adatok (szám, bool)", values: ["❌ mindig szöveg", "✅ natív típusok"] },
      { feature: "Beágyazott adatok", values: ["❌ nem támogatott", "✅ natív"] },
      { feature: "Excel / Sheets import", values: ["🏆 közvetlen", "plugin szükséges"] },
    ],
  },
  aboutSection: {
    title: "CSV és JSON: a két legelterjedtebb adatcsere-formátum",
    paragraphs: [
      "A CSV (Comma-Separated Values) az egyik legősibb és legegyszerűbb adatformátum – szinte minden szoftver képes exportálni és importálni. Táblázatos adatokhoz tökéletes: sorokban és oszlopokban tárol egyszerű szöveges értékeket. Hátránya, hogy nem képes hierarchikus vagy beágyazott struktúrák kezelésére, és minden érték szövegként tárolódik – a típusinformáció elvész.",
      "A JSON (JavaScript Object Notation) a modern webfejlesztés lingua francája. Natívan kezeli a típusokat (szám, logikai, null), támogatja a beágyazott objektumokat és tömböket, és közvetlenül feldolgozható JavaScript-ben, Python-ban és szinte minden modern programozási nyelvben. Webes API-k 95%-a JSON-t használ adatcseréhez.",
    ],
  },
  tips: [
    { icon: "💡", tip: "Ha a CSV-ben dátumok vannak, ellenőrizd az auto-type detection eredményét – a dátumformátumok (2024-01-15 vs 15/01/2024) eltérő értelmezést kaphatnak." },
    { icon: "⚡", tip: "Nagy fájloknál (10 000+ sor) a feldolgozás Web Workerben fut, az UI nem fagy le. A preview csak az első 50 sort mutatja, de a letöltött JSON teljes." },
    { icon: "🔒", tip: "Érzékeny adatok (ügyféllisták, pénzügyi adatok) esetén különösen fontos, hogy a konverzió szerverfeltöltés nélkül, a böngésződben zajlik." },
  ],
},
```

#### slug-generator tool content:

```ts
content: {
  howToSteps: [
    {
      title: "1. Írd be a szöveget",
      description: "A beviteli mezőbe írd vagy illeszd be a szöveget, amelyből slug-ot szeretnél generálni. Lehet magyar ékezeteket tartalmazó szöveg – az eszköz automatikusan kezeli az összes Magyar ékezetes karaktert.",
    },
    {
      title: "2. Válassz elválasztót",
      description: "Alapértelmezetten kötőjelet (hyphen) használ az eszköz – ez az URL slug legelterjedtebb formája, amelyet a Google is preferál. Aláhúzás (underscore) technikai rendszereknél, például fájlneveknél lehet indokolt.",
    },
    {
      title: "3. Másold a slug-ot",
      description: "Egy kattintással a vágólapra másolhatod az eredményt. Batch módban több sort is feldolgozhatsz egyszerre – minden sorból egy slug készül.",
    },
  ],
  useCases: [
    {
      icon: "📝",
      title: "Blogbejegyzések és cikkek URL-je",
      description: "A legjobb blogplatformok (WordPress, Ghost, Webflow) slug alapú URL-eket generálnak. A manuálisan szerkesztett, rövid slug jobb, mint az automatikusan generált – segít a kulcsszavak beépítésében és az URL olvashatóságában.",
    },
    {
      icon: "🛍️",
      title: "Termék és kategória URL-ek",
      description: "Webshopokban a termékek és kategóriák URL-je slug alapú. A jól megválasztott slug közvetlen hatással van arra, hogy a keresőmotorok milyen kulcsszavakhoz sorolják be az oldalt.",
    },
    {
      icon: "🏷️",
      title: "Tag-ek és taxonómiák",
      description: "CMS rendszerekben (WordPress, Drupal, Contentful) minden tag, kategória és taxonómia rendelkezik slug-gal. Magyar nyelvű tartalmaknál különösen fontos az ékezetek helyes kezelése.",
    },
    {
      icon: "💾",
      title: "Fájlnevek és azonosítók",
      description: "Fájlneveknél, adatbázis azonosítóknál, API endpoint-oknál és CSS class-nevnél is hasznos a slug generálás – egységes, biztonságos névadási konvenciót biztosít.",
    },
  ],
  formatComparison: {
    title: "Kötőjel vs aláhúzás: melyik slug-formátum a helyes?",
    columns: ["Szempont", "kötőjel (-)", "aláhúzás (_)"],
    rows: [
      { feature: "Google SEO ajánlás", values: ["🏆 preferált", "elfogadott, de nem ajánlott"] },
      { feature: "URL olvashatóság", values: ["🏆 jobb", "rosszabb (összefolyik)"] },
      { feature: "Szóhatár kezelés Google-nél", values: ["🏆 szóhatárnak veszi", "összetett szónak veszi"] },
      { feature: "Technikai rendszerek (fájlnév, db)", values: ["megfelelő", "🏆 hagyományos"] },
      { feature: "Programozási konvenciók (Python stb.)", values: ["kevésbé elterjedt", "🏆 snake_case standard"] },
    ],
  },
  aboutSection: {
    title: "Mi az URL slug és miért fontos az SEO szempontjából?",
    paragraphs: [
      "Az URL slug az weboldal-cím emberi olvasásra optimalizált, leegyszerűsített része – például a 'Hogyan készítsünk pizzát otthon?' cikkből 'hogyan-keszitsunk-pizzat-otthon' lesz. A jó slug csak kisbetűket, számokat és kötőjeleket tartalmaz, ékezetes karakterek helyett azok latin megfelelőjét használja, és tükrözi a kulcsszavakat.",
      "A keresőmotorok az URL-t az oldal tartalmának egyik jelzéseként értelmezik. Egy releváns, kulcsszavakat tartalmazó slug minimálisan, de mérhetően javíthat az oldal rangsorolásán az adott kulcsszóra. Ennél fontosabb azonban a felhasználói élmény: egy értelmes URL bizalmat ébreszt, könnyen megjegyezhető, és a közösségi médiában megosztva is informatív.",
    ],
  },
  tips: [
    { icon: "💡", tip: "Tartsd a slug-ot rövidnek: 3-5 szó ideális. A hosszabb slug-ok csonkítódhatnak a keresőtalálatok URL-megjelenítésében." },
    { icon: "🔍", tip: "Kerüld a 'stop word'-öket (a, az, és, vagy, de) a slug-ban – ezek nem adnak SEO értéket és csak hosszabbítják az URL-t." },
    { icon: "⚠️", tip: "Ha már van indexelt URL-ed és változtatnád a slug-ot, mindig állíts be 301-es átirányítást a régi URL-ről az újra – különben elveszíted a backlink értéket." },
  ],
},
```

---

### 2.3 ToolContentSection komponens

Hozd létre: `src/components/sections/ToolContentSection.astro`

```astro
---
// src/components/sections/ToolContentSection.astro
// Tool oldalak alatti SEO tartalom szekciók
// Rendereli a ToolContent adatokat strukturáltan
import type { ToolContent } from "../../lib/tool-registry.ts";

export interface Props {
  content: ToolContent;
  toolName: string;
}

const { content, toolName } = Astro.props;
const { howToSteps, useCases, formatComparison, aboutSection, tips } = content;
---

<div class="tool-content-sections">

  <!-- ① Hogyan használd? -->
  <section class="content-section" id="hogyan-hasznald" aria-labelledby="how-to-heading">
    <h2 id="how-to-heading" class="content-section__title">
      Hogyan használd a {toolName}-t?
    </h2>
    <ol class="how-to-steps" role="list">
      {howToSteps.map((step, i) => (
        <li class="how-to-step">
          <div class="how-to-step__number" aria-hidden="true">{i + 1}</div>
          <div class="how-to-step__body">
            <h3 class="how-to-step__title">{step.title}</h3>
            <p class="how-to-step__desc">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>

  <!-- ② Mikor érdemes használni? -->
  <section class="content-section" id="mikor-hasznald" aria-labelledby="use-cases-heading">
    <h2 id="use-cases-heading" class="content-section__title">
      Mikor van rá szükséged?
    </h2>
    <ul class="use-cases" role="list">
      {useCases.map((uc) => (
        <li class="use-case-card">
          <span class="use-case-card__icon" aria-hidden="true">{uc.icon}</span>
          <div>
            <h3 class="use-case-card__title">{uc.title}</h3>
            <p class="use-case-card__desc">{uc.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>

  <!-- ③ Formátum összehasonlítás (opcionális) -->
  {formatComparison && (
    <section class="content-section" id="formatumok" aria-labelledby="format-heading">
      <h2 id="format-heading" class="content-section__title">
        {formatComparison.title}
      </h2>
      <div class="format-table-wrapper" role="region" aria-label={formatComparison.title} tabindex="0">
        <table class="format-table">
          <thead>
            <tr>
              {formatComparison.columns.map((col, i) => (
                <th scope={i === 0 ? "col" : "col"} class={i === 0 ? "format-table__feature-col" : ""}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formatComparison.rows.map((row) => (
              <tr>
                <th scope="row" class="format-table__feature">{row.feature}</th>
                {row.values.map((val) => (
                  <td class="format-table__value">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )}

  <!-- ④ Részletes leírás -->
  <section class="content-section" id="tudnivalok" aria-labelledby="about-heading">
    <h2 id="about-heading" class="content-section__title">
      {aboutSection.title}
    </h2>
    {aboutSection.paragraphs.map((p) => (
      <p class="content-section__para">{p}</p>
    ))}
  </section>

  <!-- ⑤ Tippek (opcionális) -->
  {tips && tips.length > 0 && (
    <section class="content-section" id="tippek" aria-labelledby="tips-heading">
      <h2 id="tips-heading" class="content-section__title">Hasznos tippek</h2>
      <ul class="tips-list" role="list">
        {tips.map((t) => (
          <li class="tip-item">
            <span class="tip-item__icon" aria-hidden="true">{t.icon}</span>
            <p class="tip-item__text">{t.tip}</p>
          </li>
        ))}
      </ul>
    </section>
  )}

</div>

<style>
.tool-content-sections {
  display: flex;
  flex-direction: column;
  gap: var(--sp-12);
  padding-top: var(--sp-12);
  border-top: 1px solid var(--border);
  margin-top: var(--sp-10);
}

/* ─── Szekció fejléc ───────────────────────────────────── */
.content-section__title {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: var(--font-mono);
  margin-bottom: var(--sp-5);
  color: var(--text);
  letter-spacing: -0.01em;
}

.content-section__para {
  font-size: 0.9688rem;
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 70ch;
}

.content-section__para + .content-section__para {
  margin-top: var(--sp-4);
}

/* ─── Hogyan használd – lépések ─────────────────────────── */
.how-to-steps {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  counter-reset: none;
}

.how-to-step {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-5);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  transition: border-color var(--t-fast);
}

.how-to-step:hover {
  border-color: var(--accent);
}

.how-to-step__number {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: var(--accent);
  color: #000;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--r-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.how-to-step__title {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: var(--sp-1);
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.how-to-step__desc {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* ─── Use case kártyák ──────────────────────────────────── */
.use-cases {
  list-style: none;
  padding: 0; margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-4);
}

.use-case-card {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  transition: border-color var(--t-fast), transform var(--t-fast);
}

.use-case-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.use-case-card__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.use-case-card__title {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--sp-1);
  color: var(--text);
}

.use-case-card__desc {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-muted);
}

/* ─── Formátum összehasonlítás táblázat ─────────────────── */
.format-table-wrapper {
  overflow-x: auto;
  border-radius: var(--r-md);
  border: 1px solid var(--border);
}

.format-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.format-table thead th {
  padding: var(--sp-3) var(--sp-4);
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-subtle);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.format-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background var(--t-fast);
}

.format-table tbody tr:last-child {
  border-bottom: none;
}

.format-table tbody tr:hover {
  background: color-mix(in srgb, var(--accent) 4%, transparent);
}

.format-table__feature {
  padding: var(--sp-3) var(--sp-4);
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  background: var(--bg-card);
}

.format-table__value {
  padding: var(--sp-3) var(--sp-4);
  color: var(--text-muted);
  vertical-align: top;
}

/* ─── Tippek ────────────────────────────────────────────── */
.tips-list {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  border-radius: var(--r-md);
}

.tip-item__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.tip-item__text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-muted);
}
</style>
```

---

### 2.4 ToolLayout.astro frissítése

A `ToolContentSection` komponenst add hozzá a `ToolLayout.astro`-ba a FAQ szekció **előtt**:

```astro
---
// ToolLayout.astro imports-ba add hozzá:
import ToolContentSection from "../components/sections/ToolContentSection.astro";
---

<!-- A meglévő <slot /> (tool UI) UTÁN, de a FAQ ELŐTT: -->
{tool.content && (
  <ToolContentSection content={tool.content} toolName={tool.h1} />
)}

<!-- Aztán a meglévő FAQ szekció -->
{tool.faq?.length > 0 && (
  <!-- ... meglévő FAQ kód ... -->
)}
```

---

## FELADAT 3 — Végső ellenőrzőlista

### 3.1 Amit ellenőrizz build után

```bash
pnpm build
pnpm preview
```

**Funkcionális tesztek:**
- [ ] Fájl feltöltés után 2 mp múlva aktív lesz a Konvertálás gomb (visszaszámlálóval)
- [ ] Konvertálás befejezése után 2 mp múlva aktív lesz a Letöltés gomb
- [ ] `delayBeforeConvert: 0` esetén azonnal aktív a gomb (slug-generator)
- [ ] AdSlot: `showAdSlot: false` esetén `display:none`, semmi sem látszik
- [ ] AdSlot: `showAdSlot: true` esetén dev módban placeholder látható, prod-ban a kommentezett kód
- [ ] `showCountdown: false` esetén a visszaszámláló szám nem jelenik meg, de a gomb disabled marad
- [ ] Reset: új fájl feltöltésekor a flow visszaáll az elejére

**SEO tesztek:**
- [ ] Minden aktív tool oldalon megjelenik a „Hogyan használd?" szekció
- [ ] Formátum összehasonlítás táblázat görgethetővé válik mobilon
- [ ] A `<h2>` szekcióscímek nem ütköznek a ToolLayout meglévő H2-eivel
- [ ] `aria-labelledby` kapcsolatok helyesek (id egyezik)

**Vizuális tesztek:**
- [ ] Dark módban a táblázat olvasható
- [ ] Use-case kártyák 2 oszlopos grid mobilon 1 oszlopra vált
- [ ] A progress bar animáció simán megy (transition: width 0.9s linear)

### 3.2 Új `getTimingConfig` használat minden új tool-nál

Minden újonnan implementált tool Svelte komponensben az első sor legyen:

```ts
const timing = getTimingConfig("TOOL_SLUG_IDE");
```

Ahol a `TOOL_SLUG_IDE` pontosan egyezzen a `tool-registry.ts` bejegyzésével.

### 3.3 AdSense élesítési checklist (amikor kész)

1. Google AdSense account létrehozva és jóváhagyva
2. `AdSlot.svelte`-ben a kommentezett `<ins>` kód kiszedve
3. `adClient="ca-pub-XXXXXXXXXX"` cserélve a valódi Publisher ID-re
4. `adSlotId="0000000000"` cserélve a valódi Slot ID-re
5. `TOOL_TIMING`-ban a monetizálni kívánt tool-oknál `showAdSlot: true`
6. Google Search Console → URL inspection → Live test az éles reklámmal

---

## FELADAT 4 — Schema.org bővítés

### Kontextus: mi van már meg

A `src/lib/seo.ts` jelenleg az alábbi sémákat tartalmazza:

- `SoftwareApplication` — az eszköz mint szoftver ✅
- `FAQPage` — a kérdés-válasz blokk ✅
- `BreadcrumbList` — navigáció ✅
- `WebSite` + `Organization` — főoldal ✅

A következő 4 séma adja a legnagyobb többletértéket, ezeket kell hozzáadni.

---

### 4.1 `WebApplication` — pontosabb típus a `SoftwareApplication` mellé

A Google a böngészős eszközöknél a `WebApplication` típust preferálja.
A meglévő `toolSoftwareSchema` függvényt **módosítsd**: a `@type` mező legyen tömb.

```ts
// src/lib/seo.ts — toolSoftwareSchema módosítás
// Csak a @type sort kell cserélni, minden más marad:

"@type": ["SoftwareApplication", "WebApplication"],

// Új mező is kerüljön bele:
applicationSuite: "EszközTár",
```

**Teljes módosított sor kontextussal** (a függvényen belül):

```ts
const schema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],  // ← MÓDOSÍTVA
  name: tool.h1,
  description: tool.description,
  url: buildCanonical(`/${tool.category}/${tool.slug}`),
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: SUBCATEGORY_MAP[tool.category] ?? "UtilitiesApplication",
  applicationSuite: "EszközTár",                        // ← ÚJ
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript. Requires HTML5 File API.",
  // ... többi meglévő mező változatlan ...
};
```

---

### 4.2 `HowTo` séma — Rich Result a lépésekhez

Ez a legmagasabb SEO ROI-jú séma eszközoldalakon. A Google külön SERP feature-t
generál belőle: a lépések közvetlenül a találati oldalon jelennek meg, kattintás nélkül.

**Előfeltétel:** csak akkor generálódjon, ha `tool.content?.howToSteps` létezik.
Az adat már ott van a `ToolContent`-ben (Feladat 2), schema-ba csak önteni kell.

Adj hozzá új függvényt a `src/lib/seo.ts`-be:

```ts
// src/lib/seo.ts — ÚJ függvény, a faqSchema() után add hozzá

// ─── HowTo Schema ─────────────────────────────────────────────
export function howToSchema(
  tool: Tool & { content?: import("./tool-registry.ts").ToolContent }
): string | null {
  const steps = tool.content?.howToSteps;
  if (!steps || steps.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Hogyan használd a(z) ${tool.h1}-t?`,
    description: tool.description,
    url: buildCanonical(`/${tool.category}/${tool.slug}`),
    inLanguage: "hu",
    totalTime: "PT1M",          // becsült teljes idő: 1 perc
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "HUF",
      value: "0",
    },
    tool: [
      {
        "@type": "HowToTool",
        name: "Böngésző (Chrome, Firefox, Safari, Edge)",
      },
    ],
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title.replace(/^\d+\.\s*/, ""),   // "1. Töltsd fel" → "Töltsd fel"
      text: s.description,
      url: buildCanonical(`/${tool.category}/${tool.slug}#hogyan-hasznald`),
    })),
  });
}
```

---

### 4.3 `TechArticle` séma — az aboutSection szöveg jelzése Googlenek

Az `aboutSection` szerkesztői tartalom (nem UI). Ha jelzed Googlenek hogy ez
editorial leírás, nem csak interface-szöveg, az segít a topical authority-n.

Adj hozzá új függvényt a `src/lib/seo.ts`-be:

```ts
// src/lib/seo.ts — ÚJ függvény, a howToSchema() után add hozzá

// ─── TechArticle Schema (aboutSection-hoz) ────────────────────
export function techArticleSchema(
  tool: Tool & { content?: import("./tool-registry.ts").ToolContent },
  siteUrl: string = SITE_URL
): string | null {
  const about = tool.content?.aboutSection;
  if (!about) return null;

  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: about.title,
    description: about.paragraphs[0]?.slice(0, 160) ?? tool.description,
    url: buildCanonical(`/${tool.category}/${tool.slug}#tudnivalok`),
    inLanguage: "hu",
    isPartOf: {
      "@type": "WebPage",
      url: buildCanonical(`/${tool.category}/${tool.slug}`),
    },
    author: {
      "@type": "Organization",
      name: "EszközTár",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "EszközTár",
      url: siteUrl,
    },
    dateModified:  toolExt.updatedAt  ?? new Date().toISOString().split("T")[0],
    datePublished: toolExt.launchedAt ?? new Date().toISOString().split("T")[0],
    // A teljes about szöveg articleBody-ként
    articleBody: about.paragraphs.join(" "),
    proficiencyLevel: "Beginner",   // schema.org/TechArticle mező
    keywords: tool.keywords.join(", "),
  });
}
```

---

### 4.4 `ItemList` séma a use-case kártyákhoz

A use-case kártyák listaként is strukturálhatók.
Ez önmagában kis hatású, de a `HowTo`-val együtt jelzik Googlenek hogy
az oldal strukturált, tartalomgazdag forrás — nem csak egy konvertáló widget.

```ts
// src/lib/seo.ts — ÚJ függvény, a techArticleSchema() után add hozzá

// ─── UseCaseList Schema ───────────────────────────────────────
export function useCaseListSchema(
  tool: Tool & { content?: import("./tool-registry.ts").ToolContent }
): string | null {
  const useCases = tool.content?.useCases;
  if (!useCases || useCases.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Mikor használd a(z) ${tool.h1}-t?`,
    url: buildCanonical(`/${tool.category}/${tool.slug}#mikor-hasznald`),
    numberOfItems: useCases.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: useCases.map((uc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: uc.title,
      description: uc.description,
    })),
  });
}
```

---

### 4.5 `ToolLayout.astro` bekötés — mind a 4 séma

A `ToolLayout.astro`-ban a `schemaScripts` tömb összeállítását **írd át** így:

```astro
---
// ToolLayout.astro — frissített imports:
import {
  toolSoftwareSchema,
  faqSchema,
  breadcrumbSchema,
  howToSchema,
  techArticleSchema,
  useCaseListSchema,
} from "../lib/seo.ts";

// ... meglévő kód (tool, breadcrumbs stb.) ...

// Frissített schemas összeállítás:
const schemas: string[] = [
  // 1. WebApplication + SoftwareApplication (mindig)
  toolSoftwareSchema(tool),

  // 2. BreadcrumbList (mindig)
  breadcrumbSchema(breadcrumbs),

  // 3. FAQPage (ha van FAQ)
  ...(tool.faq?.length ? [faqSchema(tool.faq)].filter(Boolean) as string[] : []),

  // 4. HowTo (ha van content.howToSteps)
  ...(tool.content?.howToSteps?.length
    ? [howToSchema(tool)].filter(Boolean) as string[]
    : []),

  // 5. TechArticle (ha van content.aboutSection)
  ...(tool.content?.aboutSection
    ? [techArticleSchema(tool)].filter(Boolean) as string[]
    : []),

  // 6. ItemList use-cases (ha van content.useCases)
  ...(tool.content?.useCases?.length
    ? [useCaseListSchema(tool)].filter(Boolean) as string[]
    : []),
];
---
```

---

### 4.6 Ellenőrzés – Google Rich Results Test

A build után minden aktív tool oldalra futtasd le:

**URL:** `https://search.google.com/test/rich-results`

**Elvárt eredmények:**

| Tool oldal | Várt sémák a tesztben |
|---|---|
| `/kep/jpg-webp` | SoftwareApplication, HowTo, FAQPage, BreadcrumbList, TechArticle |
| `/adat/csv-json` | SoftwareApplication, HowTo, FAQPage, BreadcrumbList, TechArticle |
| `/szoveg/slug-generator` | SoftwareApplication, HowTo, FAQPage, BreadcrumbList, TechArticle |
| Kategória oldalak | ItemList, BreadcrumbList |
| Főoldal | WebSite, Organization, ItemList |

**Coming-soon tool oldalak** (pl. `/kep/png-webp`):
- Csak `SoftwareApplication` (status: PreOrder) + `BreadcrumbList` kerül rájuk
- `HowTo` és `TechArticle` nem generálódik, mert `tool.content` undefined

**Amit figyelj a tesztben:**
- `HowTo` séma `step` mezőinek `name` értéke ne tartalmazzon számot az elején
  (a `replace(/^\d+\.\s*/, "")` ezt megoldja, de ellenőrizd)
- `TechArticle` `articleBody` mezője ne legyen 10 000 karakternél hosszabb
  (a jelenlegi about szövegek kb. 500-800 karakter, ez nem probléma)
- `estimatedCost.value: "0"` — ez kötelező a `HowTo`-ban ha ingyenes az eszköz,
  különben a Google figyelmeztetést adhat

---

### 4.7 Séma hierarchia összefoglalás

Az EszközTár minden aktív tool oldalán a következő JSON-LD blokkok lesznek,
ebben a sorrendben a `<head>`-ben:

```
1. SoftwareApplication + WebApplication  ← az eszköz
2. BreadcrumbList                         ← navigáció
3. FAQPage                                ← ha van faq[]
4. HowTo                                  ← ha van content.howToSteps
5. TechArticle                            ← ha van content.aboutSection
6. ItemList (use-cases)                   ← ha van content.useCases
```

Ez a kombináció iparági szempontból ritka — a legtöbb konkurens eszközoldal
csak `SoftwareApplication`-t és esetleg `FAQPage`-et tartalmaz.
A `HowTo` + `TechArticle` kombináció SERP-ben látható Rich Result-ot generálhat,
ami közvetlen CTR-növekedést jelent a tool oldalakra.

---

## Összefoglalás – mit hoztunk létre

| Fájl | Leírás |
|---|---|
| `src/lib/timing-config.ts` | ÚJ – globális és tool-szintű timing konfiguráció |
| `src/components/ui/ConvertButton.svelte` | ÚJ – kétfázisú gomb countdown + progress barral |
| `src/components/ui/AdSlot.svelte` | ÚJ – bekapcsolható AdSense placeholder |
| `src/components/sections/ToolContentSection.astro` | ÚJ – SEO tartalomszekciók renderelője |
| `src/lib/tool-registry.ts` | MÓDOSÍTVA – `ToolContent` interface + 3 tool content adat |
| `src/lib/seo.ts` | MÓDOSÍTVA – `WebApplication` type, + `howToSchema`, `techArticleSchema`, `useCaseListSchema` |
| `src/layouts/ToolLayout.astro` | MÓDOSÍTVA – ToolContentSection + mind a 6 séma bekötve |
| `src/components/tools/kep/JpgWebpTool.svelte` | MÓDOSÍTVA – ConvertButton + AdSlot integrálva |
| `src/components/tools/adat/CsvJsonTool.svelte` | MÓDOSÍTVA – ConvertButton + AdSlot integrálva |
| `src/components/tools/szoveg/SlugGeneratorTool.svelte` | MÓDOSÍTVA – ConvertButton (delay 0) |
