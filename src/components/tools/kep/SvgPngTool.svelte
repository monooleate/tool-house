<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("svg-png");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let outputFormat: "image/png" | "image/jpeg" = "image/png";
  let targetWidth = 0;
  let naturalWidth = 0;
  let naturalHeight = 0;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    naturalWidth = parseInt(svg?.getAttribute("width") ?? "0") || 512;
    naturalHeight = parseInt(svg?.getAttribute("height") ?? "0") || 512;
    targetWidth = naturalWidth;
  }

  async function convert() {
    if (!file) return;

    try {
      const url = URL.createObjectURL(file);
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });

      const scale = targetWidth > 0 ? targetWidth / img.naturalWidth : 1;
      const W = Math.round(img.naturalWidth * scale);
      const H = Math.round(img.naturalHeight * scale);

      const canvas = new OffscreenCanvas(W, H);
      const ctx = canvas.getContext("2d")!;
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);
      }
      ctx.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);

      resultBlob = await canvas.convertToBlob({ type: outputFormat, quality: 0.92 });
    } catch (e) {
      console.error(e);
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    const ext = outputFormat === "image/png" ? "png" : "jpg";
    downloadBlob(resultBlob, file.name.replace(/\.svg$/i, "") + `.${ext}`);
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  {#if naturalWidth > 0}
    <div class="settings-row">
      <label class="label">
        {ui.outputFormat ?? "Kimenet"}:
        <select bind:value={outputFormat} class="select">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
        </select>
      </label>
    </div>
    <div class="settings-row">
      <label class="label">
        {ui.targetWidth ?? "Szélesség (px)"}:
        <input type="number" min="16" max="8000" bind:value={targetWidth} class="input input-sm" />
        <small class="settings-hint">{ui.originalSize ?? "Eredeti"}: {naturalWidth}×{naturalHeight}px</small>
      </label>
    </div>
  {/if}
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/svg+xml,.svg" multiple={false} maxSizeMB={20}
    label={ui.dragImageFor} sublabel="SVG -- Max. 20 MB" on:files={handleFiles} />
</div>

{#if file}
  <ConvertButton {timing}
    canConvert={!!file}
    isConverting={false}
    isDone={!!resultBlob}
    onConvert={convert} onDownload={download}
    convertLabel={(outputFormat === "image/png" ? "PNG" : "JPG") + " " + (ui.conversion ?? "konvertálás")}
    downloadLabel={(outputFormat === "image/png" ? "PNG" : "JPG") + " " + (ui.download ?? "letöltés")}
    fileCount={1} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-5); }
.settings-hint { font-size: 0.8rem; color: var(--text-muted); margin-left: var(--sp-2); }
.select { padding: var(--sp-2) var(--sp-3); border: 1px solid var(--border); border-radius: var(--r-md); background: var(--bg-input); color: var(--text); }
.input-sm { width: 100px; }
.dropzone-wrap { margin-bottom: var(--sp-5); }
</style>
