<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let preview = "";
  let imgWidth = 0;
  let imgHeight = 0;
  let loading = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0];
    if (!file) return;
    loading = true;
    if (preview) URL.revokeObjectURL(preview);
    preview = URL.createObjectURL(file);

    try {
      const bitmap = await createImageBitmap(file);
      imgWidth = bitmap.width;
      imgHeight = bitmap.height;
      bitmap.close();
    } catch {
      imgWidth = 0;
      imgHeight = 0;
    }
    loading = false;
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    file = null; preview = ""; imgWidth = 0; imgHeight = 0;
  }

  $: megapixel = imgWidth && imgHeight ? ((imgWidth * imgHeight) / 1_000_000).toFixed(1) : "–";
  $: aspectRatio = imgWidth && imgHeight ? gcd(imgWidth, imgHeight) : 1;
  $: aspectW = imgWidth && imgHeight ? imgWidth / aspectRatio : 0;
  $: aspectH = imgWidth && imgHeight ? imgHeight / aspectRatio : 0;

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function formatDate(ms: number): string {
    return new Date(ms).toLocaleString(ui.locale);
  }
</script>

{#if !file}
  <Dropzone
    accept="image/*"
    multiple={false}
    maxSizeMB={50}
    label={ui.dragImageFor}
    sublabel="JPG, PNG, WebP -- Max. 50 MB"
    on:files={handleFiles}
  />
{:else}
  <div class="preview-section">
    <div class="preview-grid">
      <div class="preview-pane">
        <div class="preview-pane__label">{ui.preview}</div>
        <img src={preview} alt={ui.uploadedImage} class="preview-img" />
      </div>

      <div class="meta-table-wrap">
        {#if loading}
          <p class="info-text">{ui.processing}</p>
        {:else}
          <table class="data-table">
            <thead>
              <tr><th>{ui.property}</th><th>{ui.value}</th></tr>
            </thead>
            <tbody>
              <tr><td>{ui.fileName}</td><td class="mono">{file.name}</td></tr>
              <tr><td>{ui.fileSize}</td><td class="mono">{formatFileSize(file.size)}</td></tr>
              <tr><td>{ui.mimeType}</td><td class="mono">{file.type || ui.unknown}</td></tr>
              <tr><td>{ui.lastModified}</td><td class="mono">{formatDate(file.lastModified)}</td></tr>
              {#if imgWidth && imgHeight}
                <tr><td>{ui.sizeInPx}</td><td class="mono">{imgWidth} x {imgHeight}</td></tr>
                <tr><td>{ui.megapixel}</td><td class="mono">{megapixel} MP</td></tr>
                <tr><td>{ui.aspectRatio}</td><td class="mono">{aspectW}:{aspectH}</td></tr>
              {/if}
            </tbody>
          </table>

          <p class="info-hint">{ui.metaNote}</p>
        {/if}
      </div>
    </div>

    <div class="actions">
      <button class="btn btn--ghost" on:click={reset}>{ui.newImage}</button>
    </div>
  </div>
{/if}

<style>
.preview-section { margin-top: var(--sp-5); }
.preview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); margin-bottom: var(--sp-4); }
@media (max-width: 600px) { .preview-grid { grid-template-columns: 1fr; } }
.preview-pane { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; }
.preview-pane__label { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); padding: var(--sp-2) var(--sp-3); border-bottom: 1px solid var(--border); background: var(--bg-card); }
.preview-img { width: 100%; height: 240px; object-fit: contain; display: block; background: repeating-conic-gradient(var(--border) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px; }
.meta-table-wrap { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.data-table th, .data-table td { padding: var(--sp-2) var(--sp-3); text-align: left; border-bottom: 1px solid var(--border); }
.data-table th { color: var(--text-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.data-table td { color: var(--text); }
.mono { font-family: var(--font-mono); font-size: 0.8rem; }
.info-text { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); }
.info-hint { font-size: 0.78rem; color: var(--text-subtle); margin-top: var(--sp-4); line-height: 1.5; }
.actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); }
</style>
