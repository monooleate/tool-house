<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let dataUri = "";
  let copied = false;
  let outputFormat: "img" | "css" | "raw" = "img";
  let errorMsg = "";

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    dataUri = "";
    errorMsg = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      dataUri = e.target?.result as string ?? "";
    };
    reader.onerror = () => {
      errorMsg = ui.imageLoadError;
    };
    reader.readAsDataURL(file);
  }

  function getOutput(): string {
    if (!dataUri) return "";
    if (outputFormat === "img") return `<img src="${dataUri}" alt="">`;
    if (outputFormat === "css") return `background-image: url('${dataUri}');`;
    return dataUri;
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(getOutput());
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {}
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">{ui.outputFormat}</p>
</div>

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

<div class="dropzone-wrap">
  <Dropzone
    accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
    multiple={false}
    maxSizeMB={10}
    label={ui.dragImageFor}
    sublabel="JPG, PNG, WebP, SVG, GIF -- Max. 10 MB"
    on:files={handleFiles}
  />
</div>

{#if dataUri}
  <div class="tool-options card">
    <div class="radio-group">
      <label><input type="radio" bind:group={outputFormat} value="img" /> HTML &lt;img&gt;</label>
      <label><input type="radio" bind:group={outputFormat} value="css" /> CSS background</label>
      <label><input type="radio" bind:group={outputFormat} value="raw" /> Raw Base64</label>
    </div>
  </div>

  <div class="tool-result card">
    <textarea readonly rows="4" value={getOutput()} class="tool-textarea"></textarea>
    <div class="result-actions">
      <button class="btn btn-primary" on:click={copyToClipboard}>
        {copied ? ui.copied : ui.copy}
      </button>
    </div>
    <p class="tool-meta">
      {ui.resultSize}: {Math.round(dataUri.length / 1024)} KB ({ui.base64LargerNote})
    </p>
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-3); }
.settings-hint { font-size: 0.85rem; color: var(--text-muted); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.tool-options { margin-bottom: var(--sp-4); padding: var(--sp-4); }
.radio-group { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.radio-group label { cursor: pointer; font-size: 0.9rem; }
.tool-result { padding: var(--sp-4); }
.tool-textarea { width: 100%; font-family: var(--font-mono); font-size: 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); resize: vertical; color: var(--text); }
.result-actions { margin-top: var(--sp-3); }
.btn { padding: var(--sp-2) var(--sp-4); border: none; border-radius: var(--r-md); cursor: pointer; font-weight: 600; font-size: 0.85rem; }
.btn-primary { background: var(--accent); color: white; }
.tool-meta { font-size: 0.8rem; color: var(--text-muted); margin-top: var(--sp-3); }
.tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }
</style>
