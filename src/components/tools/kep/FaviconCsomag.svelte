<script lang="ts">
  // ─── Favicon-csomag generátor – kétnyelvű, 100% kliensoldali ───
  // Egy képből multi-méret PNG + favicon.ico + site.webmanifest + HTML snippet, ZIP-ben.
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import JSZip from "jszip";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";
  const DICT = {
    hu: {
      hint: "Tölts fel egy négyzetes képet (PNG/JPG, ideálisan 512×512). A csomag tartalma: favicon.ico, PNG-k (16–512), apple-touch-icon, site.webmanifest és a beillesztendő HTML kód.",
      drop: "Húzd ide a forrásképet",
      convert: "Favicon-csomag generálása", download: "ZIP letöltése",
      contents: "A ZIP tartalma", snippet: "HTML kód a <head>-be", copy: "Kód másolása", copied: "Másolva!",
    },
    ro: {
      hint: "Încarcă o imagine pătrată (PNG/JPG, ideal 512×512). Pachetul conține: favicon.ico, PNG-uri (16–512), apple-touch-icon, site.webmanifest și codul HTML de inserat.",
      drop: "Trage imaginea sursă aici",
      convert: "Generează pachetul favicon", download: "Descarcă ZIP",
      contents: "Conținutul ZIP", snippet: "Cod HTML pentru <head>", copy: "Copiază codul", copied: "Copiat!",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;
  const timing = getTimingConfig("favicon-generator");

  const PNG_SIZES = [16, 32, 48, 180, 192, 512];
  const ICO_SIZES = [16, 32, 48];

  const HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

  const FILE_LIST = [
    "favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "favicon-48x48.png",
    "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png",
    "site.webmanifest", "head-snippet.html",
  ];

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let errorMsg = "";
  let isConverting = false;
  let copied = false;

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null; errorMsg = ""; copied = false;
  }

  function pngName(size: number): string {
    if (size === 180) return "apple-touch-icon.png";
    if (size === 192) return "android-chrome-192x192.png";
    if (size === 512) return "android-chrome-512x512.png";
    return `favicon-${size}x${size}.png`;
  }

  function buildIcoBlob(pngBuffers: ArrayBuffer[], sizes: number[]): Blob {
    const count = sizes.length;
    const header = new DataView(new ArrayBuffer(6));
    header.setUint16(0, 0, true); header.setUint16(2, 1, true); header.setUint16(4, count, true);
    let dataOffset = 6 + 16 * count;
    const dirParts: ArrayBuffer[] = [header.buffer];
    const dataParts: ArrayBuffer[] = [];
    for (let i = 0; i < count; i++) {
      const png = pngBuffers[i]; const size = sizes[i];
      const entry = new DataView(new ArrayBuffer(16));
      entry.setUint8(0, size); entry.setUint8(1, size);
      entry.setUint16(4, 1, true); entry.setUint16(6, 32, true);
      entry.setUint32(8, png.byteLength, true); entry.setUint32(12, dataOffset, true);
      dataOffset += png.byteLength;
      dirParts.push(entry.buffer); dataParts.push(png);
    }
    return new Blob([...dirParts, ...dataParts], { type: "image/x-icon" });
  }

  async function convert() {
    if (!file) return;
    errorMsg = "";
    isConverting = true;
    await new Promise((r) => setTimeout(r, 30));
    try {
      const img = await createImageBitmap(file);
      const zip = new JSZip();
      const icoBuffers: ArrayBuffer[] = [];
      for (const size of PNG_SIZES) {
        const canvas = new OffscreenCanvas(size, size);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blob = await canvas.convertToBlob({ type: "image/png" });
        const buf = await blob.arrayBuffer();
        zip.file(pngName(size), buf);
        if (ICO_SIZES.includes(size)) icoBuffers.push(buf);
      }
      img.close();
      zip.file("favicon.ico", buildIcoBlob(icoBuffers, ICO_SIZES));
      const manifest = {
        name: "", short_name: "",
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        theme_color: "#ffffff", background_color: "#ffffff", display: "standalone",
      };
      zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));
      zip.file("head-snippet.html", HTML_SNIPPET);
      resultBlob = await zip.generateAsync({ type: "blob" });
    } catch (e) {
      console.error(e);
      errorMsg = ui.conversionError;
    } finally {
      isConverting = false;
    }
  }

  function download() {
    if (resultBlob) downloadBlob(resultBlob, "favicon-csomag.zip");
  }
  async function copySnippet() {
    try { await navigator.clipboard.writeText(HTML_SNIPPET); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">{L.hint}</p>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" multiple={false} maxSizeMB={15}
    label={L.drop} sublabel="PNG, JPG, WebP — Max. 15 MB" on:files={handleFiles} />
</div>

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if resultBlob}
  <div class="result card">
    <span class="result-title">{L.contents}</span>
    <ul class="file-list">
      {#each FILE_LIST as f}<li><code>{f}</code></li>{/each}
    </ul>
    <div class="snippet-head">
      <span class="result-title">{L.snippet}</span>
      <button type="button" class="copy-btn" on:click={copySnippet}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    <pre class="code-out"><code>{HTML_SNIPPET}</code></pre>
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
  .dropzone-wrap { margin-bottom: var(--sp-5); }
  .tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }

  .result { margin: var(--sp-4) 0; padding: var(--sp-5); }
  .result-title { font-size: 0.875rem; font-weight: 600; color: var(--text); }
  .file-list { list-style: none; margin: var(--sp-3) 0 var(--sp-5); padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: var(--sp-2); }
  .file-list li { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-sm, 6px); padding: var(--sp-2) var(--sp-3); }
  .file-list code { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text); }
  .snippet-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--sp-2); }
  .copy-btn { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); cursor: pointer; padding: var(--sp-2) var(--sp-3); color: var(--text); font-size: 0.8125rem; }
  .copy-btn:hover { border-color: var(--cat-kep); }
  .code-out { margin: 0; overflow: auto; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
  .code-out code { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text); white-space: pre; }
</style>
