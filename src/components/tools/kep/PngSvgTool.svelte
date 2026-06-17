<script lang="ts">
  // ─── PNG → SVG vektorizáló (imagetracerjs) – kétnyelvű, 100% kliensoldali ───
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import ImageTracer from "imagetracerjs";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";
  const DICT = {
    hu: {
      hint: "Töltsd fel a PNG-t – valódi vektorizálás (kontúrkövetés), állítható színszámmal. Logókhoz, ikonokhoz ideális.",
      drop: "Húzd ide a PNG / JPG képet",
      colors: "Színek száma", colorsHint: "Több szín = részletesebb, de nagyobb SVG.",
      preview: "Vektoros előnézet (SVG)",
      convert: "Vektorizálás", download: "SVG letöltése",
    },
    ro: {
      hint: "Încarcă PNG-ul – vectorizare reală (urmărire de contururi), cu număr de culori reglabil. Ideal pentru logo-uri și pictograme.",
      drop: "Trage imaginea PNG / JPG aici",
      colors: "Număr de culori", colorsHint: "Mai multe culori = mai detaliat, dar SVG mai mare.",
      preview: "Previzualizare vectorială (SVG)",
      convert: "Vectorizare", download: "Descarcă SVG",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;
  const timing = getTimingConfig("png-svg");
  const COLOR_OPTIONS = [2, 4, 8, 16, 32, 64];

  let file: File | null = null;
  let colors = 16;
  let isConverting = false;
  let resultBlob: Blob | null = null;
  let resultSvg = "";
  let errorMsg = "";

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null; resultSvg = ""; errorMsg = "";
  }

  async function convert() {
    if (!file) return;
    errorMsg = "";
    isConverting = true;
    await new Promise((r) => setTimeout(r, 30)); // hagyjuk megjelenni a folyamatjelzőt
    try {
      const img = await createImageBitmap(file);
      // teljesítmény: nagy képek lekicsinyítése a vektorizálás előtt
      const maxDim = 1000;
      let w = img.width, h = img.height;
      const scale = Math.max(w, h) > maxDim ? maxDim / Math.max(w, h) : 1;
      w = Math.round(w * scale); h = Math.round(h * scale);
      const canvas = new OffscreenCanvas(w, h);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      img.close();
      const imgdata = ctx.getImageData(0, 0, w, h);
      const options = { numberofcolors: colors, ltres: 1, qtres: 1, pathomit: 8, blurradius: 0, scale: 1 / scale };
      resultSvg = (ImageTracer as any).imagedataToSVG(imgdata, options);
      resultBlob = new Blob([resultSvg], { type: "image/svg+xml" });
    } catch (e) {
      console.error(e);
      errorMsg = ui.conversionError;
    } finally {
      isConverting = false;
    }
  }

  function download() {
    if (resultBlob) downloadBlob(resultBlob, "vectorized.svg");
  }

  $: previewSrc = resultSvg ? `data:image/svg+xml;utf8,${encodeURIComponent(resultSvg)}` : "";
  $: svgSizeKb = resultBlob ? (resultBlob.size / 1024).toFixed(1) : "0";
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">{L.hint}</p>
  <label class="colors-row">
    <span>{L.colors}: <strong>{colors}</strong></span>
    <input type="range" min="0" max={COLOR_OPTIONS.length - 1} step="1"
      value={COLOR_OPTIONS.indexOf(colors)}
      on:input={(e) => (colors = COLOR_OPTIONS[+(e.currentTarget as HTMLInputElement).value])} />
  </label>
  <p class="settings-hint settings-hint--sm">{L.colorsHint}</p>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" multiple={false} maxSizeMB={15}
    label={L.drop} sublabel="PNG, JPG, WebP — Max. 15 MB" on:files={handleFiles} />
</div>

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if resultSvg}
  <div class="result card">
    <div class="result-head">
      <span class="result-title">{L.preview}</span>
      <span class="result-size">SVG · {svgSizeKb} KB</span>
    </div>
    <div class="preview-box">
      <img src={previewSrc} alt={L.preview} />
    </div>
  </div>
{/if}

{#if file}
  <ConvertButton {timing}
    canConvert={!!file}
    {isConverting}
    isDone={!!resultBlob}
    onConvert={convert} onDownload={download}
    convertLabel={L.convert}
    downloadLabel={L.download}
    fileCount={1} />
{/if}

<style>
  .tool-settings { margin-bottom: var(--sp-5); }
  .tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-3); }
  .settings-hint { font-size: 0.85rem; color: var(--text-muted); margin: 0; }
  .settings-hint--sm { font-size: 0.78rem; margin-top: var(--sp-2); }
  .colors-row { display: flex; flex-direction: column; gap: var(--sp-2); margin-top: var(--sp-4); font-size: 0.875rem; color: var(--text); }
  .colors-row input[type="range"] { accent-color: var(--cat-kep); }
  .dropzone-wrap { margin-bottom: var(--sp-5); }
  .tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }

  .result { margin: var(--sp-4) 0; padding: var(--sp-5); }
  .result-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--sp-3); }
  .result-title { font-size: 0.875rem; font-weight: 600; color: var(--text); }
  .result-size { font-size: 0.8125rem; color: var(--text-muted); font-family: var(--font-mono); }
  .preview-box {
    border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4);
    background-color: #fff;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
    background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0;
    display: flex; justify-content: center;
  }
  .preview-box img { max-width: 100%; max-height: 360px; }
</style>
