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
  let status: "idle" | "selecting" | "done" | "error" = "idle";
  let error = "";
  let delimiter = ",";
  let rows: string[][] = [];
  let headers: string[] = [];
  let selected: boolean[] = [];
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
      if (rows.length < 1) {
        error = "Ures vagy ervenytelen CSV fajl.";
        status = "error";
        return;
      }
      headers = rows[0];
      selected = headers.map(() => true);
      status = "selecting";
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      status = "error";
    }
  }

  // ─── Select helpers ─────────────────────────────────────────
  function selectAll() { selected = headers.map(() => true); }
  function selectNone() { selected = headers.map(() => false); }

  $: selectedCount = selected.filter(Boolean).length;

  // ─── Apply & download ──────────────────────────────────────
  function applyAndDownload() {
    const selectedIndices = selected.map((s, i) => s ? i : -1).filter(i => i >= 0);
    if (selectedIndices.length === 0) {
      error = "Legalabb egy oszlopot ki kell jelolni.";
      return;
    }

    const filteredRows = rows.map(row =>
      selectedIndices.map(idx => row[idx] ?? "")
    );
    const csv = rowsToCsv(filteredRows, delimiter);
    const dotIdx = filename.lastIndexOf(".");
    const base = dotIdx !== -1 ? filename.slice(0, dotIdx) : filename;
    downloadText(csv, base + "_szurt.csv", "text/csv;charset=utf-8");
    status = "done";
  }

  // ─── Reset ──────────────────────────────────────────────────
  function reset() {
    status = "idle";
    error = "";
    rows = [];
    headers = [];
    selected = [];
    filename = "";
  }

  function backToSelect() {
    status = "selecting";
    error = "";
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

<!-- Column selection -->
{#if status === "selecting"}
  <div class="select-panel">
    <div class="select-panel__header">
      <span class="select-panel__title">Oszlopok kivalasztasa</span>
      <span class="select-panel__info">{selectedCount} / {headers.length} kivalasztva &middot; {rows.length - 1} sor</span>
    </div>

    <div class="select-panel__toolbar">
      <button class="btn btn--ghost btn--sm" on:click={selectAll}>Osszes</button>
      <button class="btn btn--ghost btn--sm" on:click={selectNone}>Egyik sem</button>
    </div>

    <div class="columns-grid">
      {#each headers as header, i}
        <label class="column-checkbox">
          <input
            type="checkbox"
            bind:checked={selected[i]}
            class="checkbox"
          />
          <span class="column-checkbox__label">{header}</span>
        </label>
      {/each}
    </div>

    <div class="select-panel__actions">
      <button
        class="btn btn--primary"
        on:click={applyAndDownload}
        disabled={selectedCount === 0}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Letoltes kivalasztott oszlopokkal
      </button>
      <button class="btn btn--ghost btn--sm" on:click={reset}>Megse</button>
    </div>
  </div>
{/if}

<!-- Done -->
{#if status === "done"}
  <div class="done-card">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="done-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <p>A fajl sikeresen letoltve {selectedCount} oszloppal.</p>
    <div class="done-card__actions">
      <button class="btn btn--ghost btn--sm" on:click={backToSelect}>Vissza valasztasra</button>
      <button class="btn btn--ghost btn--sm" on:click={reset}>Uj fajl</button>
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

.select-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.select-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
}

.select-panel__title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select-panel__info {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.select-panel__toolbar {
  display: flex;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
  background: var(--bg-input);
}

.columns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--sp-2);
  padding: var(--sp-4);
  max-height: 400px;
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

.select-panel__actions {
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
