<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import ProgressQueue from "../../ui/ProgressQueue.svelte";
  import type { QueueItem } from "../../ui/ProgressQueue.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { downloadBlob, downloadZip, formatFileSize } from "../../../lib/download.ts";

  export let acceptFormats: string = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
  export let acceptLabel: string = "JPG, PNG, WebP";
  export let outputFormat: "image/webp" | "image/jpeg" | "image/png" = "image/webp";
  export let outputExt: string = "webp";
  export let showQuality: boolean = true;
  export let defaultQuality: number = 80;
  export let zipName: string = `${ui.images.toLowerCase()}.zip`;
  export let toolSlug: string = "generic-image";
  export let convertLabel: string = ui.conversion;
  export let downloadLabel: string = ui.download;

  // ─── Timing ─────────────────────────────────────────────────
  const timing = getTimingConfig(toolSlug);

  let quality = defaultQuality;
  let maxWidth = 0;
  let queue: QueueItem[] = [];
  let fileMap = new Map<string, File>();
  let worker: Worker | null = null;
  let isConverting = false;
  let isDone = false;
  let convertBtnRef: ConvertButton;

  function getWorker(): Worker {
    if (!worker) {
      worker = new Worker(
        new URL("../../../workers/image.worker.ts", import.meta.url),
        { type: "module" }
      );
      worker.addEventListener("message", onWorkerMessage);
    }
    return worker;
  }

  function onWorkerMessage(e: MessageEvent) {
    const msg = e.data;
    if (msg.type === "result") {
      const blob = new Blob([msg.buffer], { type: outputFormat });
      queue = queue.map(item =>
        item.id === msg.id
          ? { ...item, status: "done", outputSize: msg.outputSize, originalSize: msg.originalSize,
              outputBlob: blob, outputFilename: msg.outputFilename, elapsedMs: msg.elapsedMs }
          : item
      );
      processNext();
    } else if (msg.type === "error") {
      queue = queue.map(item =>
        item.id === msg.id ? { ...item, status: "error", error: msg.error } : item
      );
      processNext();
    }
  }

  // ─── Fájlok hozzáadása (NEM indul el automatikusan!) ──────
  function handleFiles(e: CustomEvent<File[]>) {
    const files = e.detail;
    const newItems: QueueItem[] = files.map(f => {
      const id = crypto.randomUUID();
      fileMap.set(id, f);
      return { id, filename: f.name, status: "pending" as const, originalSize: f.size };
    });
    queue = [...queue, ...newItems];
    isDone = false;
    isConverting = false;
    convertBtnRef?.reset();
  }

  // ─── Processing pipeline (ConvertButton indítja) ───────────
  function processNext() {
    const pending = queue.find(i => i.status === "pending");
    if (!pending) {
      isConverting = false;
      isDone = queue.length > 0;
      return;
    }

    queue = queue.map(i => i.id === pending.id ? { ...i, status: "processing" } : i);

    const file = fileMap.get(pending.id)!;
    file.arrayBuffer().then((buffer) => {
      getWorker().postMessage({
        type: "convert",
        id: pending.id,
        buffer,
        filename: file.name,
        outputFormat,
        outputExt,
        quality: quality / 100,
        maxWidth: maxWidth > 0 ? maxWidth : undefined,
      }, [buffer]);
    });
  }

  // ─── ConvertButton callbacks ───────────────────────────────
  function doConvert() {
    isConverting = true;
    isDone = false;
    processNext();
  }

  async function doDownload() {
    const done = queue.filter(i => i.status === "done" && i.outputBlob && i.outputFilename);
    if (!done.length) return;

    if (done.length === 1) {
      downloadBlob(done[0].outputBlob!, done[0].outputFilename!);
      return;
    }

    const entries = await Promise.all(
      done.map(async (item) => ({
        filename: item.outputFilename!,
        data: new Uint8Array(await item.outputBlob!.arrayBuffer()),
      }))
    );
    await downloadZip(entries, zipName);
  }

  // ─── Egyedi letöltés a ProgressQueue-ból ───────────────────
  function handleDownload(item: QueueItem) {
    if (item.outputBlob && item.outputFilename) {
      downloadBlob(item.outputBlob, item.outputFilename);
    }
  }

  function handleReset() {
    queue = [];
    fileMap.clear();
    isConverting = false;
    isDone = false;
    convertBtnRef?.reset();
  }

  $: doneCount = queue.filter(i => i.status === "done").length;
  $: hasFiles = queue.length > 0;
</script>

<div class="tool">
  <div class="card settings-card">
    {#if showQuality}
    <div class="settings-row">
      <label class="label" for="quality-slider">{ui.quality}: {quality}%</label>
      <input id="quality-slider" type="range" min="10" max="100" step="5" bind:value={quality} class="slider" />
    </div>
    {/if}
    <div class="settings-row">
      <label class="label" for="max-width">{ui.maxWidthZero}</label>
      <input id="max-width" type="number" min="0" max="10000" step="100" bind:value={maxWidth} class="input input--sm" placeholder={ui.placeholder0} />
    </div>
  </div>

  <!-- Dropzone -->
  {#if queue.length === 0}
    <Dropzone
      accept={acceptFormats}
      multiple={true}
      maxSizeMB={50}
      label={ui.dragImageFor}
      sublabel=""
      disabled={false}
      on:files={handleFiles}
    />
  {:else}
    <div class="add-more">
      <Dropzone
        accept={acceptFormats}
        multiple={true}
        maxSizeMB={50}
        label={ui.addMoreImages}
        sublabel=""
        on:files={handleFiles}
      />
    </div>
  {/if}

  <!-- Ad slot: konvertálás előtti ablak -->
  <AdSlot show={timing.showAdSlot} slot="before-convert" />

  <!-- Konvertálás + Letöltés gomb (timing delay-jel) -->
  {#if hasFiles}
    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      canConvert={hasFiles}
      {isConverting}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      {convertLabel}
      downloadLabel={doneCount > 1 ? `${ui.zipDownload} (${doneCount} ${ui.file})` : downloadLabel}
      fileCount={queue.length}
    />
  {/if}

  <!-- Ad slot: letöltés előtti ablak -->
  <AdSlot show={timing.showAdSlot} slot="before-download" />

  <!-- Queue -->
  <ProgressQueue items={queue} onDownload={handleDownload} onReset={handleReset} />
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.settings-row { display: flex; flex-direction: column; gap: var(--sp-2); }
.slider { width: 100%; accent-color: var(--accent); }
.input--sm { max-width: 200px; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-2) var(--sp-3); }
.add-more { opacity: 0.7; }
.add-more :global(.dropzone) { padding: var(--sp-5); }
</style>
