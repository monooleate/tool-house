<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";

  let file: File | null = null;
  let preview = "";
  let resultUrl = "";
  let resultBlob: Blob | null = null;
  let processing = false;
  let error = "";

  let pixelSize = 10;
  let origWidth = 0;
  let origHeight = 0;
  let outputFormat: "image/webp" | "image/jpeg" | "image/png" = "image/webp";
  let quality = 82;

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
    };
    img.src = preview;
  }

  async function process() {
    if (!file || origWidth === 0 || origHeight === 0) return;
    processing = true;
    error = "";

    try {
      const img = new Image();
      img.src = preview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Kep betoltesi hiba"));
      });

      // Step 1: Draw image at tiny size
      const smallW = Math.max(1, Math.ceil(origWidth / pixelSize));
      const smallH = Math.max(1, Math.ceil(origHeight / pixelSize));

      const smallCanvas = document.createElement("canvas");
      smallCanvas.width = smallW;
      smallCanvas.height = smallH;
      const smallCtx = smallCanvas.getContext("2d")!;
      smallCtx.drawImage(img, 0, 0, smallW, smallH);

      // Step 2: Draw back to original size with no smoothing (pixelated)
      const bigCanvas = document.createElement("canvas");
      bigCanvas.width = origWidth;
      bigCanvas.height = origHeight;
      const bigCtx = bigCanvas.getContext("2d")!;
      bigCtx.imageSmoothingEnabled = false;
      bigCtx.drawImage(smallCanvas, 0, 0, origWidth, origHeight);

      // Export
      const mimeType = outputFormat;
      const q = mimeType === "image/png" ? undefined : quality / 100;
      const blob = await new Promise<Blob>((resolve, reject) => {
        bigCanvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Blob letrehozasi hiba"))),
          mimeType,
          q,
        );
      });

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      resultUrl = URL.createObjectURL(blob);
      resultBlob = blob;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      processing = false;
    }
  }

  function download() {
    if (resultBlob && file) {
      const ext = outputFormat === "image/webp" ? "webp" : outputFormat === "image/jpeg" ? "jpg" : "png";
      const name = file.name.replace(/\.[^.]+$/, "") + `-pixel${pixelSize}.${ext}`;
      downloadBlob(resultBlob, name);
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    file = null; preview = ""; resultUrl = ""; resultBlob = null;
    error = ""; origWidth = 0; origHeight = 0; pixelSize = 10;
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">Beallitasok</h2>

  <div class="settings-row">
    <label class="label" for="pixel-slider">Pixel meret: {pixelSize}px</label>
    <input id="pixel-slider" type="range" min="2" max="50" step="1" bind:value={pixelSize} class="slider" />
  </div>

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
    label="Huzd ide a kepet a pixelateshez"
    sublabel="JPG, PNG, WebP -- Max. 50 MB"
    on:files={handleFiles}
  />
{:else}
  <div class="preview-section">
    {#if origWidth && origHeight}
      <p class="info-text">Eredeti: {origWidth} x {origHeight} px | Pixel meret: {pixelSize}px</p>
    {/if}

    <div class="preview-grid">
      <div class="preview-pane">
        <div class="preview-pane__label">Eredeti{file ? ` -- ${formatFileSize(file.size)}` : ""}</div>
        <img src={preview} alt="Eredeti kep" class="preview-img" />
      </div>
      {#if resultUrl}
        <div class="preview-pane">
          <div class="preview-pane__label">Pixelalt{resultBlob ? ` -- ${formatFileSize(resultBlob.size)}` : ""}</div>
          <img src={resultUrl} alt="Pixelalt kep" class="preview-img" />
        </div>
      {/if}
    </div>

    {#if error}
      <div class="alert alert--error" role="alert">{error}</div>
    {/if}

    <div class="actions">
      {#if !resultUrl}
        <button class="btn btn--primary" on:click={process} disabled={processing}>
          {processing ? "Feldolgozas..." : "Pixelates"}
        </button>
      {:else}
        <button class="btn btn--primary" on:click={download}>Letoltes</button>
        <button class="btn btn--outline" on:click={() => { resultUrl = ""; resultBlob = null; }}>Ujra</button>
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
