<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import { downloadBlob, downloadZip, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { mapPdfError } from "../../../lib/pdf-error.ts";

  const timing = getTimingConfig("pdf-keppe");

  let file: File | null = null;
  let pageCount = 0;
  let isConverting = false;
  let error = "";
  let format: "png" | "jpeg" = "png";
  let scale = 2;
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultFilename = "";
  let resultEntries: { filename: string; data: Uint8Array }[] | null = null;
  let resultZipFilename = "";
  let resultKey = "";

  // Beállítás-változás után az elavult eredmény eldobása (ne lehessen régi felbontást/formátumot letölteni)
  $: if (isDone && resultKey && `${format}-${scale}` !== resultKey) {
    isDone = false;
    resultBlob = null;
    resultEntries = null;
    convertBtnRef?.reset();
  }

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    isDone = false;
    convertBtnRef?.reset();
    loadPageCount(f);
  }

  async function loadPageCount(f: File) {
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      pageCount = doc.getPageCount();
    } catch (err: any) {
      error = mapPdfError(err);
      pageCount = 0;
    }
  }

  async function doConvert() {
    if (!file || pageCount === 0) return;
    isConverting = true;
    error = "";
    resultBlob = null;
    resultEntries = null;
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";

      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
      const baseName = file.name.replace(/\.pdf$/i, "");
      const entries: { filename: string; data: Uint8Array }[] = [];

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;

        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const ext = format === "png" ? "png" : "jpg";
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), mimeType, 0.92)
        );
        const arrBuf = await blob.arrayBuffer();
        entries.push({
          filename: `${baseName}${ui.pageImageSuffix}${i}.${ext}`,
          data: new Uint8Array(arrBuf),
        });
      }

      if (entries.length === 1) {
        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        resultBlob = new Blob([entries[0].data], { type: mimeType });
        resultFilename = entries[0].filename;
      } else {
        resultEntries = entries;
        resultZipFilename = `${baseName}${ui.imagesZipSuffix}.zip`;
      }
      resultKey = `${format}-${scale}`;
      isDone = true;
    } catch (err: any) {
      error = mapPdfError(err);
    } finally {
      isConverting = false;
    }
  }

  function doDownload() {
    if (resultBlob) {
      downloadBlob(resultBlob, resultFilename);
    } else if (resultEntries) {
      downloadZip(resultEntries, resultZipFilename);
    }
  }

  function reset() {
    file = null;
    pageCount = 0;
    error = "";
    isDone = false;
    resultBlob = null;
    resultEntries = null;
    convertBtnRef?.reset();
  }
</script>

<div class="tool">
  {#if !file}
    <Dropzone
      accept=".pdf,application/pdf"
      multiple={false}
      maxSizeMB={200}
      label={ui.dragHere}
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
      {#if pageCount > 0}
        <div class="stats-bar">
          <div class="stat">
            <span class="stat__num">{pageCount}</span>
            <span class="stat__label">{ui.page}</span>
          </div>
        </div>
      {/if}
    </div>

    <div class="card settings-card">
      <div class="field">
        <span class="label">{ui.imageFormat}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={format} value="png" />
            {ui.pngLossless}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={format} value="jpeg" />
            {ui.jpgSmaller}
          </label>
        </div>
      </div>

      <div class="field">
        <span class="label">{ui.resolutionScale}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={scale} value={1} />
            {ui.scale1x}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={scale} value={2} />
            {ui.scale2x}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={scale} value={3} />
            {ui.scale3x}
          </label>
        </div>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    {#if pageCount > 0}
      <ConvertButton
        bind:this={convertBtnRef}
        {timing}
        canConvert={pageCount > 0}
        isConverting={isConverting}
        {isDone}
        onConvert={doConvert}
        onDownload={doDownload}
        convertLabel={ui.convertToImage}
        downloadLabel={ui.downloadImages}
        fileCount={pageCount}
      />
    {/if}

    <AdSlot show={timing.showAdSlot} slot="before-download" />
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
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
