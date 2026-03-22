<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import { downloadBlob, downloadZip, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("pdf-szetbontas");

  let file: File | null = null;
  let pageCount = 0;
  let isSplitting = false;
  let error = "";
  let splitMode: "every" | "ranges" = "every";
  let rangesInput = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultFilename = "";
  let resultEntries: { filename: string; data: Uint8Array }[] | null = null;
  let resultZipFilename = "";

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
      error = `${ui.pdfLoadError}: ${err.message}`;
      pageCount = 0;
    }
  }

  function parseRanges(input: string, max: number): number[][] {
    const groups: number[][] = [];
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (isNaN(a) || isNaN(b) || a < 1 || b > max || a > b) {
          throw new Error(`${ui.invalidRange}: ${part}`);
        }
        const pages: number[] = [];
        for (let i = a; i <= b; i++) pages.push(i - 1);
        groups.push(pages);
      } else {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 1 || num > max) {
          throw new Error(`${ui.invalidPageNumber}: ${part}`);
        }
        groups.push([num - 1]);
      }
    }
    return groups;
  }

  async function doConvert() {
    if (!file || pageCount === 0) return;
    isSplitting = true;
    error = "";
    resultBlob = null;
    resultEntries = null;
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const baseName = file.name.replace(/\.pdf$/i, "");

      let groups: number[][];
      if (splitMode === "every") {
        groups = [];
        for (let i = 0; i < pageCount; i++) {
          groups.push([i]);
        }
      } else {
        groups = parseRanges(rangesInput, pageCount);
      }

      if (groups.length === 1) {
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(srcDoc, groups[0]);
        pages.forEach((p) => newDoc.addPage(p));
        const result = await newDoc.save();
        resultBlob = new Blob([result], { type: "application/pdf" });
        resultFilename = `${baseName}${ui.splitSuffix}1.pdf`;
      } else {
        const entries = await Promise.all(
          groups.map(async (pageIndices, idx) => {
            const newDoc = await PDFDocument.create();
            const pages = await newDoc.copyPages(srcDoc, pageIndices);
            pages.forEach((p) => newDoc.addPage(p));
            const result = await newDoc.save();
            return {
              filename: `${baseName}${ui.splitSuffix}${idx + 1}.pdf`,
              data: new Uint8Array(result),
            };
          })
        );
        resultEntries = entries;
        resultZipFilename = `${baseName}${ui.splitZipSuffix}.zip`;
      }
      isDone = true;
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isSplitting = false;
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
    rangesInput = "";
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
        <span class="label">{ui.splitMode}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={splitMode} value="every" />
            {ui.everyPageSeparate}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={splitMode} value="ranges" />
            {ui.pageRanges}
          </label>
        </div>
      </div>

      {#if splitMode === "ranges"}
        <div class="field">
          <label class="label" for="ranges-input">{ui.rangesLabel}</label>
          <input id="ranges-input" type="text" class="input" bind:value={rangesInput} placeholder="1-3, 4-6, 7" />
        </div>
      {/if}
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    {#if pageCount > 0 && (splitMode === "every" || rangesInput.trim() !== "")}
      <ConvertButton
        bind:this={convertBtnRef}
        {timing}
        canConvert={pageCount > 0 && (splitMode === "every" || rangesInput.trim() !== "")}
        isConverting={isSplitting}
        {isDone}
        onConvert={doConvert}
        onDownload={doDownload}
        convertLabel={ui.splitPdfPages}
        downloadLabel={ui.download}
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
.input { max-width: 400px; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
