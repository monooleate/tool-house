<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import ProgressQueue from "../../ui/ProgressQueue.svelte";
  import type { QueueItem } from "../../ui/ProgressQueue.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob, downloadZip, formatFileSize } from "../../../lib/download.ts";

  // ─── Timing ─────────────────────────────────────────────
  const TOOL_SLUG = "jpg-webp";
  const timing = getTimingConfig(TOOL_SLUG);

  // ─── State ────────────────────────────────────────────────
  let quality  = 82;
  let maxWidth = 0;   // 0 = nincs átméretezés
  let queue: QueueItem[] = [];
  let worker: Worker | null = null;
  let isConverting = false;
  let isDone = false;
  let convertBtnRef: ConvertButton;

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
      isConverting = false;
      isDone = queue.length > 0;
      return;
    }

    queue = queue.map((i) =>
      i.id === pending.id ? { ...i, status: "processing" } : i
    );

    // Read file as ArrayBuffer
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
          quality: quality / 100,
          maxWidth: maxWidth > 0 ? maxWidth : undefined,
        },
        [buffer]
      );
    });
  }

  // Map: id → File (for re-reading)
  const fileMap = new Map<string, File>();

  // ─── File handler (adds to queue, does NOT auto-process) ──
  function handleFiles(event: CustomEvent<File[]>) {
    const files = event.detail;
    const newItems: QueueItem[] = files.map((f) => {
      const id = crypto.randomUUID();
      fileMap.set(id, f);
      return { id, filename: f.name, status: "pending", originalSize: f.size };
    });
    queue = [...queue, ...newItems];
    isDone = false;
    isConverting = false;
    convertBtnRef?.reset();
  }

  // ─── ConvertButton callbacks ──────────────────────────────
  function doConvert() {
    isConverting = true;
    isDone = false;
    processNext();
  }

  async function doDownload() {
    const done = queue.filter((i) => i.status === "done" && i.outputBlob && i.outputFilename);
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
    await downloadZip(entries, "webp-kepek.zip");
  }

  // ─── Individual download (from ProgressQueue) ─────────────
  function handleDownload(item: QueueItem) {
    if (item.outputBlob && item.outputFilename) {
      downloadBlob(item.outputBlob, item.outputFilename);
    }
  }

  // ─── Reset ────────────────────────────────────────────────
  function handleReset() {
    queue = [];
    fileMap.clear();
    isConverting = false;
    isDone = false;
    convertBtnRef?.reset();
  }

  $: doneCount = queue.filter((i) => i.status === "done").length;
  $: hasResults = doneCount > 0;
  $: hasFiles = queue.length > 0;
</script>

<!-- Settings panel -->
<div class="tool-settings card" aria-label="Beállítások">
  <h2 class="tool-settings__title">Beállítások</h2>

  <div class="settings-row">
    <label class="label" for="quality-slider">
      Minőség: <span class="quality-val">{quality}%</span>
    </label>
    <input
      id="quality-slider"
      type="range"
      min="10" max="100" step="1"
      bind:value={quality}
      class="slider"
      aria-describedby="quality-desc"
    />
    <div id="quality-desc" class="settings-hint">
      {#if quality < 50}Erős tömörítés – kisebb fájl, látható minőségromlás
      {:else if quality < 75}Közepes – jó kompromisszum
      {:else if quality < 90}Jó minőség – ajánlott webhez
      {:else}Nagyon magas – alig tömörít{/if}
    </div>
  </div>

  <div class="settings-row">
    <label class="label" for="maxwidth-input">
      Max. szélesség (px) <span class="label-opt">(opcionális)</span>
    </label>
    <input
      id="maxwidth-input"
      type="number"
      min="0"
      max="8000"
      step="10"
      placeholder="pl. 1920 – 0 = nincs átméretezés"
      bind:value={maxWidth}
      class="input"
    />
  </div>
</div>

<!-- Dropzone -->
{#if queue.length === 0}
  <div class="dropzone-wrap">
    <Dropzone
      accept="image/jpeg,image/png,.jpg,.jpeg,.png"
      multiple={true}
      maxSizeMB={50}
      label="Húzd ide a JPG/PNG képeket"
      sublabel="JPG, JPEG, PNG · Max. 50 MB fájlonként"
      on:files={handleFiles}
    />
  </div>
{:else}
  <div class="add-more">
    <Dropzone
      accept="image/jpeg,image/png,.jpg,.jpeg,.png"
      multiple={true}
      maxSizeMB={50}
      label="+ Újabb képek hozzáadása"
      sublabel=""
      on:files={handleFiles}
    />
  </div>
{/if}

<!-- Ad slot: konvertálás előtti ablak -->
<AdSlot show={timing.showAdSlot} slot="before-convert" />

<!-- Konvertálás + Letöltés gomb -->
{#if hasFiles}
  <ConvertButton
    bind:this={convertBtnRef}
    {timing}
    canConvert={hasFiles}
    {isConverting}
    {isDone}
    onConvert={doConvert}
    onDownload={doDownload}
    convertLabel="WebP konvertálás"
    downloadLabel={doneCount > 1 ? "ZIP letöltése (" + doneCount + " fájl)" : "WebP letöltése"}
    fileCount={queue.length}
  />
{/if}

<!-- Ad slot: letöltés előtti ablak -->
<AdSlot show={timing.showAdSlot} slot="before-download" />

<!-- Queue -->
<ProgressQueue
  items={queue}
  onDownload={handleDownload}
  onReset={handleReset}
/>

<!-- Before/After preview (első kész fájlnál) -->
{#if hasResults}
  {@const firstDone = queue.find(i => i.status === "done")}
  {#if firstDone?.outputBlob}
    <div class="preview-section">
      <h3 class="preview-section__title">Előnézet</h3>
      <div class="preview-grid">
        <div class="preview-pane">
          <div class="preview-pane__label">Eredeti · {firstDone.originalSize ? formatFileSize(firstDone.originalSize) : ""}</div>
          <img
            src={URL.createObjectURL(fileMap.get(firstDone.id)!)}
            alt="Eredeti kép"
            class="preview-img"
            loading="lazy"
          />
        </div>
        <div class="preview-pane">
          <div class="preview-pane__label">WebP · {firstDone.outputSize ? formatFileSize(firstDone.outputSize) : ""}</div>
          <img
            src={URL.createObjectURL(firstDone.outputBlob)}
            alt="Konvertált WebP kép"
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

.dropzone-wrap { margin-bottom: var(--sp-5); }

.add-more {
  margin-bottom: var(--sp-5);
  opacity: 0.7;
}

.add-more :global(.dropzone) {
  padding: var(--sp-5);
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
