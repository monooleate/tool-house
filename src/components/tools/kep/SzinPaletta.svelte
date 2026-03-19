<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let colors: { hex: string; rgb: string; hsl: string }[] = [];
  let colorCount = 6;
  let previewUrl = "";
  let copied = "";

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    colors = [];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(file);
      extractColors();
    }
  }

  async function extractColors() {
    if (!file) return;

    try {
      // Use Canvas-based color extraction instead of color-thief-ts for reliability
      const img = await createImageBitmap(file);
      const size = 100; // sample at 100x100 for speed
      const canvas = new OffscreenCanvas(size, size);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      img.close();

      const imageData = ctx.getImageData(0, 0, size, size);
      const pixels = imageData.data;

      // Simple median-cut-like: collect all colors, bucket sort
      const colorMap = new Map<string, number>();
      for (let i = 0; i < pixels.length; i += 4) {
        const r = Math.round(pixels[i] / 16) * 16;
        const g = Math.round(pixels[i + 1] / 16) * 16;
        const b = Math.round(pixels[i + 2] / 16) * 16;
        const key = `${r},${g},${b}`;
        colorMap.set(key, (colorMap.get(key) ?? 0) + 1);
      }

      const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, colorCount);
      colors = sorted.map(([key]) => {
        const [r, g, b] = key.split(",").map(Number);
        return {
          hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
          rgb: `rgb(${r}, ${g}, ${b})`,
          hsl: rgbToHsl(r, g, b),
        };
      });
    } catch (e) {
      console.error(e);
    }
  }

  function rgbToHsl(r: number, g: number, b: number): string {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  async function copyColor(text: string) {
    await navigator.clipboard.writeText(text);
    copied = text;
    setTimeout(() => (copied = ""), 2000);
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.colorCount ?? "Színek száma"}: <span class="quality-val">{colorCount}</span>
    </label>
    <input type="range" min="3" max="10" bind:value={colorCount} class="slider"
      on:change={extractColors} />
  </div>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={false} maxSizeMB={20}
    label={ui.dragImageFor} sublabel="JPG, PNG, WebP -- Max. 20 MB" on:files={handleFiles} />
</div>

{#if colors.length > 0}
  <div class="color-palette">
    {#each colors as color}
      <div class="color-card">
        <div class="color-swatch" style="background: {color.hex}"></div>
        <div class="color-values">
          <button class="color-btn" on:click={() => copyColor(color.hex)}>
            {copied === color.hex ? (ui.copied ?? "Másolva!") : color.hex}
          </button>
          <small>{color.rgb}</small>
          <small>{color.hsl}</small>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-5); }
.quality-val { color: var(--accent); font-weight: 700; }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.color-palette { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--sp-3); margin-top: var(--sp-4); }
.color-card { border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; background: var(--bg-card); }
.color-swatch { height: 60px; }
.color-values { padding: var(--sp-2) var(--sp-3); }
.color-btn { background: none; border: none; cursor: pointer; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: var(--text); padding: 0; }
.color-btn:hover { color: var(--accent); }
.color-values small { display: block; font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); }
</style>
