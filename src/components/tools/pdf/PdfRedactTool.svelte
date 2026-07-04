<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import PdfPreview from "./PdfPreview.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { mapPdfError } from "../../../lib/pdf-error.ts";

  const timing = getTimingConfig("eltakares");

  let file: File | null = null;
  let pageCount = 0;
  let currentPage = 0;
  let isProcessing = false;
  let error = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";
  let showConfirm = false;

  let canvasEl: HTMLCanvasElement;
  let overlayEl: HTMLDivElement;
  let canvasWidth = 0;
  let canvasHeight = 0;

  // Redaction rectangles
  interface RedactRect {
    pageIndex: number;
    x: number; y: number;
    width: number; height: number;
    color: "black" | "white";
  }
  let redactions: RedactRect[] = [];
  let redactColor: "black" | "white" = "black";

  // Drawing state
  let isDrawing = false;
  let drawStart = { x: 0, y: 0 };
  let currentRect = { x: 0, y: 0, w: 0, h: 0 };

  let fileBytes: Uint8Array | null = null;

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    redactions = [];
    convertBtnRef?.reset();
    loadPdf(f);
  }

  async function loadPdf(f: File) {
    try {
      fileBytes = new Uint8Array(await f.arrayBuffer());
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      const pdf = await pdfjsLib.getDocument({ data: fileBytes }).promise;
      pageCount = pdf.numPages;
      currentPage = 0;
      await renderPage(0);
    } catch (err: any) {
      error = mapPdfError(err);
    }
  }

  async function renderPage(pageIdx: number) {
    if (!fileBytes) return;
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "";
    const pdf = await pdfjsLib.getDocument({ data: fileBytes }).promise;
    const page = await pdf.getPage(pageIdx + 1);
    const maxWidth = Math.min(600, window.innerWidth - 40);
    const viewport = page.getViewport({ scale: 1 });
    const scale = maxWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });
    canvasWidth = Math.floor(scaledViewport.width);
    canvasHeight = Math.floor(scaledViewport.height);

    // Wait for next tick so canvas dimensions update
    await new Promise(r => setTimeout(r, 0));
    if (!canvasEl) return;
    canvasEl.width = canvasWidth;
    canvasEl.height = canvasHeight;
    const ctx = canvasEl.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
  }

  function changePage(dir: number) {
    const next = currentPage + dir;
    if (next < 0 || next >= pageCount) return;
    currentPage = next;
    renderPage(currentPage);
  }

  function onPointerDown(e: PointerEvent) {
    const rect = overlayEl.getBoundingClientRect();
    drawStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    currentRect = { x: drawStart.x, y: drawStart.y, w: 0, h: 0 };
    isDrawing = true;
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDrawing) return;
    const rect = overlayEl.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    currentRect = {
      x: Math.min(drawStart.x, cx),
      y: Math.min(drawStart.y, cy),
      w: Math.abs(cx - drawStart.x),
      h: Math.abs(cy - drawStart.y),
    };
  }

  function onPointerUp() {
    if (!isDrawing) return;
    isDrawing = false;
    if (currentRect.w > 5 && currentRect.h > 5 && canvasWidth > 0 && canvasHeight > 0) {
      // Normalizált (0–1) koordináták — oldalméret-függetlenek, így eltérő méretű
      // oldalaknál sem csúsznak el (a korábbi globális-pixel tárolás bugja).
      redactions = [...redactions, {
        pageIndex: currentPage,
        x: currentRect.x / canvasWidth,
        y: currentRect.y / canvasHeight,
        width: currentRect.w / canvasWidth,
        height: currentRect.h / canvasHeight,
        color: redactColor,
      }];
    }
    currentRect = { x: 0, y: 0, w: 0, h: 0 };
  }

  function removeRedaction(idx: number) {
    redactions = redactions.filter((_, i) => i !== idx);
  }

  function undoLast() {
    redactions = redactions.slice(0, -1);
  }

  function confirmAndConvert() {
    showConfirm = true;
  }

  async function doConvert() {
    showConfirm = false;
    if (!fileBytes || redactions.length === 0) return;
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";

      // Csak az érintett oldalakat égetjük képpé (így a többi oldal kereshető marad);
      // a takart oldalon a szöveg a raszterizálás után VÉGLEG eltűnik, nem nyerhető vissza.
      const redactedPages = new Set(redactions.map((r) => r.pageIndex));
      const srcDoc = await PDFDocument.load(fileBytes);
      const pdfjsDoc = await pdfjsLib.getDocument({ data: fileBytes.slice() }).promise;
      const newDoc = await PDFDocument.create();
      const total = srcDoc.getPageCount();
      const RASTER_SCALE = 2;

      for (let i = 0; i < total; i++) {
        if (!redactedPages.has(i)) {
          // Nincs takarás → eredeti oldal változatlan átmásolása (kereshetőség megmarad)
          const [copied] = await newDoc.copyPages(srcDoc, [i]);
          newDoc.addPage(copied);
          continue;
        }

        // Takart oldal: raszterizálás canvasra, a takarás ráégetése, majd kép-oldalként beágyazás
        const pg = await pdfjsDoc.getPage(i + 1);
        const viewport = pg.getViewport({ scale: RASTER_SCALE });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d")!;
        await pg.render({ canvasContext: ctx, viewport }).promise;

        for (const r of redactions.filter((x) => x.pageIndex === i)) {
          ctx.fillStyle = r.color === "black" ? "#000000" : "#ffffff";
          ctx.fillRect(r.x * canvas.width, r.y * canvas.height, r.width * canvas.width, r.height * canvas.height);
        }

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        const jpegBytes = Uint8Array.from(atob(dataUrl.split(",")[1]), (c) => c.charCodeAt(0));
        const img = await newDoc.embedJpg(jpegBytes);
        const { width: pw, height: ph } = srcDoc.getPage(i).getSize();
        const newPage = newDoc.addPage([pw, ph]);
        newPage.drawImage(img, { x: 0, y: 0, width: pw, height: ph });
      }

      const result = await newDoc.save();
      const baseName = file!.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.pdfRedactSuffix}.pdf`;
      isDone = true;
    } catch (err: any) {
      error = mapPdfError(err);
    } finally {
      isProcessing = false;
    }
  }

  function doDownload() {
    if (resultBlob) downloadBlob(resultBlob, resultFilename);
  }

  function reset() {
    file = null;
    fileBytes = null;
    pageCount = 0;
    currentPage = 0;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    redactions = [];
    convertBtnRef?.reset();
  }

  $: currentPageRedactions = redactions.filter(r => r.pageIndex === currentPage);
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

    <div class="alert alert--danger" role="alert">
      ⚠️ {ui.pdfRedactWarning}
    </div>

    {#if pageCount > 1}
      <div class="page-nav">
        <button class="btn btn--ghost btn--sm" aria-label={ui.prevPage} on:click={() => changePage(-1)} disabled={currentPage === 0}>◀</button>
        <span>{currentPage + 1} / {pageCount}</span>
        <button class="btn btn--ghost btn--sm" aria-label={ui.nextPage} on:click={() => changePage(1)} disabled={currentPage === pageCount - 1}>▶</button>
      </div>
    {/if}

    <div class="canvas-wrapper">
      <canvas bind:this={canvasEl} width={canvasWidth} height={canvasHeight}></canvas>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        bind:this={overlayEl}
        class="canvas-overlay"
        style="width: {canvasWidth}px; height: {canvasHeight}px"
        on:pointerdown={onPointerDown}
        on:pointermove={onPointerMove}
        on:pointerup={onPointerUp}
      >
        {#each currentPageRedactions as r}
          <div
            class="redact-rect"
            style="left:{r.x * canvasWidth}px;top:{r.y * canvasHeight}px;width:{r.width * canvasWidth}px;height:{r.height * canvasHeight}px;background:{r.color === 'black' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}"
          ></div>
        {/each}
        {#if isDrawing && currentRect.w > 0}
          <div
            class="redact-rect redact-rect--drawing"
            style="left:{currentRect.x}px;top:{currentRect.y}px;width:{currentRect.w}px;height:{currentRect.h}px;background:{redactColor === 'black' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}"
          ></div>
        {/if}
      </div>
    </div>

    <div class="toolbar">
      <div class="toggle-group">
        <button class="toggle-btn" class:toggle-btn--active={redactColor === "black"} on:click={() => { redactColor = "black"; }}>
          {ui.pdfRedactBlack}
        </button>
        <button class="toggle-btn" class:toggle-btn--active={redactColor === "white"} on:click={() => { redactColor = "white"; }}>
          {ui.pdfRedactWhite}
        </button>
      </div>
      {#if redactions.length > 0}
        <button class="btn btn--ghost btn--sm" on:click={undoLast}>{ui.pdfRedactUndo}</button>
      {/if}
    </div>

    {#if redactions.length > 0}
      <div class="redact-list">
        {#each redactions as r, i}
          <div class="redact-item">
            <span>{ui.page} {r.pageIndex + 1} · {Math.round(r.width * 100)}×{Math.round(r.height * 100)}%</span>
            <button class="btn btn--ghost btn--sm" aria-label={ui.remove} on:click={() => removeRedaction(i)}>✕</button>
          </div>
        {/each}
      </div>
    {/if}

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={redactions.length > 0}
      isConverting={isProcessing}
      {isDone}
      onConvert={confirmAndConvert}
      onDownload={doDownload}
      convertLabel={ui.pdfRedactBtn}
      downloadLabel={ui.downloadPdf}
      fileCount={1}
    />

    {#if showConfirm}
      <div class="confirm-modal">
        <div class="confirm-modal__box">
          <p>{ui.pdfRedactConfirm}</p>
          <p class="confirm-modal__note">{ui.pdfRedactRasterNote}</p>
          <div class="confirm-modal__actions">
            <button class="btn btn--primary" on:click={doConvert}>{ui.pdfRedactBtn}</button>
            <button class="btn btn--ghost" on:click={() => { showConfirm = false; }}>{ui.cancel}</button>
          </div>
        </div>
      </div>
    {/if}

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
.alert--danger {
  padding: var(--sp-3) var(--sp-4);
  background: var(--red-bg, #f8d7da);
  color: var(--red-text, #721c24);
  border-radius: var(--r-md);
  border: 1px solid var(--red, #dc3545);
  font-size: .85rem;
  font-weight: 600;
}
.page-nav { display: flex; align-items: center; justify-content: center; gap: var(--sp-3); font-family: var(--font-mono); font-size: .85rem; }
.canvas-wrapper { position: relative; display: inline-block; margin: 0 auto; border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.canvas-overlay { position: absolute; top: 0; left: 0; cursor: crosshair; }
.redact-rect { position: absolute; pointer-events: none; border: 1px dashed rgba(255,0,0,0.5); }
.redact-rect--drawing { border-style: solid; }
.toolbar { display: flex; gap: var(--sp-3); align-items: center; flex-wrap: wrap; }
.toggle-group { display: flex; gap: var(--sp-2); }
.toggle-btn {
  padding: var(--sp-2) var(--sp-4);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--bg-input);
  color: var(--text);
  cursor: pointer;
  font-size: .85rem;
}
.toggle-btn--active { background: var(--accent, #333); color: white; border-color: var(--accent, #333); }
.redact-list { display: flex; flex-direction: column; gap: var(--sp-2); }
.redact-item { display: flex; align-items: center; justify-content: space-between; padding: var(--sp-2) var(--sp-3); background: var(--bg-input); border-radius: var(--r-md); font-size: .8rem; font-family: var(--font-mono); }
.confirm-modal {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.confirm-modal__box {
  background: var(--bg, white);
  padding: var(--sp-6);
  border-radius: var(--r-lg, 12px);
  max-width: 400px;
  text-align: center;
}
.confirm-modal__note { font-size: .8rem; color: var(--text-muted); margin-top: var(--sp-2); line-height: 1.5; }
.confirm-modal__actions { display: flex; gap: var(--sp-3); justify-content: center; margin-top: var(--sp-4); }
</style>
