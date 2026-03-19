<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("gif-keszito");

  let files: File[] = [];
  let resultBlob: Blob | null = null;
  let processing = false;
  let progress = 0;
  let delay = 100;
  let loop = true;

  function handleFiles(event: CustomEvent<File[]>) {
    files = [...files, ...event.detail];
    resultBlob = null;
  }

  async function convert() {
    if (!files.length) return;
    processing = true;
    progress = 0;

    try {
      const { GIFEncoder, quantize, applyPalette } = await import("gifenc");

      const firstImg = await createImageBitmap(files[0]);
      const WIDTH = firstImg.width;
      const HEIGHT = firstImg.height;
      firstImg.close();

      const gif = GIFEncoder();

      for (let i = 0; i < files.length; i++) {
        const img = await createImageBitmap(files[i]);
        const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
        img.close();

        const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        const palette = quantize(imageData.data, 256);
        const index = applyPalette(imageData.data, palette);

        gif.writeFrame(index, WIDTH, HEIGHT, {
          palette,
          delay,
          repeat: loop ? 0 : -1,
        });

        progress = Math.round(((i + 1) / files.length) * 100);
      }

      gif.finish();
      const buffer = gif.bytes();
      resultBlob = new Blob([buffer], { type: "image/gif" });
    } catch (e) {
      console.error(e);
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob) return;
    downloadBlob(resultBlob, "animalt.gif");
  }

  function reset() {
    files = [];
    resultBlob = null;
    progress = 0;
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.frameDelay ?? "Frame delay"}: <span class="quality-val">{delay} ms</span>
    </label>
    <input type="range" min="20" max="2000" step="10" bind:value={delay} class="slider" />
  </div>
  <div class="settings-row">
    <label>
      <input type="checkbox" bind:checked={loop} />
      {ui.infiniteLoop ?? "Végtelen hurok"}
    </label>
  </div>
</div>

{#if !files.length}
  <div class="dropzone-wrap">
    <Dropzone accept="image/jpeg,image/png,image/webp" multiple={true} maxSizeMB={50}
      label={ui.dragImageFor} sublabel="JPG, PNG, WebP -- Max. 50 MB" on:files={handleFiles} />
  </div>
{:else}
  <div class="add-more">
    <Dropzone accept="image/jpeg,image/png,image/webp" multiple={true} maxSizeMB={50}
      label={ui.addMoreImages} sublabel="" on:files={handleFiles} />
  </div>
{/if}

{#if files.length > 0}
  <p class="tool-meta">{files.length} {ui.file ?? "kép"} {ui.selected ?? "kiválasztva"}</p>
{/if}

{#if processing}
  <div class="progress-bar-wrap">
    <div class="progress-bar" style="width: {progress}%"></div>
    <span class="progress-label">GIF generálás... {progress}%</span>
  </div>
{/if}

{#if resultBlob && !processing}
  <div class="tool-result-summary card">
    <p>GIF {ui.conversionDone ?? "elkészült"}: {Math.round(resultBlob.size / 1024)} KB, {files.length} frame</p>
  </div>
{/if}

{#if files.length > 0}
  <ConvertButton {timing}
    canConvert={files.length >= 2 && !processing}
    isConverting={processing}
    isDone={!!resultBlob && !processing}
    onConvert={convert} onDownload={download}
    convertLabel={"GIF " + (ui.conversion ?? "generálás")}
    downloadLabel={"GIF " + (ui.download ?? "letöltés")}
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
.tool-meta { font-size: 0.85rem; color: var(--text-muted); margin: var(--sp-3) 0; }
.tool-result-summary { margin: var(--sp-4) 0; padding: var(--sp-4); }
.progress-bar-wrap { position: relative; height: 28px; background: var(--bg-input); border-radius: var(--r-md); margin: var(--sp-4) 0; overflow: hidden; }
.progress-bar { height: 100%; background: var(--accent); transition: width 0.3s; }
.progress-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem; font-weight: 600; }
</style>
