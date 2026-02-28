<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let pasteMode = false;
  let pasteText = "";
  let isConverting = false;
  let error = "";
  let delimiter: "auto" | "," | ";" | "\t" = "auto";
  let rowCount = 0;

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    pasteMode = false;
    pasteText = "";
    rowCount = 0;
  }

  function switchToPaste() {
    pasteMode = true;
    file = null;
    error = "";
    rowCount = 0;
  }

  function switchToFile() {
    pasteMode = false;
    pasteText = "";
    error = "";
    rowCount = 0;
  }

  function detectDelimiter(text: string): string {
    const firstLine = text.split("\n")[0] || "";
    if (firstLine.includes("\t")) return "\t";
    if (firstLine.includes(";")) return ";";
    return ",";
  }

  function parseCsv(text: string, delim: string): string[][] {
    const rows: string[][] = [];
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      if (line.trim() === "") continue;
      rows.push(line.split(delim));
    }
    return rows;
  }

  async function convert() {
    isConverting = true;
    error = "";
    try {
      let csvText: string;
      let baseName: string;

      if (pasteMode) {
        if (!pasteText.trim()) {
          error = `${ui.noFile}.`;
          return;
        }
        csvText = pasteText;
        baseName = "output";
      } else {
        if (!file) {
          error = `${ui.noFile}.`;
          return;
        }
        csvText = await file.text();
        baseName = file.name.replace(/\.csv$/i, "");
      }

      const delim = delimiter === "auto" ? detectDelimiter(csvText) : delimiter;
      const rows = parseCsv(csvText, delim);
      rowCount = rows.length;

      if (rows.length === 0) {
        error = ui.emptyOrUnprocessable;
        return;
      }

      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      downloadBlob(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `${baseName}.xlsx`
      );
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isConverting = false;
    }
  }

  function reset() {
    file = null;
    pasteMode = false;
    pasteText = "";
    rowCount = 0;
    error = "";
  }
</script>

<div class="tool">
  {#if !file && !pasteMode}
    <Dropzone
      accept=".csv,text/csv,text/plain"
      multiple={false}
      maxSizeMB={50}
      label={ui.dragHere}
      sublabel=".csv"
      on:files={handleFiles}
    />
    <div class="alt-action">
      <span class="alt-action__text">{ui.or}</span>
      <button class="btn btn--outline btn--sm" on:click={switchToPaste}>{ui.pasteTextLabel}</button>
    </div>
  {:else}
    {#if pasteMode}
      <div class="card paste-card">
        <div class="paste-header">
          <span class="label">{ui.pasteCsvLabel}</span>
          <button class="btn btn--ghost btn--sm" on:click={switchToFile}>{ui.uploadFile}</button>
        </div>
        <textarea
          class="textarea"
          bind:value={pasteText}
          rows="10"
          placeholder={ui.pasteCsvHere}
        ></textarea>
      </div>
    {:else}
      <div class="card file-info">
        <div class="file-info__row">
          <span class="file-info__name">{file.name}</span>
          <span class="file-info__meta">{formatFileSize(file.size)}</span>
          <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.newFile}</button>
        </div>
      </div>
    {/if}

    <div class="card settings-card">
      <div class="field">
        <span class="label">{ui.delimiter}</span>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" bind:group={delimiter} value="auto" />
            {ui.automatic}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={delimiter} value="," />
            {ui.comma}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={delimiter} value=";" />
            {ui.semicolon}
          </label>
          <label class="radio-label">
            <input type="radio" bind:group={delimiter} value={"\t"} />
            {ui.tabChar}
          </label>
        </div>
      </div>
    </div>

    <button
      class="btn btn--primary"
      on:click={convert}
      disabled={isConverting || (!file && !pasteText.trim())}
    >
      {isConverting ? ui.convertingInProgress : ui.convertToXlsx}
    </button>

    {#if rowCount > 0}
      <div class="card result-card">
        <span class="result-text">{rowCount} {ui.rowsConverted}</span>
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
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.alt-action { display: flex; align-items: center; gap: var(--sp-3); justify-content: center; }
.alt-action__text { font-size: .875rem; color: var(--text-muted); }
.paste-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.paste-header { display: flex; align-items: center; justify-content: space-between; }
.textarea { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); resize: vertical; min-height: 120px; }
.result-card { text-align: center; }
.result-text { font-size: .875rem; color: var(--accent); font-weight: 600; }
</style>
