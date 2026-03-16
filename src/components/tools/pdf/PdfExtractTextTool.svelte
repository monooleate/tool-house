<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let isProcessing = false;
  let error = "";
  let extractedText = "";
  let wordCount = 0;
  let charCount = 0;
  let pageCountNum = 0;
  let isScanned = false;
  let copySuccess = false;

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    extractedText = "";
    isScanned = false;
    extractText(f);
  }

  async function extractText(f: File) {
    isProcessing = true;
    error = "";
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      const bytes = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      pageCountNum = pdf.numPages;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(" ");
        fullText += `--- ${ui.pdfPage} ${i} ---\n${pageText}\n\n`;
      }
      extractedText = fullText.trim();
      // Scanned PDF detection
      if (extractedText.replace(/---.*---/g, "").trim().length < pageCountNum * 10) {
        isScanned = true;
      }
      // Stats
      const cleanText = extractedText.replace(/---.*---\n?/g, "").trim();
      wordCount = cleanText.split(/\s+/).filter(Boolean).length;
      charCount = cleanText.length;
    } catch (err: any) {
      error = `${ui.pdfLoadError}: ${err.message}`;
    } finally {
      isProcessing = false;
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(extractedText);
      copySuccess = true;
      setTimeout(() => { copySuccess = false; }, 2000);
    } catch {
      error = ui.error;
    }
  }

  function downloadTxt() {
    const baseName = file?.name.replace(/\.pdf$/i, "") ?? "text";
    downloadText(extractedText, `${baseName}.txt`);
  }

  function reset() {
    file = null;
    extractedText = "";
    error = "";
    isScanned = false;
    wordCount = 0;
    charCount = 0;
    pageCountNum = 0;
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
      </div>
    </div>

    {#if isProcessing}
      <div class="processing">{ui.processing}</div>
    {/if}

    {#if extractedText}
      {#if isScanned}
        <div class="alert alert--warning" role="alert">
          {ui.pdfExtractScannedWarning}
        </div>
      {/if}

      <div class="stats-badge">
        {ui.pdfExtractStats
          .replace("{words}", wordCount.toLocaleString())
          .replace("{chars}", charCount.toLocaleString())
          .replace("{pages}", String(pageCountNum))}
      </div>

      <textarea class="text-output" readonly>{extractedText}</textarea>

      <div class="actions">
        <button class="btn btn--primary" on:click={copyToClipboard}>
          📋 {copySuccess ? ui.copied : ui.pdfExtractCopy}
        </button>
        <button class="btn btn--outline" on:click={downloadTxt}>
          💾 {ui.pdfExtractDownloadTxt}
        </button>
        <button class="btn btn--ghost" on:click={reset}>
          {ui.pdfResetBtn}
        </button>
      </div>
    {/if}
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
.processing { text-align: center; padding: var(--sp-6); color: var(--text-muted); font-size: .9rem; }
.stats-badge {
  padding: var(--sp-3) var(--sp-4);
  background: var(--bg-input, #f0f0f0);
  border-radius: var(--r-md);
  font-family: var(--font-mono);
  font-size: .85rem;
  text-align: center;
  color: var(--text-muted);
}
.text-output {
  width: 100%;
  min-height: 350px;
  font-family: var(--font-mono);
  font-size: .8rem;
  background: var(--bg-input);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: var(--sp-4);
  resize: vertical;
  line-height: 1.5;
}
.actions { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.alert--warning {
  padding: var(--sp-3) var(--sp-4);
  background: var(--yellow-bg, #fff3cd);
  color: var(--yellow-text, #856404);
  border-radius: var(--r-md);
  font-size: .85rem;
}
</style>
