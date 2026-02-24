<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";

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

  // Settings
  let width = 0;
  let height = 0;
  let lockAspect = true;
  let usePercent = false;
  let percent = 100;
  let outputFormat: "image/webp" | "image/jpeg" | "image/png" = "image/webp";
  let quality = 82;

  $: aspectRatio = origWidth && origHeight ? origWidth / origHeight : 1;

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
      width = origWidth;
      height = origHeight;
      percent = 100;
    };
    img.src = preview;
  }

  function onWidthChange() {
    if (lockAspect && origWidth) {
      height = Math.round(width / aspectRatio);
    }
  }

  function onHeightChange() {
    if (lockAspect && origHeight) {
      width = Math.round(height * aspectRatio);
    }
  }

  function onPercentChange() {
    width = Math.round(origWidth * percent / 100);
    height = Math.round(origHeight * percent / 100);
  }

  async function process() {
    if (!file || width <= 0 || height <= 0) return;
    processing = true;
    error = "";
    const buffer = await file.arrayBuffer();
    getWorker().postMessage(
      {
        type: "resize",
        id: crypto.randomUUID(),
        buffer,
        filename: file.name,
        width,
        height,
        outputFormat,
        quality: quality / 100,
      },
      [buffer],
    );
  }

  function download() {
    if (resultBlob && file) {
      const ext = outputFormat === "image/webp" ? "webp" : outputFormat === "image/jpeg" ? "jpg" : "png";
      const name = file.name.replace(/\.[^.]+$/, "") + `-${width}x${height}.${ext}`;
      downloadBlob(resultBlob, name);
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    file = null; preview = ""; resultUrl = ""; resultBlob = null;
    error = ""; origWidth = 0; origHeight = 0; width = 0; height = 0; percent = 100;
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">Beallitasok</h2>

  <div class="settings-row">
    <label class="label">
      <input type="checkbox" bind:checked={usePercent} /> Szazalekos mod
    </label>
  </div>

  {#if usePercent}
    <div class="settings-row">
      <label class="label" for="percent-input">Szazalek: {percent}%</label>
      <input id="percent-input" type="range" min="1" max="400" step="1" bind:value={percent} on:input={onPercentChange} class="slider" />
    </div>
  {:else}
    <div class="settings-row">
      <label class="label">
        <input type="checkbox" bind:checked={lockAspect} /> Keeparany zarolas
      </label>
    </div>
    <div class="settings-row two-col">
      <div>
        <label class="label" for="width-input">Szelesseg (px)</label>
        <input id="width-input" type="number" min="1" max="16000" bind:value={width} on:input={onWidthChange} class="input" />
      </div>
      <div>
        <label class="label" for="height-input">Magassag (px)</label>
        <input id="height-input" type="number" min="1" max="16000" bind:value={height} on:input={onHeightChange} class="input" />
      </div>
    </div>
  {/if}

  <div class="settings-row two-col">
    <div>
      <label class="label" for="format-select">Kimeneti formatum</label>
      <select id="format-select" bind:value={outputFormat} class="input">
        <option value="image/webp">WebP</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
      </select>
    </div>
    <div>
      <label class="label" for="quality-slider">Minoseg: {quality}%</label>
      <input id="quality-slider" type="range" min="10" max="100" step="1" bind:value={quality} class="slider" />
    </div>
  </div>
</div>

{#if !file}
  <Dropzone
    accept="image/*"
    multiple={false}
    maxSizeMB={50}
    label="Huzd ide a kepet az atmeretezeshez"
    sublabel="JPG, PNG, WebP -- Max. 50 MB"
    on:files={handleFiles}
  />
{:else}
  <div class="preview-section">
    {#if origWidth && origHeight}
      <p class="info-text">Eredeti meret: {origWidth} x {origHeight} px | Uj meret: {width} x {height} px</p>
    {/if}

    <div class="preview-grid">
      <div class="preview-pane">
        <div class="preview-pane__label">Eredeti{file ? ` -- ${formatFileSize(file.size)}` : ""}</div>
        <img src={preview} alt="Eredeti kep" class="preview-img" />
      </div>
      {#if resultUrl}
        <div class="preview-pane">
          <div class="preview-pane__label">Atmeretezett{resultBlob ? ` -- ${formatFileSize(resultBlob.size)}` : ""}</div>
          <img src={resultUrl} alt="Atmeretezett kep" class="preview-img" />
        </div>
      {/if}
    </div>

    {#if error}
      <div class="alert alert--error" role="alert">{error}</div>
    {/if}

    <div class="actions">
      {#if !resultUrl}
        <button class="btn btn--primary" on:click={process} disabled={processing || width <= 0 || height <= 0}>
          {processing ? "Feldolgozas..." : "Atmeretezas"}
        </button>
      {:else}
        <button class="btn btn--primary" on:click={download}>Letoltes</button>
      {/if}
      <button class="btn btn--ghost" on:click={reset}>Uj kep</button>
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
.actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
</style>
