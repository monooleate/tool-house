<!-- src/components/ui/AdSlot.svelte -->
<!--
  AdSense hirdetési slot komponens.
  ENV guard: ha PUBLIC_ADSENSE_CLIENT_ID nincs beállítva → semmi nem renderelődik.
  DEV módban: vizuális placeholder. PROD: valódi AdSense <ins> elem.
-->
<script lang="ts">
  import { onMount } from 'svelte';

  // ─── Props ───────────────────────────────────────────────
  export let show:  boolean = false;
  export let slot:  'before-convert' | 'before-download' | 'post-result' = 'before-convert';

  // Ad Slot ID-k – AdSense dashboardból (placeholder amíg nincs jóváhagyva)
  const AD_SLOT_IDS: Record<string, string> = {
    'before-convert':  '0000000000',  // TODO: valódi slot ID az AdSense dashboardból
    'before-download': '0000000000',  // TODO: valódi slot ID az AdSense dashboardból
    'post-result':     '0000000000',  // TODO: valódi slot ID az AdSense dashboardból
  };

  // ENV GUARD: Publisher ID build-time beégett értéke
  const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? '';
  const isConfigured = ADSENSE_CLIENT.length > 0;

  // 2. FÁZIS KÖTŐPONT: Premium user nem lát hirdetést
  const isPremium = false;

  $: shouldRender = show && isConfigured && !isPremium;

  const isDev = import.meta.env.DEV;

  onMount(() => {
    if (!shouldRender || isDev) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // Csendben kezeljük – DEV módban normális
    }
  });
</script>

{#if shouldRender}
  <div class="ad-slot ad-slot--{slot}" aria-label="Hirdetés" role="complementary">

    {#if isDev}
      <!-- DEV: vizuális placeholder -->
      <div class="ad-slot__placeholder">
        <span class="ad-slot__label">AD: {slot}</span>
        <span class="ad-slot__note">AdSense csak production-ban fut</span>
      </div>
    {:else}
      <!-- PROD: valódi AdSense ins elem -->
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={AD_SLOT_IDS[slot]}
        data-ad-format={slot === 'before-download' ? 'rectangle' : 'auto'}
        data-full-width-responsive={slot !== 'before-download' ? 'true' : 'false'}
      ></ins>
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

.ad-slot--before-convert {
  min-height: 90px;
}

.ad-slot--before-download {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  min-height: 250px;
}

.ad-slot--post-result {
  min-height: 250px;
  margin-top: var(--sp-5);
}

.ad-slot__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-1);
  width: 100%;
  min-height: inherit;
  background: repeating-linear-gradient(
    45deg,
    var(--bg-card),
    var(--bg-card) 10px,
    color-mix(in srgb, var(--border) 40%, transparent) 10px,
    color-mix(in srgb, var(--border) 40%, transparent) 11px
  );
  border: 1px dashed var(--border);
  border-radius: var(--r-sm);
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
