<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("kepek-pdfbe");

  let files: File[] = [];
  let isConverting = false;
  let error = "";
  let pageSize: "original" | "a4-portrait" | "a4-landscape" = "original";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultFilename = "";

  const A4_W = 595.28;
  const A4_H = 841.89;

  function handleFiles(e: CustomEvent<File[]>) {
    files = [...files, ...e.detail];
    error = "";
    isDone = false;
    convertBtnRef?.reset();
  }

  function removeFile(index: number) {
    files = files.filter((_, i) => i !== index);
    isDone = false;
    convertBtnRef?.reset();
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const arr = [...files];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    files = arr;
  }

  function moveDown(index: number) {
    if (index >= files.length - 1) return;
    const arr = [...files];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    files = arr;
  }

  function clearAll() {
    files = [];
    error = "";
    isDone = false;
    convertBtnRef?.reset();
  }

  async function doConvert() {
    if (files.length === 0) {
      error = ui.minOneImage;
      return;
    }
    isConverting = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();

      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        let img;
        const lowerName = file.name.toLowerCase();
        if (file.type === "image/jpeg" || lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) {
          img = await doc.embedJpg(bytes);
        } else {
          img = await doc.embedPng(bytes);
        }

        let pw: number;
        let ph: number;
        let x = 0;
        let y = 0;
        let drawW: number;
        let drawH: number;

        if (pageSize === "original") {
          pw = img.width;
          ph = img.height;
          drawW = img.width;
          drawH = img.height;
        } else {
          pw = pageSize === "a4-portrait" ? A4_W : A4_H;
          ph = pageSize === "a4-portrait" ? A4_H : A4_W;
          const scaleX = pw / img.width;
          const scaleY = ph / img.height;
          const s = Math.min(scaleX, scaleY);
          drawW = img.width * s;
          drawH = img.height * s;
          x = (pw - drawW) / 2;
          y = (ph - drawH) / 2;
        }

        const page = doc.addPage([pw, ph]);
        page.drawImage(img, { x, y, width: drawW, height: drawH });
      }

      const result = await doc.save();
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = "kepek.pdf";
      isDone = true;
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isConverting = false;
    }
  }

  function doDownload() {
    if (resultBlob) {
      downloadBlob(resultBlob, resultFilename);
    }
  }

  $: totalSize = files.reduce((sum, f) => sum + f.size, 0);
</script>

<div class="tool">
  <Dropzone
    accept="image/jpeg,image/png,.jpg,.jpeg,.png"
    multiple={true}
    maxSizeMB={100}
    label={ui.dragHereMulti}
    sublabel=".jpg, .png"
    on:files={handleFiles}
  />

  {#if files.length > 0}
    <div class="card file-list-card">
      <div class="file-header">
        <span class="label">{files.length} {ui.imageCountLabel} ({formatFileSize(totalSize)})</span>
        <button class="btn btn--ghost btn--sm" on:click={clearAll}>{ui.deleteAll}</button>
      </div>
      <ul class="file-list">
        {#each files as file, i}
          <li class="file-item">
            <span class="file-item__num">{i + 1}.</span>
            <span class="file-item__name" title={file.name}>{file.name}</span>
            <span class="file-item__size">{formatFileSize(file.size)}</span>
            <div class="file-item__actions">
              <button class="btn btn--ghost btn--sm" on:click={() => moveUp(i)} disabled={i === 0} title={ui.moveUp}>&#9650;</button>
              <button class="btn btn--ghost btn--sm" on:click={() => moveDown(i)} disabled={i === files.length - 1} title={ui.moveDown}>&#9660;</button>
              <button class="btn btn--ghost btn--sm" on:click={() => removeFile(i)} title={ui.remove}>&#10005;</button>
            </div>
          </li>
        {/each}
      </ul>
    </div>

    <div class="card settings-card">
      <div class="field">
        <span class="label">{ui.pageSizeLabel}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={pageSize} value="original" />
            {ui.originalImageSize}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={pageSize} value="a4-portrait" />
            {ui.a4Portrait}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={pageSize} value="a4-landscape" />
            {ui.a4Landscape}
          </label>
        </div>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    {#if files.length > 0}
      <ConvertButton
        bind:this={convertBtnRef}
        {timing}
        canConvert={files.length > 0}
        isConverting={isConverting}
        {isDone}
        onConvert={doConvert}
        onDownload={doDownload}
        convertLabel={ui.createPdf}
        downloadLabel={ui.downloadPdf}
        fileCount={files.length}
      />
    {/if}

    <AdSlot show={timing.showAdSlot} slot="before-download" />
  {/if}

  {#if error}
    <div class="alert alert--error" role="alert">{error}</div>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.file-list-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.file-header { display: flex; align-items: center; justify-content: space-between; }
.file-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--sp-2); max-height: 400px; overflow-y: auto; }
.file-item { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-3); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); }
.file-item__num { font-family: var(--font-mono); font-size: .78rem; font-weight: 700; color: var(--text-muted); min-width: 2ch; }
.file-item__name { flex: 1; font-family: var(--font-mono); font-size: .875rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-item__size { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); flex-shrink: 0; }
.file-item__actions { display: flex; gap: var(--sp-1); flex-shrink: 0; }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
</style>
