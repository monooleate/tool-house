<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  interface FileInfo { name: string; size: number; type: string; lastModified: string; extension: string; }
  let fileInfo: FileInfo | null = null;

  function handleFiles(e: CustomEvent<File[]>) {
    const file = e.detail[0];
    if (!file) return;
    const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "(nincs)";
    fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type || "ismeretlen",
      lastModified: new Date(file.lastModified).toLocaleString("hu-HU"),
      extension: ext,
    };
  }
</script>

<div class="tool">
  <Dropzone accept="*/*" multiple={false} maxSizeMB={500} label={ui.dragHere} sublabel="*.*" on:files={handleFiles} />

  {#if fileInfo}
    <div class="card info-grid">
      <div class="info-row"><span class="info-label">{ui.fileName}</span><span class="info-value">{fileInfo.name}</span></div>
      <div class="info-row"><span class="info-label">{ui.fileSize}</span><span class="info-value">{formatFileSize(fileInfo.size)} ({fileInfo.size.toLocaleString("hu-HU")} bájt)</span></div>
      <div class="info-row"><span class="info-label">MIME {ui.fileType.toLowerCase()}</span><code class="info-value info-value--code">{fileInfo.type}</code></div>
      <div class="info-row"><span class="info-label">{ui.fileType}</span><code class="info-value info-value--code">.{fileInfo.extension}</code></div>
      <div class="info-row"><span class="info-label">Módosítva</span><span class="info-value">{fileInfo.lastModified}</span></div>
    </div>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.info-grid { display: flex; flex-direction: column; gap: var(--sp-3); }
.info-row { display: flex; align-items: flex-start; gap: var(--sp-4); padding: var(--sp-2) 0; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
.info-label { font-family: var(--font-mono); font-size: .78rem; font-weight: 700; color: var(--text-muted); min-width: 120px; text-transform: uppercase; letter-spacing: 0.03em; }
.info-value { font-size: .9rem; color: var(--text); word-break: break-all; }
.info-value--code { font-family: var(--font-mono); font-size: .84rem; color: var(--accent); background: var(--bg-input); padding: 1px 6px; border-radius: var(--r-sm); }
</style>
