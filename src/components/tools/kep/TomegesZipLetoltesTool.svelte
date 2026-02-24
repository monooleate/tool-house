<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadZip, formatFileSize } from "../../../lib/download.ts";

  let files: File[] = [];
  let processing = false;
  let zipFilename = "fajlok.zip";

  function handleFiles(event: CustomEvent<File[]>) {
    files = [...files, ...event.detail];
  }

  function removeFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }

  $: totalSize = files.reduce((acc, f) => acc + f.size, 0);

  async function downloadAll() {
    if (!files.length) return;
    processing = true;
    try {
      const entries = await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          data: new Uint8Array(await f.arrayBuffer()),
        })),
      );
      await downloadZip(entries, zipFilename);
    } finally {
      processing = false;
    }
  }

  function reset() {
    files = [];
    zipFilename = "fajlok.zip";
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">Beallitasok</h2>

  <div class="settings-row">
    <label class="label" for="zip-name">ZIP fajlnev</label>
    <input id="zip-name" type="text" bind:value={zipFilename} class="input" placeholder="fajlok.zip" />
  </div>
</div>

{#if files.length === 0}
  <Dropzone
    accept="*/*"
    multiple={true}
    maxSizeMB={100}
    label="Huzd ide a fajlokat a ZIP-be csomagolashoz"
    sublabel="Barmilyen fajltipus -- Max. 100 MB fajlonkent"
    on:files={handleFiles}
  />
{:else}
  <div class="add-more">
    <Dropzone
      accept="*/*"
      multiple={true}
      maxSizeMB={100}
      label="+ Ujabb fajlok hozzaadasa"
      sublabel=""
      on:files={handleFiles}
    />
  </div>

  <div class="file-list card">
    <div class="file-list__header">
      <span class="file-list__count">{files.length} fajl</span>
      <span class="file-list__size">Ossz. meret: {formatFileSize(totalSize)}</span>
    </div>
    <ul class="file-list__items" role="list">
      {#each files as f, i}
        <li class="file-item">
          <div class="file-item__info">
            <span class="file-item__name" title={f.name}>{f.name}</span>
            <span class="file-item__size">{formatFileSize(f.size)}</span>
          </div>
          <button class="btn btn--ghost btn--sm" on:click={() => removeFile(i)}>X</button>
        </li>
      {/each}
    </ul>
  </div>

  <div class="actions">
    <button class="btn btn--primary" on:click={downloadAll} disabled={processing || files.length === 0}>
      {processing ? "Csomagolas..." : `ZIP letoltes (${files.length} fajl)`}
    </button>
    <button class="btn btn--ghost" on:click={reset}>Ujrakezdes</button>
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-4); }
.add-more { margin-bottom: var(--sp-5); opacity: 0.7; }
.add-more :global(.dropzone) { padding: var(--sp-5); }
.file-list { padding: var(--sp-4); margin-bottom: var(--sp-4); }
.file-list__header { display: flex; align-items: center; gap: var(--sp-4); margin-bottom: var(--sp-3); flex-wrap: wrap; }
.file-list__count { font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; }
.file-list__size { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); }
.file-list__items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--sp-2); max-height: 320px; overflow-y: auto; }
.file-item { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); padding: var(--sp-2) var(--sp-3); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-sm); }
.file-item__info { display: flex; align-items: center; gap: var(--sp-3); min-width: 0; }
.file-item__name { font-family: var(--font-mono); font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px; }
.file-item__size { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); flex-shrink: 0; }
.actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); }
</style>
