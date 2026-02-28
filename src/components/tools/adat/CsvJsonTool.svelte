<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  // ─── Timing ─────────────────────────────────────────────
  const TOOL_SLUG = "csv-json";
  const timing = getTimingConfig(TOOL_SLUG);

  // ─── State ────────────────────────────────────────────────
  let delimiter: "auto" | "," | ";" | "\t" | "|" = "auto";
  let hasHeader = true;
  let autoType  = true;
  let previewRows = 10;

  let worker: Worker | null = null;
  let status: "idle" | "processing" | "done" | "error" = "idle";
  let error = "";
  let result: {
    json: string;
    rowCount: number;
    colCount: number;
    headers: string[];
    detectedDelimiter: string;
    elapsedMs: number;
    filename: string;
  } | null = null;

  let isConverting = false;
  let isDone = false;
  let hasFile = false;
  let convertBtnRef: ConvertButton;

  // ─── Worker ───────────────────────────────────────────────
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
          isConverting = false;
          isDone = true;
        } else if (msg.type === "error") {
          error = msg.error;
          status = "error";
          isConverting = false;
        }
      });
    }
    return worker;
  }

  // ─── File handler (stores text, enables ConvertButton) ────
  let lastFileText = "";
  let lastFilename = "";

  async function handleFilesRaw(event: CustomEvent<File[]>) {
    const file = event.detail[0];
    if (!file) return;
    lastFilename = file.name;
    lastFileText = await file.text();
    hasFile = true;
    isDone = false;
    isConverting = false;
    result = null;
    status = "idle";
    error = "";
    convertBtnRef?.reset();
  }

  // ─── ConvertButton callbacks ──────────────────────────────
  function doConvert() {
    if (!lastFileText) return;
    isConverting = true;
    isDone = false;
    status = "processing";
    result = null;
    error = "";
    getWorker().postMessage({
      type: "csv-parse",
      id: crypto.randomUUID(),
      text: lastFileText,
      filename: lastFilename,
      options: { delimiter, hasHeader, autoType },
    });
  }

  function doDownload() {
    if (!result) return;
    const filename = result.filename.replace(/\.csv$/i, "") + ".json";
    downloadText(result.json, filename, "application/json");
  }

  // ─── Reset ────────────────────────────────────────────────
  function reset() {
    status = "idle";
    result = null;
    error = "";
    lastFileText = "";
    lastFilename = "";
    hasFile = false;
    isDone = false;
    isConverting = false;
    convertBtnRef?.reset();
  }

  // ─── Preview JSON ─────────────────────────────────────────
  $: previewJson = result
    ? JSON.stringify(JSON.parse(result.json).slice(0, previewRows), null, 2)
    : "";

  const DELIMITERS = [
    { value: "auto", label: "Auto-detect" },
    { value: ",",    label: ui.comma },
    { value: ";",    label: ui.semicolon },
    { value: "\t",   label: ui.tabChar },
    { value: "|",    label: "Pipe (|)" },
  ];
</script>

<!-- Settings -->
<div class="card settings" aria-label={ui.settings}>
  <div class="settings__grid">
    <div>
      <label class="label" for="delimiter-select">{ui.delimiter}</label>
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
        <label class="checkbox-label">
          <input
            type="checkbox"
            bind:checked={autoType}
            class="checkbox"
          />
          {ui.typeDetection}
        </label>
      </div>
    </div>
  </div>
</div>

<!-- Dropzone (idle state / new file) -->
{#if !hasFile}
  <Dropzone
    accept=".csv,text/csv,text/plain"
    multiple={false}
    maxSizeMB={20}
    label={ui.dragHere}
    sublabel="CSV, TSV, TXT · Max. 20 MB"
    on:files={handleFilesRaw}
  />
{/if}

<!-- ConvertButton area -->
{#if hasFile}
  <!-- Ad slot: konvertálás előtti ablak -->
  <AdSlot show={timing.showAdSlot} slot="before-convert" />

  <ConvertButton
    bind:this={convertBtnRef}
    {timing}
    canConvert={hasFile}
    {isConverting}
    {isDone}
    onConvert={doConvert}
    onDownload={doDownload}
    convertLabel="JSON konvertálás"
    downloadLabel={ui.downloadJson}
  />

  <!-- Ad slot: letöltés előtti ablak -->
  <AdSlot show={timing.showAdSlot} slot="before-download" />
{/if}

<!-- Processing -->
{#if status === "processing"}
  <div class="state-card" aria-live="polite">
    <div class="spinner" aria-label={ui.processing}></div>
    <p>{ui.processing}</p>
  </div>
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

<!-- Result -->
{#if status === "done" && result}
  <div class="result">

    <!-- Stats bar -->
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
        <span class="stat__num">
          {result.detectedDelimiter === "\t" ? "TAB" : result.detectedDelimiter === "auto" ? "?" : `"${result.detectedDelimiter}"`}
        </span>
        <span class="stat__label">{ui.delimiter}</span>
      </div>
      <div class="stat">
        <span class="stat__num">{result.elapsedMs}ms</span>
        <span class="stat__label">{ui.processingTime}</span>
      </div>
    </div>

    <!-- Column headers -->
    {#if result.headers.length > 0}
      <div class="headers-row">
        <span class="headers-label">{ui.columnsColon}</span>
        {#each result.headers as h}
          <span class="header-chip">{h}</span>
        {/each}
      </div>
    {/if}

    <!-- JSON preview -->
    <div class="preview-block">
      <div class="preview-block__header">
        <span class="preview-block__title">JSON {ui.preview}</span>
        <label class="preview-rows-label">
          {ui.rowsColon}
          <select bind:value={previewRows} class="select select--sm">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      <pre class="json-preview"><code>{previewJson}</code></pre>
      {#if result.rowCount > previewRows}
        <div class="preview-more">
          {ui.andMoreRows.replace("{n}", (result.rowCount - previewRows).toLocaleString(ui.locale))}
        </div>
      {/if}
    </div>

    <!-- Add new file -->
    <div class="add-new" style="margin-top: var(--sp-5);">
      <Dropzone
        accept=".csv,text/csv,text/plain"
        multiple={false}
        maxSizeMB={20}
        label={ui.anotherFile}
        on:files={handleFilesRaw}
      />
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

/* State cards */
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

/* Stats */
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

/* Headers row */
.headers-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-4);
}

.headers-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.header-chip {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid var(--accent)40;
  border-radius: var(--r-full);
  padding: 2px 8px;
}

/* JSON preview */
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

.json-preview {
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
}

.preview-more {
  padding: var(--sp-3) var(--sp-4);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
  border-top: 1px solid var(--border);
  text-align: center;
}

.add-new :global(.dropzone) {
  padding: var(--sp-5) var(--sp-6);
  opacity: 0.65;
}
</style>
