<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import PdfPreview from "./PdfPreview.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("tomoritese");

  let file: File | null = null;
  let isProcessing = false;
  let error = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";
  let originalSize = 0;
  let processedSize = 0;
  let progress = 0;

  // Compression level
  let level: "light" | "medium" | "heavy" = "medium";
  const qualityMap = { light: 0.85, medium: 0.72, heavy: 0.50 };

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    originalSize = f.size;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    progress = 0;
    convertBtnRef?.reset();
  }

  async function doConvert() {
    if (!file) return;
    isProcessing = true;
    error = "";
    progress = 0;
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";

      const fileBytes = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(fileBytes);
      const pdfJsDoc = await pdfjsLib.getDocument({ data: fileBytes }).promise;
      const numPages = pdfJsDoc.numPages;
      const quality = qualityMap[level];

      // Process each page - compress images via canvas
      for (let i = 1; i <= numPages; i++) {
        progress = Math.round((i / numPages) * 80);
        const page = await pdfJsDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Convert canvas to JPEG
        const jpegBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/jpeg", quality);
        });
        const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

        // Replace page content with compressed image
        const pdfPage = pdfDoc.getPage(i - 1);
        const { width, height } = pdfPage.getSize();
        const jpgImage = await pdfDoc.embedJpg(jpegBytes);
        // Clear existing content by drawing full-page image
        pdfPage.drawImage(jpgImage, {
          x: 0, y: 0,
          width, height,
        });
      }

      progress = 90;
      const result = await pdfDoc.save({ useObjectStreams: true });
      progress = 100;

      // If compressed is larger, return original
      if (result.length >= fileBytes.length) {
        resultBytes = fileBytes;
        processedSize = fileBytes.length;
      } else {
        resultBytes = new Uint8Array(result);
        processedSize = result.length;
      }

      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBlob = new Blob([resultBytes], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.pdfCompressedSuffix}.pdf`;
      isDone = true;
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isProcessing = false;
    }
  }

  function doDownload() {
    if (resultBlob) downloadBlob(resultBlob, resultFilename);
  }

  function reset() {
    file = null;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    originalSize = 0;
    processedSize = 0;
    progress = 0;
    convertBtnRef?.reset();
  }
</script>

<div class="tool">
  {#if !file}
    <Dropzone
      accept=".pdf,application/pdf"
      multiple={false}
      maxSizeMB={200}
      label={ui.dragPdfHere}
      sublabel=".pdf"
      on:files={handleFiles}
    />
  {:else}
    <div class="card file-info">
      <div class="file-info__row">
        <span class="file-info__name">{file.name}</span>
        <span class="file-info__meta">{formatFileSize(file.size)}</span>
        <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.newFile}</button>
      </div>
    </div>

    <div class="card settings-card">
      <div class="field">
        <span class="label">{ui.quality}</span>
        <div class="toggle-group">
          <button class="toggle-btn" class:toggle-btn--active={level === "light"} on:click={() => { level = "light"; }}>
            {ui.pdfCompressLight}
          </button>
          <button class="toggle-btn" class:toggle-btn--active={level === "medium"} on:click={() => { level = "medium"; }}>
            {ui.pdfCompressMedium} ✓
          </button>
          <button class="toggle-btn" class:toggle-btn--active={level === "heavy"} on:click={() => { level = "heavy"; }}>
            {ui.pdfCompressHeavy}
          </button>
        </div>
      </div>
    </div>

    {#if isProcessing && progress > 0}
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width: {progress}%"></div>
        <span class="progress-bar__text">{progress}%</span>
      </div>
    {/if}

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={file !== null}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.pdfCompressBtn}
      downloadLabel={ui.downloadPdf}
      fileCount={1}
    />

    <AdSlot show={timing.showAdSlot} slot="before-download" />

    {#if isDone && resultBytes}
      <PdfPreview
        pdfBytes={resultBytes}
        filename={resultFilename}
        {originalSize}
        {processedSize}
        onReset={reset}
      />
    {/if}
  {/if}

  {#if error}
    <div class="alert alert--error" role="alert">{error}</div>
  {/if}
</div>

<!-- Post-result: hirdetés + email capture -->
{#if isDone}
  <AdSlot show={true} slot="post-result" />
  <EmailCaptureBar />
{/if}

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.file-info { display: flex; flex-direction: column; gap: var(--sp-3); }
.file-info__row { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
.file-info__name { font-family: var(--font-mono); font-size: .875rem; font-weight: 700; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-info__meta { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.toggle-group { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.toggle-btn {
  padding: var(--sp-2) var(--sp-4);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--bg-input);
  color: var(--text);
  cursor: pointer;
  font-size: .85rem;
  transition: all 0.15s;
}
.toggle-btn--active { background: var(--accent, #333); color: white; border-color: var(--accent, #333); }
.progress-bar {
  position: relative;
  height: 28px;
  background: var(--bg-input);
  border-radius: var(--r-md);
  overflow: hidden;
}
.progress-bar__fill {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  background: var(--accent, #333);
  transition: width 0.3s;
  border-radius: var(--r-md);
}
.progress-bar__text {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: var(--font-mono);
  font-size: .8rem;
  font-weight: 700;
  color: var(--text);
}
</style>
