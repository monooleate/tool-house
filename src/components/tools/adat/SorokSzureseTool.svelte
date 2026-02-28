<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  // ─── CSV helpers ────────────────────────────────────────────
  function parseCsvSimple(text: string, delimiter: string = ","): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuote = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (inQuote) {
        if (ch === '"' && next === '"') { field += '"'; i++; }
        else if (ch === '"') { inQuote = false; }
        else { field += ch; }
      } else {
        if (ch === '"') { inQuote = true; }
        else if (ch === delimiter) { row.push(field); field = ""; }
        else if (ch === "\n" || (ch === "\r" && next === "\n")) {
          if (ch === "\r") i++;
          row.push(field); field = "";
          if (row.some(f => f !== "")) rows.push(row);
          row = [];
        } else { field += ch; }
      }
    }
    if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }
    return rows;
  }

  function rowsToCsv(rows: string[][], delimiter: string = ","): string {
    return rows.map(row => row.map(f => {
      if (f.includes(delimiter) || f.includes('"') || f.includes("\n")) return '"' + f.replace(/"/g, '""') + '"';
      return f;
    }).join(delimiter)).join("\n");
  }

  // ─── State ──────────────────────────────────────────────────
  let status: "idle" | "filtering" | "done" | "error" = "idle";
  let error = "";
  let delimiter = ",";
  let rows: string[][] = [];
  let headers: string[] = [];
  let filename = "";

  // Filter settings
  let filterColumn = 0;
  let condition: "contains" | "equals" | "not-empty" | "greater" | "less" = "contains";
  let filterValue = "";
  let previewRows = 20;

  // Results
  let filteredRows: string[][] = [];

  // ─── File handler ───────────────────────────────────────────
  async function handleFiles(event: CustomEvent<File[]>) {
    const file = event.detail[0];
    if (!file) return;

    error = "";
    filename = file.name;
    const text = await file.text();

    try {
      rows = parseCsvSimple(text, delimiter);
      if (rows.length < 2) {
        error = "A fajlnak legalabb 2 sort kell tartalmaznia (fejlec + adat).";
        status = "error";
        return;
      }
      headers = rows[0];
      filterColumn = 0;
      filterValue = "";
      condition = "contains";
      filteredRows = [];
      status = "filtering";
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      status = "error";
    }
  }

  // ─── Filter ─────────────────────────────────────────────────
  function applyFilter() {
    const dataRows = rows.slice(1);
    const colIdx = filterColumn;

    filteredRows = dataRows.filter(row => {
      const val = (row[colIdx] ?? "").trim();

      switch (condition) {
        case "contains":
          return val.toLowerCase().includes(filterValue.toLowerCase());
        case "equals":
          return val.toLowerCase() === filterValue.toLowerCase();
        case "not-empty":
          return val !== "";
        case "greater": {
          const num = parseFloat(val);
          const threshold = parseFloat(filterValue);
          return !isNaN(num) && !isNaN(threshold) && num > threshold;
        }
        case "less": {
          const num = parseFloat(val);
          const threshold = parseFloat(filterValue);
          return !isNaN(num) && !isNaN(threshold) && num < threshold;
        }
        default:
          return true;
      }
    });
  }

  // ─── Download ───────────────────────────────────────────────
  function downloadResult() {
    const allRows = [headers, ...filteredRows];
    const csv = rowsToCsv(allRows, delimiter);
    const dotIdx = filename.lastIndexOf(".");
    const base = dotIdx !== -1 ? filename.slice(0, dotIdx) : filename;
    downloadText(csv, base + "_szurt.csv", "text/csv;charset=utf-8");
  }

  // ─── Reset ──────────────────────────────────────────────────
  function reset() {
    status = "idle";
    error = "";
    rows = [];
    headers = [];
    filename = "";
    filteredRows = [];
    filterValue = "";
  }

  // ─── Preview ────────────────────────────────────────────────
  $: previewText = filteredRows.length > 0
    ? rowsToCsv([headers, ...filteredRows.slice(0, previewRows)], delimiter)
    : "";

  $: needsValue = condition !== "not-empty";

  const CONDITIONS = [
    { value: "contains", label: ui.contains },
    { value: "equals",   label: ui.equals },
    { value: "not-empty", label: ui.notEmpty },
    { value: "greater",  label: ui.greaterThan },
    { value: "less",     label: ui.lessThan },
  ];

  const DELIMITERS = [
    { value: ",",  label: ui.comma },
    { value: ";",  label: ui.semicolon },
    { value: "\t", label: ui.tabChar },
    { value: "|",  label: "Pipe (|)" },
  ];
</script>

<!-- Settings -->
<div class="card settings" aria-label={ui.settings}>
  <div class="settings__row">
    <label class="label" for="delimiter-select">{ui.delimiter}</label>
    <select
      id="delimiter-select"
      class="select"
      bind:value={delimiter}
      style="width: 200px;"
    >
      {#each DELIMITERS as d}
        <option value={d.value}>{d.label}</option>
      {/each}
    </select>
  </div>
</div>

<!-- Dropzone -->
{#if status === "idle"}
  <Dropzone
    accept=".csv,text/csv,text/plain"
    multiple={false}
    maxSizeMB={20}
    label={ui.dragHere}
    sublabel="CSV, TXT - Max. 20 MB"
    on:files={handleFiles}
  />
{/if}

<!-- Error -->
{#if status === "error"}
  <div class="alert alert--error" role="alert">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    <div>
      <strong>{ui.error}:</strong> {error}
      <button class="btn btn--ghost btn--sm" on:click={reset} style="margin-left: 8px;">{ui.retry}</button>
    </div>
  </div>
{/if}

<!-- Filter UI -->
{#if status === "filtering"}
  <div class="filter-panel">
    <div class="filter-panel__header">
      <span class="filter-panel__title">Sorok szurese</span>
      <span class="filter-panel__info">{rows.length - 1} {ui.row} &middot; {headers.length} {ui.column}</span>
    </div>

    <div class="filter-controls">
      <div class="filter-row">
        <div class="filter-field">
          <label class="label" for="filter-column">Oszlop</label>
          <select id="filter-column" class="select" bind:value={filterColumn}>
            {#each headers as h, i}
              <option value={i}>{h}</option>
            {/each}
          </select>
        </div>

        <div class="filter-field">
          <label class="label" for="filter-condition">Feltetel</label>
          <select id="filter-condition" class="select" bind:value={condition}>
            {#each CONDITIONS as c}
              <option value={c.value}>{c.label}</option>
            {/each}
          </select>
        </div>

        {#if needsValue}
          <div class="filter-field filter-field--value">
            <label class="label" for="filter-value">Ertek</label>
            <input
              id="filter-value"
              type="text"
              class="input"
              bind:value={filterValue}
              placeholder={ui.searchValuePlaceholder}
            />
          </div>
        {/if}
      </div>

      <div class="filter-actions">
        <button class="btn btn--primary" on:click={applyFilter}>
          Szures alkalmazasa
        </button>
        <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.cancel}</button>
      </div>
    </div>

    <!-- Results -->
    {#if filteredRows.length > 0}
      <div class="filter-results">
        <div class="stats-bar">
          <div class="stat">
            <span class="stat__num">{filteredRows.length.toLocaleString(ui.locale)}</span>
            <span class="stat__label">talalat</span>
          </div>
          <div class="stat">
            <span class="stat__num">{(rows.length - 1 - filteredRows.length).toLocaleString(ui.locale)}</span>
            <span class="stat__label">kiszurt</span>
          </div>

          <div class="stats-bar__actions">
            <button class="btn btn--primary" on:click={downloadResult}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {ui.downloadCsv}
            </button>
          </div>
        </div>

        <div class="preview-block">
          <div class="preview-block__header">
            <span class="preview-block__title">{ui.preview}</span>
            <label class="preview-rows-label">
              {ui.rowsColon}
              <select bind:value={previewRows} class="select select--sm">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
          <pre class="csv-preview"><code>{previewText}</code></pre>
          {#if filteredRows.length > previewRows}
            <div class="preview-more">
              {ui.andMoreRows.replace("{n}", (filteredRows.length - previewRows).toLocaleString(ui.locale))}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
.settings {
  margin-bottom: var(--sp-5);
}

.settings__row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.filter-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.filter-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
}

.filter-panel__title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-panel__info {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.filter-controls {
  padding: var(--sp-4);
}

.filter-row {
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-bottom: var(--sp-4);
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  min-width: 150px;
}

.filter-field--value {
  flex: 1;
  min-width: 200px;
}

.filter-field .input {
  padding: var(--sp-2) var(--sp-3);
  font-size: 0.875rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text);
}

.filter-field .input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-subtle);
}

.filter-actions {
  display: flex;
  gap: var(--sp-2);
  align-items: center;
}

.filter-results {
  border-top: 1px solid var(--border);
  padding: var(--sp-4);
}

.stats-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-5);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  margin-bottom: var(--sp-4);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat__num {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent);
}

.stat__label {
  font-size: 0.72rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.stats-bar__actions {
  display: flex;
  gap: var(--sp-2);
  align-items: center;
  margin-left: auto;
}

.preview-block {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.preview-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
  background: var(--bg-card);
}

.preview-block__title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.preview-rows-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.select--sm {
  width: auto;
  padding: 2px 6px;
  font-size: 0.8rem;
}

.csv-preview {
  margin: 0;
  padding: var(--sp-4);
  max-height: 400px;
  overflow-y: auto;
  border: none;
  border-radius: 0;
  background: transparent;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text);
  white-space: pre-wrap;
  word-break: break-all;
}

.preview-more {
  padding: var(--sp-3) var(--sp-4);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
  border-top: 1px solid var(--border);
  text-align: center;
}
</style>
