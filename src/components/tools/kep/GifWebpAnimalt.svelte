<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { muxAnimatedWebp, type WebpAnimFrame } from "../../../lib/webp-anim.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { onDestroy } from "svelte";

  const timing = getTimingConfig("gif-webp-animalt");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let processing = false;
  let progress = 0;
  let quality = 80;
  let errorMsg = "";
  let frameCount = 0;

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
    errorMsg = "";
    frameCount = 0;
  }

  async function convert() {
    if (!file) return;
    processing = true;
    progress = 0;
    errorMsg = "";
    resultBlob = null;

    try {
      const { parseGIF, decompressFrames } = await import("gifuct-js");
      const arrayBuffer = await file.arrayBuffer();
      const gif = parseGIF(arrayBuffer);
      const frames = decompressFrames(gif, true);

      if (!frames.length) { errorMsg = ui.noFramesError; return; }

      // Teljes vászonméret a logikai képernyő-leíróból (a frame-ek kisebbek lehetnek)
      const WIDTH = gif.lsd.width;
      const HEIGHT = gif.lsd.height;

      const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

      const webpFrames: WebpAnimFrame[] = [];
      let restore: ImageData | null = null;

      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];

        // GIF disposal 3 (vissza az előző állapotra) → mentsük a frame ELŐTTI képet
        if (frame.disposalType === 3) {
          restore = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        }

        // A frame patch-ét temp canvasra tesszük, majd a fő vászonra BLENDELJÜK.
        // (A putImageData az átlátszó pixeleket is felülírná — a drawImage helyesen kever,
        //  így a részleges/delta frame-ek korrektül épülnek egymásra.)
        const patch = new ImageData(
          new Uint8ClampedArray(frame.patch),
          frame.dims.width,
          frame.dims.height,
        );
        const tmp = new OffscreenCanvas(frame.dims.width, frame.dims.height);
        tmp.getContext("2d")!.putImageData(patch, 0, 0);
        ctx.drawImage(tmp, frame.dims.left, frame.dims.top);

        // A teljes (kompozitált) vásznat kódoljuk egy WebP frame-ként
        const blob = await canvas.convertToBlob({ type: "image/webp", quality: quality / 100 });
        const duration = frame.delay && frame.delay > 0 ? frame.delay : 100; // gifuct: már ms-ben
        webpFrames.push({ webp: await blob.arrayBuffer(), duration });

        progress = Math.round(((i + 1) / frames.length) * 100);

        // Disposal a frame megjelenítése UTÁN
        if (frame.disposalType === 2) {
          ctx.clearRect(frame.dims.left, frame.dims.top, frame.dims.width, frame.dims.height);
        } else if (frame.disposalType === 3 && restore) {
          ctx.putImageData(restore, 0, 0);
        }
      }

      frameCount = webpFrames.length;
      // Animált WebP konténer (végtelen loop) az összes frame-ből
      resultBlob = muxAnimatedWebp(webpFrames, WIDTH, HEIGHT, 0);
    } catch (e) {
      console.error(e);
      errorMsg = ui.conversionError;
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    downloadBlob(resultBlob, file.name.replace(/\.gif$/i, "") + ".webp");
  }

  // Eredmény-előnézet (animált WebP) – ObjectURL revoke-kal
  let previewUrl = "";
  $: updatePreview(resultBlob);
  function updatePreview(b: Blob | null) {
    if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = ""; }
    if (b) previewUrl = URL.createObjectURL(b);
  }
  onDestroy(() => { if (previewUrl) URL.revokeObjectURL(previewUrl); });
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.quality}: <span class="quality-val">{quality}%</span>
    </label>
    <input type="range" min="1" max="100" bind:value={quality} class="slider" />
  </div>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/gif" multiple={false} maxSizeMB={50}
    label={ui.dragImageFor} sublabel="GIF -- Max. 50 MB" on:files={handleFiles} />
</div>

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if processing}
  <div class="progress-bar-wrap">
    <div class="progress-bar" style="width: {progress}%"></div>
    <span class="progress-label">{ui.processingFrames} {progress}%</span>
  </div>
{/if}

{#if resultBlob && !processing}
  <div class="tool-result-summary card">
    <p>WebP {ui.conversionDone}: {Math.round(resultBlob.size / 1024)} KB · {ui.frameCount}: {frameCount}</p>
    {#if previewUrl}
      <img src={previewUrl} alt="Animált WebP" class="result-preview" loading="lazy" />
    {/if}
  </div>
{/if}

{#if file}
  <ConvertButton {timing}
    canConvert={!!file && !processing}
    isConverting={processing}
    isDone={!!resultBlob && !processing}
    onConvert={convert} onDownload={download}
    convertLabel={"WebP " + ui.conversion}
    downloadLabel={"WebP " + ui.download}
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
.tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }
.result-preview { display: block; max-width: 100%; margin-top: var(--sp-3); border-radius: var(--r-md); background: repeating-conic-gradient(var(--border) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px; }
.progress-bar-wrap { position: relative; height: 28px; background: var(--bg-input); border-radius: var(--r-md); margin: var(--sp-4) 0; overflow: hidden; }
.progress-bar { height: 100%; background: var(--accent); transition: width 0.3s; }
.progress-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem; font-weight: 600; }
</style>
