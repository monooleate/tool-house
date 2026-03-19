<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob, downloadZip } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("heic-png");
  const TARGET_FORMAT = "image/png";
  const TARGET_EXT = "png";

  let files: File[] = [];
  let results: { name: string; blob: Blob }[] = [];
  let processing = false;
  let progress = 0;
  let errorMsg = "";

  function handleFiles(event: CustomEvent<File[]>) {
    files = event.detail;
    results = [];
    errorMsg = "";
  }

  async function convert() {
    if (!files.length) return;
    processing = true;
    progress = 0;
    errorMsg = "";

    try {
      const heic2any = (await import("heic2any")).default;
      results = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const blob = await heic2any({
            blob: file,
            toType: TARGET_FORMAT,
          }) as Blob;

          const baseName = file.name.replace(/\.(heic|heif)$/i, "");
          results.push({ name: `${baseName}.${TARGET_EXT}`, blob });
        } catch (e) {
          console.error(`${file.name} konvertálása sikertelen:`, e);
        }
        progress = Math.round(((i + 1) / files.length) * 100);
      }
    } catch (e) {
      errorMsg = ui.errorGeneric ?? "Hiba történt a konverzió során.";
    } finally {
      processing = false;
    }
  }

  async function download() {
    if (!results.length) return;

    if (results.length === 1) {
      downloadBlob(results[0].blob, results[0].name);
    } else {
      const entries = await Promise.all(
        results.map(async (r) => ({
          filename: r.name,
          data: new Uint8Array(await r.blob.arrayBuffer()),
        }))
      );
      await downloadZip(entries, `heic-to-${TARGET_EXT}.zip`);
    }
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">{ui.lossless ?? "Veszteségmentes"} PNG</p>
</div>

{#if !files.length}
  <div class="dropzone-wrap">
    <Dropzone accept=".heic,.heif" multiple={true} maxSizeMB={50}
      label={ui.dragImageFor} sublabel="HEIC, HEIF -- Max. 50 MB" on:files={handleFiles} />
  </div>
{:else}
  <div class="add-more">
    <Dropzone accept=".heic,.heif" multiple={true} maxSizeMB={50}
      label={ui.addMoreImages} sublabel="" on:files={handleFiles} />
  </div>
{/if}

{#if errorMsg}<p class="tool-error">{errorMsg}</p>{/if}

{#if processing}
  <div class="progress-bar-wrap">
    <div class="progress-bar" style="width: {progress}%"></div>
    <span class="progress-label">{ui.converting ?? "Konvertálás..."} {progress}%</span>
  </div>
{/if}

{#if results.length > 0 && !processing}
  <div class="tool-result-summary card">
    <p>{results.length} {ui.file ?? "fájl"} {ui.conversionDone ?? "sikeresen konvertálva"}.</p>
  </div>
{/if}

{#if files.length > 0}
  <ConvertButton {timing}
    canConvert={files.length > 0 && !processing}
    isConverting={processing}
    isDone={results.length > 0 && !processing}
    onConvert={convert} onDownload={download}
    convertLabel={"PNG " + (ui.conversion ?? "konvertálás")}
    downloadLabel={results.length > 1 ? (ui.zipDownload ?? "ZIP letöltés") : "PNG " + (ui.download ?? "letöltés")}
    fileCount={files.length} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-3); }
.settings-hint { font-size: 0.85rem; color: var(--text-muted); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.add-more { margin-bottom: var(--sp-5); opacity: 0.7; }
.tool-error { color: var(--error, #e53e3e); margin: var(--sp-3) 0; }
.tool-result-summary { margin: var(--sp-4) 0; padding: var(--sp-4); }
.progress-bar-wrap { position: relative; height: 28px; background: var(--bg-input); border-radius: var(--r-md); margin: var(--sp-4) 0; overflow: hidden; }
.progress-bar { height: 100%; background: var(--accent); transition: width 0.3s; }
.progress-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem; font-weight: 600; }
</style>
