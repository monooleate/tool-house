<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import PdfPreview from "./PdfPreview.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("oldalszamok");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";

  // Settings
  let position = "bc"; // 3x3 grid: tl tc tr ml mc mr bl bc br
  let format: "num" | "fraction" | "dash" | "full" = "num";
  let startNumber = 1;
  let fontSize = 10;
  let margin = 15;

  const positions = [
    ["tl", "tc", "tr"],
    ["ml", "mc", "mr"],
    ["bl", "bc", "br"],
  ];

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
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

  function formatPageNumber(num: number, total: number): string {
    switch (format) {
      case "num": return String(num);
      case "fraction": return `${num} / ${total}`;
      case "dash": return `– ${num} –`;
      case "full": return ui.pdfPageNumberFormatFull.replace("{n}", String(num));
      default: return String(num);
    }
  }

  function getPosition(pos: string, width: number, height: number, textWidth: number, m: number): { x: number; y: number } {
    const row = pos[0]; // t m b
    const col = pos[1]; // l c r
    let x = m;
    let y = m;
    if (col === "c") x = (width - textWidth) / 2;
    else if (col === "r") x = width - textWidth - m;
    if (row === "t") y = height - m - fontSize;
    else if (row === "m") y = (height - fontSize) / 2;
    else y = m;
    return { x, y };
  }

  async function doConvert() {
    if (!file || pageCount === 0) return;
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const num = startNumber + i;
        const text = formatPageNumber(num, total + startNumber - 1);
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const { x, y } = getPosition(position, width, height, textWidth, margin);
        page.drawText(text, {
          x, y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const result = await doc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.pdfPageNumberSuffix}.pdf`;
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
    pageCount = 0;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
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
      <!-- Position grid -->
      <div class="field">
        <span class="label">{ui.pdfPageNumberPosition}</span>
        <div class="position-grid">
          {#each positions as row}
            <div class="position-row">
              {#each row as pos}
                <button
                  class="position-cell"
                  class:position-cell--active={position === pos}
                  on:click={() => { position = pos; }}
                  title={pos}
                >
                  <span class="position-dot"></span>
                </button>
              {/each}
            </div>
          {/each}
        </div>
      </div>

      <!-- Format -->
      <div class="field">
        <span class="label">{ui.pdfPageNumberFormat}</span>
        <div class="radio-group">
          <label class="radio-label"><input type="radio" bind:group={format} value="num" /> {ui.pdfPageNumberFormat1}</label>
          <label class="radio-label"><input type="radio" bind:group={format} value="fraction" /> 1 / {pageCount || "N"}</label>
          <label class="radio-label"><input type="radio" bind:group={format} value="dash" /> – 1 –</label>
          <label class="radio-label"><input type="radio" bind:group={format} value="full" /> {ui.pdfPageNumberFormatFull.replace("{n}", "1")}</label>
        </div>
      </div>

      <!-- Start number -->
      <div class="field">
        <label class="label" for="start-num">{ui.pdfPageNumberStart}</label>
        <input id="start-num" type="number" class="input input--sm" min="1" bind:value={startNumber} />
      </div>

      <!-- Font size -->
      <div class="field">
        <label class="label" for="font-size">{ui.pdfPageNumberFontSize}</label>
        <select id="font-size" class="input input--sm" bind:value={fontSize}>
          {#each [8, 9, 10, 11, 12] as s}
            <option value={s}>{ui.pdfFontSizePt.replace("{n}", String(s))}</option>
          {/each}
        </select>
      </div>

      <!-- Margin -->
      <div class="field">
        <label class="label" for="margin">{ui.pdfPageNumberMargin}</label>
        <select id="margin" class="input input--sm" bind:value={margin}>
          {#each [10, 15, 20, 25] as m}
            <option value={m}>{ui.pdfMarginPx.replace("{n}", String(m))}</option>
          {/each}
        </select>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={pageCount > 0}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.pdfPageNumberBtn}
      downloadLabel={ui.downloadPdf}
      fileCount={1}
    />

    <AdSlot show={timing.showAdSlot} slot="before-download" />

    {#if isDone && resultBytes}
      <PdfPreview
        pdfBytes={resultBytes}
        filename={resultFilename}
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
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.input--sm { max-width: 160px; }
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
.position-grid { display: flex; flex-direction: column; gap: 2px; width: fit-content; border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.position-row { display: flex; gap: 2px; }
.position-cell {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-input);
  border: none; cursor: pointer;
  transition: background 0.15s;
}
.position-cell:hover { background: var(--bg-hover, #e0e0e0); }
.position-cell--active { background: var(--accent, #333); }
.position-cell--active .position-dot { background: white; }
.position-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}
</style>
