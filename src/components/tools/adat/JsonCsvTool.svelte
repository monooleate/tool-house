<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText } from "../../../lib/download.ts";

  // ─── State ────────────────────────────────────────────────
  let delimiter = ",";
  let includeHeader = true;
  let previewRows = 20;
  let inputMode: "paste" | "file" = "paste";

  let worker: Worker | null = null;
  let status: "idle" | "processing" | "done" | "error" = "idle";
  let error = "";
  let jsonInput = "";
  let result: {
    csv: string;
    rowCount: number;
    colCount: number;
    headers: string[];
    elapsedMs: number;
    filename: string;
  } | null = null;

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
        } else if (msg.type === "error") {
          error = msg.error;
          status = "error";
        }
      });
    }
    return worker;
  }

  // ─── Process ──────────────────────────────────────────────
  let lastJson = "";
  let lastFilename = "output.csv";

  function process(json: string, filename: string) {
    if (!json.trim()) return;
    lastJson = json;
    lastFilename = filename;
    status = "processing";
    result = null;
    error = "";

    getWorker().postMessage({
      type: "json-to-csv",
      id: crypto.randomUUID(),
      json,
      filename,
      options: { delimiter, includeHeader },
    });
  }

  function handlePasteConvert() {
    if (!jsonInput.trim()) {
      error = "Írd be vagy illeszd be a JSON-t.";
      status = "error";
      return;
    }
    process(jsonInput, "output.csv");
  }

  async function handleFiles(event: CustomEvent<File[]>) {
    const file = event.detail[0];
    if (!file) return;
    const text = await file.text();
    jsonInput = text;
    const csvName = file.name.replace(/\.json$/i, "") + ".csv";
    process(text, csvName);
  }

  function reprocess() {
    if (!lastJson) return;
    process(lastJson, lastFilename);
  }

  // ─── Download ─────────────────────────────────────────────
  function downloadCsv() {
    if (!result) return;
    const filename = result.filename.endsWith(".csv")
      ? result.filename
      : result.filename + ".csv";
    downloadText(result.csv, filename, "text/csv;charset=utf-8");
  }

  // ─── Reset ────────────────────────────────────────────────
  function reset() {
    status = "idle";
    result = null;
    error = "";
    lastJson = "";
    lastFilename = "output.csv";
  }

  // ─── CSV preview ──────────────────────────────────────────
  $: previewCsv = result
    ? result.csv.split("\n").slice(0, previewRows + (includeHeader ? 1 : 0)).join("\n")
    : "";

  const DELIMITERS = [
    { value: ",",  label: "Vessző (,)" },
    { value: ";",  label: "Pontosvessző (;)" },
    { value: "\t", label: "Tabulátor" },
  ];
</script>

<!-- Settings -->
<div class="card settings" aria-label="Beállítások">
  <div class="settings__grid">
    <div>
      <label class="label" for="delimiter-select">Elválasztó</label>
      <select
        id="delimiter-select"
        class="select"
        bind:value={delimiter}
        on:change={reprocess}
      >
        {#each DELIMITERS as d}
          <option value={d.value}>{d.label}</option>
        {/each}
      </select>
    </div>

    <div>
      <span class="label">Opciók</span>
      <div class="checkboxes">
        <label class="checkbox-label">
          <input
            type="checkbox"
            bind:checked={includeHeader}
            on:change={reprocess}
            class="checkbox"
          />
          Fejlécsor hozzáadása
        </label>
      </div>
    </div>
  </div>
</div>

<!-- Input mode tabs -->
{#if status === "idle" || status === "error"}
  <div class="tabs">
    <button
      class="tab-btn"
      class:active={inputMode === "paste"}
      on:click={() => inputMode = "paste"}
    >
      Beillesztés
    </button>
    <button
      class="tab-btn"
      class:active={inputMode === "file"}
      on:click={() => inputMode = "file"}
    >
      Fájl feltöltés
    </button>
  </div>

  {#if inputMode === "paste"}
    <div class="paste-area">
      <label class="label" for="json-input">JSON bevitel</label>
      <textarea
        id="json-input"
        class="textarea"
        placeholder={'[\n  { "nev": "Béla", "kor": 30 },\n  { "nev": "Anna", "kor": 25 }\n]'}
        bind:value={jsonInput}
        rows="10"
      ></textarea>
      <button
        class="btn btn--primary convert-btn"
        on:click={handlePasteConvert}
        disabled={!jsonInput.trim()}
      >
        Konvertálás CSV-vé
      </button>
    </div>
  {:else}
    <Dropzone
      accept=".json,application/json"
      multiple={false}
      maxSizeMB={20}
      label="Húzd ide a JSON fájlt"
      sublabel="JSON · Max. 20 MB"
      on:files={handleFiles}
    />
  {/if}
{/if}

<!-- Processing -->
{#if status === "processing"}
  <div class="state-card" aria-live="polite">
    <div class="spinner" aria-label="Feldolgozás folyamatban"></div>
    <p>Konvertálás...</p>
  </div>
{/if}

<!-- Error -->
{#if status === "error"}
  <div class="alert alert--error" role="alert">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    <div>
      <strong>Hiba:</strong> {error}
      <button class="btn btn--ghost btn--sm" on:click={reset} style="margin-left: 8px;">Újra</button>
    </div>
  </div>
{/if}

<!-- Result -->
{#if status === "done" && result}
  <div class="result">

    <!-- Stats bar -->
    <div class="stats-bar">
      <div class="stat">
        <span class="stat__num">{result.rowCount.toLocaleString("hu")}</span>
        <span class="stat__label">sor</span>
      </div>
      <div class="stat">
        <span class="stat__num">{result.colCount}</span>
        <span class="stat__label">oszlop</span>
      </div>
      <div class="stat">
        <span class="stat__num">
          {delimiter === "\t" ? "TAB" : `"${delimiter}"`}
        </span>
        <span class="stat__label">elválasztó</span>
      </div>
      <div class="stat">
        <span class="stat__num">{result.elapsedMs}ms</span>
        <span class="stat__label">feldolgozás</span>
      </div>

      <div class="stats-bar__actions">
        <button class="btn btn--primary" on:click={downloadCsv}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          CSV letöltése
        </button>
        <button class="btn btn--ghost btn--sm" on:click={reset}>Új JSON</button>
      </div>
    </div>

    <!-- Column headers -->
    {#if result.headers.length > 0}
      <div class="headers-row">
        <span class="headers-label">Oszlopok:</span>
        {#each result.headers as h}
          <span class="header-chip">{h}</span>
        {/each}
      </div>
    {/if}

    <!-- CSV preview -->
    <div class="preview-block">
      <div class="preview-block__header">
        <span class="preview-block__title">CSV előnézet</span>
        <label class="preview-rows-label">
          Sorok:
          <select bind:value={previewRows} class="select select--sm">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      <pre class="csv-preview"><code>{previewCsv}</code></pre>
      {#if result.rowCount > previewRows}
        <div class="preview-more">
          … és még {(result.rowCount - previewRows).toLocaleString("hu")} sor a letöltött fájlban
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

/* Paste area */
.paste-area {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.convert-btn {
  align-self: flex-start;
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

.stats-bar__actions {
  display: flex;
  gap: var(--sp-2);
  align-items: center;
  margin-left: auto;
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

/* CSV preview */
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
