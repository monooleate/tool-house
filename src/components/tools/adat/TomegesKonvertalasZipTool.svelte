<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadZip } from "../../../lib/download.ts";

  let files: File[] = [];
  let status: "idle" | "processing" | "done" | "error" = "idle";
  let error = "";
  let results: Array<{ name: string; json: string; rows: number }> = [];
  let progress = 0;

  function handleFiles(e: CustomEvent<File[]>) {
    files = e.detail.filter(f => f.name.endsWith(".csv") || f.name.endsWith(".tsv") || f.name.endsWith(".txt"));
    results = [];
    status = "idle";
    error = "";
    progress = 0;
  }

  function parseCsv(text: string, delimiter: string): Record<string, string>[] {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    if (lines.length < 2) return [];
    const headers = lines[0].split(delimiter).map(h => h.trim());
    return lines.slice(1).map(line => {
      const vals = line.split(delimiter);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = (vals[i] ?? "").trim(); });
      return obj;
    });
  }

  function detectDelimiter(text: string): string {
    const firstLine = text.split(/\r?\n/)[0] ?? "";
    if (firstLine.includes("\t")) return "\t";
    if (firstLine.includes(";")) return ";";
    if (firstLine.includes("|")) return "|";
    return ",";
  }

  async function convert() {
    if (files.length === 0) return;
    status = "processing";
    error = "";
    results = [];
    progress = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const text = await file.text();
        const delimiter = detectDelimiter(text);
        const data = parseCsv(text, delimiter);
        const json = JSON.stringify(data, null, 2);
        const baseName = file.name.replace(/\.(csv|tsv|txt)$/i, "");
        results.push({ name: baseName + ".json", json, rows: data.length });
        progress = Math.round(((i + 1) / files.length) * 100);
      }
      results = results;
      status = "done";
    } catch (err: any) {
      error = err.message || "Hiba a konvertálás során.";
      status = "error";
    }
  }

  async function downloadAll() {
    if (results.length === 0) return;
    const encoder = new TextEncoder();
    const entries = results.map(r => ({
      filename: r.name,
      data: encoder.encode(r.json),
    }));
    await downloadZip(entries, "json-fajlok.zip");
  }
</script>

<div class="tool-panel">
  <Dropzone
    accept=".csv,.tsv,.txt"
    multiple={true}
    label="CSV/TSV fajlok feltoltese"
    on:files={handleFiles}
  />

  {#if files.length > 0}
    <div class="file-list">
      <p class="file-count">{files.length} fajl kivalasztva</p>
      <ul>
        {#each files as f}
          <li class="file-item">{f.name} <span class="file-size">({(f.size / 1024).toFixed(1)} KB)</span></li>
        {/each}
      </ul>
    </div>

    <button
      class="btn btn--primary"
      on:click={convert}
      disabled={status === "processing"}
    >
      {#if status === "processing"}
        Konvertalas... ({progress}%)
      {:else}
        Konvertalas JSON-ba
      {/if}
    </button>
  {/if}

  {#if status === "error"}
    <div class="error-msg" role="alert">{error}</div>
  {/if}

  {#if status === "done" && results.length > 0}
    <div class="results">
      <h3 class="results-title">Eredmenyek</h3>
      <table class="results-table">
        <thead>
          <tr>
            <th>Fajlnev</th>
            <th>Sorok</th>
          </tr>
        </thead>
        <tbody>
          {#each results as r}
            <tr>
              <td>{r.name}</td>
              <td>{r.rows}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <button class="btn btn--download" on:click={downloadAll}>
        Osszes letoltese (ZIP)
      </button>
    </div>
  {/if}
</div>

<style>
.tool-panel {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.file-list {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: var(--sp-4);
}
.file-list ul {
  list-style: none;
  padding: 0;
  margin: var(--sp-2) 0 0 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}
.file-count {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
}
.file-item {
  font-size: 0.875rem;
  color: var(--text-muted);
}
.file-size {
  color: var(--text-subtle);
}
.btn {
  padding: var(--sp-3) var(--sp-5);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: var(--r-md);
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--t-fast);
}
.btn--primary {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
}
.btn--primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
}
.btn--primary:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.btn--download {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
  width: 100%;
}
.btn--download:hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  transform: translateY(-1px);
}
.error-msg {
  padding: var(--sp-3);
  background: color-mix(in srgb, #ef4444 10%, transparent);
  border: 1px solid #ef4444;
  border-radius: var(--r-md);
  color: #ef4444;
  font-size: 0.875rem;
}
.results {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.results-title {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
}
.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.results-table th,
.results-table td {
  padding: var(--sp-2) var(--sp-3);
  text-align: left;
  border-bottom: 1px solid var(--border);
}
.results-table th {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-subtle);
}
</style>
