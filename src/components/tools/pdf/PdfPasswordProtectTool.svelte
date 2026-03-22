<script lang="ts">
  import Dropzone from "../../ui/Dropzone.svelte";
  import ConvertButton from "../../ui/ConvertButton.svelte";
  import AdSlot from "../../ui/AdSlot.svelte";
  import EmailCaptureBar from '../../ui/EmailCaptureBar.svelte';
  import PdfPreview from "./PdfPreview.svelte";
  import { downloadBlob, formatFileSize } from "../../../lib/download.ts";
  import { getTimingConfig } from "../../../lib/timing-config.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  const timing = getTimingConfig("jelszo-vedelem");

  let file: File | null = null;
  let isProcessing = false;
  let error = "";
  let isDone = false;
  let convertBtnRef: ConvertButton;
  let resultBlob: Blob | null = null;
  let resultBytes: Uint8Array | null = null;
  let resultFilename = "";

  let password = "";
  let passwordConfirm = "";
  let showPassword = false;
  let showAdvanced = false;
  let allowPrint = true;
  let allowCopy = false;

  $: passwordsMatch = password === passwordConfirm;
  $: passwordStrength = calcStrength(password);
  $: canConvert = file !== null && password.length > 0 && passwordsMatch;

  function calcStrength(pwd: string): { level: number; label: string } {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return { level: 1, label: ui.pdfPasswordStrengthWeak };
    if (score <= 3) return { level: 2, label: ui.pdfPasswordStrengthMedium };
    return { level: 3, label: ui.pdfPasswordStrengthStrong };
  }

  function handleFiles(e: CustomEvent<File[]>) {
    const f = e.detail[0];
    if (!f) return;
    file = f;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    convertBtnRef?.reset();
  }

  async function doConvert() {
    if (!file || !password || !passwordsMatch) return;
    isProcessing = true;
    error = "";
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);

      const result = await doc.save({
        userPassword: password,
        ownerPassword: password + "_owner_" + Math.random().toString(36).slice(2),
        permissions: {
          printing: allowPrint ? "highResolution" as any : "none" as any,
          modifying: false,
          copying: allowCopy,
          annotating: false,
          fillingForms: false,
        },
      });

      const baseName = file.name.replace(/\.pdf$/i, "");
      resultBytes = new Uint8Array(result);
      resultBlob = new Blob([result], { type: "application/pdf" });
      resultFilename = `${baseName}${ui.pdfPasswordSuffix}.pdf`;
      isDone = true;
    } catch (err: any) {
      error = `${ui.error}: ${err.message || ui.unknownError}`;
    } finally {
      isProcessing = false;
    }
  }

  function doDownload() {
    if (resultBlob) downloadBlob(resultBlob, resultFilename);
  }

  function reset() {
    file = null;
    error = "";
    isDone = false;
    resultBlob = null;
    resultBytes = null;
    password = "";
    passwordConfirm = "";
    convertBtnRef?.reset();
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

    <div class="card settings-card">
      <div class="field">
        <label class="label" for="pwd">{ui.pdfPasswordLabel}</label>
        <div class="input-group">
          <input
            id="pwd"
            type={showPassword ? "text" : "password"}
            class="input"
            bind:value={password}
          />
          <button class="btn btn--ghost btn--sm" on:click={() => { showPassword = !showPassword; }}>
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>
        {#if password.length > 0}
          <div class="strength-bar">
            <div
              class="strength-bar__fill"
              class:strength--weak={passwordStrength.level === 1}
              class:strength--medium={passwordStrength.level === 2}
              class:strength--strong={passwordStrength.level === 3}
              style="width: {passwordStrength.level * 33}%"
            ></div>
          </div>
          <span class="hint">{passwordStrength.label}</span>
        {/if}
      </div>

      <div class="field">
        <label class="label" for="pwd-confirm">{ui.pdfPasswordConfirm}</label>
        <input
          id="pwd-confirm"
          type={showPassword ? "text" : "password"}
          class="input"
          bind:value={passwordConfirm}
        />
        {#if passwordConfirm.length > 0 && !passwordsMatch}
          <span class="hint hint--error">{ui.pdfPasswordMismatch}</span>
        {/if}
      </div>

      <button class="btn btn--ghost btn--sm" on:click={() => { showAdvanced = !showAdvanced; }}>
        {ui.pdfAdvancedSettings} {showAdvanced ? "▲" : "▼"}
      </button>

      {#if showAdvanced}
        <div class="field">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={allowPrint} />
            {ui.pdfAllowPrint}
          </label>
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={allowCopy} />
            {ui.pdfAllowCopy}
          </label>
        </div>
      {/if}
    </div>

    <div class="alert alert--warning" role="alert">
      ⚠️ {ui.pdfPasswordWarning}
    </div>

    <AdSlot show={timing.showAdSlot} slot="before-convert" />

    <ConvertButton
      bind:this={convertBtnRef}
      {timing}
      {canConvert}
      isConverting={isProcessing}
      {isDone}
      onConvert={doConvert}
      onDownload={doDownload}
      convertLabel={ui.pdfPasswordBtn}
      downloadLabel={ui.downloadPdf}
      fileCount={1}
    />

    <AdSlot show={timing.showAdSlot} slot="before-download" />

    {#if isDone && resultBytes}
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

<!-- Post-result: hirdetés + email capture -->
{#if isDone}
  <AdSlot show={true} slot="post-result" />
  <EmailCaptureBar />
{/if}

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
.hint { font-size: .75rem; color: var(--text-muted); }
.hint--error { color: var(--red, #dc3545); }
.strength-bar { height: 4px; background: var(--bg-input); border-radius: 2px; overflow: hidden; max-width: 400px; }
.strength-bar__fill { height: 100%; transition: width 0.3s; border-radius: 2px; }
.strength--weak { background: var(--red, #dc3545); }
.strength--medium { background: var(--yellow, #ffc107); }
.strength--strong { background: var(--green, #28a745); }
.checkbox-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; cursor: pointer; }
.alert--warning {
  padding: var(--sp-3) var(--sp-4);
  background: var(--yellow-bg, #fff3cd);
  color: var(--yellow-text, #856404);
  border-radius: var(--r-md);
  font-size: .85rem;
}
</style>
