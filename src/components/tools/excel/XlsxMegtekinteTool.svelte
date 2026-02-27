<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { formatFileSize } from "../../../lib/download.ts";

  let file: File | null = null;
  let isLoading = false;
  let error = "";
  let sheetNames: string[] = [];
  let selectedSheet = "";
  let headers: string[] = [];
  let rows: string[][] = [];
  let totalRows = 0;

  const MAX_PREVIEW_ROWS = 100;

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    headers = [];
    rows = [];
    totalRows = 0;
    loadSheets(f);
  }

  async function loadSheets(f: File) {
    isLoading = true;
    try {
      const XLSX = await import("xlsx");
      const arrayBuffer = await f.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      sheetNames = wb.SheetNames;
      selectedSheet = sheetNames[0] || "";
      if (selectedSheet) {
        loadSheetData(wb, selectedSheet);
      }
    } catch (err: any) {
      error = `Nem sikerult betolteni a fajlt: ${err.message}`;
      sheetNames = [];
    } finally {
      isLoading = false;
    }
  }

  function loadSheetData(wb: any, sheetName: string) {
    const XLSX = (window as any).__xlsx_cached;
    const ws = wb.Sheets[sheetName];
    if (!ws) return;

    const jsonData: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
    if (jsonData.length === 0) {
      headers = [];
      rows = [];
      totalRows = 0;
      return;
    }

    headers = (jsonData[0] || []).map((h: any) => String(h ?? ""));
    totalRows = jsonData.length - 1;
    rows = jsonData
      .slice(1, MAX_PREVIEW_ROWS + 1)
      .map((row) => {
        const r: string[] = [];
        for (let i = 0; i < headers.length; i++) {
          r.push(String(row[i] ?? ""));
        }
        return r;
      });
  }

  async function switchSheet() {
    if (!file || !selectedSheet) return;
    isLoading = true;
    error = "";
    try {
      const XLSX = await import("xlsx");
      (window as any).__xlsx_cached = XLSX;
      const arrayBuffer = await file.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      loadSheetData(wb, selectedSheet);
    } catch (err: any) {
      error = `Hiba: ${err.message}`;
    } finally {
      isLoading = false;
    }
  }

  async function onSheetsLoaded() {
    // Cache XLSX module for sheet switching
    const XLSX = await import("xlsx");
    (window as any).__xlsx_cached = XLSX;
    if (file && selectedSheet) {
      const arrayBuffer = await file.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      loadSheetData(wb, selectedSheet);
    }
  }

  // Trigger initial load after sheets are ready
  $: if (sheetNames.length > 0 && file) {
    onSheetsLoaded();
  }

  function reset() {
    file = null;
    sheetNames = [];
    selectedSheet = "";
    headers = [];
    rows = [];
    totalRows = 0;
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

    {#if sheetNames.length > 1}
      <div class="sheet-tabs">
        {#each sheetNames as name}
          <button
            class="sheet-tab"
            class:sheet-tab--active={name === selectedSheet}
            on:click={() => { selectedSheet = name; switchSheet(); }}
          >
            {name}
          </button>
        {/each}
      </div>
    {/if}

    {#if isLoading}
      <div class="card loading-card">
        <span class="loading-text">Betoltes...</span>
      </div>
    {/if}

    {#if headers.length > 0}
      <div class="card table-card">
        <div class="table-info">
          <span class="table-info__text">
            {totalRows} sor osszesen{totalRows > MAX_PREVIEW_ROWS ? ` (elso ${MAX_PREVIEW_ROWS} megjelenitve)` : ""}
          </span>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="data-table__th data-table__th--num">#</th>
                {#each headers as h}
                  <th class="data-table__th">{h}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each rows as row, i}
                <tr>
                  <td class="data-table__td data-table__td--num">{i + 1}</td>
                  {#each row as cell}
                    <td class="data-table__td">{cell}</td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {:else if !isLoading}
      <div class="card empty-card">
        <span class="empty-text">A munkalap ures.</span>
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
.sheet-tabs { display: flex; gap: var(--sp-1); flex-wrap: wrap; }
.sheet-tab { font-family: var(--font-mono); font-size: .8125rem; padding: var(--sp-2) var(--sp-4); border: 1px solid var(--border); border-radius: var(--r-md); background: var(--bg-card); color: var(--text-muted); cursor: pointer; transition: all var(--t-fast); }
.sheet-tab:hover { border-color: var(--accent); color: var(--text); }
.sheet-tab--active { background: var(--accent); color: white; border-color: var(--accent); }
.loading-card { display: flex; justify-content: center; padding: var(--sp-6); }
.loading-text { font-size: .875rem; color: var(--text-muted); }
.table-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.table-info { display: flex; align-items: center; }
.table-info__text { font-size: .8125rem; color: var(--text-muted); }
.table-wrapper { overflow-x: auto; max-height: 500px; overflow-y: auto; border: 1px solid var(--border); border-radius: var(--r-md); }
.data-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: .75rem; }
.data-table__th { position: sticky; top: 0; background: var(--bg-input); padding: var(--sp-2) var(--sp-3); text-align: left; border-bottom: 2px solid var(--border); white-space: nowrap; font-weight: 700; font-size: .75rem; }
.data-table__th--num { width: 40px; text-align: center; color: var(--text-muted); }
.data-table__td { padding: var(--sp-2) var(--sp-3); border-bottom: 1px solid var(--border); white-space: nowrap; max-width: 300px; overflow: hidden; text-overflow: ellipsis; }
.data-table__td--num { text-align: center; color: var(--text-muted); font-size: .7rem; }
.data-table tbody tr:hover { background: var(--accent-subtle); }
.empty-card { text-align: center; padding: var(--sp-6); }
.empty-text { font-size: .875rem; color: var(--text-muted); }
</style>
