# Claude Code – 1. Fázis: Hirdetés bekapcsolása + Email capture

> **Önálló implementációs prompt.**
> Ez a **teljes 1. fázis** – a 2. fázis (freemium/usage limit) EGY KÜLÖN prompt lesz.
>
> **Mit old meg ez a prompt:**
> 1. AdSense Publisher ID env variable bevezetése + `BaseLayout.astro` script tag
> 2. A meglévő `ConvertButton` timing rendszerbe bekapcsolja az ad slotokat (`showAdSlot: true`)
> 3. A meglévő `AdSlot.svelte`-t bővíti: env guard + háromfázisú elhelyezés
> 4. `ads.txt` fájl generálása
> 5. Email capture (`EmailCaptureBar`) implementálása eredmény képernyőre
>
> **Mit NEM tartalmaz ez a prompt:**
> - Usage limit / napi 5 korlát → 2. fázis
> - UpgradeModal / Premium tier → 2. fázis
> - Lemon Squeezy fizetés → 2. fázis

---

## Google AdSense – hogyan működik, mit kell tudni

Az AdSense implementáció **két azonosítóból** áll:

### 1. Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
- Ez a te AdSense fiók azonosítód – minden oldalon egyszer töltődik be, a `<head>`-ben
- **Ez megy env variable-be:** `PUBLIC_ADSENSE_CLIENT_ID`
- Formátum: `ca-pub-1234567890123456`
- Hol találod: AdSense dashboard → Fiók → Fiókadatok
- **Ha nincs beállítva → a script nem töltődik be → az AdSlot komponensek sem renderelnek semmit**

### 2. Ad Slot ID (`data-ad-slot="XXXXXXXXXX"`)
- Minden hirdetési pozíciónak külön ID-ja van – ezeket az AdSense dashboardon hozod létre
- **Ez NEM env variable** – nyilvános, látható az oldal forráskódjában, nem titok
- A kódban konstansként van definiálva
- Hol hozod létre: AdSense dashboard → Hirdetések → Hirdetési egységek → Megjelenítési hirdetés
- Hozz létre 3 egységet: "pre-convert", "pre-download", "post-result"
- **Ha még nincs AdSense jóváhagyásod → a slot ID-k helyére placeholder értéket írj (`"0000000000"`)**

### Az env guard logikája
```
PUBLIC_ADSENSE_CLIENT_ID nincs beállítva (üres string)
  → <script> tag NEM kerül a <head>-be
  → AdSlot komponens NEM renderelődik (env guard)
  → Semmi nem törik, semmi nem látszik

PUBLIC_ADSENSE_CLIENT_ID be van állítva (pl. "ca-pub-1234567890123456")
  → script betöltődik a <head>-ben
  → AdSlot komponensek renderelnek
  → DEV módban: vizuális placeholder box
  → PROD módban: valódi AdSense hirdetés
```

### Fontos AdSense tudnivalók első használatnál
- A publisher ID megkapása után az oldalt jóvá kell hagyatni (1–2 hét)
- Addig a kód lehet a helyén, hirdetések nem jelennek meg
- Az `ads.txt` fájl **kötelező** – nélküle az AdSense figyelmeztet és bevétel kiesés lehet
- DEV módban AdSense soha nem jelenít meg valódi hirdetést (Google policy)

---

## Kötelező előkészítés – olvasd el ELŐSZÖR

Mielőtt bármit implementálsz, olvasd el ezeket a fájlokat:

```
src/lib/timing-config.ts               ← a delay rendszer teljes logikája
src/components/ui/ConvertButton.svelte ← a kétfázisú gomb implementációja
src/components/ui/AdSlot.svelte        ← a meglévő AdSense placeholder
src/lib/ui-labels.ts                   ← Svelte UI szövegek (build-time i18n)
src/components/tools/kep/JpgWebpTool.svelte  ← minta tool komponens
src/layouts/BaseLayout.astro           ← <head> és globális script-ek helye
src/layouts/ToolLayout.astro           ← tool oldalak layoutja
```

**Kritikus szabályok (architecture doksiból):**
- Svelte komponensekben SOHA ne használj `t()` – csak `ui.*` értékeket `ui-labels.ts`-ből
- Az oldal SSG marad – minden kliens oldali Svelte island-ekben
- Minden új UI szöveg kötelezően `ui-labels.ts`-be kerül, mindkét nyelven (hu + ro)
- `tool-registry.ts`-t NE módosítsd ebben a feladatban
- A `ConvertButton` már tartalmazza a timing logikát – ne írd újra, csak bővítsd

---

## 0. FELADAT – AdSense script tag a `BaseLayout.astro`-ban

**Fájl**: `src/layouts/BaseLayout.astro`

Az AdSense globális script tagot **egyszer** kell betölteni, a `<head>`-ben.
A meglévő `gtag` defer mintájához hasonlóan (architecture doksi 8. fejezet alapján)
ez is késleltetett betöltéssel kerüljön be, hogy ne rontsa a Lighthouse score-t.

```astro
---
// A Publisher ID env variable – ha nincs beállítva, a script nem töltődik be
const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? '';
const hasAdSense = ADSENSE_CLIENT.length > 0;
---

<!-- A meglévő gtag script után, a </head> előtt: -->
{hasAdSense && (
  <script
    is:inline
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    crossorigin="anonymous"
  ></script>
)}
```

**Miért nem defer/requestIdleCallback mint a gtag-nél?**
Az AdSense script-et `async`-kal kell betölteni – ez a Google által megkövetelt mód.
A `requestIdleCallback` delay-es megközelítés az AdSense-nél nem ajánlott, mert
az ad betöltési idő kritikus (a 3mp-es timing ablakba be kell férjen).

**PROD vs DEV:**
Az AdSense a DEV szerveren soha nem jelenít meg valódi hirdetést (Google policy) –
a script betöltődhet, de az `<ins>` elemek üresek maradnak. A DEV placeholder
az `AdSlot.svelte`-ben kezelt (lásd 2. feladat).

---

## 0b. FELADAT – `ads.txt` fájl

**Fájl**: `public/ads.txt`

Az AdSense megköveteli ezt a fájlt a domain gyökerében. Hozd létre:

```
google.com, ca-pub-PLACEHOLDER, DIRECT, f08c47fec0942fa0
```

**FONTOS:** A `ca-pub-PLACEHOLDER` értéket manuálisan kell kicserélni
a valódi Publisher ID-ra miután az AdSense fiók el lett fogadva.
Addig a placeholder értékkel is be kell commitolni, hogy a fájl létezzen.

Ha a projekt két domainre build-el (konvertalo.hu + instrumenteonline.ro),
mindkét domain `public/` mappájába ugyanez a fájl kerül – Netlify-on
a `public/ads.txt` automatikusan kiszolgálódik a domain gyökeréről.

---

## A meglévő timing rendszer – amit HASZNÁLNI kell

Az architecture doksi alapján a rendszer már teljesen felkészített az ad megjelenítésre:

```typescript
// src/lib/timing-config.ts – MEGLÉVŐ kód

export const DEFAULT_TIMING: TimingConfig = {
  delayBeforeConvert:  3000,   // 3mp: fájl feltöltés → Konvertálás gomb aktív
  delayBeforeDownload: 3000,   // 3mp: konverzió kész → Letöltés gomb aktív
  showCountdown:       true,
  showAdSlot:          false,  // ← EZT KELL true-ra állítani!
};
```

**A két delay = két ad ablak:**

```
[Fájl feltöltve]
     ↓
[delayBeforeConvert: 3000ms]  ← 1. ad ablak: "pre-convert" slot
     ↓
[Konvertálás gomb aktív → user kattint]
     ↓
[Tényleges feldolgozás]
     ↓
[delayBeforeDownload: 3000ms] ← 2. ad ablak: "pre-download" slot
     ↓
[Letöltés gomb aktív]
     ↓
[User letölt]
     ↓
[Eredmény szekció látható]    ← 3. ad ablak: "post-result" + email capture
```

---

## 1. FELADAT – `timing-config.ts` módosítása

**Fájl**: `src/lib/timing-config.ts`

Állítsd `showAdSlot: true`-ra a `DEFAULT_TIMING`-ban:

```typescript
export const DEFAULT_TIMING: TimingConfig = {
  delayBeforeConvert:  3000,
  delayBeforeDownload: 3000,
  showCountdown:       true,
  showAdSlot:          true,   // ← VÁLTOZTATÁS: false → true
};
```

**Fontos:** a szöveges/kódoló eszközöknél (`TOOL_TIMING` override-ok) ahol `delay: 0` van,
ott a `showAdSlot` automatikusan `false` marad – nincs delay, nincs ad ablak. Ezeket NE módosítsd.

Ha a `TimingConfig` interface-ben nincs `showAdSlot` mező, add hozzá:

```typescript
export interface TimingConfig {
  delayBeforeConvert:  number;
  delayBeforeDownload: number;
  showCountdown:       boolean;
  showAdSlot:          boolean;  // ← add hozzá ha hiányzik
}
```

---

## 2. FELADAT – `AdSlot.svelte` bővítése

**Fájl**: `src/components/ui/AdSlot.svelte`

A meglévő `AdSlot.svelte` placeholder – olvasd el először, hogy mi van már benne.
Bővítsd ki a következő funkciókkal:

### Ad Slot ID konstansok

Az AdSense dashboardon létrehozandó 3 hirdetési egység ID-jait konstansként tárold.
Ha még nincs AdSense jóváhagyás, használj `"0000000000"` placeholder értéket.

```typescript
// Slot ID-k – az AdSense dashboardon létrehozott hirdetési egységek
// AdSense → Hirdetések → Hirdetési egységek → Megjelenítési hirdetés → létrehozás
// Ha még nincs AdSense fiók jóváhagyva: maradjon "0000000000" placeholder
const AD_SLOT_IDS = {
  'pre-convert':  '0000000000',  // TODO: valódi slot ID az AdSense dashboardból
  'pre-download': '0000000000',  // TODO: valódi slot ID az AdSense dashboardból
  'post-result':  '0000000000',  // TODO: valódi slot ID az AdSense dashboardból
} as const;
```

### Teljes `AdSlot.svelte` implementáció

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  export let slot: 'pre-convert' | 'pre-download' | 'post-result';

  // Ad Slot ID-k – AdSense dashboardból
  const AD_SLOT_IDS = {
    'pre-convert':  '0000000000',
    'pre-download': '0000000000',
    'post-result':  '0000000000',
  } as const;

  // ENV GUARD: Publisher ID build-time beégett értéke
  // Ha nincs beállítva → a komponens nem renderelődik
  const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? '';
  const isConfigured = ADSENSE_CLIENT.length > 0;

  // 2. FÁZIS KÖTŐPONT: Premium user nem lát hirdetést
  // Most mindig false – mindenki látja az adokat
  const isPremium = false;
  // TODO (2. fázis): import { usageStore } from '$lib/stores/usageStore';
  // TODO (2. fázis): $: isPremium = $usageStore.isPremium;

  const shouldRender = isConfigured && !isPremium;

  onMount(() => {
    if (!shouldRender) return;
    // AdSense push – az <ins> elem betöltése után szükséges
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // Csendben kezeljük – DEV módban ez normális
    }
  });
</script>

{#if shouldRender}
  <div class="ad-slot ad-slot--{slot}" aria-label="Hirdetés" role="complementary">

    {#if import.meta.env.DEV}
      <!-- DEV: vizuális placeholder -->
      <div class="ad-placeholder">
        AD: {slot}
        {#if slot === 'pre-convert'}· fluid · fájl feltöltés után{/if}
        {#if slot === 'pre-download'}· 300×250 · konverzió után{/if}
        {#if slot === 'post-result'}· responsive · letöltés után{/if}
      </div>
    {:else}
      <!-- PROD: valódi AdSense ins elem -->
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={AD_SLOT_IDS[slot]}
        data-ad-format={slot === 'pre-download' ? 'rectangle' : 'auto'}
        data-full-width-responsive={slot !== 'pre-download' ? 'true' : 'false'}
      ></ins>
    {/if}

  </div>
{/if}

<style>
  .ad-slot {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ad-slot--pre-convert {
    margin: 0.75rem 0;
    min-height: 90px;
  }

  .ad-slot--pre-download {
    margin: 1rem auto;
    max-width: 300px;
    min-height: 250px;
  }

  .ad-slot--post-result {
    margin: 1.25rem 0 0.5rem;
    min-height: 250px;
  }

  .ad-placeholder {
    background: var(--color-bg-secondary, #f0f0f0);
    border: 1.5px dashed var(--color-border, #ccc);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
    color: var(--color-text-muted, #999);
    width: 100%;
    min-height: inherit;
    text-align: center;
    font-family: monospace;
  }
</style>
```

**Miért `300×250` a `pre-download` slot-nál és nem `300×600`?**
A `300×600` half-page ad nagy helyet igényel – az első körben a `300×250` biztonságosabb
és szélesebb körben töltődik be hirdetőktől. Ha az RPM adatok jók, emelhető `300×600`-ra.

---

## 3. FELADAT – `ConvertButton.svelte` bekötése az AdSlot-hoz

**Fájl**: `src/components/ui/ConvertButton.svelte`

**Először olvasd el a teljes meglévő ConvertButton.svelte kódot** – különösen:
- Milyen state-eket kezel (pl. `phase`, `isConverting`, `isWaiting` vagy hasonló)
- Hogyan kezeli a `delayBeforeConvert` és `delayBeforeDownload` ablakokat
- Van-e már benne `showAdSlot` prop olvasás

Az `AdSlot` komponenst a timing ablakokba kell beilleszteni.
A pontos state nevek a meglévő kódtól függnek – igazítsd hozzájuk, ne hozz létre duplikált state-et.

### Az elvárt viselkedés

```
FÁZIS 1 – "pre-convert" ablak:
  trigger: fájl fel van töltve (canConvert = true), de még nem kattintott a user
  megjelenés: countdown fut (delayBeforeConvert)
  eltűnés: countdown lejár, Konvertálás gomb aktív lesz

FÁZIS 2 – "pre-download" ablak:
  trigger: onConvert callback lefutott (konverzió kész), letöltés gomb még nem aktív
  megjelenés: countdown fut (delayBeforeDownload)
  eltűnés: countdown lejár, Letöltés gomb aktív lesz
```

### Implementációs minta (igazítsd a meglévő state nevekhez)

```svelte
<script lang="ts">
  import AdSlot from './AdSlot.svelte';
  // ... meglévő importok

  // A timing prop-ból jön – ez már megvan
  export let timing: TimingConfig;
  // ... meglévő props

  // A meglévő fázis-kezelő state-et HASZNÁLD – ne hozz létre újat
  // Példa: ha a meglévő kód 'phase' változót használ:
  //   let phase: 'idle' | 'waiting-convert' | 'converting' | 'waiting-download' | 'done'
  // Akkor:
  //   $: showPreConvert  = timing.showAdSlot && phase === 'waiting-convert'
  //   $: showPreDownload = timing.showAdSlot && phase === 'waiting-download'
</script>

<!-- A ConvertButton template-jébe, a countdown megjelenítés mellé/alá: -->

<!-- 1. Pre-convert slot: countdown alatt, a Konvertálás gomb felett vagy alatt -->
{#if timing.showAdSlot && [IDE A MEGLÉVŐ "WAITING TO CONVERT" FELTÉTEL]}
  <AdSlot slot="pre-convert" />
{/if}

<!-- ... meglévő Konvertálás gomb kód ... -->

<!-- 2. Pre-download slot: konverzió kész, letöltés countdown alatt -->
{#if timing.showAdSlot && [IDE A MEGLÉVŐ "WAITING TO DOWNLOAD" FELTÉTEL]}
  <AdSlot slot="pre-download" />
{/if}

<!-- ... meglévő Letöltés gomb kód ... -->
```

**Kritikus:** a `[IDE A MEGLÉVŐ ... FELTÉTEL]` helyekre a meglévő kód valódi state neveit
írd be. Ha pl. a kód `waitingForDownload: boolean` state-et használ, akkor:
`{#if timing.showAdSlot && waitingForDownload}`

**NE** változtasd meg a meglévő state neveket vagy a timing logikát – csak az `AdSlot`
komponenst illeszd be a már létező feltételes blokkok mellé.

---

## 4. FELADAT – `post-result` AdSlot a ToolLayout-ban

**Fájl**: `src/layouts/ToolLayout.astro`

A `post-result` slot a tool eredmény után jelenik meg. Ez a `ToolLayout`-ban vagy
a `DynamicTool.svelte`-ben kerül be – nézd meg melyik kezeli az eredmény szekciót.

Ha a `ToolLayout.astro`-ban van az eredmény szekció után hely:

```astro
---
import AdSlotWrapper from '../components/ui/AdSlotPost.astro';
---

<!-- Az eredmény szekció után, a related tools ELŐTT -->
<AdSlotWrapper />
```

**Megjegyzés:** mivel az `AdSlot.svelte` Svelte komponens és a ToolLayout Astro,
szükség lehet egy vékony `AdSlotPost.astro` wrapper-re, ami a Svelte komponenst
`client:visible` direktívával tölti be. Alternatívaként a `post-result` slot
bekerülhet a tool komponensekbe is (a `showResult` state után) – amelyik
a meglévő architektúrába jobban illeszkedik.

---

## 5. FELADAT – `EmailCaptureBar.svelte` létrehozása

**Fájl**: `src/components/ui/EmailCaptureBar.svelte`

### ENV guard – ha nincs API key, semmi nem renderelődik

```svelte
<script lang="ts">
  import { ui } from '../../lib/ui-labels.ts';
  import { onMount } from 'svelte';

  // BUILD-TIME env guard
  // Ha PUBLIC_BREVO_API_KEY nincs beállítva → a komponens egyáltalán
  // nem renderelődik. Üres string = nincs konfigurálva.
  const BREVO_KEY = import.meta.env.PUBLIC_BREVO_API_KEY ?? '';
  const isConfigured = BREVO_KEY.length > 0;

  let email = '';
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let alreadySubscribed = false;

  onMount(() => {
    alreadySubscribed = localStorage.getItem('ku_email_subscribed') === 'true';
  });

  async function subscribe() {
    if (!email || status === 'loading') return;
    status = 'loading';
    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [import.meta.env.PUBLIC_SITE_LANG === 'hu' ? 1 : 2],
          updateEnabled: true,
          attributes: {
            SOURCE: 'konvertalo_tool_result',
            LANG: import.meta.env.PUBLIC_SITE_LANG ?? 'hu',
          },
        }),
      });
      // Brevo 204-et vagy 201-et ad vissza sikernél
      if (res.ok || res.status === 204 || res.status === 201) {
        status = 'success';
        localStorage.setItem('ku_email_subscribed', 'true');
      } else {
        status = 'error';
      }
    } catch {
      status = 'error';
    }
  }
</script>

<!-- Ha nincs Brevo API key VAGY már feliratkozott → semmi nem renderelődik -->
{#if isConfigured && !alreadySubscribed}
  <div class="email-bar">
    {#if status === 'success'}
      <p class="email-bar__success">{ui.emailBar.success}</p>
    {:else}
      <p class="email-bar__title">{ui.emailBar.title}</p>
      <div class="email-bar__form">
        <input
          type="email"
          bind:value={email}
          placeholder={ui.emailBar.placeholder}
          disabled={status === 'loading'}
          aria-label={ui.emailBar.placeholder}
        />
        <button
          on:click={subscribe}
          disabled={status === 'loading' || !email}
        >
          {status === 'loading' ? '...' : ui.emailBar.btn}
        </button>
      </div>
      {#if status === 'error'}
        <p class="email-bar__error">{ui.emailBar.error}</p>
      {/if}
      <p class="email-bar__disclaimer">{ui.emailBar.disclaimer}</p>
    {/if}
  </div>
{/if}
```

### EmailCaptureBar beillesztése a tool komponensekbe

Az eredmény szekció végén, az `AdSlot post-result` UTÁN:

```svelte
<!-- Tool komponens eredmény szekciójában -->
{#if result}
  <!-- ... letöltés gomb és eredmény megjelenítés ... -->
  <AdSlot slot="post-result" />
  <EmailCaptureBar />
{/if}
```

**Érintett komponensek** – minden fájl alapú tool ahol van eredmény szekció:
- Minden PDF tool
- Minden kép tool
- Excel tool-ok
- Fájl kategória tool-ok
- Adat kategória tool-ok (CSV/JSON fájl feldolgozás)

**NEM érintett** – ahol nincs fájl eredmény:
- Fejlesztő kategória (JSON formázó, Base64, URL kódoló stb.)
- Szöveg kategória
- SEO kategória
- Markdown tool

---

## 6. FELADAT – `ui-labels.ts` bővítése

Add hozzá a következő kulcsokat a meglévő struktúrához:

```typescript
// A meglévő labels objektumba, hu és ro szekciókba:

// Magyar (hu):
emailBar: {
  title: '💡 Értesülj az új eszközökről',
  placeholder: 'email@cimed.hu',
  btn: 'Feliratkozom →',
  disclaimer: 'Csak hasznos frissítések. Spam nélkül. Leiratkozhatsz bármikor.',
  success: '✅ Feliratkoztál! Értesítünk az újdonságokról.',
  error: 'Hiba történt. Próbáld újra.',
},

// Román (ro):
emailBar: {
  title: '💡 Află despre noile instrumente',
  placeholder: 'email@tau.ro',
  btn: 'Abonează-te →',
  disclaimer: 'Doar actualizări utile. Fără spam. Te poți dezabona oricând.',
  success: '✅ Te-ai abonat! Îți vom notifica despre noutăți.',
  error: 'A apărut o eroare. Încearcă din nou.',
},
```

---

## 7. FELADAT – `.env` fájlok dokumentálása

Ha nincs `.env.example` fájl, hozd létre. Ha van, add hozzá ezeket a kulcsokat:

```bash
# .env.example

# ─── Google AdSense ───────────────────────────────────────────────────────────
# Publisher ID – az AdSense fiók azonosítója (ca-pub-XXXXXXXXXXXXXXXX formátum)
# Hol találod: AdSense dashboard → Fiók → Fiókadatok
# Ha nincs beállítva: az AdSlot komponensek nem renderelnek semmit (env guard)
# Ha van beállítva: a script betöltődik és hirdetések jelennek meg
PUBLIC_ADSENSE_CLIENT_ID=

# ─── Brevo email lista ────────────────────────────────────────────────────────
# API kulcs a feliratkozó adatok küldéséhez
# Hol találod: Brevo dashboard → API Keys
# Ha nincs beállítva: az EmailCaptureBar nem renderelődik (env guard)
PUBLIC_BREVO_API_KEY=

# ─── Build-time változók (netlify.hu.toml / netlify.ro.toml-ban beállítva) ───
# Helyi fejlesztéshez kézzel kell beállítani:
# PUBLIC_SITE_LANG=hu
# PUBLIC_SITE_URL=https://konvertalo.hu
```

**Netlify-on** a `PUBLIC_ADSENSE_CLIENT_ID` és `PUBLIC_BREVO_API_KEY` értékeket
a Netlify dashboard-on kell beállítani (Site settings → Environment variables),
NEM a `netlify.toml`-ban, hogy ne kerüljenek be a git repo-ba.

---

## Tesztelési checklist

### AdSense env guard tesztek:
- [ ] Ha `PUBLIC_ADSENSE_CLIENT_ID` nincs `.env`-ben → `AdSlot` egyáltalán nem renderelődik
- [ ] Ha `PUBLIC_ADSENSE_CLIENT_ID` be van állítva → az `<ins>` elemek megjelennek PROD-ban
- [ ] A `<script>` AdSense tag NEM kerül a `<head>`-be ha nincs Publisher ID
- [ ] A `<script>` AdSense tag megjelenik a `<head>`-ben ha van Publisher ID
- [ ] `public/ads.txt` fájl létezik és elérhető `/ads.txt` URL-en

### Timing + AdSlot elhelyezés tesztek:
- [ ] `timing-config.ts`-ben `showAdSlot: true` az alapértelmezettnél
- [ ] Szöveges eszközöknél (`json-formazas`, `slug-generator` stb.) `showAdSlot` NEM jelenik meg (delay=0)
- [ ] `pre-convert` slot megjelenik a fájl feltöltése után, a 3mp countdown alatt
- [ ] `pre-convert` slot eltűnik amikor a Konvertálás gomb aktív lesz
- [ ] `pre-download` slot megjelenik a konverzió után, a 3mp countdown alatt
- [ ] `pre-download` slot eltűnik amikor a Letöltés gomb aktív lesz
- [ ] `post-result` slot megjelenik a letöltés gomb alatt
- [ ] DEV módban: a placeholder boxok láthatók a helyes szöveggel (monospace font)
- [ ] PROD módban: `<ins class="adsbygoogle">` elemek vannak a helyükön

### Email capture tesztek:
- [ ] Ha `PUBLIC_BREVO_API_KEY` nincs `.env`-ben → `EmailCaptureBar` nem renderelődik
- [ ] Ha `PUBLIC_BREVO_API_KEY` be van állítva → a sáv megjelenik az eredmény után
- [ ] Sikeres feliratkozás után eltűnik, `localStorage` flag beíródik
- [ ] Következő látogatáson sem jelenik meg
- [ ] Brevo dashboardon megjelenik a helyes listán (HU: 1, RO: 2)
- [ ] Román oldalon román szövegek jelennek meg
- [ ] Szöveges eszközökön NEM jelenik meg

### Nem érintett dolgok:
- [ ] `tool-registry.ts` változatlan
- [ ] URL struktúra változatlan
- [ ] A countdown animáció működik
- [ ] Lighthouse score nem romlott (AdSense script async betöltés)

---

## Amit NE csinálj

- Ne commitolj valódi API kulcsokat vagy Publisher ID-t – csak `.env` fájlban
- Ne módosítsd a tényleges konverziós logikát a tool komponensekben
- Ne módosítsd a timing delay értékeit (3000ms marad)
- Ne hozz létre `usageStore`-t – az a 2. fázis
- Ne rakj usage limitet vagy upgrade modalt – az a 2. fázis
- Ne használj `t()` függvényt – csak `ui.*` értékeket
- Ne módosítsd a meglévő `TOOL_TIMING` override-okat (ahol delay=0)
