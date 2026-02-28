<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadJson, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let isConverting = false;
  let error = "";
  let sheetNames: string[] = [];
  let selectedSheet = "";
  let hasHeader = true;
  let jsonPreview = "";
  let rowCount = 0;

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    jsonPreview = "";
    rowCount = 0;
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
      error = `${ui.fileLoadError}: ${err.message}`;
      sheetNames = [];
    }
  }

  async function convert() {
    if (!file || !selectedSheet) return;
    isConverting = true;
    error = "";
    jsonPreview = "";
    try {
      const XLSX = await import("xlsx");
      const arrayBuffer = await file.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      const ws = wb.Sheets[selectedSheet];
      if (!ws) {
        error = ui.sheetNotFound;
        return;
      }
      const json = XLSX.utils.sheet_to_json(ws, {
        header: hasHeader ? undefined : 1,
      });
      rowCount = json.length;

      const previewData = json.slice(0, 5);
      jsonPreview = JSON.stringify(previewData, null, 2);

      const baseName = file.name.replace(/\.(xlsx|xls)$/i, "");
      downloadJson(json, `${baseName}.json`);
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isConverting = false;
    }
  }

  function reset() {
    file = null;
    sheetNames = [];
    selectedSheet = "";
    jsonPreview = "";
    rowCount = 0;
    error = "";
  }
</script>

<div class="tool">
  {#if !file}
    <Dropzone
      accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      multiple={false}
      maxSizeMB={100}
      label={ui.dragHere}
      sublabel=".xlsx, .xls"
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

    {#if sheetNames.length > 0}
      <div class="card settings-card">
        <div class="field">
          <label class="label" for="sheet-select">{ui.sheet}</label>
          <select id="sheet-select" class="select" bind:value={selectedSheet}>
            {#each sheetNames as name}
              <option value={name}>{name}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={hasHeader} />
            {ui.firstRowIsHeader}
          </label>
        </div>
      </div>

      <button
        class="btn btn--primary"
        on:click={convert}
        disabled={isConverting || !selectedSheet}
      >
        {isConverting ? ui.convertingInProgress : ui.convertToJsonFile}
      </button>
    {/if}

    {#if jsonPreview}
      <div class="card preview-card">
        <h3 class="preview-title">{ui.preview} (5 / {rowCount})</h3>
        <pre class="preview-code">{jsonPreview}</pre>
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
.checkbox-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.preview-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.preview-title { margin: 0; font-size: .875rem; font-weight: 700; }
.preview-code { font-family: var(--font-mono); font-size: .75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); overflow-x: auto; white-space: pre; margin: 0; max-height: 400px; overflow-y: auto; }
</style>
