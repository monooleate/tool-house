<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import PdfPreview from "./PdfPreview.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let file: File | null = null;
  let isProcessing = false;
  let error = "";
  let needsPassword = false;
  let notProtected = false;
  let password = "";
  let showPassword = false;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    needsPassword = false;
    notProtected = false;
    resultBytes = null;
    password = "";
    tryLoad(f);
  }

  async function tryLoad(f: File, pwd?: string) {
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const opts: any = {};
      if (pwd) opts.password = pwd;

      const doc = await PDFDocument.load(bytes, opts);

      if (!pwd) {
        // Jelszó nélkül betöltődött → a PDF nem volt védve: nincs mit feloldani,
        // ne kínáljunk félrevezető "feloldott" letöltést.
        notProtected = true;
        needsPassword = false;
        return;
      }

      // Védett PDF + megadott jelszó → mentés jelszó nélkül
      const result = await doc.save();
      const baseName = f.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultFilename = `${baseName}${ui.pdfUnlockedSuffix}.pdf`;
      needsPassword = false;
    } catch (err: any) {
      const msg = err.message || "";
      if (msg.includes("encrypted") || msg.includes("password") || msg.includes("Password")) {
        if (pwd) {
          error = ui.pdfPasswordWrong;
        } else {
          needsPassword = true;
        }
      } else {
        error = `${ui.pdfLoadError}: ${msg}`;
      }
    } finally {
      isProcessing = false;
    }
  }

  function submitPassword() {
    if (!file || !password.trim()) return;
    tryLoad(file, password);
  }

  function reset() {
    file = null;
    error = "";
    needsPassword = false;
    notProtected = false;
    password = "";
    resultBytes = null;
  }
</script>

<div class="tool">
  {#if !file}
    <Dropzone
      accept=".pdf,application/pdf"
      multiple={false}
      maxSizeMB={200}
      label={ui.dragPdfHere}
      sublabel=".pdf"
      on:files={handleFiles}
    />
  {:else}
    <div class="card file-info">
      <div class="file-info__row">
        <span class="file-info__name">{file.name}</span>
        <span class="file-info__meta">{formatFileSize(file.size)}</span>
        <button class="btn btn--ghost btn--sm" on:click={reset}>{ui.newFile}</button>
      </div>
    </div>

    {#if isProcessing}
      <div class="processing">{ui.processing}</div>
    {/if}

    {#if notProtected && !needsPassword}
      <div class="alert alert--info">
        {ui.pdfNoPassword}
      </div>
    {/if}

    {#if needsPassword}
      <div class="card settings-card">
        <div class="field">
          <label class="label" for="unlock-pwd">{ui.pdfPasswordLabel}</label>
          <div class="input-group">
            <input
              id="unlock-pwd"
              type={showPassword ? "text" : "password"}
              class="input"
              bind:value={password}
              on:keydown={(e) => { if (e.key === "Enter") submitPassword(); }}
            />
            <button class="btn btn--ghost btn--sm" aria-label={ui.togglePassword} on:click={() => { showPassword = !showPassword; }}>
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>
        <button
          class="btn btn--primary"
          on:click={submitPassword}
          disabled={!password.trim() || isProcessing}
        >
          {ui.pdfUnlockBtn}
        </button>
      </div>
    {/if}

    {#if resultBytes}
      <PdfPreview
        pdfBytes={resultBytes}
        filename={resultFilename}
        onReset={reset}
      />
    {/if}
  {/if}

  {#if error}
    <div class="alert alert--error" role="alert">{error}</div>
  {/if}
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.file-info { display: flex; flex-direction: column; gap: var(--sp-3); }
.file-info__row { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
.file-info__name { font-family: var(--font-mono); font-size: .875rem; font-weight: 700; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-info__meta { font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: var(--sp-2); }
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); max-width: 400px; }
.input-group { display: flex; gap: var(--sp-2); align-items: center; max-width: 400px; }
.input-group .input { flex: 1; }
.processing { text-align: center; padding: var(--sp-6); color: var(--text-muted); }
.alert--info {
  padding: var(--sp-3) var(--sp-4);
  background: var(--blue-bg, #d1ecf1);
  color: var(--blue-text, #0c5460);
  border-radius: var(--r-md);
  font-size: .85rem;
}
</style>
