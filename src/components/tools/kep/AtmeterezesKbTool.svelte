<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("atmeterezas-kb");

  let file: File | null = null;
  let targetKb = 200;
  let resultBlob: Blob | null = null;
  let actualKb = 0;
  let processing = false;
  let errorMsg = "";

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
    errorMsg = "";
  }

  async function convert() {
    if (!file) return;
    processing = true;
    errorMsg = "";

    try {
      const img = await createImageBitmap(file);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      img.close();

      const targetBytes = targetKb * 1024;
      let low = 0.01, high = 1.0, bestBlob: Blob | null = null;

      for (let iter = 0; iter < 12; iter++) {
        const mid = (low + high) / 2;
        const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: mid });

        if (blob.size <= targetBytes) {
          bestBlob = blob;
          low = mid;
        } else {
          high = mid;
        }

        if (high - low < 0.005) break;
      }

      if (!bestBlob) {
        bestBlob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.01 });
      }

      resultBlob = bestBlob;
      actualKb = Math.round(resultBlob.size / 1024);
    } catch (e) {
      console.error(e);
      errorMsg = ui.conversionError;
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    downloadBlob(resultBlob, file.name.replace(/\.[^.]+$/, "") + `-${actualKb}kb.jpg`);
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.targetSizeKb}: <span class="quality-val">{targetKb} KB</span>
    </label>
    <input type="range" min="10" max="5000" step="10" bind:value={targetKb} class="slider" />
    <input type="number" min="10" max="10000" bind:value={targetKb} class="input input-sm" />
  </div>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={false} maxSizeMB={50}
    label={ui.dragImageFor} sublabel="JPG, PNG, WebP -- Max. 50 MB" on:files={handleFiles} />
</div>

{#if file}
  <p class="tool-meta">{ui.originalSize}: {formatFileSize(file.size)}</p>
{/if}

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if resultBlob && !processing}
  <div class="tool-result-summary card">
    <p>
      {ui.conversionDone}: <strong>{actualKb} KB</strong>
      ({ui.targetSizeKb}: {targetKb} KB, {ui.differenceLabel}: {Math.abs(actualKb - targetKb)} KB)
    </p>
  </div>
{/if}

{#if file}
  <ConvertButton {timing}
    canConvert={!!file && !processing}
    isConverting={processing}
    isDone={!!resultBlob && !processing}
    onConvert={convert} onDownload={download}
    convertLabel={ui.conversion}
    downloadLabel={"JPG " + ui.download + ` (${actualKb} KB)`}
    fileCount={1} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-5); }
.quality-val { color: var(--accent); font-weight: 700; }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
.input-sm { width: 100px; margin-top: var(--sp-2); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.tool-meta { font-size: 0.85rem; color: var(--text-muted); margin: var(--sp-3) 0; }
.tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }
.tool-result-summary { margin: var(--sp-4) 0; padding: var(--sp-4); }
</style>
