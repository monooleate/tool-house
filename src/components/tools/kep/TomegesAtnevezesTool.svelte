<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadZip, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let files: File[] = [];
  let template = "img-{001}";
  let processing = false;

  function handleFiles(event: CustomEvent<File[]>) {
    files = [...files, ...event.detail];
  }

  function getExtension(filename: string): string {
    const dot = filename.lastIndexOf(".");
    return dot !== -1 ? filename.slice(dot) : "";
  }

  function generateName(index: number): string {
    // Find counter pattern like {001}, {01}, {1}
    const match = template.match(/\{(0*1)\}/);
    if (!match) return template + getExtension(files[index]?.name ?? "");

    const pattern = match[1]; // e.g. "001"
    const padLen = pattern.length;
    const num = String(index + 1).padStart(padLen, "0");
    return template.replace(`{${pattern}}`, num) + getExtension(files[index]?.name ?? "");
  }

  $: renamedList = files.map((f, i) => ({
    original: f.name,
    renamed: generateName(i),
    size: f.size,
    file: f,
  }));

  async function downloadAll() {
    if (!renamedList.length) return;
    processing = true;
    try {
      const entries = await Promise.all(
        renamedList.map(async (item) => ({
          filename: item.renamed,
          data: new Uint8Array(await item.file.arrayBuffer()),
        })),
      );
      await downloadZip(entries, "renamed-files.zip");
    } finally {
      processing = false;
    }
  }

  function removeFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }

  function reset() {
    files = [];
    template = "img-{001}";
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>

  <div class="settings-row">
    <label class="label" for="template-input">{ui.renamePattern}</label>
    <input id="template-input" type="text" bind:value={template} class="input" placeholder={"img-{001}"} />
    <p class="settings-hint">{"{001}"} = 001, 002... / {"{01}"} = 01, 02...</p>
  </div>
</div>

{#if files.length === 0}
  <Dropzone
    accept="*/*"
    multiple={true}
    maxSizeMB={100}
    label={ui.dragHereMulti}
    sublabel="Max. 100 MB"
    on:files={handleFiles}
  />
{:else}
  <div class="add-more">
    <Dropzone
      accept="*/*"
      multiple={true}
      maxSizeMB={100}
      label={ui.addMoreImages}
      sublabel=""
      on:files={handleFiles}
    />
  </div>

  <div class="file-list card">
    <div class="file-list__header">
      <span class="file-list__count">{files.length} {ui.file}</span>
    </div>
    <table class="data-table">
      <thead>
        <tr><th>#</th><th>{ui.originalName}</th><th>{ui.newName}</th><th>{ui.fileSize}</th><th></th></tr>
      </thead>
      <tbody>
        {#each renamedList as item, i}
          <tr>
            <td class="mono">{i + 1}</td>
            <td class="mono" title={item.original}>{item.original}</td>
            <td class="mono renamed">{item.renamed}</td>
            <td class="mono">{formatFileSize(item.size)}</td>
            <td><button class="btn btn--ghost btn--sm" on:click={() => removeFile(i)} aria-label={ui.remove}>X</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="actions">
    <button class="btn btn--primary" on:click={downloadAll} disabled={processing || files.length === 0}>
      {processing ? ui.processing : `${ui.zipDownload} (${files.length} ${ui.file})`}
    </button>
    <button class="btn btn--ghost" on:click={reset}>{ui.reset}</button>
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-4); }
.settings-hint { font-size: 0.78rem; color: var(--text-subtle); margin-top: var(--sp-2); line-height: 1.5; }
.add-more { margin-bottom: var(--sp-5); opacity: 0.7; }
.add-more :global(.dropzone) { padding: var(--sp-5); }
.file-list { padding: var(--sp-4); margin-bottom: var(--sp-4); }
.file-list__header { margin-bottom: var(--sp-3); }
.file-list__count { font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.data-table th, .data-table td { padding: var(--sp-2) var(--sp-3); text-align: left; border-bottom: 1px solid var(--border); }
.data-table th { color: var(--text-muted); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; }
.renamed { color: var(--accent); font-weight: 700; }
.actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); }
</style>
