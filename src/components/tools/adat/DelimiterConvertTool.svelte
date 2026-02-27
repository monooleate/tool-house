<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText } from "../../../lib/download.ts";

  // ─── Props ──────────────────────────────────────────────────
  export let inputLabel: string = "Fajl";
  export let outputLabel: string = "Kimenet";
  export let inputAccept: string = ".csv,.tsv,.txt";
  export let workerType: string = "tsv-to-csv";
  export let outputExtension: string = "csv";

  // ─── State ──────────────────────────────────────────────────
  let worker: Worker | null = null;
  let status: "idle" | "processing" | "done" | "error" = "idle";
  let error = "";
  let previewRows = 20;
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

    status = "processing";
    result = null;
    error = "";

    const text = await file.text();
    getWorker().postMessage({
      type: workerType,
      id: crypto.randomUUID(),
      text,
      filename: file.name,
    });
  }

  // ─── Download ───────────────────────────────────────────────
  function downloadResult() {
    if (!result) return;
    const dotIdx = result.filename.lastIndexOf(".");
    const base = dotIdx !== -1 ? result.filename.slice(0, dotIdx) : result.filename;
    const filename = base + "." + outputExtension;
    const mimeType = outputExtension === "tsv" ? "text/tab-separated-values" : "text/csv";
    downloadText(result.csv, filename, mimeType + ";charset=utf-8");
  }

  // ─── Reset ──────────────────────────────────────────────────
  function reset() {
    status = "idle";
    result = null;
    error = "";
  }

  // ─── Preview ────────────────────────────────────────────────
  $: previewText = result
    ? result.csv.split("\n").slice(0, previewRows).join("\n")
    : "";
</script>

<!-- Dropzone -->
{#if status === "idle"}
  <Dropzone
    accept={inputAccept}
    multiple={false}
    maxSizeMB={20}
    label="Huzd ide a(z) {inputLabel.toLowerCase()}t"
    sublabel="{inputAccept} - Max. 20 MB"
    on:files={handleFiles}
  />
{/if}

<!-- Processing -->
{#if status === "processing"}
  <div class="state-card" aria-live="polite">
    <div class="spinner" aria-label="Feldolgozas folyamatban"></div>
    <p>Konvertalas...</p>
  </div>
{/if}

<!-- Error -->
{#if status === "error"}
  <div class="alert alert--error" role="alert">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    <div>
      <strong>Hiba:</strong> {error}
      <button class="btn btn--ghost btn--sm" on:click={reset} style="margin-left: 8px;">Ujra</button>
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
        <span class="stat__num">{result.elapsedMs}ms</span>
        <span class="stat__label">feldolgozas</span>
      </div>

      <div class="stats-bar__actions">
        <button class="btn btn--primary" on:click={downloadResult}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          {outputLabel} letoltese
        </button>
        <button class="btn btn--ghost btn--sm" on:click={reset}>Új fájl</button>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-block">
      <div class="preview-block__header">
        <span class="preview-block__title">{outputLabel} elonezet</span>
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
      <pre class="csv-preview"><code>{previewText}</code></pre>
      {#if result.rowCount > previewRows}
        <div class="preview-more">
          ... es meg {(result.rowCount - previewRows).toLocaleString("hu")} sor a letoltott fajlban
        </div>
      {/if}
    </div>

    <!-- New file -->
    <div class="add-new" style="margin-top: var(--sp-5);">
      <Dropzone
        accept={inputAccept}
        multiple={false}
        maxSizeMB={20}
        label="Masik fajl feldolgozasa"
        on:files={handleFiles}
      />
    </div>
  </div>
{/if}

<style>
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

.add-new :global(.dropzone) {
  padding: var(--sp-5) var(--sp-6);
  opacity: 0.65;
}
</style>
