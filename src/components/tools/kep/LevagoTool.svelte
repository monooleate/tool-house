<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let preview = "";
  let resultUrl = "";
  let resultBlob: Blob | null = null;
  let processing = false;
  let error = "";
  let worker: Worker | null = null;

  // Image dimensions
  let origWidth = 0;
  let origHeight = 0;

  // Crop settings
  let cropX = 0;
  let cropY = 0;
  let cropWidth = 0;
  let cropHeight = 0;
  let outputFormat: "image/webp" | "image/jpeg" | "image/png" = "image/webp";
  let quality = 82;

  function getWorker(): Worker {
    if (!worker) {
      worker = new Worker(
        new URL("../../../workers/image.worker.ts", import.meta.url),
        { type: "module" },
      );
      worker.addEventListener("message", (e) => {
        if (e.data.type === "result") {
          const blob = new Blob([e.data.buffer], { type: outputFormat });
          if (resultUrl) URL.revokeObjectURL(resultUrl);
          resultUrl = URL.createObjectURL(blob);
          resultBlob = blob;
          processing = false;
        } else if (e.data.type === "error") {
          error = e.data.error;
          processing = false;
        }
      });
    }
    return worker;
  }

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0];
    if (!file) return;
    error = "";
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) { URL.revokeObjectURL(resultUrl); resultUrl = ""; }
    resultBlob = null;
    preview = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      origWidth = img.naturalWidth;
      origHeight = img.naturalHeight;
      cropX = 0;
      cropY = 0;
      cropWidth = origWidth;
      cropHeight = origHeight;
    };
    img.src = preview;
  }

  function clampValues() {
    if (cropX < 0) cropX = 0;
    if (cropY < 0) cropY = 0;
    if (cropX > origWidth) cropX = origWidth;
    if (cropY > origHeight) cropY = origHeight;
    if (cropX + cropWidth > origWidth) cropWidth = origWidth - cropX;
    if (cropY + cropHeight > origHeight) cropHeight = origHeight - cropY;
    if (cropWidth < 1) cropWidth = 1;
    if (cropHeight < 1) cropHeight = 1;
  }

  async function process() {
    if (!file) return;
    clampValues();
    processing = true;
    error = "";
    const buffer = await file.arrayBuffer();
    getWorker().postMessage(
      {
        type: "crop",
        id: crypto.randomUUID(),
        buffer,
        filename: file.name,
        x: cropX,
        y: cropY,
        cropWidth,
        cropHeight,
        outputFormat,
        quality: quality / 100,
      },
      [buffer],
    );
  }

  function download() {
    if (resultBlob && file) {
      const ext = outputFormat === "image/webp" ? "webp" : outputFormat === "image/jpeg" ? "jpg" : "png";
      const name = file.name.replace(/\.[^.]+$/, "") + `-crop.${ext}`;
      downloadBlob(resultBlob, name);
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    file = null; preview = ""; resultUrl = ""; resultBlob = null;
    error = ""; origWidth = 0; origHeight = 0;
    cropX = 0; cropY = 0; cropWidth = 0; cropHeight = 0;
  }

  $: cropOverlayStyle = origWidth > 0
    ? `left:${(cropX / origWidth) * 100}%;top:${(cropY / origHeight) * 100}%;width:${(cropWidth / origWidth) * 100}%;height:${(cropHeight / origHeight) * 100}%`
    : "";
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="crop-x">X (px)</label>
      <input id="crop-x" type="number" min="0" max={origWidth} bind:value={cropX} class="input" />
    </div>
    <div>
      <label class="label" for="crop-y">Y (px)</label>
      <input id="crop-y" type="number" min="0" max={origHeight} bind:value={cropY} class="input" />
    </div>
  </div>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="crop-w">{ui.width} (px)</label>
      <input id="crop-w" type="number" min="1" max={origWidth} bind:value={cropWidth} class="input" />
    </div>
    <div>
      <label class="label" for="crop-h">{ui.height} (px)</label>
      <input id="crop-h" type="number" min="1" max={origHeight} bind:value={cropHeight} class="input" />
    </div>
  </div>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="format-select">{ui.outputFormat}</label>
      <select id="format-select" bind:value={outputFormat} class="input">
        <option value="image/webp">WebP</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
      </select>
    </div>
    <div>
      <label class="label" for="quality-slider">{ui.quality}: {quality}%</label>
      <input id="quality-slider" type="range" min="10" max="100" step="1" bind:value={quality} class="slider" />
    </div>
  </div>
</div>

{#if !file}
  <Dropzone
    accept="image/*"
    multiple={false}
    maxSizeMB={50}
    label={ui.dragImageFor}
    sublabel="JPG, PNG, WebP -- Max. 50 MB"
    on:files={handleFiles}
  />
{:else}
  <div class="preview-section">
    {#if origWidth && origHeight}
      <p class="info-text">{ui.original}: {origWidth} x {origHeight} px | {ui.crop}: {cropWidth} x {cropHeight} px (x:{cropX}, y:{cropY})</p>
    {/if}

    <div class="preview-grid">
      <div class="preview-pane">
        <div class="preview-pane__label">{ui.original}{file ? ` -- ${formatFileSize(file.size)}` : ""}</div>
        <div class="crop-preview-wrap">
          <img src={preview} alt={ui.original} class="preview-img" />
          {#if origWidth > 0}
            <div class="crop-overlay" style={cropOverlayStyle}></div>
          {/if}
        </div>
      </div>
      {#if resultUrl}
        <div class="preview-pane">
          <div class="preview-pane__label">{ui.cropped}{resultBlob ? ` -- ${formatFileSize(resultBlob.size)}` : ""}</div>
          <img src={resultUrl} alt={ui.croppedImage} class="preview-img" />
        </div>
      {/if}
    </div>

    {#if error}
      <div class="alert alert--error" role="alert">{error}</div>
    {/if}

    <div class="actions">
      {#if !resultUrl}
        <button class="btn btn--primary" on:click={process} disabled={processing || cropWidth <= 0 || cropHeight <= 0}>
          {processing ? ui.processing : ui.crop}
        </button>
      {:else}
        <button class="btn btn--primary" on:click={download}>{ui.download}</button>
        <button class="btn btn--outline" on:click={() => { resultUrl = ""; resultBlob = null; }}>{ui.retry}</button>
      {/if}
      <button class="btn btn--ghost" on:click={reset}>{ui.newFile}</button>
    </div>
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-4); }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
.info-text { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: var(--sp-4); }
.preview-section { margin-top: var(--sp-5); }
.preview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); margin-bottom: var(--sp-4); }
@media (max-width: 600px) { .preview-grid { grid-template-columns: 1fr; } .two-col { grid-template-columns: 1fr; } }
.preview-pane { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.preview-pane__label { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); padding: var(--sp-2) var(--sp-3); border-bottom: 1px solid var(--border); background: var(--bg-card); }
.preview-img { width: 100%; height: 240px; object-fit: contain; display: block; background: repeating-conic-gradient(var(--border) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px; }
.crop-preview-wrap { position: relative; }
.crop-overlay { position: absolute; border: 2px dashed var(--accent); background: rgba(99, 102, 241, 0.15); pointer-events: none; }
.actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
</style>
