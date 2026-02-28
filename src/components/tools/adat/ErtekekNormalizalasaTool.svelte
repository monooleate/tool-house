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
  let status: "idle" | "configuring" | "done" | "error" = "idle";
  let error = "";
  let delimiter = ",";
  let rows: string[][] = [];
  let headers: string[] = [];
  let filename = "";
  let mode: "min-max" | "z-score" = "min-max";
  let previewRows = 20;

  // Detected numeric column indices
  let numericColumns: number[] = [];
  let selectedColumns: boolean[] = [];

  // Result
  let resultCsv = "";
  let resultRows: string[][] = [];

  // ─── File handler ───────────────────────────────────────────
  async function handleFiles(event: CustomEvent<File[]>) {
    const file = event.detail[0];
    if (!file) return;

    error = "";
    filename = file.name;
    const text = await file.text();

    try {
      rows = parseCsvSimple(text, delimiter);
      if (rows.length < 3) {
        error = ui.csvMinimumRows;
        status = "error";
        return;
      }
      headers = rows[0];

      // Detect numeric columns
      const dataRows = rows.slice(1);
      numericColumns = [];
      for (let colIdx = 0; colIdx < headers.length; colIdx++) {
        let numCount = 0;
        let total = 0;
        for (const row of dataRows) {
          const val = (row[colIdx] ?? "").trim();
          if (val === "") continue;
          total++;
          if (!isNaN(parseFloat(val)) && isFinite(Number(val))) {
            numCount++;
          }
        }
        // Consider numeric if >80% of non-empty values are numbers
        if (total > 0 && numCount / total > 0.8) {
          numericColumns.push(colIdx);
        }
      }

      if (numericColumns.length === 0) {
        error = ui.noNumericColumns;
        status = "error";
        return;
      }

      selectedColumns = numericColumns.map(() => true);
      status = "configuring";
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      status = "error";
    }
  }

  // ─── Normalize ──────────────────────────────────────────────
  function normalize() {
    const activeIndices = numericColumns.filter((_, i) => selectedColumns[i]);
    if (activeIndices.length === 0) {
      error = ui.noNumericColumns;
      return;
    }

    error = "";
    const dataRows = rows.slice(1);

    // Compute stats for each selected column
    const stats = new Map<number, { min: number; max: number; mean: number; std: number }>();

    for (const colIdx of activeIndices) {
      const values: number[] = [];
      for (const row of dataRows) {
        const val = parseFloat((row[colIdx] ?? "").trim());
        if (!isNaN(val)) values.push(val);
      }

      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
      const std = Math.sqrt(variance);

      stats.set(colIdx, { min, max, mean, std });
    }

    // Build normalized data
    resultRows = [headers];
    for (const row of dataRows) {
      const newRow = [...row];
      for (const colIdx of activeIndices) {
        const val = parseFloat((row[colIdx] ?? "").trim());
        const s = stats.get(colIdx)!;

        if (isNaN(val)) {
          newRow[colIdx] = "";
          continue;
        }

        if (mode === "min-max") {
          const range = s.max - s.min;
          newRow[colIdx] = range === 0 ? "0" : ((val - s.min) / range).toFixed(6);
        } else {
          // z-score
          newRow[colIdx] = s.std === 0 ? "0" : ((val - s.mean) / s.std).toFixed(6);
        }
      }
      resultRows.push(newRow);
    }

    resultCsv = rowsToCsv(resultRows, delimiter);
    status = "done";
  }

  // ─── Download ───────────────────────────────────────────────
  function downloadResult() {
    const dotIdx = filename.lastIndexOf(".");
    const base = dotIdx !== -1 ? filename.slice(0, dotIdx) : filename;
    downloadText(resultCsv, base + "_normalized.csv", "text/csv;charset=utf-8");
  }

  // ─── Reset ──────────────────────────────────────────────────
  function reset() {
    status = "idle";
    error = "";
    rows = [];
    headers = [];
    filename = "";
    numericColumns = [];
    selectedColumns = [];
    resultCsv = "";
    resultRows = [];
  }

  function backToConfig() {
    status = "configuring";
    error = "";
  }

  // ─── Preview ────────────────────────────────────────────────
  $: previewText = resultCsv
    ? resultCsv.split("\n").slice(0, previewRows + 1).join("\n")
    : "";

  $: selectedCount = selectedColumns.filter(Boolean).length;

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

<!-- Configuration -->
{#if status === "configuring"}
  <div class="config-panel">
    <div class="config-panel__header">
      <span class="config-panel__title">{ui.settings}</span>
      <span class="config-panel__info">{numericColumns.length} {ui.columns}</span>
    </div>

    <div class="config-controls">
      <!-- Mode selection -->
      <div class="config-field" style="margin-bottom: var(--sp-4);">
        <label class="label">{ui.settings}</label>
        <div class="mode-options">
          <label class="radio-label">
            <input type="radio" bind:group={mode} value="min-max" class="radio" />
            <span>Min-Max (0-1)</span>
            <span class="mode-desc">0 - 1</span>
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={mode} value="z-score" class="radio" />
            <span>Z-score</span>
            <span class="mode-desc">(x - mean) / std</span>
          </label>
        </div>
      </div>

      <!-- Column selection -->
      <div class="config-field">
        <label class="label">{ui.columns} ({selectedCount} / {numericColumns.length})</label>
        <div class="columns-grid">
          {#each numericColumns as colIdx, i}
            <label class="column-checkbox">
              <input
                type="checkbox"
                bind:checked={selectedColumns[i]}
                class="checkbox"
              />
              <span class="column-checkbox__label">{headers[colIdx]}</span>
            </label>
          {/each}
        </div>
      </div>

      <div class="config-actions">
        <button
          class="btn btn--primary"
          on:click={normalize}
          disabled={selectedCount === 0}
        >
          {ui.apply}
        </button>
        <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.cancel}</button>
      </div>
    </div>
  </div>
{/if}

<!-- Result -->
{#if status === "done"}
  <div class="result">
    <div class="stats-bar">
      <div class="stat">
        <span class="stat__num">{(resultRows.length - 1).toLocaleString(ui.locale)}</span>
        <span class="stat__label">{ui.row}</span>
      </div>
      <div class="stat">
        <span class="stat__num">{selectedCount}</span>
        <span class="stat__label">{ui.columns}</span>
      </div>
      <div class="stat">
        <span class="stat__num">{mode === "min-max" ? "0-1" : "Z"}</span>
        <span class="stat__label">{ui.settings}</span>
      </div>

      <div class="stats-bar__actions">
        <button class="btn btn--primary" on:click={downloadResult}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          {ui.downloadCsv}
        </button>
        <button class="btn btn--ghost btn--sm" on:click={backToConfig}>{ui.back}</button>
        <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.newFile}</button>
      </div>
    </div>

    <div class="preview-block">
      <div class="preview-block__header">
        <span class="preview-block__title">{ui.csvPreview}</span>
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
      {#if resultRows.length - 1 > previewRows}
        <div class="preview-more">
          {ui.andMoreRows.replace("{n}", (resultRows.length - 1 - previewRows).toLocaleString(ui.locale))}
        </div>
      {/if}
    </div>
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

.config-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.config-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
}

.config-panel__title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.config-panel__info {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.config-controls {
  padding: var(--sp-4);
}

.config-field {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.mode-options {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: 0.9rem;
  color: var(--text);
  cursor: pointer;
  flex-wrap: wrap;
}

.radio {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
  cursor: pointer;
}

.mode-desc {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
  margin-left: var(--sp-1);
}

.columns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--sp-2);
  max-height: 300px;
  overflow-y: auto;
}

.column-checkbox {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: background var(--t-fast);
}

.column-checkbox:hover {
  background: var(--bg-input);
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
  cursor: pointer;
  flex-shrink: 0;
}

.column-checkbox__label {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.config-actions {
  display: flex;
  gap: var(--sp-2);
  align-items: center;
  margin-top: var(--sp-4);
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
