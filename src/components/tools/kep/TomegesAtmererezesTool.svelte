<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ProgressQueue from "../../ui/ProgressQueue.svelte";
  import type { QueueItem } from "../../ui/ProgressQueue.svelte";
  import { downloadBlob, downloadZip, formatFileSize } from "../../../lib/download.ts";

  let quality = 82;
  let outputFormat: "image/webp" | "image/jpeg" | "image/png" = "image/webp";
  let width = 800;
  let height = 600;
  let lockAspect = true;
  let queue: QueueItem[] = [];
  let worker: Worker | null = null;
  let isProcessing = false;

  // Track original aspect from first image
  let firstAspect = 800 / 600;

  function onWidthChange() {
    if (lockAspect) height = Math.round(width / firstAspect);
  }

  function onHeightChange() {
    if (lockAspect) width = Math.round(height * firstAspect);
  }

  function getWorker(): Worker {
    if (!worker) {
      worker = new Worker(
        new URL("../../../workers/image.worker.ts", import.meta.url),
        { type: "module" },
      );
      worker.addEventListener("message", (e) => {
        const msg = e.data;
        if (msg.type === "result") {
          const blob = new Blob([msg.buffer], { type: outputFormat });
          queue = queue.map((item) =>
            item.id === msg.id
              ? { ...item, status: "done", outputBlob: blob, outputFilename: msg.outputFilename, originalSize: msg.originalSize, outputSize: msg.outputSize, elapsedMs: msg.elapsedMs }
              : item,
          );
          processNext();
        } else if (msg.type === "error") {
          queue = queue.map((item) =>
            item.id === msg.id ? { ...item, status: "error", error: msg.error } : item,
          );
          processNext();
        }
      });
    }
    return worker;
  }

  const fileMap = new Map<string, File>();

  function processNext() {
    const pending = queue.find((i) => i.status === "pending");
    if (!pending) { isProcessing = false; return; }
    queue = queue.map((i) => i.id === pending.id ? { ...i, status: "processing" } : i);
    const file = fileMap.get(pending.id);
    if (!file) return;
    file.arrayBuffer().then((buffer) => {
      getWorker().postMessage(
        { type: "resize", id: pending.id, buffer, filename: pending.filename, width, height, outputFormat, quality: quality / 100 },
        [buffer],
      );
    });
  }

  function handleFiles(event: CustomEvent<File[]>) {
    const files = event.detail;
    const newItems: QueueItem[] = files.map((f) => {
      const id = crypto.randomUUID();
      fileMap.set(id, f);
      return { id, filename: f.name, status: "pending", originalSize: f.size };
    });
    queue = [...queue, ...newItems];
    if (!isProcessing) { isProcessing = true; processNext(); }
  }

  function handleDownload(item: QueueItem) {
    if (item.outputBlob && item.outputFilename) downloadBlob(item.outputBlob, item.outputFilename);
  }

  async function handleDownloadAll() {
    const done = queue.filter((i) => i.status === "done" && i.outputBlob && i.outputFilename);
    if (!done.length) return;
    if (done.length === 1) { handleDownload(done[0]); return; }
    const entries = await Promise.all(
      done.map(async (item) => ({ filename: item.outputFilename!, data: new Uint8Array(await item.outputBlob!.arrayBuffer()) })),
    );
    await downloadZip(entries, `atmeretezett-kepek-${width}x${height}.zip`);
  }

  function handleReset() { queue = []; fileMap.clear(); isProcessing = false; }

  $: doneCount = queue.filter((i) => i.status === "done").length;
  $: hasResults = doneCount > 0;
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">Beallitasok</h2>

  <div class="settings-row">
    <label class="label">
      <input type="checkbox" bind:checked={lockAspect} /> Keeparany zarolas
    </label>
  </div>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="width-input">Szelesseg (px)</label>
      <input id="width-input" type="number" min="1" max="16000" bind:value={width} on:input={onWidthChange} class="input" />
    </div>
    <div>
      <label class="label" for="height-input">Magassag (px)</label>
      <input id="height-input" type="number" min="1" max="16000" bind:value={height} on:input={onHeightChange} class="input" />
    </div>
  </div>

  <div class="settings-row two-col">
    <div>
      <label class="label" for="format-select">Kimeneti formatum</label>
      <select id="format-select" bind:value={outputFormat} class="input">
        <option value="image/webp">WebP</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
      </select>
    </div>
    <div>
      <label class="label" for="quality-slider">Minoseg: {quality}%</label>
      <input id="quality-slider" type="range" min="10" max="100" step="1" bind:value={quality} class="slider" />
    </div>
  </div>
</div>

{#if !isProcessing && queue.length === 0}
  <Dropzone
    accept="image/*"
    multiple={true}
    maxSizeMB={50}
    label="Huzd ide a kepeket a tomeges atmeretezeshez"
    sublabel="JPG, PNG, WebP -- Max. 50 MB fajlonkent"
    on:files={handleFiles}
  />
{:else}
  <div class="add-more">
    <Dropzone
      accept="image/*"
      multiple={true}
      maxSizeMB={50}
      label="+ Ujabb kepek hozzaadasa"
      sublabel=""
      on:files={handleFiles}
    />
  </div>
{/if}

<ProgressQueue items={queue} onDownload={handleDownload} onReset={handleReset} />

{#if hasResults && doneCount > 1}
  <div class="batch-download">
    <button class="btn btn--primary btn--lg" on:click={handleDownloadAll}>
      ZIP letoltes ({doneCount} fajl)
    </button>
  </div>
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-5); }
.settings-row { margin-bottom: var(--sp-4); }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
@media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }
.add-more { margin-bottom: var(--sp-5); opacity: 0.7; }
.add-more :global(.dropzone) { padding: var(--sp-5); }
.batch-download { display: flex; justify-content: center; margin-top: var(--sp-5); }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: var(--r-full); background: var(--border); outline: none; cursor: pointer; margin-top: var(--sp-2); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 3px solid var(--bg-card); box-shadow: 0 0 0 2px var(--accent); }
</style>
