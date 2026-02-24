<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { formatFileSize } from "../../../lib/download.ts";

  let file: File | null = null;
  let isLoading = false;
  let error = "";

  interface PdfInfo {
    pageCount: number;
    title: string;
    author: string;
    subject: string;
    creator: string;
    producer: string;
    creationDate: string;
    modificationDate: string;
    fileSize: string;
    fileName: string;
    pageWidth: string;
    pageHeight: string;
  }

  let info: PdfInfo | null = null;

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    info = null;
    loadInfo(f);
  }

  function formatPdfDate(date: Date | null | undefined): string {
    if (!date) return "-";
    try {
      return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  }

  async function loadInfo(f: File) {
    isLoading = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);

      const firstPage = doc.getPage(0);
      const { width, height } = firstPage.getSize();

      info = {
        pageCount: doc.getPageCount(),
        title: doc.getTitle() || "-",
        author: doc.getAuthor() || "-",
        subject: doc.getSubject() || "-",
        creator: doc.getCreator() || "-",
        producer: doc.getProducer() || "-",
        creationDate: formatPdfDate(doc.getCreationDate()),
        modificationDate: formatPdfDate(doc.getModificationDate()),
        fileSize: formatFileSize(f.size),
        fileName: f.name,
        pageWidth: `${Math.round(width)} pt (${(width / 72 * 25.4).toFixed(1)} mm)`,
        pageHeight: `${Math.round(height)} pt (${(height / 72 * 25.4).toFixed(1)} mm)`,
      };
    } catch (err: any) {
      error = `Nem sikerult betolteni a PDF-et: ${err.message}`;
      info = null;
    } finally {
      isLoading = false;
    }
  }

  function reset() {
    file = null;
    info = null;
    error = "";
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
    </div>

    {#if isLoading}
      <div class="card loading-card">
        <span class="loading-text">Informaciok betoltese...</span>
      </div>
    {/if}

    {#if info}
      <div class="card info-card">
        <h3 class="info-card__title">PDF informaciok</h3>
        <table class="info-table">
          <tbody>
            <tr>
              <td class="info-table__label">Fajlnev</td>
              <td class="info-table__value">{info.fileName}</td>
            </tr>
            <tr>
              <td class="info-table__label">Fajlmeret</td>
              <td class="info-table__value">{info.fileSize}</td>
            </tr>
            <tr>
              <td class="info-table__label">Oldalszam</td>
              <td class="info-table__value">{info.pageCount}</td>
            </tr>
            <tr>
              <td class="info-table__label">Oldalmeret (elso oldal)</td>
              <td class="info-table__value">{info.pageWidth} x {info.pageHeight}</td>
            </tr>
            <tr>
              <td class="info-table__label">Cim</td>
              <td class="info-table__value">{info.title}</td>
            </tr>
            <tr>
              <td class="info-table__label">Szerzo</td>
              <td class="info-table__value">{info.author}</td>
            </tr>
            <tr>
              <td class="info-table__label">Targy</td>
              <td class="info-table__value">{info.subject}</td>
            </tr>
            <tr>
              <td class="info-table__label">Letrehozo program</td>
              <td class="info-table__value">{info.creator}</td>
            </tr>
            <tr>
              <td class="info-table__label">PDF producer</td>
              <td class="info-table__value">{info.producer}</td>
            </tr>
            <tr>
              <td class="info-table__label">Letrehozas datuma</td>
              <td class="info-table__value">{info.creationDate}</td>
            </tr>
            <tr>
              <td class="info-table__label">Modositas datuma</td>
              <td class="info-table__value">{info.modificationDate}</td>
            </tr>
          </tbody>
        </table>
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
.loading-card { display: flex; justify-content: center; padding: var(--sp-6); }
.loading-text { font-size: .875rem; color: var(--text-muted); }
.info-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.info-card__title { margin: 0; font-size: 1rem; font-weight: 700; }
.info-table { width: 100%; border-collapse: collapse; }
.info-table tr { border-bottom: 1px solid var(--border); }
.info-table tr:last-child { border-bottom: none; }
.info-table td { padding: var(--sp-3) var(--sp-2); vertical-align: top; }
.info-table__label { font-size: .8125rem; color: var(--text-muted); white-space: nowrap; width: 180px; }
.info-table__value { font-family: var(--font-mono); font-size: .875rem; word-break: break-all; }
</style>
