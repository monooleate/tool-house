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

  let text = ui.watermark;
  let position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" = "center";
  let fontSize = 48;
  let opacity = 0.5;
  let color = "#ffffff";
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
  }

  async function process() {
    if (!file || !text.trim()) return;
    processing = true;
    error = "";
    const buffer = await file.arrayBuffer();
    getWorker().postMessage(
      {
        type: "watermark",
        id: crypto.randomUUID(),
        buffer,
        filename: file.name,
        text: text.trim(),
        position,
        fontSize,
        opacity,
        color,
        outputFormat,
        quality: quality / 100,
      },
      [buffer],
    );
  }

  function download() {
    if (resultBlob && file) {
      const ext = outputFormat === "image/webp" ? "webp" : outputFormat === "image/jpeg" ? "jpg" : "png";
      const name = file.name.replace(/\.[^.]+$/, "") + `-vizjel.${ext}`;
      downloadBlob(resultBlob, name);
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    file = null; preview = ""; resultUrl = ""; resultBlob = null; error = "";
    text = ui.watermark; position = "center"; fontSize = 48; opacity = 0.5; color = "#ffffff";
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>

  <div class="settings-row">
    <label class="label" for="wm-text">{ui.watermarkText}</label>
    <input id="wm-text" type="text" bind:value={text} class="input" placeholder={ui.watermarkPlaceholder} />
  </div>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="wm-position">{ui.position}</label>
      <select id="wm-position" bind:value={position} class="input">
        <option value="center">{ui.center}</option>
        <option value="top-left">{ui.topLeft}</option>
        <option value="top-right">{ui.topRight}</option>
        <option value="bottom-left">{ui.bottomLeft}</option>
        <option value="bottom-right">{ui.bottomRight}</option>
      </select>
    </div>
    <div>
      <label class="label" for="wm-fontsize">{ui.fontSizePx.replace("{n}", String(fontSize))}</label>
      <input id="wm-fontsize" type="range" min="12" max="200" step="1" bind:value={fontSize} class="slider" />
    </div>
  </div>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="wm-opacity">{ui.opacityPct.replace("{n}", String(Math.round(opacity * 100)))}</label>
      <input id="wm-opacity" type="range" min="0.05" max="1" step="0.05" bind:value={opacity} class="slider" />
    </div>
    <div>
      <label class="label" for="wm-color">{ui.color}</label>
      <input id="wm-color" type="color" bind:value={color} class="color-input" />
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
    <div class="preview-grid">
      <div class="preview-pane">
        <div class="preview-pane__label">{ui.original}{file ? ` -- ${formatFileSize(file.size)}` : ""}</div>
        <img src={preview} alt={ui.original} class="preview-img" />
      </div>
      {#if resultUrl}
        <div class="preview-pane">
          <div class="preview-pane__label">{ui.watermarked}{resultBlob ? ` -- ${formatFileSize(resultBlob.size)}` : ""}</div>
          <img src={resultUrl} alt={ui.watermarkedImage} class="preview-img" />
        </div>
      {/if}
    </div>

    {#if error}
      <div class="alert alert--error" role="alert">{error}</div>
    {/if}

    <div class="actions">
      {#if !resultUrl}
        <button class="btn btn--primary" on:click={process} disabled={processing || !text.trim()}>
          {processing ? ui.processing : ui.addWatermark}
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
.color-input { width: 100%; height: 38px; border: 1px solid var(--border); border-radius: var(--r-md); cursor: pointer; padding: 2px; background: var(--bg-input); }
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
