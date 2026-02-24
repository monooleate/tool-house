<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";

  interface ZipEntry { name: string; size: number; data: Uint8Array; }
  let entries: ZipEntry[] = [];
  let isProcessing = false;
  let zipName = "";

  async function handleFiles(e: CustomEvent<File[]>) {
    const file = e.detail[0];
    if (!file) return;
    zipName = file.name;
    isProcessing = true;
    try {
      const { unzipSync } = await import("fflate");
      const buffer = new Uint8Array(await file.arrayBuffer());
      const result = unzipSync(buffer);
      entries = Object.entries(result).map(([name, data]) => ({
        name,
        size: data.length,
        data,
      }));
    } catch (err) {
      entries = [];
      alert("Hiba a ZIP kibontásakor: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      isProcessing = false;
    }
  }

  function downloadEntry(entry: ZipEntry) {
    const blob = new Blob([entry.data]);
    downloadBlob(blob, entry.name);
  }

  $: totalSize = entries.reduce((sum, e) => sum + e.size, 0);
</script>

<div class="tool">
  <Dropzone accept=".zip,application/zip,application/x-zip-compressed" multiple={false} maxSizeMB={200} label="Húzd ide a ZIP fájlt" sublabel="vagy kattints a tallózáshoz" on:files={handleFiles} />

  {#if isProcessing}
    <div class="processing">Kibontás folyamatban...</div>
  {/if}

  {#if entries.length > 0}
    <div class="card file-list">
      <div class="file-header">
        <span class="label">{zipName}: {entries.length} fájl ({formatFileSize(totalSize)})</span>
      </div>
      <ul class="files">
        {#each entries as entry}
          <li class="file-item">
            <span class="file-name">{entry.name}</span>
            <span class="file-size">{formatFileSize(entry.size)}</span>
            <button class="btn btn--outline btn--sm" on:click={() => downloadEntry(entry)}>Letöltés</button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.processing { font-family: var(--font-mono); font-size: .84rem; color: var(--text-muted); text-align: center; padding: var(--sp-4); }
.file-list { display: flex; flex-direction: column; gap: var(--sp-3); }
.file-header { display: flex; align-items: center; justify-content: space-between; }
.files { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--sp-1); max-height: 400px; overflow-y: auto; }
.file-item { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-3); background: var(--bg-input); border-radius: var(--r-sm); }
.file-name { font-family: var(--font-mono); font-size: .84rem; color: var(--text); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-size { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); flex-shrink: 0; }
</style>
