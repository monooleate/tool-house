<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadZip, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let files: File[] = [];
  let isCreating = false;
  let zipFilename = "download.zip";

  function handleFiles(e: CustomEvent<File[]>) {
    files = [...files, ...e.detail];
  }

  function removeFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }

  async function createZip() {
    if (files.length === 0) return;
    isCreating = true;
    try {
      const entries = await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          data: new Uint8Array(await f.arrayBuffer()),
        }))
      );
      await downloadZip(entries, zipFilename);
    } finally {
      isCreating = false;
    }
  }

  $: totalSize = files.reduce((sum, f) => sum + f.size, 0);
</script>

<div class="tool">
  <div class="card settings-card">
    <div class="field">
      <label class="label" for="zip-name">{ui.fileName}</label>
      <input id="zip-name" type="text" class="input" bind:value={zipFilename} placeholder="download.zip" />
    </div>
  </div>

  <Dropzone accept="*/*" multiple={true} maxSizeMB={200} label={ui.dragHereMulti} sublabel="" on:files={handleFiles} />

  {#if files.length > 0}
    <div class="card file-list">
      <div class="file-header">
        <span class="label">{files.length} {ui.file} ({formatFileSize(totalSize)})</span>
        <button class="btn btn--ghost btn--sm" on:click={() => (files = [])}>{ui.deleteAll}</button>
      </div>
      <ul class="files">
        {#each files as file, i}
          <li class="file-item">
            <span class="file-name">{file.name}</span>
            <span class="file-size">{formatFileSize(file.size)}</span>
            <button class="btn btn--ghost btn--sm" on:click={() => removeFile(i)}>✕</button>
          </li>
        {/each}
      </ul>
    </div>

    <button class="btn btn--primary" on:click={createZip} disabled={isCreating}>
      {isCreating ? ui.processingDots : `${ui.createZip} (${files.length} ${ui.file})`}
    </button>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.field { display: flex; flex-direction: column; gap: var(--sp-1); }
.input { max-width: 300px; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.file-list { display: flex; flex-direction: column; gap: var(--sp-3); }
.file-header { display: flex; align-items: center; justify-content: space-between; }
.files { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--sp-1); max-height: 300px; overflow-y: auto; }
.file-item { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-3); background: var(--bg-input); border-radius: var(--r-sm); }
.file-name { font-family: var(--font-mono); font-size: .84rem; color: var(--text); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-size { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); flex-shrink: 0; }
</style>
