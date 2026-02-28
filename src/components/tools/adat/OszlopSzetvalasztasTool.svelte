<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  // ─── CSV helper (for column preview) ────────────────────────
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

  // ─── State ──────────────────────────────────────────────────
  let status: "idle" | "configuring" | "processing" | "done" | "error" = "idle";
  let error = "";
  let delimiter = ",";
  let hasHeader = true;
  let splitDelimiter = ";";
  let columnIndex = 0;
  let previewRows = 20;

  let worker: Worker | null = null;
  let fileText = "";
  let filename = "";
  let headers: string[] = [];

  let result: {
    csv: string;
    rowCount: number;
    colCount: number;
    elapsedMs: number;
    filename: string;
  } | null = null;

  // ─── Worker ─────────────────────────────────────────────────
  function getWorker(): Worker {
    if (!worker) {
      worker = new Worker(
        new URL("../../../workers/data.worker.ts", import.meta.url),
        { type: "module" }
      );
      worker.addEventListener("message", (e) => {
        const msg = e.data;
        if (msg.type === "result") {
          result = msg;
          status = "done";
        } else if (msg.type === "error") {
          error = msg.error;
          status = "error";
        }
      });
    }
    return worker;
  }

  // ─── File handler ───────────────────────────────────────────
  async function handleFiles(event: CustomEvent<File[]>) {
    const file = event.detail[0];
    if (!file) return;

    error = "";
    filename = file.name;
    fileText = await file.text();

    try {
      const rows = parseCsvSimple(fileText, delimiter);
      if (rows.length < 1) {
        error = ui.emptyOrInvalidCsv;
        status = "error";
        return;
      }
      headers = rows[0];
      columnIndex = 0;
      status = "configuring";
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      status = "error";
    }
  }

  // ─── Process ────────────────────────────────────────────────
  function process() {
    if (!fileText) return;
    status = "processing";
    result = null;
    error = "";

    getWorker().postMessage({
      type: "csv-split-column",
      id: crypto.randomUUID(),
      text: fileText,
      filename,
      options: {
        columnIndex,
        splitDelimiter,
        delimiter,
        hasHeader,
      },
    });
  }

  // ─── Download ───────────────────────────────────────────────
  function downloadResult() {
    if (!result) return;
    const dotIdx = result.filename.lastIndexOf(".");
    const base = dotIdx !== -1 ? result.filename.slice(0, dotIdx) : result.filename;
    downloadText(result.csv, base + "_szetvalasztott.csv", "text/csv;charset=utf-8");
  }

  // ─── Reset ──────────────────────────────────────────────────
  function reset() {
    status = "idle";
    error = "";
    result = null;
    fileText = "";
    filename = "";
    headers = [];
  }

  function backToConfig() {
    status = "configuring";
    result = null;
    error = "";
  }

  // ─── Preview ────────────────────────────────────────────────
  $: previewText = result
    ? result.csv.split("\n").slice(0, previewRows).join("\n")
    : "";

  const DELIMITERS = [
    { value: ",",  label: ui.comma },
    { value: ";",  label: ui.semicolon },
    { value: "\t", label: ui.tabChar },
    { value: "|",  label: "Pipe (|)" },
  ];
</script>

<!-- Settings -->
<div class="card settings" aria-label={ui.settings}>
  <div class="settings__grid">
    <div>
      <label class="label" for="delimiter-select">{ui.csvDelimiter}</label>
      <select
        id="delimiter-select"
        class="select"
        bind:value={delimiter}
      >
        {#each DELIMITERS as d}
          <option value={d.value}>{d.label}</option>
        {/each}
      </select>
    </div>

    <div>
      <span class="label">{ui.optionsLabel}</span>
      <div class="checkboxes">
        <label class="checkbox-label">
          <input
            type="checkbox"
            bind:checked={hasHeader}
            class="checkbox"
          />
          {ui.firstRowHeader}
        </label>
      </div>
    </div>
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
      <span class="config-panel__title">{ui.splitSettings}</span>
      <span class="config-panel__info">{headers.length} {ui.column}</span>
    </div>

    <div class="config-controls">
      <div class="config-row">
        <div class="config-field">
          <label class="label" for="split-column">{ui.splitColumn}</label>
          <select id="split-column" class="select" bind:value={columnIndex}>
            {#each headers as h, i}
              <option value={i}>{h}</option>
            {/each}
          </select>
        </div>

        <div class="config-field">
          <label class="label" for="split-delimiter">{ui.splitChar}</label>
          <input
            id="split-delimiter"
            type="text"
            class="input"
            bind:value={splitDelimiter}
            placeholder={ui.splitCharPlaceholder}
          />
        </div>
      </div>

      <div class="config-actions">
        <button class="btn btn--primary" on:click={process} disabled={!splitDelimiter}>
          {ui.split}
        </button>
        <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.cancel}</button>
      </div>
    </div>
  </div>
{/if}

<!-- Processing -->
{#if status === "processing"}
  <div class="state-card" aria-live="polite">
    <div class="spinner" aria-label={ui.processingInProgress}></div>
    <p>{ui.processing}</p>
  </div>
{/if}

<!-- Result -->
{#if status === "done" && result}
  <div class="result">
    <div class="stats-bar">
      <div class="stat">
        <span class="stat__num">{result.rowCount.toLocaleString(ui.locale)}</span>
        <span class="stat__label">{ui.row}</span>
      </div>
      <div class="stat">
        <span class="stat__num">{result.colCount}</span>
        <span class="stat__label">{ui.column}</span>
      </div>
      <div class="stat">
        <span class="stat__num">{result.elapsedMs}ms</span>
        <span class="stat__label">{ui.processingTime}</span>
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
        <span class="preview-block__title">{ui.resultPreview}</span>
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
      {#if result.rowCount > previewRows}
        <div class="preview-more">
          {ui.andMoreRows.replace("{n}", (result.rowCount - previewRows).toLocaleString(ui.locale))}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
.settings {
  margin-bottom: var(--sp-5);
}

.settings__grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--sp-5);
}

@media (max-width: 600px) {
  .settings__grid { grid-template-columns: 1fr; }
}

.checkboxes {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  margin-top: var(--sp-1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: 0.9rem;
  color: var(--text-muted);
  cursor: pointer;
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
  cursor: pointer;
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

.config-row {
  display: flex;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-bottom: var(--sp-4);
}

.config-field {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  min-width: 150px;
}

.config-field .input {
  padding: var(--sp-2) var(--sp-3);
  font-size: 0.875rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text);
}

.config-field .input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-subtle);
}

.config-actions {
  display: flex;
  gap: var(--sp-2);
  align-items: center;
}

.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-12);
  text-align: center;
  color: var(--text-muted);
}

@keyframes spin { to { transform: rotate(360deg); } }

.spinner {
  width: 40px; height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
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
