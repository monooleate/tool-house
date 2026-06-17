<script lang="ts">
  // ─── SVG-optimalizáló (minify) – kétnyelvű, 100% kliensoldali ───
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";
  const DICT = {
    hu: {
      hint: "Töltsd fel az SVG fájlt – kommentek, metaadatok, szerkesztői attribútumok és felesleges whitespace eltávolítása.",
      drop: "Húzd ide az SVG fájlt",
      orig: "Eredeti", optimized: "Optimalizált", reduction: "csökkentés",
      convert: "Optimalizálás", download: "SVG letöltése", copy: "Kód másolása", copied: "Másolva!",
      notSvg: "A fájl nem érvényes SVG.",
    },
    ro: {
      hint: "Încarcă fișierul SVG – elimină comentariile, metadatele, atributele de editor și spațiile inutile.",
      drop: "Trage fișierul SVG aici",
      orig: "Original", optimized: "Optimizat", reduction: "reducere",
      convert: "Optimizare", download: "Descarcă SVG", copy: "Copiază codul", copied: "Copiat!",
      notSvg: "Fișierul nu este un SVG valid.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;
  const timing = getTimingConfig("svg-optimalizalo");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let resultText = "";
  let origSize = 0;
  let newSize = 0;
  let errorMsg = "";
  let copied = false;

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null; resultText = ""; errorMsg = ""; copied = false;
  }

  function optimizeSvg(svg: string): string {
    let s = svg;
    s = s.replace(/<\?xml[\s\S]*?\?>/g, "");                    // XML deklaráció
    s = s.replace(/<!DOCTYPE[\s\S]*?>/gi, "");                  // DOCTYPE
    s = s.replace(/<!--[\s\S]*?-->/g, "");                      // kommentek
    s = s.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");       // metadata blokk
    s = s.replace(/\s(inkscape|sodipodi):[\w-]+="[^"]*"/gi, ""); // szerkesztői attribútumok
    s = s.replace(/\sxmlns:(inkscape|sodipodi|dc|cc|rdf)="[^"]*"/gi, ""); // szerkesztői namespace-ek
    s = s.replace(/>\s+</g, "><");                              // tagok közötti whitespace
    s = s.replace(/\s{2,}/g, " ");                             // többszörös szóköz
    return s.trim();
  }

  async function convert() {
    if (!file) return;
    errorMsg = "";
    try {
      const text = await file.text();
      if (!/<svg[\s>]/i.test(text)) { errorMsg = L.notSvg; return; }
      origSize = new Blob([text]).size;
      resultText = optimizeSvg(text);
      newSize = new Blob([resultText]).size;
      resultBlob = new Blob([resultText], { type: "image/svg+xml" });
    } catch (e) {
      console.error(e);
      errorMsg = ui.conversionError;
    }
  }

  function download() {
    if (resultBlob) downloadBlob(resultBlob, "optimized.svg");
  }
  async function copyCode() {
    try { await navigator.clipboard.writeText(resultText); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }

  function fmtBytes(n: number): string {
    if (n < 1024) return `${n} B`;
    return `${(n / 1024).toFixed(1)} KB`;
  }
  $: reductionPct = origSize > 0 ? Math.max(0, Math.round((1 - newSize / origSize) * 100)) : 0;
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">{L.hint}</p>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/svg+xml,.svg" multiple={false} maxSizeMB={10}
    label={L.drop} sublabel="SVG — Max. 10 MB" on:files={handleFiles} />
</div>

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if resultBlob}
  <div class="result card">
    <div class="stats">
      <div class="stat"><span class="stat__l">{L.orig}</span><span class="stat__v">{fmtBytes(origSize)}</span></div>
      <div class="stat"><span class="stat__l">{L.optimized}</span><span class="stat__v">{fmtBytes(newSize)}</span></div>
      <div class="stat stat--hl"><span class="stat__l">{L.reduction}</span><span class="stat__v">−{reductionPct}%</span></div>
    </div>
    <div class="code-head">
      <button type="button" class="copy-btn" on:click={copyCode}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    <pre class="code-out"><code>{resultText}</code></pre>
  </div>
{/if}

{#if file}
  <ConvertButton {timing}
    canConvert={!!file}
    isConverting={false}
    isDone={!!resultBlob}
    onConvert={convert} onDownload={download}
    convertLabel={L.convert}
    downloadLabel={L.download}
    fileCount={1} />
{/if}

<style>
  .tool-settings { margin-bottom: var(--sp-5); }
  .tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-3); }
  .settings-hint { font-size: 0.85rem; color: var(--text-muted); }
  .dropzone-wrap { margin-bottom: var(--sp-5); }
  .tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }

  .result { margin: var(--sp-4) 0; padding: var(--sp-5); }
  .stats { display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-bottom: var(--sp-4); }
  .stat { flex: 1; min-width: 90px; display: flex; flex-direction: column; gap: var(--sp-1); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); text-align: center; }
  .stat--hl { border-color: color-mix(in srgb, var(--cat-kep) 40%, var(--border)); background: color-mix(in srgb, var(--cat-kep) 8%, var(--bg-card)); }
  .stat__l { font-size: 0.75rem; color: var(--text-muted); }
  .stat__v { font-size: 1.1rem; font-weight: 700; color: var(--text); font-variant-numeric: tabular-nums; }
  .stat--hl .stat__v { color: var(--cat-kep); }
  .code-head { display: flex; justify-content: flex-end; margin-bottom: var(--sp-2); }
  .copy-btn { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); cursor: pointer; padding: var(--sp-2) var(--sp-3); color: var(--text); font-size: 0.8125rem; }
  .copy-btn:hover { border-color: var(--cat-kep); }
  .code-out { margin: 0; max-height: 240px; overflow: auto; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
  .code-out code { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text); white-space: pre-wrap; word-break: break-all; }
</style>
