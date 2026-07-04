<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("kep-collage");

  let files: File[] = [];
  let resultBlob: Blob | null = null;
  let layout: "horizontal" | "vertical" | "grid" = "horizontal";
  let gap = 8;
  let bgColor = "#ffffff";
  let errorMsg = "";

  function handleFiles(event: CustomEvent<File[]>) {
    files = [...files, ...event.detail];
    resultBlob = null;
    errorMsg = "";
  }

  async function convert() {
    if (files.length < 2) return;
    errorMsg = "";

    try {
      const bitmaps = await Promise.all(files.map(f => createImageBitmap(f)));
      let canvas: OffscreenCanvas;

      if (layout === "horizontal") {
        const totalW = bitmaps.reduce((s, b) => s + b.width, 0) + gap * (bitmaps.length - 1);
        const maxH = Math.max(...bitmaps.map(b => b.height));
        canvas = new OffscreenCanvas(totalW, maxH);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, totalW, maxH);
        let x = 0;
        for (const bm of bitmaps) {
          ctx.drawImage(bm, x, 0);
          x += bm.width + gap;
          bm.close();
        }
      } else if (layout === "vertical") {
        const maxW = Math.max(...bitmaps.map(b => b.width));
        const totalH = bitmaps.reduce((s, b) => s + b.height, 0) + gap * (bitmaps.length - 1);
        canvas = new OffscreenCanvas(maxW, totalH);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, maxW, totalH);
        let y = 0;
        for (const bm of bitmaps) {
          ctx.drawImage(bm, 0, y);
          y += bm.height + gap;
          bm.close();
        }
      } else {
        const cols = Math.ceil(Math.sqrt(bitmaps.length));
        const rows = Math.ceil(bitmaps.length / cols);
        const cellW = Math.max(...bitmaps.map(b => b.width));
        const cellH = Math.max(...bitmaps.map(b => b.height));
        canvas = new OffscreenCanvas(
          cols * cellW + (cols - 1) * gap,
          rows * cellH + (rows - 1) * gap
        );
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bitmaps.length; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          ctx.drawImage(bitmaps[i], col * (cellW + gap), row * (cellH + gap));
          bitmaps[i].close();
        }
      }

      resultBlob = await canvas.convertToBlob({ type: "image/png" });
    } catch (e) {
      console.error(e);
      errorMsg = ui.conversionError;
    }
  }

  function download() {
    if (!resultBlob) return;
    downloadBlob(resultBlob, `collage-${layout}.png`);
  }

  function reset() {
    files = [];
    resultBlob = null;
    errorMsg = "";
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.layout}:
      <select bind:value={layout} class="select">
        <option value="horizontal">{ui.layoutHorizontal}</option>
        <option value="vertical">{ui.layoutVertical}</option>
        <option value="grid">{ui.layoutGrid}</option>
      </select>
    </label>
  </div>
  <div class="settings-row">
    <label class="label">
      {ui.gap}: <span class="quality-val">{gap}</span>
    </label>
    <input type="range" min="0" max="50" bind:value={gap} class="slider" />
  </div>
  <div class="settings-row">
    <label class="label">
      {ui.bgColor}: <input type="color" bind:value={bgColor} />
    </label>
  </div>
</div>

{#if !files.length}
  <div class="dropzone-wrap">
    <Dropzone accept="image/jpeg,image/png,image/webp" multiple={true} maxSizeMB={50}
      label={ui.dragImageFor} sublabel="JPG, PNG, WebP -- Max. 50 MB" on:files={handleFiles} />
  </div>
{:else}
  <div class="add-more">
    <Dropzone accept="image/jpeg,image/png,image/webp" multiple={true} maxSizeMB={50}
      label={ui.addMoreImages} sublabel="" on:files={handleFiles} />
  </div>
{/if}

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if files.length > 0}
  <div class="meta-row">
    <p class="tool-meta">{files.length} {ui.image.toLowerCase()} {ui.selected}{files.length < 2 ? ` · ${ui.minTwoImages}` : ""}</p>
    <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.reset}</button>
  </div>
{/if}

{#if files.length > 0}
  <ConvertButton {timing}
    canConvert={files.length >= 2}
    isConverting={false}
    isDone={!!resultBlob}
    onConvert={convert} onDownload={download}
    convertLabel={ui.collage + " " + ui.generate}
    downloadLabel={"PNG " + ui.download}
    fileCount={files.length} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-5); }
.settings-row:last-child { margin-bottom: 0; }
.quality-val { color: var(--accent); font-weight: 700; }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
.select { padding: var(--sp-2) var(--sp-3); border: 1px solid var(--border); border-radius: var(--r-md); background: var(--bg-input); color: var(--text); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.add-more { margin-bottom: var(--sp-5); opacity: 0.7; }
.tool-meta { font-size: 0.85rem; color: var(--text-muted); margin: var(--sp-3) 0; }
.tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }
.meta-row { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); flex-wrap: wrap; }
</style>
