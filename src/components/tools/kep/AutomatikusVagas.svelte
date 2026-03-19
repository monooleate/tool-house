<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("automatikus-vagas");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let tolerance = 10;
  let bgColor = "#ffffff";

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function isBackground(r: number, g: number, b: number, a: number, bgR: number, bgG: number, bgB: number): boolean {
    if (a < 10) return true;
    return (
      Math.abs(r - bgR) <= tolerance &&
      Math.abs(g - bgG) <= tolerance &&
      Math.abs(b - bgB) <= tolerance
    );
  }

  async function convert() {
    if (!file) return;

    try {
      const img = await createImageBitmap(file);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      img.close();

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = data.data;
      const W = canvas.width, H = canvas.height;
      const [bgR, bgG, bgB] = hexToRgb(bgColor);

      let top = H, bottom = 0, left = W, right = 0;

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          if (!isBackground(pixels[i], pixels[i+1], pixels[i+2], pixels[i+3], bgR, bgG, bgB)) {
            if (y < top) top = y;
            if (y > bottom) bottom = y;
            if (x < left) left = x;
            if (x > right) right = x;
          }
        }
      }

      top = Math.max(0, top - 2);
      bottom = Math.min(H - 1, bottom + 2);
      left = Math.max(0, left - 2);
      right = Math.min(W - 1, right + 2);

      const cropW = right - left + 1;
      const cropH = bottom - top + 1;

      if (cropW <= 0 || cropH <= 0) throw new Error("Nem találtam levágható tartalmat.");

      const outCanvas = new OffscreenCanvas(cropW, cropH);
      const outCtx = outCanvas.getContext("2d")!;
      outCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);

      resultBlob = await outCanvas.convertToBlob({ type: "image/png" });
    } catch (e) {
      console.error(e);
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    downloadBlob(resultBlob, file.name.replace(/\.[^.]+$/, "") + "-cropped.png");
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <div class="settings-row">
    <label class="label">
      {ui.bgColor ?? "Háttérszín"}: <input type="color" bind:value={bgColor} />
    </label>
  </div>
  <div class="settings-row">
    <label class="label">
      {ui.tolerance ?? "Tolerancia"}: <span class="quality-val">{tolerance}</span>
    </label>
    <input type="range" min="0" max="80" bind:value={tolerance} class="slider" />
  </div>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={false} maxSizeMB={50}
    label={ui.dragImageFor} sublabel="JPG, PNG, WebP -- Max. 50 MB" on:files={handleFiles} />
</div>

{#if file}
  <ConvertButton {timing}
    canConvert={!!file}
    isConverting={false}
    isDone={!!resultBlob}
    onConvert={convert} onDownload={download}
    convertLabel={ui.conversion ?? "Vágás"}
    downloadLabel={"PNG " + (ui.download ?? "letöltés")}
    fileCount={1} />
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
</style>
