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
  import { onDestroy } from "svelte";

  const timing = getTimingConfig("alairas");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";

  // Tabs
  let activeTab: "draw" | "type" | "image" = "draw";

  // Signature data
  let signatureDataUrl: string | null = null;
  let signatureBytes: Uint8Array | null = null;

  // Draw tab
  let signCanvasEl: HTMLCanvasElement;
  let signaturePad: any = null;

  // Type tab
  let typedName = "";
  let typeCanvasEl: HTMLCanvasElement;

  // Image tab
  let sigImageBytes: Uint8Array | null = null;

  // Placement
  let selectedPage = 0; // 0-indexed, default last page
  let sigWidth = 200;

  // PDF preview canvas
  let pdfCanvasEl: HTMLCanvasElement;
  let pdfCanvasWidth = 0;
  let pdfCanvasHeight = 0;
  let fileBytes: Uint8Array | null = null;

  // Drag position
  let sigX = 50;
  let sigY = 50;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    if (signatureDataUrl) URL.revokeObjectURL(signatureDataUrl);
    signatureDataUrl = null;
    signatureBytes = null;
    convertBtnRef?.reset();
    loadPdf(f);
  }

  async function loadPdf(f: File) {
    try {
      fileBytes = new Uint8Array(await f.arrayBuffer());
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(fileBytes);
      pageCount = doc.getPageCount();
      selectedPage = pageCount - 1;
      await renderPdfPage();
    } catch (err: any) {
      error = mapPdfError(err);
    }
  }

  async function renderPdfPage() {
    if (!fileBytes || !pdfCanvasEl) return;
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "";
    const pdf = await pdfjsLib.getDocument({ data: fileBytes }).promise;
    const page = await pdf.getPage(selectedPage + 1);
    const maxWidth = Math.min(500, window.innerWidth - 40);
    const viewport = page.getViewport({ scale: 1 });
    const scale = maxWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });
    pdfCanvasWidth = Math.floor(scaledViewport.width);
    pdfCanvasHeight = Math.floor(scaledViewport.height);
    pdfCanvasEl.width = pdfCanvasWidth;
    pdfCanvasEl.height = pdfCanvasHeight;
    const ctx = pdfCanvasEl.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
  }

  $: if (selectedPage >= 0 && pdfCanvasEl && fileBytes) renderPdfPage();

  async function initSignaturePad() {
    if (!signCanvasEl) return;
    const SignaturePad = (await import("signature_pad")).default;
    signaturePad = new SignaturePad(signCanvasEl, {
      backgroundColor: "rgba(255,255,255,0)",
      penColor: "rgb(0, 0, 0)",
    });
  }

  function clearSignature() {
    signaturePad?.clear();
    if (signatureDataUrl) URL.revokeObjectURL(signatureDataUrl);
    signatureDataUrl = null;
    signatureBytes = null;
  }

  function saveDrawnSignature() {
    if (!signaturePad || signaturePad.isEmpty()) return;
    signatureDataUrl = signaturePad.toDataURL("image/png");
    const base64 = signatureDataUrl!.split(",")[1];
    signatureBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  }

  function renderTypedSignature() {
    if (!typeCanvasEl || !typedName.trim()) return;
    const ctx = typeCanvasEl.getContext("2d")!;
    typeCanvasEl.width = 400;
    typeCanvasEl.height = 100;
    ctx.clearRect(0, 0, 400, 100);
    ctx.font = "italic 40px 'Georgia', 'Times New Roman', serif";
    ctx.fillStyle = "#000";
    ctx.fillText(typedName, 10, 65);
    signatureDataUrl = typeCanvasEl.toDataURL("image/png");
    const base64 = signatureDataUrl.split(",")[1];
    signatureBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  }

  $: if (typedName && activeTab === "type") renderTypedSignature();

  function handleSigImage(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer);
      sigImageBytes = arr;
      signatureBytes = arr;
      if (signatureDataUrl) URL.revokeObjectURL(signatureDataUrl);
      signatureDataUrl = URL.createObjectURL(new Blob([arr], { type: f.type }));
    };
    reader.readAsArrayBuffer(f);
  }

  function onSigPointerDown(e: PointerEvent) {
    isDragging = true;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffset = { x: e.clientX - rect.left - sigX, y: e.clientY - rect.top - sigY };
  }

  function onSigPointerMove(e: PointerEvent) {
    if (!isDragging) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    sigX = Math.max(0, Math.min(pdfCanvasWidth - sigWidth, e.clientX - rect.left - dragOffset.x));
    sigY = Math.max(0, Math.min(pdfCanvasHeight - sigWidth / 2, e.clientY - rect.top - dragOffset.y));
  }

  function onSigPointerUp() {
    isDragging = false;
  }

  $: canConvert = file !== null && signatureBytes !== null;

  async function doConvert() {
    if (!fileBytes || !signatureBytes) return;
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(fileBytes);
      const page = doc.getPage(selectedPage);
      const { width: pageW, height: pageH } = page.getSize();

      let sigImg;
      // Detect if PNG or JPEG
      if (signatureBytes[0] === 0x89 && signatureBytes[1] === 0x50) {
        sigImg = await doc.embedPng(signatureBytes);
      } else {
        sigImg = await doc.embedJpg(signatureBytes);
      }

      const scaleX = pageW / pdfCanvasWidth;
      const scaleY = pageH / pdfCanvasHeight;
      const pdfX = sigX * scaleX;
      const pdfW = sigWidth * scaleX;
      const pdfH = (sigWidth / 2) * scaleY;
      const pdfY = pageH - (sigY * scaleY) - pdfH;

      page.drawImage(sigImg, { x: pdfX, y: pdfY, width: pdfW, height: pdfH });

      const result = await doc.save();
      const baseName = file!.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.pdfSignSuffix}.pdf`;
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
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    if (signatureDataUrl) URL.revokeObjectURL(signatureDataUrl);
    signatureDataUrl = null;
    signatureBytes = null;
    sigImageBytes = null;
    typedName = "";
    convertBtnRef?.reset();
  }

  onDestroy(() => {
    if (signatureDataUrl) URL.revokeObjectURL(signatureDataUrl);
  });
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

    <!-- Signature input tabs -->
    <div class="card">
      <div class="tab-bar">
        <button class="tab-btn" class:tab-btn--active={activeTab === "draw"} on:click={() => { activeTab = "draw"; setTimeout(initSignaturePad, 100); }}>
          ✏️ {ui.pdfSignDrawTab}
        </button>
        <button class="tab-btn" class:tab-btn--active={activeTab === "type"} on:click={() => { activeTab = "type"; }}>
          ⌨️ {ui.pdfSignTypeTab}
        </button>
        <button class="tab-btn" class:tab-btn--active={activeTab === "image"} on:click={() => { activeTab = "image"; }}>
          🖼️ {ui.pdfSignImageTab}
        </button>
      </div>

      {#if activeTab === "draw"}
        <div class="sign-canvas-wrapper">
          <canvas bind:this={signCanvasEl} width="400" height="150" class="sign-canvas"></canvas>
        </div>
        <div class="sign-actions">
          <button class="btn btn--ghost btn--sm" on:click={clearSignature}>{ui.pdfSignClear}</button>
          <button class="btn btn--outline btn--sm" on:click={saveDrawnSignature}>{ui.save}</button>
        </div>
      {:else if activeTab === "type"}
        <input type="text" class="input" bind:value={typedName} placeholder="..." />
        <canvas bind:this={typeCanvasEl} width="400" height="100" class="type-preview"></canvas>
      {:else if activeTab === "image"}
        <Dropzone
          accept="image/png,image/jpeg"
          multiple={false}
          maxSizeMB={2}
          label={ui.dragImageFor}
          sublabel="PNG, JPG"
          on:files={handleSigImage}
        />
      {/if}

      {#if signatureDataUrl}
        <div class="sig-preview">
          <img src={signatureDataUrl} alt="Signature" class="sig-preview__img" />
        </div>
      {/if}
    </div>

    <!-- Placement -->
    {#if signatureBytes}
      <div class="card">
        <div class="field">
          <span class="label">{ui.page}</span>
          <select class="input input--sm" bind:value={selectedPage}>
            {#each Array(pageCount) as _, i}
              <option value={i}>{i + 1}. {ui.pdfPage}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label class="label">{ui.resize}: {sigWidth}px</label>
          <input type="range" min="100" max="400" step="10" bind:value={sigWidth} />
        </div>

        <div class="placement-canvas-wrapper">
          <canvas bind:this={pdfCanvasEl} class="pdf-canvas"></canvas>
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="placement-overlay"
            style="width:{pdfCanvasWidth}px;height:{pdfCanvasHeight}px"
            on:pointermove={onSigPointerMove}
            on:pointerup={onSigPointerUp}
          >
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="sig-draggable"
              style="left:{sigX}px;top:{sigY}px;width:{sigWidth}px;height:{sigWidth/2}px"
              on:pointerdown={onSigPointerDown}
            >
              <img src={signatureDataUrl} alt="sig" style="width:100%;height:100%;object-fit:contain" />
            </div>
          </div>
        </div>
      </div>
    {/if}

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      {canConvert}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.pdfSignBtn}
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
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.input--sm { max-width: 200px; }
.tab-bar { display: flex; gap: var(--sp-2); margin-bottom: var(--sp-4); flex-wrap: wrap; }
.tab-btn {
  padding: var(--sp-2) var(--sp-4);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--bg-input);
  cursor: pointer;
  font-size: .85rem;
}
.tab-btn--active { background: var(--accent, #333); color: white; border-color: var(--accent); }
.sign-canvas-wrapper { border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.sign-canvas { width: 100%; max-width: 400px; height: 150px; display: block; touch-action: none; }
.sign-actions { display: flex; gap: var(--sp-2); }
.type-preview { border: 1px solid var(--border); border-radius: var(--r-md); max-width: 400px; }
.sig-preview { margin-top: var(--sp-3); }
.sig-preview__img { max-width: 200px; max-height: 80px; border: 1px dashed var(--border); border-radius: var(--r-sm); }
.placement-canvas-wrapper { position: relative; display: inline-block; border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.pdf-canvas { display: block; }
.placement-overlay { position: absolute; top: 0; left: 0; }
.sig-draggable {
  position: absolute;
  border: 2px dashed var(--accent, #333);
  cursor: move;
  touch-action: none;
  background: rgba(255,255,255,0.3);
}
</style>
