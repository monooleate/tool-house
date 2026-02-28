<script lang="ts">
  // DPI / felbontas kiszamolo -- tisztan matematikai, nincs fajlfeltoltes
  import { ui } from "../../../lib/ui-labels.ts";
  let mode: "pixel-to-print" | "print-to-pixel" = "pixel-to-print";

  // Pixel -> print
  let pixelW = 1920;
  let pixelH = 1080;
  let dpi = 300;
  let customDpi = false;

  // Print -> pixel
  let printW = 10;
  let printH = 15;
  let printUnit: "cm" | "inch" = "cm";
  let printDpi = 300;

  // Presets
  const dpiPresets = [72, 150, 300, 600];

  // Computed: pixel -> print size
  $: printWidthInch = dpi > 0 ? pixelW / dpi : 0;
  $: printHeightInch = dpi > 0 ? pixelH / dpi : 0;
  $: printWidthCm = printWidthInch * 2.54;
  $: printHeightCm = printHeightInch * 2.54;

  // Computed: print -> pixel
  $: neededW = printUnit === "cm"
    ? Math.round((printW / 2.54) * printDpi)
    : Math.round(printW * printDpi);
  $: neededH = printUnit === "cm"
    ? Math.round((printH / 2.54) * printDpi)
    : Math.round(printH * printDpi);

  function setDpi(val: number) {
    dpi = val;
    customDpi = false;
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>

  <div class="settings-row">
    <div class="radio-group">
      <label class="radio-label">
        <input type="radio" bind:group={mode} value="pixel-to-print" /> Pixel -&gt; Nyomtatasi meret
      </label>
      <label class="radio-label">
        <input type="radio" bind:group={mode} value="print-to-pixel" /> Nyomtatasi meret -&gt; Pixel
      </label>
    </div>
  </div>
</div>

{#if mode === "pixel-to-print"}
  <div class="calc-section card">
    <h3 class="calc-section__title">Pixel -&gt; Nyomtatasi meret</h3>

    <div class="settings-row two-col">
      <div>
        <label class="label" for="px-w">{ui.width} (px)</label>
        <input id="px-w" type="number" min="1" max="100000" bind:value={pixelW} class="input" />
      </div>
      <div>
        <label class="label" for="px-h">{ui.height} (px)</label>
        <input id="px-h" type="number" min="1" max="100000" bind:value={pixelH} class="input" />
      </div>
    </div>

    <div class="settings-row">
      <span class="label">DPI</span>
      <div class="quick-buttons">
        {#each dpiPresets as preset}
          <button
            class="btn btn--sm"
            class:btn--primary={dpi === preset && !customDpi}
            class:btn--outline={dpi !== preset || customDpi}
            on:click={() => setDpi(preset)}
          >{preset}</button>
        {/each}
        <button
          class="btn btn--sm"
          class:btn--primary={customDpi}
          class:btn--outline={!customDpi}
          on:click={() => { customDpi = true; }}
        >Egyeni</button>
      </div>
      {#if customDpi}
        <input type="number" min="1" max="10000" bind:value={dpi} class="input" style="margin-top: var(--sp-2); max-width: 120px;" />
      {/if}
    </div>

    <div class="result-table">
      <table class="data-table">
        <thead>
          <tr><th></th><th>{ui.width}</th><th>{ui.height}</th></tr>
        </thead>
        <tbody>
          <tr><td>cm</td><td>{printWidthCm.toFixed(2)} cm</td><td>{printHeightCm.toFixed(2)} cm</td></tr>
          <tr><td>inch</td><td>{printWidthInch.toFixed(2)}"</td><td>{printHeightInch.toFixed(2)}"</td></tr>
          <tr><td>mm</td><td>{(printWidthCm * 10).toFixed(1)} mm</td><td>{(printHeightCm * 10).toFixed(1)} mm</td></tr>
        </tbody>
      </table>
    </div>
  </div>
{:else}
  <div class="calc-section card">
    <h3 class="calc-section__title">Nyomtatasi meret -&gt; Pixel</h3>

    <div class="settings-row two-col">
      <div>
        <label class="label" for="pr-w">{ui.width} ({printUnit})</label>
        <input id="pr-w" type="number" min="0.1" max="10000" step="0.1" bind:value={printW} class="input" />
      </div>
      <div>
        <label class="label" for="pr-h">{ui.height} ({printUnit})</label>
        <input id="pr-h" type="number" min="0.1" max="10000" step="0.1" bind:value={printH} class="input" />
      </div>
    </div>

    <div class="settings-row two-col">
      <div>
        <label class="label" for="pr-unit">Mertekegyseg</label>
        <select id="pr-unit" bind:value={printUnit} class="input">
          <option value="cm">cm</option>
          <option value="inch">inch</option>
        </select>
      </div>
      <div>
        <label class="label" for="pr-dpi">DPI</label>
        <input id="pr-dpi" type="number" min="1" max="10000" bind:value={printDpi} class="input" />
      </div>
    </div>

    <div class="result-table">
      <table class="data-table">
        <thead>
          <tr><th>{ui.property}</th><th>{ui.value}</th></tr>
        </thead>
        <tbody>
          <tr><td>{ui.width}</td><td><strong>{neededW} px</strong></td></tr>
          <tr><td>{ui.height}</td><td><strong>{neededH} px</strong></td></tr>
          <tr><td>px</td><td>{(neededW * neededH).toLocaleString(ui.locale)} px</td></tr>
          <tr><td>{ui.megapixel}</td><td>{((neededW * neededH) / 1_000_000).toFixed(1)} MP</td></tr>
        </tbody>
      </table>
    </div>
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-4); }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
.radio-group { display: flex; flex-direction: column; gap: var(--sp-2); }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: 0.9rem; color: var(--text-muted); cursor: pointer; }
.quick-buttons { display: flex; gap: var(--sp-2); margin-top: var(--sp-2); flex-wrap: wrap; }
.calc-section { padding: var(--sp-5); }
.calc-section__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.result-table { margin-top: var(--sp-5); }
.data-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.85rem; }
.data-table th, .data-table td { padding: var(--sp-2) var(--sp-3); text-align: left; border-bottom: 1px solid var(--border); }
.data-table th { color: var(--text-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.data-table td { color: var(--text); }
@media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }
</style>
