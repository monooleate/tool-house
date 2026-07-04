<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { mapPdfError } from "../../../lib/pdf-error.ts";
  import PdfPreview from "./PdfPreview.svelte";

  const timing = getTimingConfig("pdf-oldalak-kivalasztasa");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let rangeInput = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
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
      error = mapPdfError(err);
      pageCount = 0;
    }
  }

  function parsePageSelection(input: string, max: number): number[] {
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
    return Array.from(indices).sort((a, b) => a - b);
  }

  async function doConvert() {
    if (!file || pageCount === 0 || !rangeInput.trim()) return;
    isProcessing = true;
    error = "";
    try {
      const indices = parsePageSelection(rangeInput, pageCount);
      if (indices.length === 0) {
        error = ui.noPageSelected;
        return;
      }

      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const pages = await newDoc.copyPages(srcDoc, indices);
      pages.forEach((p) => newDoc.addPage(p));
      const result = await newDoc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.selectedSuffix}.pdf`;
      isDone = true;
    } catch (err: any) {
      error = mapPdfError(err);
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
    rangeInput = "";
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
        <label class="label" for="page-range">{ui.selectedPagesLabel}</label>
        <input
          id="page-range"
          type="text"
          class="input"
          bind:value={rangeInput}
          placeholder={ui.pagesPlaceholder}
        />
        <span class="hint">{ui.pagesAndRangesHint} (1-{pageCount})</span>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={rangeInput.trim() !== "" && pageCount > 0}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.extractPages}
      downloadLabel={ui.downloadPdf}
      fileCount={1}
    />

    <AdSlot show={timing.showAdSlot} slot="before-download" />

    {#if isDone && resultBytes}
      <PdfPreview
        pdfBytes={resultBytes}
        filename={resultFilename}
        onReset={() => { resultBytes = null; resultBlob = null; file = null; isDone = false; convertBtnRef?.reset(); }}
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
.input { max-width: 400px; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.hint { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
