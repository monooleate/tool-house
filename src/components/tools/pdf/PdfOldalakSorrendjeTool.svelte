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

  const timing = getTimingConfig("pdf-oldalak-sorrendje");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let pageOrder: number[] = []; // 0-indexed eredeti oldalak az ÚJ sorrendben
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";

  // Drag&drop állapot
  let dragIndex = -1;
  let dragOverIndex = -1;

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
      pageOrder = Array.from({ length: pageCount }, (_, i) => i);
    } catch (err: any) {
      error = mapPdfError(err);
      pageCount = 0;
    }
  }

  function reverseOrder() {
    pageOrder = [...pageOrder].reverse();
  }

  function resetOrder() {
    pageOrder = Array.from({ length: pageCount }, (_, i) => i);
  }

  // Egy elem áthelyezése from → to (fel/le gomb + drag&drop közös magja)
  function moveItem(from: number, to: number) {
    if (to < 0 || to >= pageOrder.length || from === to) return;
    const next = [...pageOrder];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    pageOrder = next;
  }

  // Drag&drop (egér)
  function onDragStart(i: number) { dragIndex = i; }
  function onDragOver(e: DragEvent, i: number) { e.preventDefault(); dragOverIndex = i; }
  function onDrop(i: number) {
    if (dragIndex !== -1) moveItem(dragIndex, i);
    dragIndex = -1;
    dragOverIndex = -1;
  }
  function onDragEnd() { dragIndex = -1; dragOverIndex = -1; }

  async function doConvert() {
    if (!file || pageOrder.length === 0) return;
    isProcessing = true;
    error = "";
    try {
      // A pageOrder mindig az összes oldal permutációja (drag/move műveletek),
      // így nincs szükség külön "minden oldal pontosan egyszer" validációra.
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const pages = await newDoc.copyPages(srcDoc, pageOrder);
      pages.forEach((p) => newDoc.addPage(p));
      const result = await newDoc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.reorderedSuffix}.pdf`;
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
    pageOrder = [];
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
      <span class="label">{ui.pageOrderLabel}</span>
      <p class="reorder-info">{ui.reorderInfo}</p>
      <ul class="page-list" role="list">
        {#each pageOrder as pageIdx, i (pageIdx)}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <li
            class="page-card"
            class:page-card--drag={dragIndex === i}
            class:page-card--over={dragOverIndex === i && dragIndex !== i}
            draggable="true"
            on:dragstart={() => onDragStart(i)}
            on:dragover={(e) => onDragOver(e, i)}
            on:drop={() => onDrop(i)}
            on:dragend={onDragEnd}
          >
            <span class="page-card__handle" aria-hidden="true">⠿</span>
            <span class="page-card__num">{ui.page} {pageIdx + 1}</span>
            <span class="page-card__pos">→ {i + 1}.</span>
            <div class="page-card__actions">
              <button class="btn btn--ghost btn--sm" aria-label={ui.moveUp} on:click={() => moveItem(i, i - 1)} disabled={i === 0}>▲</button>
              <button class="btn btn--ghost btn--sm" aria-label={ui.moveDown} on:click={() => moveItem(i, i + 1)} disabled={i === pageOrder.length - 1}>▼</button>
            </div>
          </li>
        {/each}
      </ul>
      <div class="quick-actions">
        <button class="btn btn--outline btn--sm" on:click={reverseOrder}>{ui.reverseOrder}</button>
        <button class="btn btn--outline btn--sm" on:click={resetOrder}>{ui.originalOrder}</button>
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
      convertLabel={ui.reorderPages}
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
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.input--wide { max-width: 100%; }
.hint { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
.quick-actions { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.reorder-info { font-size: .8rem; color: var(--text-muted); margin: 0; }
.page-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--sp-2); max-height: 420px; overflow-y: auto; }
.page-card { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-3); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); cursor: grab; user-select: none; transition: border-color var(--t-fast), opacity var(--t-fast); }
.page-card:active { cursor: grabbing; }
.page-card--drag { opacity: .4; }
.page-card--over { border-color: var(--accent); border-style: dashed; }
.page-card__handle { color: var(--text-subtle); font-size: 1.1rem; line-height: 1; }
.page-card__num { font-family: var(--font-mono); font-size: .85rem; font-weight: 700; flex: 1; }
.page-card__pos { font-family: var(--font-mono); font-size: .78rem; color: var(--accent); }
.page-card__actions { display: flex; gap: var(--sp-1); }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
