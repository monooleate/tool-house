<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";

  const timing = getTimingConfig("pdf-oldalak-sorrendje");

  let file: File | null = null;
  let pageCount = 0;
  let isProcessing = false;
  let error = "";
  let orderInput = "";
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
      // Pre-fill with default order
      orderInput = Array.from({ length: pageCount }, (_, i) => i + 1).join(", ");
    } catch (err: any) {
      error = `Nem sikerult betolteni a PDF-et: ${err.message}`;
      pageCount = 0;
    }
  }

  function reverseOrder() {
    if (pageCount === 0) return;
    orderInput = Array.from({ length: pageCount }, (_, i) => pageCount - i).join(", ");
  }

  function resetOrder() {
    if (pageCount === 0) return;
    orderInput = Array.from({ length: pageCount }, (_, i) => i + 1).join(", ");
  }

  function parseOrder(input: string, max: number): number[] {
    const nums = input.split(",").map((s) => parseInt(s.trim(), 10));
    for (const n of nums) {
      if (isNaN(n) || n < 1 || n > max) {
        throw new Error(`Ervenytelen oldalszam: ${n}. Elfogadott: 1-${max}`);
      }
    }
    return nums.map((n) => n - 1);
  }

  async function doConvert() {
    if (!file || pageCount === 0 || !orderInput.trim()) return;
    isProcessing = true;
    error = "";
    try {
      const indices = parseOrder(orderInput, pageCount);
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const pages = await newDoc.copyPages(srcDoc, indices);
      pages.forEach((p) => newDoc.addPage(p));
      const result = await newDoc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}_atrendezve.pdf`;
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
    orderInput = "";
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
            <span class="stat__label">oldal</span>
          </div>
        </div>
      {/if}
    </div>

    <div class="card settings-card">
      <div class="field">
        <label class="label" for="page-order">Oldalak sorrendje</label>
        <input
          id="page-order"
          type="text"
          class="input input--wide"
          bind:value={orderInput}
          placeholder="pl. 3, 1, 2, 4"
        />
        <span class="hint">Oldalszamok az uj sorrendben, vesszivel elvalasztva</span>
      </div>
      <div class="quick-actions">
        <button class="btn btn--outline btn--sm" on:click={reverseOrder}>Forditott sorrend</button>
        <button class="btn btn--outline btn--sm" on:click={resetOrder}>Eredeti sorrend</button>
      </div>
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={orderInput.trim() !== "" && pageCount > 0}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel="Oldalak atrendezese"
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
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.input--wide { max-width: 100%; }
.hint { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
.quick-actions { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.stats-bar { display: flex; gap: var(--sp-6); }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat__num { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat__label { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
</style>
