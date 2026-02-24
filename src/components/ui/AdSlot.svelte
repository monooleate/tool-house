<!-- src/components/ui/AdSlot.svelte -->
<!--
  AdSense placeholder komponens.
  Ha show=false: teljesen rejtett, 0 helyet foglal.
  Ha show=true: megjelenik a slot (téglalap placeholder vagy éles ad).
-->
<script lang="ts">
  export let show:       boolean = false;
  export let slot:       "before-convert" | "before-download" | "sidebar" | "bottom" = "before-convert";
  export let adClient:   string  = "ca-pub-XXXXXXXXXX";
  export let adSlotId:   string  = "0000000000";
  export let label:      string  = "Hirdetes";

  // Suppress unused export warnings – used in production <ins> tag when uncommented
  $: void adClient, adSlotId;

  const isDev  = import.meta.env.DEV;

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
      <div class="ad-slot__placeholder" style="width:{cfg.w}; height:{cfg.h}">
        <span class="ad-slot__label">{label} [{slot}] - {cfg.w} x {cfg.h}</span>
        <span class="ad-slot__note">AdSense kod csak production-ban fut</span>
      </div>
    {:else}
      <!-- Production: valodi AdSense kod -->
      <!--
      <ins
        class="adsbygoogle"
        style="display:block; width:{cfg.w}; height:{cfg.h}"
        data-ad-client={adClient}
        data-ad-slot={adSlotId}
        data-ad-format={cfg.format}
        data-full-width-responsive="true"
      ></ins>
      -->
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
