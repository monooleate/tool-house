<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadText } from "../../../lib/download.ts";

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
  let status: "idle" | "editing" | "done" | "error" = "idle";
  let error = "";
  let delimiter = ",";
  let rows: string[][] = [];
  let originalHeaders: string[] = [];
  let newHeaders: string[] = [];
  let filename = "";

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
      originalHeaders = [...rows[0]];
      newHeaders = [...rows[0]];
      status = "editing";
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      status = "error";
    }
  }

  // ─── Apply & download ──────────────────────────────────────
  function applyAndDownload() {
    const newRows = [newHeaders, ...rows.slice(1)];
    const csv = rowsToCsv(newRows, delimiter);
    const dotIdx = filename.lastIndexOf(".");
    const base = dotIdx !== -1 ? filename.slice(0, dotIdx) : filename;
    downloadText(csv, base + "_atnevezett.csv", "text/csv;charset=utf-8");
    status = "done";
  }

  // ─── Reset ──────────────────────────────────────────────────
  function reset() {
    status = "idle";
    error = "";
    rows = [];
    originalHeaders = [];
    newHeaders = [];
    filename = "";
  }

  function backToEdit() {
    status = "editing";
  }

  const DELIMITERS = [
    { value: ",",  label: "Vesszo (,)" },
    { value: ";",  label: "Pontosvesszo (;)" },
    { value: "\t", label: "Tabulator" },
    { value: "|",  label: "Pipe (|)" },
  ];
</script>

<!-- Settings -->
<div class="card settings" aria-label="Beallitasok">
  <div class="settings__row">
    <label class="label" for="delimiter-select">Elvalaszto</label>
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
    label="Huzd ide a CSV fajlt"
    sublabel="CSV, TXT - Max. 20 MB"
    on:files={handleFiles}
  />
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

<!-- Editing -->
{#if status === "editing"}
  <div class="edit-panel">
    <div class="edit-panel__header">
      <span class="edit-panel__title">Fejlecek atnevezese</span>
      <span class="edit-panel__info">{originalHeaders.length} oszlop &middot; {rows.length - 1} sor</span>
    </div>

    <div class="headers-grid">
      {#each originalHeaders as orig, i}
        <div class="header-edit-row">
          <span class="header-edit-row__original">{orig}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          <input
            type="text"
            class="input header-edit-row__input"
            bind:value={newHeaders[i]}
            placeholder={orig}
          />
        </div>
      {/each}
    </div>

    <div class="edit-panel__actions">
      <button class="btn btn--primary" on:click={applyAndDownload}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Letöltés új fejlécekkel
      </button>
      <button class="btn btn--ghost btn--sm" on:click={reset}>Megse</button>
    </div>
  </div>
{/if}

<!-- Done -->
{#if status === "done"}
  <div class="done-card">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="done-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <p>A fájl sikeresen letöltve új fejlécekkel.</p>
    <div class="done-card__actions">
      <button class="btn btn--ghost btn--sm" on:click={backToEdit}>Vissza szerkesztesre</button>
      <button class="btn btn--ghost btn--sm" on:click={reset}>Új fájl</button>
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

.edit-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.edit-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
  background: var(--bg-card);
}

.edit-panel__title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.edit-panel__info {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.headers-grid {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-4);
  max-height: 500px;
  overflow-y: auto;
}

.header-edit-row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.header-edit-row__original {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-subtle);
  min-width: 120px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow-icon {
  color: var(--text-subtle);
  flex-shrink: 0;
}

.header-edit-row__input {
  flex: 1;
  min-width: 0;
  padding: var(--sp-2) var(--sp-3);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text);
}

.header-edit-row__input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-subtle);
}

.edit-panel__actions {
  display: flex;
  gap: var(--sp-2);
  align-items: center;
  padding: var(--sp-4);
  border-top: 1px solid var(--border);
}

.done-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-12);
  text-align: center;
  color: var(--text-muted);
}

.done-icon {
  color: var(--accent);
}

.done-card__actions {
  display: flex;
  gap: var(--sp-2);
}
</style>
