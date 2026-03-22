<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import PdfPreview from "./PdfPreview.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("pdf-vizjel");

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
  let watermarkText = ui.pdfWatermarkDefault;
  let placement: "diagonal" | "center" | "bottom-right" = "diagonal";
  let opacity = 30;
  let wmFontSize = 60;
  let selectedColor: [number, number, number] = [0.5, 0.5, 0.5]; // grey

  const colorPresets: { label: string; value: [number, number, number] }[] = [
    { label: "⬜", value: [0.5, 0.5, 0.5] },
    { label: "🟥", value: [0.8, 0.1, 0.1] },
    { label: "🟦", value: [0.1, 0.2, 0.8] },
    { label: "🟩", value: [0.1, 0.6, 0.2] },
    { label: "⬛", value: [0, 0, 0] },
    { label: "🟧", value: [0.9, 0.5, 0.1] },
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

  async function doConvert() {
    if (!file || !watermarkText.trim()) return;
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, wmFontSize);

        let x: number, y: number, rotate: number;
        if (placement === "diagonal") {
          x = (width - textWidth * Math.cos(Math.PI / 4)) / 2;
          y = height / 2;
          rotate = 45;
        } else if (placement === "center") {
          x = (width - textWidth) / 2;
          y = height / 2;
          rotate = 0;
        } else {
          x = width - textWidth - 20;
          y = 20;
          rotate = 0;
        }

        page.drawText(watermarkText, {
          x, y,
          size: wmFontSize,
          font,
          color: rgb(selectedColor[0], selectedColor[1], selectedColor[2]),
          opacity: opacity / 100,
          rotate: degrees(rotate),
        });
      }

      const result = await doc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.pdfWatermarkSuffix}.pdf`;
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
    </div>

    <div class="card settings-card">
      <div class="field">
        <label class="label" for="wm-text">{ui.watermarkText}</label>
        <input id="wm-text" type="text" class="input" bind:value={watermarkText} placeholder={ui.pdfWatermarkDefault} />
      </div>

      <div class="field">
        <span class="label">{ui.position}</span>
        <div class="toggle-group">
          <button class="toggle-btn" class:toggle-btn--active={placement === "diagonal"} on:click={() => { placement = "diagonal"; }}>
            {ui.pdfWatermarkDiagonal}
          </button>
          <button class="toggle-btn" class:toggle-btn--active={placement === "center"} on:click={() => { placement = "center"; }}>
            {ui.pdfWatermarkCenter}
          </button>
          <button class="toggle-btn" class:toggle-btn--active={placement === "bottom-right"} on:click={() => { placement = "bottom-right"; }}>
            {ui.pdfWatermarkBottomRight}
          </button>
        </div>
      </div>

      <div class="field">
        <label class="label" for="wm-opacity">{ui.pdfOpacity}: {opacity}%</label>
        <input id="wm-opacity" type="range" min="10" max="80" step="5" bind:value={opacity} />
      </div>

      <div class="field">
        <label class="label" for="wm-fontsize">{ui.pdfFontSize}: {wmFontSize}pt</label>
        <input id="wm-fontsize" type="range" min="20" max="120" step="5" bind:value={wmFontSize} />
      </div>

      <div class="field">
        <span class="label">{ui.color}</span>
        <div class="color-chips">
          {#each colorPresets as preset, i}
            <button
              class="color-chip"
              class:color-chip--active={selectedColor === preset.value}
              on:click={() => { selectedColor = preset.value; }}
              style="background: rgb({Math.round(preset.value[0]*255)},{Math.round(preset.value[1]*255)},{Math.round(preset.value[2]*255)})"
              title={preset.label}
            ></button>
          {/each}
        </div>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={watermarkText.trim() !== "" && pageCount > 0}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.pdfWatermarkBtn}
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
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); max-width: 400px; }
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
.color-chips { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.color-chip {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 0.15s;
}
.color-chip--active { border-color: var(--accent, #333); box-shadow: 0 0 0 2px var(--bg, white); }
</style>
