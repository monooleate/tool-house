<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob, downloadZip } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("jpg-avif");
  const INPUT_ACCEPT = "image/jpeg,.jpg,.jpeg";
  const TOOL_SLUG = "jpg-avif";

  let files: File[] = [];
  let results: { name: string; blob: Blob }[] = [];
  let processing = false;
  let progress = 0;
  let quality = 60;
  let lossless = false;

  function handleFiles(event: CustomEvent<File[]>) {
    files = event.detail;
    results = [];
  }

  async function convert() {
    if (!files.length) return;
    processing = true;
    progress = 0;

    try {
      const { encode } = await import("@jsquash/avif");
      results = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageBitmap = await createImageBitmap(file);
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(imageBitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
        imageBitmap.close();

        const avifBuffer = await encode(imageData, {
          quality: lossless ? 0 : quality,
          qualityAlpha: lossless ? 0 : quality,
        });

        const blob = new Blob([avifBuffer], { type: "image/avif" });
        const baseName = file.name.replace(/\.(jpg|jpeg)$/i, "");
        results.push({ name: `${baseName}.avif`, blob });
        progress = Math.round(((i + 1) / files.length) * 100);
      }
    } catch (e) {
      console.error(e);
    } finally {
      processing = false;
    }
  }

  async function download() {
    if (!results.length) return;
    if (results.length === 1) {
      downloadBlob(results[0].blob, results[0].name);
    } else {
      const entries = await Promise.all(
        results.map(async (r) => ({
          filename: r.name,
          data: new Uint8Array(await r.blob.arrayBuffer()),
        }))
      );
      await downloadZip(entries, "jpg-to-avif.zip");
    }
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.quality ?? "Minőség"}: <span class="quality-val">{lossless ? (ui.lossless ?? "Veszteségmentes") : quality}</span>
    </label>
    {#if !lossless}
      <input type="range" min="1" max="63" bind:value={quality} class="slider" />
    {/if}
  </div>
  <div class="settings-row">
    <label>
      <input type="checkbox" bind:checked={lossless} />
      {ui.lossless ?? "Veszteségmentes"}
    </label>
  </div>
</div>

{#if !files.length}
  <div class="dropzone-wrap">
    <Dropzone accept={INPUT_ACCEPT} multiple={true} maxSizeMB={50}
      label={ui.dragImageFor} sublabel="JPG, JPEG -- Max. 50 MB" on:files={handleFiles} />
  </div>
{:else}
  <div class="add-more">
    <Dropzone accept={INPUT_ACCEPT} multiple={true} maxSizeMB={50}
      label={ui.addMoreImages} sublabel="" on:files={handleFiles} />
  </div>
{/if}

{#if processing}
  <div class="progress-bar-wrap">
    <div class="progress-bar" style="width: {progress}%"></div>
    <span class="progress-label">{ui.converting ?? "Konvertálás..."} {progress}%</span>
  </div>
{/if}

{#if results.length > 0 && !processing}
  <div class="tool-result-summary card">
    <p>{results.length} AVIF {ui.file ?? "fájl"} {ui.conversionDone ?? "elkészült"}.</p>
  </div>
{/if}

{#if files.length > 0}
  <ConvertButton {timing}
    canConvert={files.length > 0 && !processing}
    isConverting={processing}
    isDone={results.length > 0 && !processing}
    onConvert={convert} onDownload={download}
    convertLabel={"AVIF " + (ui.conversion ?? "konvertálás")}
    downloadLabel={results.length > 1 ? (ui.zipDownload ?? "ZIP letöltés") : "AVIF " + (ui.download ?? "letöltés")}
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
.dropzone-wrap { margin-bottom: var(--sp-5); }
.add-more { margin-bottom: var(--sp-5); opacity: 0.7; }
.tool-result-summary { margin: var(--sp-4) 0; padding: var(--sp-4); }
.progress-bar-wrap { position: relative; height: 28px; background: var(--bg-input); border-radius: var(--r-md); margin: var(--sp-4) 0; overflow: hidden; }
.progress-bar { height: 100%; background: var(--accent); transition: width 0.3s; }
.progress-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem; font-weight: 600; }
</style>
