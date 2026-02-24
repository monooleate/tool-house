<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";

  const timing = getTimingConfig("pdf-oldalak-torlese");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let deleteInput = "";
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
      error = `Nem sikerult betolteni a PDF-et: ${err.message}`;
      pageCount = 0;
    }
  }

  function parseDeletePages(input: string, max: number): Set<number> {
    const indices = new Set<number>();
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (isNaN(a) || isNaN(b) || a < 1 || b > max || a > b) {
          throw new Error(`Ervenytelen tartomany: ${part}`);
        }
        for (let i = a; i <= b; i++) indices.add(i - 1);
      } else {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 1 || num > max) {
          throw new Error(`Ervenytelen oldalszam: ${part}`);
        }
        indices.add(num - 1);
      }
    }
    return indices;
  }

  async function doConvert() {
    if (!file || pageCount === 0 || !deleteInput.trim()) return;
    isProcessing = true;
    error = "";
    try {
      const toDelete = parseDeletePages(deleteInput, pageCount);
      if (toDelete.size >= pageCount) {
        error = "Nem torolheto az osszes oldal.";
        isProcessing = false;
        return;
      }

      const keepIndices: number[] = [];
      for (let i = 0; i < pageCount; i++) {
        if (!toDelete.has(i)) keepIndices.push(i);
      }

      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const pages = await newDoc.copyPages(srcDoc, keepIndices);
      pages.forEach((p) => newDoc.addPage(p));
      const result = await newDoc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}_torolve.pdf`;
      isDone = true;
    } catch (err: any) {
      error = `Hiba: ${err.message || "Ismeretlen hiba tortent."}`;
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
    deleteInput = "";
    isDone = false;
    resultBlob = null;
    convertBtnRef?.reset();
  }

  $: deleteCount = (() => {
    try {
      if (!deleteInput.trim() || pageCount === 0) return 0;
      return parseDeletePages(deleteInput, pageCount).size;
    } catch {
      return 0;
    }
  })();

  $: remainingCount = pageCount - deleteCount;
</script>

<div class="tool">
  {#if !file}
    <Dropzone
      accept=".pdf,application/pdf"
      multiple={false}
      maxSizeMB={200}
      label="Huzd ide a PDF fajlt"
      sublabel=".pdf"
      on:files={handleFiles}
    />
  {:else}
    <div class="card file-info">
      <div class="file-info__row">
        <span class="file-info__name">{file.name}</span>
        <span class="file-info__meta">{formatFileSize(file.size)}</span>
        <button class="btn btn--ghost btn--sm" on:click={reset}>Uj fajl</button>
      </div>
      {#if pageCount > 0}
        <div class="stats-bar">
          <div class="stat">
            <span class="stat__num">{pageCount}</span>
            <span class="stat__label">osszes oldal</span>
          </div>
          <div class="stat">
            <span class="stat__num stat__num--danger">{deleteCount}</span>
            <span class="stat__label">torlendo</span>
          </div>
          <div class="stat">
            <span class="stat__num">{remainingCount}</span>
            <span class="stat__label">marado</span>
          </div>
        </div>
      {/if}
    </div>

    <div class="card settings-card">
      <div class="field">
        <label class="label" for="delete-pages">Torlendo oldalak</label>
        <input
          id="delete-pages"
          type="text"
          class="input"
          bind:value={deleteInput}
          placeholder="pl. 1, 3-5, 8"
        />
        <span class="hint">Oldalszamok es tartomanyok vesszivel elvalasztva (1-{pageCount})</span>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={deleteCount > 0 && remainingCount >= 1 && pageCount > 0}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel="Oldalak torlese"
      downloadLabel="PDF letoltese"
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
.hint { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
.stats-bar { display: flex; gap: var(--sp-6); flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__num--danger { color: var(--error, #e53e3e); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
