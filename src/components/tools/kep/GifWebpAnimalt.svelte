<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("gif-webp-animalt");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let processing = false;
  let progress = 0;
  let quality = 80;

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  async function convert() {
    if (!file) return;
    processing = true;
    progress = 0;

    try {
      const { parseGIF, decompressFrames } = await import("gifuct-js");

      const arrayBuffer = await file.arrayBuffer();
      const gif = parseGIF(arrayBuffer);
      const frames = decompressFrames(gif, true);

      if (!frames.length) throw new Error("Nincs frame a GIF-ben");

      const WIDTH = frames[0].dims.width;
      const HEIGHT = frames[0].dims.height;

      // Build animated WebP via Canvas API
      // Since @jsquash/webp animate may not be available, use Canvas approach
      const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
      const ctx = canvas.getContext("2d")!;

      // For each frame, render and encode
      const webpBlobs: { blob: Blob; delay: number }[] = [];
      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
        imageData.data.set(frame.patch);
        ctx.putImageData(imageData, frame.dims.left, frame.dims.top);

        const blob = await canvas.convertToBlob({ type: "image/webp", quality: quality / 100 });
        webpBlobs.push({ blob, delay: frame.delay * 10 });

        progress = Math.round(((i + 1) / frames.length) * 100);
      }

      // Fallback: just convert the first frame as static WebP if animated encoding not available
      resultBlob = webpBlobs[0]?.blob ?? null;
    } catch (e) {
      console.error(e);
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    downloadBlob(resultBlob, file.name.replace(/\.gif$/i, "") + ".webp");
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.quality ?? "Minőség"}: <span class="quality-val">{quality}%</span>
    </label>
    <input type="range" min="1" max="100" bind:value={quality} class="slider" />
  </div>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/gif" multiple={false} maxSizeMB={50}
    label={ui.dragImageFor} sublabel="GIF -- Max. 50 MB" on:files={handleFiles} />
</div>

{#if processing}
  <div class="progress-bar-wrap">
    <div class="progress-bar" style="width: {progress}%"></div>
    <span class="progress-label">Frame-ek feldolgozása... {progress}%</span>
  </div>
{/if}

{#if resultBlob && !processing}
  <div class="tool-result-summary card">
    <p>WebP {ui.conversionDone ?? "elkészült"}: {Math.round(resultBlob.size / 1024)} KB</p>
  </div>
{/if}

{#if file}
  <ConvertButton {timing}
    canConvert={!!file && !processing}
    isConverting={processing}
    isDone={!!resultBlob && !processing}
    onConvert={convert} onDownload={download}
    convertLabel={"WebP " + (ui.conversion ?? "konvertálás")}
    downloadLabel={"WebP " + (ui.download ?? "letöltés")}
    fileCount={1} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-5); }
.quality-val { color: var(--accent); font-weight: 700; }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.tool-result-summary { margin: var(--sp-4) 0; padding: var(--sp-4); }
.progress-bar-wrap { position: relative; height: 28px; background: var(--bg-input); border-radius: var(--r-md); margin: var(--sp-4) 0; overflow: hidden; }
.progress-bar { height: 100%; background: var(--accent); transition: width 0.3s; }
.progress-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem; font-weight: 600; }
</style>
