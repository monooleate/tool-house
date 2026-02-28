<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("pdf-osszefuzes");

  let files: File[] = [];
  let isMerging = false;
  let error = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultFilename = "";

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
    if (files.length < 2) {
      error = ui.minTwoPdf;
      return;
    }
    isMerging = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const result = await merged.save();
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = "merged.pdf";
      isDone = true;
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isMerging = false;
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
    accept=".pdf,application/pdf"
    multiple={true}
    maxSizeMB={200}
    label={ui.dragHereMulti}
    sublabel=".pdf"
    on:files={handleFiles}
  />

  {#if files.length > 0}
    <div class="card file-list-card">
      <div class="file-header">
        <span class="label">{files.length} {ui.fileCountLabel} ({formatFileSize(totalSize)})</span>
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

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    {#if files.length >= 2}
      <ConvertButton
        bind:this={convertBtnRef}
        {timing}
        canConvert={files.length >= 2}
        isConverting={isMerging}
        {isDone}
        onConvert={doConvert}
        onDownload={doDownload}
        convertLabel={ui.mergePdfs}
        downloadLabel={ui.downloadMergedPdf}
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
</style>
