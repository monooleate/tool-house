<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("pdf-oldalak-forgatasa");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let rotationAngle: number = 90;
  let pageSelection: "all" | "custom" = "all";
  let customPages = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultFilename = "";

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    isDone = false;
    resultBlob = null;
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
      error = `${ui.pdfLoadError}: ${err.message}`;
      pageCount = 0;
    }
  }

  function parsePageIndices(input: string, max: number): number[] {
    const indices = new Set<number>();
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (isNaN(a) || isNaN(b) || a < 1 || b > max || a > b) {
          throw new Error(`${ui.invalidRange}: ${part}`);
        }
        for (let i = a; i <= b; i++) indices.add(i - 1);
      } else {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 1 || num > max) {
          throw new Error(`${ui.invalidPageNumber}: ${part}`);
        }
        indices.add(num - 1);
      }
    }
    return Array.from(indices);
  }

  async function doConvert() {
    if (!file || pageCount === 0) return;
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);

      let targetIndices: number[];
      if (pageSelection === "all") {
        targetIndices = Array.from({ length: pageCount }, (_, i) => i);
      } else {
        targetIndices = parsePageIndices(customPages, pageCount);
      }

      const pages = doc.getPages();
      for (const idx of targetIndices) {
        const page = pages[idx];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotationAngle));
      }

      const result = await doc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.rotatedSuffix}.pdf`;
      isDone = true;
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isProcessing = false;
    }
  }

  function doDownload() {
    if (resultBlob) {
      downloadBlob(resultBlob, resultFilename);
    }
  }

  function reset() {
    file = null;
    pageCount = 0;
    error = "";
    customPages = "";
    isDone = false;
    resultBlob = null;
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
        <span class="label">{ui.rotationDegree}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={rotationAngle} value={90} />
            {ui.deg90Right}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={rotationAngle} value={180} />
            {ui.deg180}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={rotationAngle} value={270} />
            {ui.deg270Left}
          </label>
        </div>
      </div>

      <div class="field">
        <span class="label">{ui.pages}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={pageSelection} value="all" />
            {ui.everyPage}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={pageSelection} value="custom" />
            {ui.specificPages}
          </label>
        </div>
      </div>

      {#if pageSelection === "custom"}
        <div class="field">
          <label class="label" for="custom-pages">{ui.pagesExample}</label>
          <input
            id="custom-pages"
            type="text"
            class="input"
            bind:value={customPages}
            placeholder="1, 3-5, 8"
          />
        </div>
      {/if}
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={pageCount > 0 && (pageSelection === "all" || customPages.trim() !== "")}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.rotatePages}
      downloadLabel={ui.downloadPdf}
      fileCount={1}
    />

    <AdSlot show={timing.showAdSlot} slot="before-download" />
  {/if}

  {#if error}
    <div class="alert alert--error" role="alert">{error}</div>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.file-info { display: flex; flex-direction: column; gap: var(--sp-3); }
.file-info__row { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
.file-info__name { font-family: var(--font-mono); font-size: .875rem; font-weight: 700; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-info__meta { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.input { max-width: 400px; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
