<script lang="ts">
  import { downloadBlob, formatFileSize, calcSavingPercent } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  export let pdfBytes: Uint8Array;
  export let filename: string;
  export let originalSize: number | undefined = undefined;
  export let processedSize: number | undefined = undefined;
  export let onReset: () => void;

  let thumbnails: string[] = [];
  let totalPages = 0;
  let loading = true;

  $: if (pdfBytes) renderThumbnails(pdfBytes);

  async function renderThumbnails(bytes: Uint8Array) {
    loading = true;
    thumbnails = [];
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      totalPages = pdf.numPages;
      const maxPages = Math.min(4, totalPages);
      const urls: string[] = [];
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 212;
        const scale = Math.min(150 / viewport.width, 212 / viewport.height);
        const scaledViewport = page.getViewport({ scale: scale * 0.5 / 0.5 * scale });
        const fitViewport = page.getViewport({ scale });
        canvas.width = Math.floor(fitViewport.width);
        canvas.height = Math.floor(fitViewport.height);
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport: fitViewport }).promise;
        urls.push(canvas.toDataURL("image/jpeg", 0.7));
      }
      thumbnails = urls;
    } catch (err) {
      console.error("PdfPreview thumbnail error:", err);
    }
    loading = false;
  }

  function doDownload() {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    downloadBlob(blob, filename);
  }

  $: showSizeBadge = originalSize != null && processedSize != null;
  $: savingPercent = showSizeBadge ? calcSavingPercent(originalSize!, processedSize!) : 0;
  $: isAlreadyOptimized = showSizeBadge && savingPercent < 5;
</script>

<div class="pdf-preview">
  {#if showSizeBadge}
    <div class="size-badge" class:size-badge--warn={isAlreadyOptimized} class:size-badge--ok={!isAlreadyOptimized}>
      {#if isAlreadyOptimized}
        {ui.pdfAlreadyOptimized}
      {:else}
        ⬇ {formatFileSize(originalSize!)} → {formatFileSize(processedSize!)} ({savingPercent}% {ui.pdfSizeReduced})
      {/if}
    </div>
  {/if}

  <div class="thumb-grid">
    {#if loading}
      {#each [1, 2, 3, 4] as _}
        <div class="thumb-skeleton"></div>
      {/each}
    {:else}
      {#each thumbnails as src, i}
        <div class="thumb-item">
          <img src={src} alt="{ui.pdfPage} {i + 1}" />
          <span class="thumb-label">{i + 1}. {ui.pdfPage}</span>
        </div>
      {/each}
      {#if totalPages > 4}
        <div class="thumb-more">+ {totalPages - 4} {ui.pdfMorePages}</div>
      {/if}
    {/if}
  </div>

  <button class="btn btn--primary btn--full" on:click={doDownload}>
    📥 {ui.pdfDownloadBtn} ({formatFileSize(pdfBytes.length)})
  </button>

  <button class="btn btn--ghost btn--full" on:click={onReset}>
    {ui.pdfResetBtn}
  </button>
</div>

<style>
.pdf-preview { display: flex; flex-direction: column; gap: var(--sp-4); }
.size-badge {
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-md);
  font-weight: 700;
  font-size: .95rem;
  text-align: center;
}
.size-badge--ok { background: var(--green-bg, #d4edda); color: var(--green-text, #155724); }
.size-badge--warn { background: var(--yellow-bg, #fff3cd); color: var(--yellow-text, #856404); }
.thumb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--sp-3);
}
.thumb-skeleton {
  width: 100%;
  aspect-ratio: 150 / 212;
  background: var(--bg-input, #f0f0f0);
  border-radius: var(--r-md);
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.thumb-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-1);
}
.thumb-item img {
  width: 100%;
  border: 1px solid var(--border, #ddd);
  border-radius: var(--r-md);
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
}
.thumb-label {
  font-size: .75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.thumb-more {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .85rem;
  color: var(--text-muted);
  border: 1px dashed var(--border, #ddd);
  border-radius: var(--r-md);
  aspect-ratio: 150 / 212;
}
.btn--full { width: 100%; text-align: center; }
</style>
