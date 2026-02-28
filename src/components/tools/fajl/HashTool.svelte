<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  interface HashResult { algorithm: string; hash: string; }
  let results: HashResult[] = [];
  let fileName = "";
  let fileSize = 0;
  let isProcessing = false;
  let copied = "";

  async function computeHash(buffer: ArrayBuffer, algo: string): Promise<string> {
    const hash = await crypto.subtle.digest(algo, buffer);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function handleFiles(e: CustomEvent<File[]>) {
    const file = e.detail[0];
    if (!file) return;
    fileName = file.name;
    fileSize = file.size;
    isProcessing = true;
    try {
      const buffer = await file.arrayBuffer();
      const [sha256, sha1] = await Promise.all([
        computeHash(buffer, "SHA-256"),
        computeHash(buffer, "SHA-1"),
      ]);
      results = [
        { algorithm: "SHA-256", hash: sha256 },
        { algorithm: "SHA-1", hash: sha1 },
      ];
    } catch (err) {
      results = [];
    } finally {
      isProcessing = false;
    }
  }

  async function copyHash(hash: string) {
    try { await navigator.clipboard.writeText(hash); copied = hash; setTimeout(() => (copied = ""), 2000); } catch {}
  }
</script>

<div class="tool">
  <Dropzone accept="*/*" multiple={false} maxSizeMB={500} label={ui.dragHere} sublabel="*.*" on:files={handleFiles} />

  {#if isProcessing}
    <div class="processing">{ui.hashCalculating}</div>
  {/if}

  {#if results.length > 0}
    <div class="card results">
      <div class="file-info">
        <span class="label">{fileName}</span>
        <span class="file-size">{formatFileSize(fileSize)}</span>
      </div>
      {#each results as r}
        <div class="hash-row">
          <span class="hash-algo">{r.algorithm}</span>
          <code class="hash-value">{r.hash}</code>
          <button class="btn btn--outline btn--sm" on:click={() => copyHash(r.hash)}>
            {copied === r.hash ? "✓" : ui.copy}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.processing { font-family: var(--font-mono); font-size: .84rem; color: var(--text-muted); text-align: center; padding: var(--sp-4); }
.results { display: flex; flex-direction: column; gap: var(--sp-4); }
.file-info { display: flex; align-items: center; gap: var(--sp-3); }
.file-size { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
.hash-row { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
.hash-algo { font-family: var(--font-mono); font-size: .78rem; font-weight: 700; color: var(--accent); min-width: 70px; }
.hash-value { font-family: var(--font-mono); font-size: .78rem; color: var(--text); background: var(--bg-input); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-sm); word-break: break-all; flex: 1; }
</style>
