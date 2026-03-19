<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadZip } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("sprite-vagas");

  let file: File | null = null;
  let cellW = 32, cellH = 32;
  let cols = 0, rows = 0, imgW = 0, imgH = 0;
  let processing = false;
  let isDone = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    isDone = false;
    if (!file) return;
    const bm = await createImageBitmap(file);
    imgW = bm.width; imgH = bm.height;
    bm.close();
    updateGrid();
  }

  function updateGrid() {
    cols = imgW > 0 && cellW > 0 ? Math.floor(imgW / cellW) : 0;
    rows = imgH > 0 && cellH > 0 ? Math.floor(imgH / cellH) : 0;
  }

  async function convert() {
    if (!file || cols <= 0 || rows <= 0) return;
    processing = true;

    try {
      const img = await createImageBitmap(file);
      const entries: { filename: string; data: Uint8Array }[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const canvas = new OffscreenCanvas(cellW, cellH);
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, col * cellW, row * cellH, cellW, cellH, 0, 0, cellW, cellH);
          const blob = await canvas.convertToBlob({ type: "image/png" });
          const rowStr = row.toString().padStart(2, "0");
          const colStr = col.toString().padStart(2, "0");
          entries.push({
            filename: `sprite-${rowStr}-${colStr}.png`,
            data: new Uint8Array(await blob.arrayBuffer()),
          });
        }
      }

      img.close();
      await downloadZip(entries, "sprite-frames.zip");
      isDone = true;
    } catch (e) {
      console.error(e);
    } finally {
      processing = false;
    }
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  {#if imgW > 0}
    <div class="settings-row">
      <label class="label">
        {ui.cellWidth ?? "Cella szélesség (px)"}:
        <input type="number" min="1" max={imgW} bind:value={cellW} on:change={updateGrid} class="input input-sm" />
      </label>
    </div>
    <div class="settings-row">
      <label class="label">
        {ui.cellHeight ?? "Cella magasság (px)"}:
        <input type="number" min="1" max={imgH} bind:value={cellH} on:change={updateGrid} class="input input-sm" />
      </label>
    </div>
    {#if cols > 0 && rows > 0}
      <p class="tool-meta">{cols} × {rows} {ui.gridInfo ?? "rács →"} {cols * rows} {ui.file ?? "kép"}</p>
    {/if}
  {/if}
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/png,image/jpeg,image/webp" multiple={false} maxSizeMB={50}
    label={ui.dragImageFor} sublabel="PNG, JPG, WebP -- Max. 50 MB" on:files={handleFiles} />
</div>

{#if file}
  <ConvertButton {timing}
    canConvert={!!file && cols > 0 && rows > 0 && !processing}
    isConverting={processing}
    isDone={isDone}
    onConvert={convert} onDownload={() => {}}
    convertLabel={"ZIP " + (ui.conversion ?? "export")}
    downloadLabel={""}
    fileCount={1} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-5); }
.input-sm { width: 100px; }
.tool-meta { font-size: 0.85rem; color: var(--text-muted); margin-top: var(--sp-3); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
</style>
