<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { downloadBlob } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("kep-ico");
  const ICO_SIZES = [16, 32, 48];

  let file: File | null = null;
  let resultBlob: Blob | null = null;

  function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  async function convert() {
    if (!file) return;

    try {
      const img = await createImageBitmap(file);
      const pngBuffers: ArrayBuffer[] = [];

      for (const size of ICO_SIZES) {
        const canvas = new OffscreenCanvas(size, size);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blob = await canvas.convertToBlob({ type: "image/png" });
        pngBuffers.push(await blob.arrayBuffer());
      }
      img.close();

      resultBlob = buildIcoBlob(pngBuffers, ICO_SIZES);
    } catch (e) {
      console.error(e);
    }
  }

  function buildIcoBlob(pngBuffers: ArrayBuffer[], sizes: number[]): Blob {
    const count = sizes.length;
    const headerSize = 6;
    const dirEntrySize = 16;
    let dataOffset = headerSize + dirEntrySize * count;

    const header = new DataView(new ArrayBuffer(headerSize));
    header.setUint16(0, 0, true);
    header.setUint16(2, 1, true);
    header.setUint16(4, count, true);

    const dirParts: ArrayBuffer[] = [header.buffer];
    const dataParts: ArrayBuffer[] = [];

    for (let i = 0; i < count; i++) {
      const png = pngBuffers[i];
      const size = sizes[i];
      const entry = new DataView(new ArrayBuffer(dirEntrySize));
      entry.setUint8(0, size === 256 ? 0 : size);
      entry.setUint8(1, size === 256 ? 0 : size);
      entry.setUint8(2, 0);
      entry.setUint8(3, 0);
      entry.setUint16(4, 1, true);
      entry.setUint16(6, 32, true);
      entry.setUint32(8, png.byteLength, true);
      entry.setUint32(12, dataOffset, true);
      dataOffset += png.byteLength;
      dirParts.push(entry.buffer);
      dataParts.push(png);
    }

    return new Blob([...dirParts, ...dataParts], { type: "image/x-icon" });
  }

  function download() {
    if (!resultBlob) return;
    downloadBlob(resultBlob, "favicon.ico");
  }
</script>

<div class="tool-settings card">
  <h2 class="tool-settings__title">{ui.settings}</h2>
  <p class="settings-hint">ICO: 16×16, 32×32, 48×48 px</p>
</div>

<div class="dropzone-wrap">
  <Dropzone accept="image/png,image/jpeg,image/webp" multiple={false} maxSizeMB={20}
    label={ui.dragImageFor} sublabel="PNG, JPG, WebP -- Max. 20 MB" on:files={handleFiles} />
</div>

{#if resultBlob}
  <div class="tool-result-summary card">
    <p>ICO {ui.file ?? "fájl"} {ui.conversionDone ?? "elkészült"}: 16×16, 32×32, 48×48 px</p>
  </div>
{/if}

{#if file}
  <ConvertButton {timing}
    canConvert={!!file}
    isConverting={false}
    isDone={!!resultBlob}
    onConvert={convert} onDownload={download}
    convertLabel={"ICO " + (ui.conversion ?? "generálás")}
    downloadLabel={"favicon.ico " + (ui.download ?? "letöltés")}
    fileCount={1} />
{/if}

<style>
.tool-settings { margin-bottom: var(--sp-5); }
.tool-settings__title { font-size: 1rem; margin-bottom: var(--sp-3); }
.settings-hint { font-size: 0.85rem; color: var(--text-muted); }
.dropzone-wrap { margin-bottom: var(--sp-5); }
.tool-result-summary { margin: var(--sp-4) 0; padding: var(--sp-4); }
</style>
