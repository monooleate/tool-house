# Claude Code – 2. Fázis: Freemium (Usage limit + UpgradeModal + Lemon Squeezy)

> **Önálló implementációs prompt. Csak az 1. fázis sikeres lefutása után indítsd el.**
>
> **Előfeltétel:** az 1. fázisból a következők már léteznek a kódban:
> - `src/components/ui/AdSlot.svelte` – bővített, háromfázisú, env guarddal
> - `src/components/ui/EmailCaptureBar.svelte` – env guarddal, Brevo integráció
> - `src/lib/timing-config.ts` – `showAdSlot: true` alapértelmezett
>
> **Mit old meg ez a prompt:**
> 1. `usageStore.ts` – napi 5 munkamenet limit, localStorage alapú
> 2. `UpgradeModal.svelte` – megjelenik limit elérésekor vagy fájlméret túllépésekor
> 3. `LicenseActivation.svelte` – Lemon Squeezy license key beváltás
> 4. `AdSlot.svelte` bővítése – Premium user nem lát hirdetést (kötőpont bekötése)
> 5. `timing-config.ts` bővítése – Premium user `showAdSlot: false` kapjon
>
> **Payment provider: Lemon Squeezy**
> Miért: natív recurring subscription + license key out-of-the-box, nincs backend,
> nincs webhook endpoint, európai VAT automatikus kezelés (merchant of record).

---

## Kötelező előkészítés – olvasd el ELŐSZÖR

```
src/lib/timing-config.ts               ← timing rendszer (showAdSlot logika)
src/components/ui/AdSlot.svelte        ← 1. fázisból: isPremium TODO kötőpont
src/components/ui/ConvertButton.svelte ← timing + ad slot megjelenítés
src/components/ui/Dropzone.svelte      ← fájl feltöltés – itt kell a méret check
src/lib/ui-labels.ts                   ← UI szövegek (build-time i18n)
src/components/tools/kep/JpgWebpTool.svelte ← minta tool komponens
```

**Kritikus szabályok:**
- Svelte komponensekben SOHA ne használj `t()` – csak `ui.*` értékeket `ui-labels.ts`-ből
- Minden új UI szöveg `ui-labels.ts`-be kerül, mindkét nyelven (hu + ro)
- SSG marad – nincs SSR, minden kliens oldali
- `tool-registry.ts`-t NE módosítsd

---

## Az architektúra döntés – localStorage, nem Supabase

A freemium limit **kizárólag `localStorage` alapú** – nincs account, nincs backend,
nincs session. Ez szándékos döntés:

- Solo fejlesztőként nulla backend overhead
- A Lemon Squeezy license key is `localStorage`-ban tárolódik
- A limit könnyen megkerülhető (incognito, localStorage törlés) – ez **elfogadható**,
  mert a célja nem a biztonság, hanem a konverzió ösztönzése az alkalmi userekre

**Mi számít "1 munkamenetnek":**
- Fájl alapú tool feldolgozása = 1 munkamenet
- Szöveges/kódoló eszközök (delay=0 a `TOOL_TIMING`-ban) = NEM számít
- Batch feldolgozás = 1 munkamenet (nem fájlonként)

---

## 1. FELADAT – `usageStore.ts` létrehozása

**Fájl**: `src/lib/stores/usageStore.ts`

```typescript
import { writable, get } from 'svelte/store';

// ─── Konstansok ────────────────────────────────────────────────────────────────
export const DAILY_LIMIT = 5;
export const FREE_MAX_FILE_SIZE_MB = 10;
export const PREMIUM_MAX_FILE_SIZE_MB = 100;
const STORAGE_KEY = 'ku_usage';
const LICENSE_KEY = 'ku_license';

// ─── Típusok ───────────────────────────────────────────────────────────────────
interface UsageState {
  date: string;           // 'YYYY-MM-DD'
  count: number;          // mai feldolgozások száma
  isPremium: boolean;     // Lemon Squeezy license alapján
  licenseKey: string;     // tárolt license key (üres ha nincs)
}

// ─── Segédfüggvény: mai dátum 'YYYY-MM-DD' formátumban ────────────────────────
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// ─── Kezdeti state betöltése localStorage-ból ─────────────────────────────────
function loadState(): UsageState {
  if (typeof localStorage === 'undefined') {
    return { date: today(), count: 0, isPremium: false, licenseKey: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: today(), count: 0, isPremium: false, licenseKey: '' };
    const parsed = JSON.parse(raw) as UsageState;
    // Napi reset: ha nem mai dátum, count visszaáll nullára
    if (parsed.date !== today()) {
      parsed.date = today();
      parsed.count = 0;
    }
    return parsed;
  } catch {
    return { date: today(), count: 0, isPremium: false, licenseKey: '' };
  }
}

// ─── Store definíció ───────────────────────────────────────────────────────────
export const usageStore = writable<UsageState>(loadState());

// Minden state változásnál automatikusan localStorage-ba ment
usageStore.subscribe((state) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded – csendesen kezeljük */ }
});

// ─── Exportált függvények ──────────────────────────────────────────────────────

/** Naponta egyszer hívd (DynamicTool.svelte onMount-ban) – reseteli ha új nap */
export function resetIfNewDay(): void {
  usageStore.update((s) => {
    if (s.date !== today()) {
      return { ...s, date: today(), count: 0 };
    }
    return s;
  });
}

/** Feldolgozható-e még? (false = napi limit elérve és nem Premium) */
export function canProcess(): boolean {
  const s = get(usageStore);
  if (s.isPremium) return true;
  return s.count < DAILY_LIMIT;
}

/** Fájlméret ellenőrzés – visszaadja hogy engedélyezett-e */
export function checkFileSize(bytes: number): { allowed: boolean; sizeMB: number } {
  const sizeMB = Math.round((bytes / 1024 / 1024) * 10) / 10;
  const s = get(usageStore);
  const limitMB = s.isPremium ? PREMIUM_MAX_FILE_SIZE_MB : FREE_MAX_FILE_SIZE_MB;
  return { allowed: sizeMB <= limitMB, sizeMB };
}

/** Egy munkamenet elkönyvelése (csak ha nem Premium) */
export function incrementUsage(): void {
  usageStore.update((s) => {
    if (s.isPremium) return s;
    return { ...s, count: s.count + 1 };
  });
}

/**
 * Premium aktiválás – Lemon Squeezy license key validáció után hívandó.
 * A key-t localStorage-ban tárolja, isPremium = true.
 */
export function setIsPremium(value: boolean, licenseKey = ''): void {
  usageStore.update((s) => ({ ...s, isPremium: value, licenseKey }));
}

/** Visszaadja a tárolt license key-t (üres ha nincs) */
export function getStoredLicenseKey(): string {
  return get(usageStore).licenseKey;
}
```

### `DynamicTool.svelte` frissítése

A `src/components/tools/DynamicTool.svelte` `onMount`-jában hívd meg a `resetIfNewDay()`-t:

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { resetIfNewDay } from '../../lib/stores/usageStore.ts';
  // ... meglévő importok

  onMount(() => {
    resetIfNewDay(); // Napi counter reset ha új nap
    // ... meglévő onMount logika
  });
</script>
```

---

## 2. FELADAT – `UpgradeModal.svelte` létrehozása

**Fájl**: `src/components/ui/UpgradeModal.svelte`

```svelte
<script lang="ts">
  import { ui } from '../../lib/ui-labels.ts';
  import { DAILY_LIMIT, FREE_MAX_FILE_SIZE_MB, PREMIUM_MAX_FILE_SIZE_MB } from '../../lib/stores/usageStore.ts';

  // 'daily_limit': napi limit elérve
  // 'file_size':   fájl túl nagy
  export let trigger: 'daily_limit' | 'file_size' = 'daily_limit';
  export let fileSizeMB: number = 0;
  export let isOpen: boolean = false;

  // Lemon Squeezy Checkout URL-ek – a Lemon Squeezy dashboardon létrehozott
  // Product Variant URL-ek. Ha nincs beállítva, a gombok disabled-ek.
  const LS_MONTHLY_URL = import.meta.env.PUBLIC_LS_MONTHLY_URL ?? '';
  const LS_YEARLY_URL  = import.meta.env.PUBLIC_LS_YEARLY_URL  ?? '';
  const hasPayment = LS_MONTHLY_URL.length > 0;

  function close() {
    isOpen = false;
  }

  function openCheckout(url: string) {
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="upgrade-modal-title"
    on:click|self={close}
    on:keydown={(e) => e.key === 'Escape' && close()}
  >
    <div class="modal">
      <h2 id="upgrade-modal-title" class="modal__title">
        {trigger === 'daily_limit'
          ? ui.upgradeModal.daily_limit_title
          : ui.upgradeModal.file_size_title.replace('{size}', String(fileSizeMB))}
      </h2>
      <p class="modal__subtitle">
        {trigger === 'daily_limit'
          ? ui.upgradeModal.daily_limit_subtitle
          : ui.upgradeModal.file_size_subtitle}
      </p>

      <!-- Feature lista -->
      <ul class="modal__features" role="list">
        <li>✓ {ui.upgradeModal.feature_unlimited}</li>
        <li>✓ {ui.upgradeModal.feature_filesize
                  .replace('{free}', String(FREE_MAX_FILE_SIZE_MB))
                  .replace('{premium}', String(PREMIUM_MAX_FILE_SIZE_MB))}</li>
        <li>✓ {ui.upgradeModal.feature_noad}</li>
      </ul>

      <!-- Checkout gombok -->
      <div class="modal__buttons">
        <button
          class="modal__btn modal__btn--primary"
          on:click={() => openCheckout(LS_MONTHLY_URL)}
          disabled={!hasPayment}
          title={!hasPayment ? ui.upgradeModal.coming_soon : undefined}
          data-ls-checkout="monthly"
        >
          {ui.upgradeModal.btn_monthly}
        </button>
        <button
          class="modal__btn modal__btn--secondary"
          on:click={() => openCheckout(LS_YEARLY_URL)}
          disabled={!hasPayment}
          title={!hasPayment ? ui.upgradeModal.coming_soon : undefined}
          data-ls-checkout="yearly"
        >
          {ui.upgradeModal.btn_yearly}
        </button>
      </div>

      <!-- Bezárás -->
      <button class="modal__close" on:click={close}>
        {trigger === 'daily_limit'
          ? ui.upgradeModal.btn_tomorrow
          : ui.upgradeModal.btn_ok}
      </button>

      <!-- License key aktiválás link -->
      <p class="modal__license-hint">
        {ui.upgradeModal.have_license}
        <a href="/premium" class="modal__license-link">
          {ui.upgradeModal.activate_license}
        </a>
      </p>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal {
    background: var(--color-bg, #fff);
    border-radius: 12px;
    padding: 2rem;
    max-width: 420px;
    width: 100%;
    text-align: center;
  }

  .modal__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }

  .modal__subtitle {
    color: var(--color-text-muted, #666);
    font-size: 0.9rem;
    margin: 0 0 1.25rem;
  }

  .modal__features {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    text-align: left;
    display: inline-block;
  }

  .modal__features li {
    padding: 0.2rem 0;
    font-size: 0.9rem;
  }

  .modal__buttons {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  }

  .modal__btn {
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    border: none;
  }

  .modal__btn--primary {
    background: var(--color-accent, #6366f1);
    color: #fff;
  }

  .modal__btn--secondary {
    background: var(--color-bg-secondary, #f0f0f0);
    color: var(--color-text, #111);
  }

  .modal__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .modal__close {
    background: none;
    border: none;
    color: var(--color-text-muted, #999);
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0.25rem;
    text-decoration: underline;
  }

  .modal__license-hint {
    font-size: 0.8rem;
    color: var(--color-text-muted, #999);
    margin: 0.75rem 0 0;
  }

  .modal__license-link {
    color: var(--color-accent, #6366f1);
  }
</style>
```

---

## 3. FELADAT – Tool komponensek bővítése (limit check)

**Minden fájl alapú tool komponensben** add hozzá a következő logikát.
A `DynamicTool.svelte` mintájából és a meglévő tool komponensekből olvasd ki
a pontos state neveket (result, handleFiles, convert stb.).

### Fájlméret check – a `Dropzone` `on:files` handlerében

```svelte
<script lang="ts">
  import { canProcess, checkFileSize, incrementUsage } from '../../lib/stores/usageStore.ts';
  import UpgradeModal from '../ui/UpgradeModal.svelte';

  let upgradeModalOpen = false;
  let upgradeModalTrigger: 'daily_limit' | 'file_size' = 'daily_limit';
  let upgradeModalFileSizeMB = 0;

  function handleFiles(event: CustomEvent<File[]>) {
    const files = event.detail;
    // Fájlméret ellenőrzés az első fájlra (vagy a legnagyobb fájlra batch esetén)
    for (const file of files) {
      const check = checkFileSize(file.size);
      if (!check.allowed) {
        upgradeModalTrigger = 'file_size';
        upgradeModalFileSizeMB = check.sizeMB;
        upgradeModalOpen = true;
        return; // fájl NEM kerül be a state-be
      }
    }
    // ... meglévő handleFiles logika folytatódik
  }
</script>
```

### Napi limit check – a feldolgozás indítása előtt

A meglévő `convert()` vagy `onConvert` callback elejére:

```typescript
// A tényleges feldolgozási logika ELŐTT:
if (!canProcess()) {
  upgradeModalTrigger = 'daily_limit';
  upgradeModalOpen = true;
  return;
}
incrementUsage(); // egy munkamenet elkönyvelése
// → folytatódik a meglévő feldolgozási logika, változtatás nélkül
```

### UpgradeModal beillesztése a template-be

```svelte
<!-- A tool komponens template végén, az eredmény szekció után: -->
<UpgradeModal
  bind:isOpen={upgradeModalOpen}
  trigger={upgradeModalTrigger}
  fileSizeMB={upgradeModalFileSizeMB}
/>
```

### Érintett komponensek

Minden fájl alapú tool ahol van `Dropzone` és konverziós logika:
- Minden kép tool
- Minden PDF tool
- Excel tool-ok
- Fájl kategória tool-ok
- Adat kategória tool-ok (CSV/JSON fájl import)

**NEM érintett** (nincs fájl, `TOOL_TIMING` delay=0):
- Fejlesztő kategória, Szöveg kategória, SEO, Markdown

---

## 4. FELADAT – `LicenseActivation.svelte` létrehozása

**Fájl**: `src/components/ui/LicenseActivation.svelte`

Ez a komponens a `/premium` oldalon jelenik meg (külön statikus oldal).
A user ide jön a Lemon Squeezy checkout után a license key-jével.

```svelte
<script lang="ts">
  import { ui } from '../../lib/ui-labels.ts';
  import { setIsPremium, getStoredLicenseKey } from '../../lib/stores/usageStore.ts';
  import { onMount } from 'svelte';

  let licenseKey = '';
  let status: 'idle' | 'loading' | 'success' | 'error' | 'already_active' = 'idle';
  let errorMessage = '';

  onMount(() => {
    const stored = getStoredLicenseKey();
    if (stored) {
      status = 'already_active';
      licenseKey = stored;
    }
  });

  async function activate() {
    if (!licenseKey.trim() || status === 'loading') return;
    status = 'loading';

    try {
      const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          license_key: licenseKey.trim(),
          instance_name: 'browser-' + crypto.randomUUID(),
        }),
      });

      const data = await res.json();

      if (data.activated === true) {
        setIsPremium(true, licenseKey.trim());
        status = 'success';
      } else {
        status = 'error';
        // Lemon Squeezy hibakódok: 'license_key_not_found', 'license_key_expired', stb.
        errorMessage = data.error ?? ui.licenseActivation.error_generic;
      }
    } catch {
      status = 'error';
      errorMessage = ui.licenseActivation.error_network;
    }
  }

  function deactivate() {
    setIsPremium(false, '');
    licenseKey = '';
    status = 'idle';
  }
</script>

<div class="license-activation">
  {#if status === 'success' || status === 'already_active'}
    <div class="license-activation__success">
      <p>✅ {ui.licenseActivation.active}</p>
      <p class="license-activation__key">{licenseKey}</p>
      <button class="license-activation__deactivate" on:click={deactivate}>
        {ui.licenseActivation.deactivate}
      </button>
    </div>
  {:else}
    <p class="license-activation__title">{ui.licenseActivation.title}</p>
    <div class="license-activation__form">
      <input
        type="text"
        bind:value={licenseKey}
        placeholder={ui.licenseActivation.placeholder}
        disabled={status === 'loading'}
        aria-label={ui.licenseActivation.placeholder}
      />
      <button
        on:click={activate}
        disabled={status === 'loading' || !licenseKey.trim()}
      >
        {status === 'loading' ? '...' : ui.licenseActivation.btn}
      </button>
    </div>
    {#if status === 'error'}
      <p class="license-activation__error">{errorMessage}</p>
    {/if}
    <p class="license-activation__hint">{ui.licenseActivation.hint}</p>
  {/if}
</div>
```

### `/premium` statikus oldal létrehozása

**Fájl**: `src/pages/[staticPage].astro`-ban add hozzá a `premium` kulcsot,
VAGY hozz létre egy dedikált `src/pages/premium.astro`-t:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LicenseActivation from '../components/ui/LicenseActivation.svelte';
import { t } from '../i18n/index.ts';
---
<BaseLayout title={t('premium.page_title')} description={t('premium.page_desc')}>
  <main class="container">
    <h1>{t('premium.h1')}</h1>
    <LicenseActivation client:visible />
  </main>
</BaseLayout>
```

**i18n szövegek** (`src/i18n/hu.json` és `ro.json`-ba):
```json
"premium": {
  "page_title": "Premium aktiválás | Konvertalo.hu",
  "page_desc": "Aktiváld a Premium előfizetésedet a license key-eddel.",
  "h1": "Premium aktiválás"
}
```

---

## 5. FELADAT – `AdSlot.svelte` Premium kötőpont bekötése

**Fájl**: `src/components/ui/AdSlot.svelte`

Az 1. fázisban a `isPremium = false` hardcode-olva van (TODO kötőpont).
Most kösd be a `usageStore`-hoz:

```svelte
<script lang="ts">
  import { usageStore } from '../../lib/stores/usageStore.ts';
  // ... meglévő imports és kód

  // VÁLTOZTATÁS: false hardcode helyett usageStore-ból olvassuk
  $: isPremium = $usageStore.isPremium;
  // Töröld a meglévő: const isPremium = false; sort
</script>
```

---

## 6. FELADAT – `ui-labels.ts` bővítése

Add hozzá a következő kulcsokat **mindkét nyelven**:

```typescript
// Magyar (hu):
upgradeModal: {
  daily_limit_title:    'Elérted a napi {limit} ingyenes határt',
  daily_limit_subtitle: 'Holnap folytathatod ingyen, vagy válts Premiumra.',
  file_size_title:      'Ez a fájl {size} MB – a Free limit felett',
  file_size_subtitle:   'Ingyenesen {free}MB-ig dolgozhatsz. Premiummal {premium}MB-ig.',
  feature_unlimited:    'Korlátlan eszközhasználat naponta',
  feature_filesize:     '{premium}MB fájlméret (most: {free}MB)',
  feature_noad:         'Reklámok nélkül',
  btn_monthly:          '⭐ Premium – €4.99/hó',
  btn_yearly:           '📅 Éves – €39/év',
  btn_tomorrow:         'Holnap folytatom',
  btn_ok:               'Értem',
  coming_soon:          'Hamarosan elérhető',
  have_license:         'Van már license key-ed?',
  activate_license:     'Aktiválás itt →',
},
licenseActivation: {
  title:          'Add meg a license key-ed',
  placeholder:    'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  btn:            'Aktiválás',
  hint:           'A license key-t a vásárlási visszaigazoló emailben találod.',
  active:         'Premium aktív – korlátlan használat, reklámok nélkül.',
  deactivate:     'Deaktiválás',
  error_generic:  'Érvénytelen vagy lejárt license key.',
  error_network:  'Hálózati hiba. Próbáld újra.',
},

// Román (ro):
upgradeModal: {
  daily_limit_title:    'Ai atins limita zilnică de {limit} utilizări gratuite',
  daily_limit_subtitle: 'Poți continua mâine gratuit, sau treci la Premium.',
  file_size_title:      'Acest fișier are {size} MB – depășește limita Free',
  file_size_subtitle:   'Gratuit poți lucra până la {free}MB. Cu Premium până la {premium}MB.',
  feature_unlimited:    'Utilizare nelimitată zilnic',
  feature_filesize:     'Fișiere până la {premium}MB (acum: {free}MB)',
  feature_noad:         'Fără reclame',
  btn_monthly:          '⭐ Premium – €4.99/lună',
  btn_yearly:           '📅 Anual – €39/an',
  btn_tomorrow:         'Continui mâine',
  btn_ok:               'Am înțeles',
  coming_soon:          'În curând disponibil',
  have_license:         'Ai deja o cheie de licență?',
  activate_license:     'Activează aici →',
},
licenseActivation: {
  title:          'Introdu cheia de licență',
  placeholder:    'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  btn:            'Activare',
  hint:           'Cheia de licență se găsește în emailul de confirmare a comenzii.',
  active:         'Premium activ – utilizare nelimitată, fără reclame.',
  deactivate:     'Dezactivare',
  error_generic:  'Cheie de licență invalidă sau expirată.',
  error_network:  'Eroare de rețea. Încearcă din nou.',
},
```

---

## 7. FELADAT – `.env.example` bővítése

Add hozzá a Lemon Squeezy változókat:

```bash
# ─── Lemon Squeezy (Premium előfizetés) ───────────────────────────────────────
# Checkout URL-ek – a Lemon Squeezy dashboardon a Product Variant Share URL-jei
# Ha nincs beállítva: az UpgradeModal gombjai disabled állapotban vannak
PUBLIC_LS_MONTHLY_URL=
PUBLIC_LS_YEARLY_URL=

# Hol találod: Lemon Squeezy dashboard → Products → [termék] → Variants →
#              Share → Copy checkout URL
# Formátum: https://yourstore.lemonsqueezy.com/checkout/buy/VARIANT_ID
```

---

## Lemon Squeezy beállítási útmutató (manuális lépések, NEM kód)

Ez nem Claude Code feladat – manuálisan kell elvégezni a Lemon Squeezy dashboardon:

1. Regisztrálj: https://app.lemonsqueezy.com
2. Hozz létre egy Store-t (konvertalo.hu)
3. Hozz létre egy Product-ot: "Konvertalo.hu Premium"
4. Adj hozzá két Variant-ot:
   - "Monthly" – €4.99/hó, subscription
   - "Yearly" – €39/év, subscription
5. Mindkét Variant-nál kapcsold be a **License keys** opciót
6. Másold ki a checkout URL-eket és tedd be a Netlify env variable-kbe

---

## Tesztelési checklist

### UsageStore tesztek:
- [ ] 5. feldolgozás után a 6. kísérletkor megjelenik az UpgradeModal (`daily_limit`)
- [ ] 10MB+ fájl kiválasztásakor azonnal megjelenik az UpgradeModal (`file_size`)
- [ ] A fájl NEM kerül be a state-be ha `file_size` triggert váltott ki
- [ ] Másik napon (vagy `ku_usage.date` kézi módosítással) a counter resetelődik
- [ ] Szöveges eszközök NEM számítanak bele a limitbe (delay=0 tool-ok)
- [ ] `localStorage`-ban tárolt state JSON-t ellenőrizd: `date`, `count`, `isPremium`

### UpgradeModal tesztek:
- [ ] Modal szövegei helyesek mindkét nyelven
- [ ] `{size}` / `{free}` / `{premium}` template változók helyesen interpolálódnak
- [ ] "Holnap folytatom" / "Értem" gomb bezárja a modalt
- [ ] Ha `PUBLIC_LS_MONTHLY_URL` nincs beállítva → gombok disabled, tooltip látható
- [ ] Ha be van állítva → a gomb megnyitja a Lemon Squeezy checkout oldalt új tabban

### LicenseActivation tesztek:
- [ ] Érvénytelen key esetén hibaüzenet jelenik meg
- [ ] Érvényes key esetén `isPremium = true` a `usageStore`-ban
- [ ] Aktiválás után az `AdSlot`-ok eltűnnek (isPremium guard)
- [ ] Aktiválás után a limit ellenőrzés átmegy (canProcess() = true)
- [ ] Oldal frissítés után is aktív marad (localStorage-ból tölti vissza)
- [ ] "Deaktiválás" gomb visszaállítja a Free állapotot

### Premium + AdSlot integráció:
- [ ] Premium user nem lát hirdetést (AdSlot isPremium guard)
- [ ] Premium user napi limitje nincs (`canProcess()` mindig true)
- [ ] Free user látja az adokat és a limitet is

---

## Amit NE csinálj

- Ne módosítsd az 1. fázisból a `EmailCaptureBar`-t vagy az `AdSlot` ad kódját
- Ne add hozzá a `usageStore`-t a szöveges/kódoló eszközökhöz (ahol delay=0)
- Ne módosítsd a `timing-config.ts` delay értékeit
- Ne hozz létre backend endpointot – minden kliens oldali marad
- Ne használj `t()` függvényt – csak `ui.*` értékeket
- Ne commitolj Lemon Squeezy URL-eket – csak `.env` fájlban legyenek
