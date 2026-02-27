<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText, formatFileSize } from "../../../lib/download.ts";

  let file: File | null = null;
  let isConverting = false;
  let error = "";
  let sheetNames: string[] = [];
  let selectedSheet = "";
  let csvPreview = "";

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    csvPreview = "";
    loadSheets(f);
  }

  async function loadSheets(f: File) {
    try {
      const XLSX = await import("xlsx");
      const arrayBuffer = await f.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      sheetNames = wb.SheetNames;
      selectedSheet = sheetNames[0] || "";
    } catch (err: any) {
      error = `Nem sikerult betolteni a fajlt: ${err.message}`;
      sheetNames = [];
    }
  }

  async function convert() {
    if (!file || !selectedSheet) return;
    isConverting = true;
    error = "";
    csvPreview = "";
    try {
      const XLSX = await import("xlsx");
      const arrayBuffer = await file.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      const ws = wb.Sheets[selectedSheet];
      if (!ws) {
        error = "A kivalasztott munkalap nem talalhato.";
        return;
      }
      const csv = XLSX.utils.sheet_to_csv(ws);
      csvPreview = csv.split("\n").slice(0, 10).join("\n");
      const baseName = file.name.replace(/\.(xlsx|xls)$/i, "");
      downloadText(csv, `${baseName}.csv`, "text/csv;charset=utf-8");
    } catch (err: any) {
      error = `Hiba: ${err.message || "Ismeretlen hiba tortent."}`;
    } finally {
      isConverting = false;
    }
  }

  function reset() {
    file = null;
    sheetNames = [];
    selectedSheet = "";
    csvPreview = "";
    error = "";
  }
</script>

<div class="tool">
  {#if !file}
    <Dropzone
      accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      multiple={false}
      maxSizeMB={100}
      label="Huzd ide az Excel fajlt"
      sublabel=".xlsx, .xls"
      on:files={handleFiles}
    />
  {:else}
    <div class="card file-info">
      <div class="file-info__row">
        <span class="file-info__name">{file.name}</span>
        <span class="file-info__meta">{formatFileSize(file.size)}</span>
        <button class="btn btn--ghost btn--sm" on:click={reset}>Új fájl</button>
      </div>
    </div>

    {#if sheetNames.length > 0}
      <div class="card settings-card">
        <div class="field">
          <label class="label" for="sheet-select">Munkalap</label>
          <select id="sheet-select" class="select" bind:value={selectedSheet}>
            {#each sheetNames as name}
              <option value={name}>{name}</option>
            {/each}
          </select>
        </div>
      </div>

      <button
        class="btn btn--primary"
        on:click={convert}
        disabled={isConverting || !selectedSheet}
      >
        {isConverting ? "Konvertalas folyamatban..." : "Konvertalas CSV-be"}
      </button>
    {/if}

    {#if csvPreview}
      <div class="card preview-card">
        <h3 class="preview-title">Elonezet (elso 10 sor)</h3>
        <pre class="preview-code">{csvPreview}</pre>
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
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.select { max-width: 400px; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.preview-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.preview-title { margin: 0; font-size: .875rem; font-weight: 700; }
.preview-code { font-family: var(--font-mono); font-size: .75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); overflow-x: auto; white-space: pre; margin: 0; max-height: 300px; overflow-y: auto; }
</style>
