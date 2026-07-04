<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ProgressQueue from "../../ui/ProgressQueue.svelte";
  import type { QueueItem } from "../../ui/ProgressQueue.svelte";
  import { downloadBlob, downloadZip, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { onDestroy } from "svelte";

  // ─── State ────────────────────────────────────────────────
  let lossless = false;
  let quality  = 82;
  let maxWidth = 0;
  let queue: QueueItem[] = [];
  let worker: Worker | null = null;
  let isProcessing = false;

  // ─── Worker setup ─────────────────────────────────────────
  function getWorker(): Worker {
    if (!worker) {
      worker = new Worker(
        new URL("../../../workers/image.worker.ts", import.meta.url),
        { type: "module" }
      );

      worker.addEventListener("message", (e) => {
        const msg = e.data;
        if (msg.type === "result") {
          const blob = new Blob([msg.buffer], { type: "image/webp" });
          queue = queue.map((item) =>
            item.id === msg.id
              ? {
                  ...item,
                  status: "done",
                  outputBlob: blob,
                  outputFilename: msg.outputFilename,
                  originalSize: msg.originalSize,
                  outputSize: msg.outputSize,
                  elapsedMs: msg.elapsedMs,
                }
              : item
          );
          processNext();
        } else if (msg.type === "error") {
          queue = queue.map((item) =>
            item.id === msg.id ? { ...item, status: "error", error: msg.error } : item
          );
          processNext();
        }
      });
    }
    return worker;
  }

  // ─── Processing pipeline ──────────────────────────────────
  function processNext() {
    const pending = queue.find((i) => i.status === "pending");
    if (!pending) {
      isProcessing = false;
      return;
    }

    queue = queue.map((i) =>
      i.id === pending.id ? { ...i, status: "processing" } : i
    );

    const file = fileMap.get(pending.id);
    if (!file) return;

    file.arrayBuffer().then((buffer) => {
      getWorker().postMessage(
        {
          type: "convert",
          id: pending.id,
          buffer,
          filename: pending.filename,
          outputFormat: "image/webp",
          quality: lossless ? 1 : quality / 100,
          maxWidth: maxWidth > 0 ? maxWidth : undefined,
        },
        [buffer]
      );
    });
  }

  const fileMap = new Map<string, File>();

  // ─── File handler ─────────────────────────────────────────
  function handleFiles(event: CustomEvent<File[]>) {
    const files = event.detail;
    const newItems: QueueItem[] = files.map((f) => {
      const id = crypto.randomUUID();
      fileMap.set(id, f);
      return { id, filename: f.name, status: "pending", originalSize: f.size };
    });
    queue = [...queue, ...newItems];

    if (!isProcessing) {
      isProcessing = true;
      processNext();
    }
  }

  // ─── Download ─────────────────────────────────────────────
  function handleDownload(item: QueueItem) {
    if (item.outputBlob && item.outputFilename) {
      downloadBlob(item.outputBlob, item.outputFilename);
    }
  }

  async function handleDownloadAll() {
    const done = queue.filter((i) => i.status === "done" && i.outputBlob && i.outputFilename);
    if (!done.length) return;

    if (done.length === 1) {
      handleDownload(done[0]);
      return;
    }

    const entries = await Promise.all(
      done.map(async (item) => ({
        filename: item.outputFilename!,
        data: new Uint8Array(await item.outputBlob!.arrayBuffer()),
      }))
    );
    await downloadZip(entries, "webp-kepek.zip");
  }

  // ─── Reset ────────────────────────────────────────────────
  function handleReset() {
    queue = [];
    fileMap.clear();
    isProcessing = false;
  }

  $: doneCount = queue.filter((i) => i.status === "done").length;
  $: hasResults = doneCount > 0;
  $: effectiveQuality = lossless ? 100 : quality;

  // ─── Preview ObjectURL-ek kezelése (revoke a memóriaszivárgás ellen) ──
  let previewFirstId: string | null = null;
  let previewOrigUrl = "";
  let previewOutUrl = "";
  $: updatePreview(queue);
  function updatePreview(q: QueueItem[]) {
    const fd = q.find((i) => i.status === "done");
    const id = fd?.id ?? null;
    if (id === previewFirstId) return;
    if (previewOrigUrl) URL.revokeObjectURL(previewOrigUrl);
    if (previewOutUrl) URL.revokeObjectURL(previewOutUrl);
    previewOrigUrl = "";
    previewOutUrl = "";
    previewFirstId = id;
    if (fd?.outputBlob) {
      const f = fileMap.get(fd.id);
      if (f) previewOrigUrl = URL.createObjectURL(f);
      previewOutUrl = URL.createObjectURL(fd.outputBlob);
    }
  }
  onDestroy(() => {
    if (previewOrigUrl) URL.revokeObjectURL(previewOrigUrl);
    if (previewOutUrl) URL.revokeObjectURL(previewOutUrl);
  });
</script>

<!-- Settings panel -->
<div class="tool-settings card" aria-label={ui.settings}>
  <h2 class="tool-settings__title">{ui.settings}</h2>

  <div class="settings-row">
    <label class="checkbox-label">
      <input
        type="checkbox"
        bind:checked={lossless}
        class="checkbox"
      />
      <span class="lossless-label">{ui.losslessWebp}</span>
    </label>
    <div class="settings-hint">
      {#if lossless}💎 {ui.losslessHint}
      {:else}📦 {ui.lossyHint}{/if}
    </div>
  </div>

  <div class="settings-row" class:settings-row--disabled={lossless}>
    <label class="label" for="quality-slider">
      {ui.quality}: <span class="quality-val">{effectiveQuality}%</span>
    </label>
    <input
      id="quality-slider"
      type="range"
      min="10" max="100" step="1"
      bind:value={quality}
      disabled={lossless}
      class="slider"
      aria-describedby="quality-desc"
    />
    <div id="quality-desc" class="settings-hint">
      {#if lossless}{ui.losslessModeHint}
      {:else if quality < 50}🔴 {ui.strongCompressionLoss}
      {:else if quality < 75}🟡 {ui.mediumQuality}
      {:else if quality < 90}🟢 {ui.goodQuality}
      {:else}💎 {ui.veryHighQuality}{/if}
    </div>
  </div>

  <div class="settings-row">
    <label class="label" for="maxwidth-input">
      {ui.maxWidthZero}
    </label>
    <input
      id="maxwidth-input"
      type="number"
      min="0"
      max="8000"
      step="10"
      placeholder={ui.placeholder0}
      bind:value={maxWidth}
      class="input"
    />
  </div>
</div>

<!-- Dropzone -->
{#if !isProcessing && queue.length === 0}
  <div class="dropzone-wrap">
    <Dropzone
      accept="image/png,.png"
      multiple={true}
      maxSizeMB={50}
      label={ui.dragImageFor}
      sublabel="PNG -- Max. 50 MB"
      on:files={handleFiles}
    />
  </div>
{:else}
  <div class="add-more">
    <Dropzone
      accept="image/png,.png"
      multiple={true}
      maxSizeMB={50}
      label={ui.addMoreImages}
      sublabel=""
      on:files={handleFiles}
    />
  </div>
{/if}

<!-- Queue -->
<ProgressQueue
  items={queue}
  onDownload={handleDownload}
  onReset={handleReset}
/>

<!-- Batch download -->
{#if hasResults && doneCount > 1}
  <div class="batch-download">
    <button class="btn btn--primary btn--lg" on:click={handleDownloadAll}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      {ui.zipDownload} ({doneCount} {ui.file})
    </button>
  </div>
{/if}

<!-- Before/After preview -->
{#if hasResults}
  {@const firstDone = queue.find(i => i.status === "done")}
  {#if firstDone?.outputBlob}
    <div class="preview-section">
      <h3 class="preview-section__title">{ui.preview}</h3>
      <div class="preview-grid">
        <div class="preview-pane">
          <div class="preview-pane__label">{ui.original} PNG · {firstDone.originalSize ? formatFileSize(firstDone.originalSize) : ""}</div>
          <img
            src={previewOrigUrl}
            alt="{ui.original} PNG"
            class="preview-img"
            loading="lazy"
          />
        </div>
        <div class="preview-pane">
          <div class="preview-pane__label">WebP{lossless ? " (lossless)" : ""} · {firstDone.outputSize ? formatFileSize(firstDone.outputSize) : ""}</div>
          <img
            src={previewOutUrl}
            alt="{ui.converted} WebP"
            class="preview-img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
.tool-settings {
  margin-bottom: var(--sp-5);
}

.tool-settings__title {
  font-size: 1rem;
  margin-bottom: var(--sp-5);
}

.settings-row {
  margin-bottom: var(--sp-5);
}

.settings-row:last-child { margin-bottom: 0; }

.settings-row--disabled {
  opacity: 0.45;
  pointer-events: none;
}

.quality-val {
  color: var(--accent);
  font-weight: 700;
}

.label-opt {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-subtle);
  font-size: 0.7rem;
}

.settings-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: var(--sp-2);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  cursor: pointer;
}

.checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
  cursor: pointer;
}

.lossless-label {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: var(--r-full);
  background: linear-gradient(to right, var(--accent) 0%, var(--accent) calc(var(--val, 82) * 1%), var(--border) calc(var(--val, 82) * 1%));
  outline: none;
  cursor: pointer;
  margin-top: var(--sp-2);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: 3px solid var(--bg-card);
  box-shadow: 0 0 0 2px var(--accent);
  transition: box-shadow var(--t-fast);
}

.slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 4px var(--accent)40;
}

.slider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dropzone-wrap { margin-bottom: var(--sp-5); }

.add-more {
  margin-bottom: var(--sp-5);
  opacity: 0.7;
}

.add-more :global(.dropzone) {
  padding: var(--sp-5);
}

.batch-download {
  display: flex;
  justify-content: center;
  margin-top: var(--sp-5);
}

/* Preview */
.preview-section {
  margin-top: var(--sp-8);
}

.preview-section__title {
  font-size: 1rem;
  margin-bottom: var(--sp-4);
}

.preview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
}

@media (max-width: 600px) {
  .preview-grid { grid-template-columns: 1fr; }
}

.preview-pane {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.preview-pane__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  padding: var(--sp-2) var(--sp-3);
  border-bottom: 1px solid var(--border);
  background: var(--bg-card);
}

.preview-img {
  width: 100%;
  height: 240px;
  object-fit: contain;
  display: block;
  background: repeating-conic-gradient(var(--border) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px;
}
</style>
