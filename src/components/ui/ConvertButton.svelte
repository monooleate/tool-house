<!-- src/components/ui/ConvertButton.svelte -->
<!--
  Kétfázisú gomb: Konvertálás delay → Letöltés delay
-->
<script lang="ts">
  import type { TimingConfig } from "../../lib/timing-config.ts";
  import { onDestroy } from "svelte";

  // ─── Props ───────────────────────────────────────────────
  export let timing: TimingConfig;
  export let canConvert: boolean      = false;
  export let isConverting: boolean    = false;
  export let isDone: boolean          = false;
  export let onConvert: () => void    = () => {};
  export let onDownload: () => void   = () => {};
  export let convertLabel: string     = "Konvertálás";
  export let downloadLabel: string    = "Letöltés";
  export let fileCount: number        = 0;

  // ─── Belső állapot ───────────────────────────────────────
  type Phase = "idle" | "pre-convert" | "ready" | "converting" | "pre-download" | "done";

  let phase: Phase          = "idle";
  let countdown: number     = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let preConvertDone        = false;

  // ─── Reaktív logika ──────────────────────────────────────
  $: {
    if (!canConvert && phase === "idle") {
      // Nincs fájl – marad idle
    } else if (canConvert && !preConvertDone && phase === "idle") {
      startPreConvert();
    }
  }

  // Sync isConverting from parent → internal phase
  $: if (isConverting && phase === "ready") {
    phase = "converting";
  }

  $: if (isDone && phase === "converting") {
    startPreDownload();
  }

  // ─── Pre-convert delay ───────────────────────────────────
  function startPreConvert(): void {
    if (timing.delayBeforeConvert <= 0) {
      phase = "ready";
      preConvertDone = true;
      return;
    }
    phase = "pre-convert";
    const totalSec = Math.ceil(timing.delayBeforeConvert / 1000);
    countdown = totalSec;
    clearExistingInterval();
    intervalId = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearExistingInterval();
        phase = "ready";
        preConvertDone = true;
      }
    }, 1000);
  }

  // ─── Convert kattintás ───────────────────────────────────
  function handleConvert(): void {
    if (phase !== "ready") return;
    phase = "converting";
    onConvert();
  }

  // ─── Pre-download delay ──────────────────────────────────
  function startPreDownload(): void {
    if (timing.delayBeforeDownload <= 0) {
      phase = "done";
      return;
    }
    phase = "pre-download";
    const totalSec = Math.ceil(timing.delayBeforeDownload / 1000);
    countdown = totalSec;
    clearExistingInterval();
    intervalId = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearExistingInterval();
        phase = "done";
      }
    }, 1000);
  }

  // ─── Download kattintás ──────────────────────────────────
  function handleDownload(): void {
    if (phase !== "done") return;
    onDownload();
  }

  // ─── Reset (új fájl feltöltésekor) ───────────────────────
  export function reset(): void {
    clearExistingInterval();
    phase         = "idle";
    countdown     = 0;
    preConvertDone = false;
  }

  function clearExistingInterval(): void {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onDestroy(clearExistingInterval);

  // ─── Computed megjelenítési értékek ──────────────────────
  $: convertDisabled = phase !== "ready";
  $: downloadDisabled = phase !== "done";
  $: showConvertBtn  = phase !== "pre-download" && phase !== "done";
  $: showDownloadBtn = phase === "pre-download" || phase === "done";

  $: convertBtnLabel = (() => {
    if (phase === "pre-convert" && timing.showCountdown) {
      return `${convertLabel} (${countdown}s)`;
    }
    if (phase === "converting") return "Feldolgozás...";
    const suffix = fileCount > 1 ? ` (${fileCount} fajl)` : "";
    return convertLabel + suffix;
  })();

  $: downloadBtnLabel = (() => {
    if (phase === "pre-download" && timing.showCountdown) {
      return `${downloadLabel} (${countdown}s)`;
    }
    return downloadLabel;
  })();

  $: progressPercent = phase === "pre-convert"
    ? Math.round((1 - countdown / Math.ceil(timing.delayBeforeConvert / 1000)) * 100)
    : phase === "pre-download"
    ? Math.round((1 - countdown / Math.ceil(timing.delayBeforeDownload / 1000)) * 100)
    : 0;
</script>

<div class="convert-actions" role="group" aria-label="Konvertalas muveletek">

  {#if showConvertBtn}
    <button
      class="btn btn--convert"
      class:btn--disabled={convertDisabled}
      class:btn--loading={phase === "converting"}
      class:btn--countdown={phase === "pre-convert"}
      disabled={convertDisabled}
      on:click={handleConvert}
      aria-busy={phase === "converting"}
      aria-label={convertBtnLabel}
    >
      {#if phase === "converting"}
        <span class="btn__spinner" aria-hidden="true"></span>
        <span>Feldolgozas...</span>
      {:else if phase === "pre-convert"}
        <span class="btn__icon" aria-hidden="true">&#x23F3;</span>
        <span>{convertLabel}</span>
        {#if timing.showCountdown}
          <span class="btn__countdown" aria-label="{countdown} masodperc">{countdown}</span>
        {/if}
        <span
          class="btn__progress-track"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span class="btn__progress-fill" style="width: {progressPercent}%"></span>
        </span>
      {:else}
        <span class="btn__icon" aria-hidden="true">&#x26A1;</span>
        <span>{convertBtnLabel}</span>
      {/if}
    </button>
  {/if}

  {#if showDownloadBtn}
    <button
      class="btn btn--download"
      class:btn--disabled={downloadDisabled}
      class:btn--countdown={phase === "pre-download"}
      disabled={downloadDisabled}
      on:click={handleDownload}
      aria-label={downloadBtnLabel}
    >
      {#if phase === "pre-download"}
        <span class="btn__icon" aria-hidden="true">&#x23F3;</span>
        <span>{downloadLabel}</span>
        {#if timing.showCountdown}
          <span class="btn__countdown" aria-label="{countdown} masodperc">{countdown}</span>
        {/if}
        <span class="btn__progress-track">
          <span class="btn__progress-fill" style="width: {progressPercent}%"></span>
        </span>
      {:else}
        <span class="btn__icon" aria-hidden="true">&#x2B07;</span>
        <span>{downloadBtnLabel}</span>
      {/if}
    </button>
  {/if}

</div>

<style>
.convert-actions {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  margin-bottom: var(--sp-3);
}

.btn--convert,
.btn--download {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: var(--sp-4) var(--sp-6);
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all var(--t-fast);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  min-height: 52px;
}

.btn--convert {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
}

.btn--convert:not(.btn--disabled):hover {
  background: var(--accent-hover, #00a87e);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 30%, transparent);
}

.btn--download {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.btn--download:not(.btn--disabled):hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  transform: translateY(-1px);
}

.btn--disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn--countdown {
  opacity: 0.75;
}

.btn__countdown {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  background: rgba(0,0,0,0.2);
  border-radius: var(--r-sm);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  margin-left: auto;
}

.btn__progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0,0,0,0.15);
}

.btn__progress-fill {
  display: block;
  height: 100%;
  background: rgba(0,0,0,0.4);
  transition: width 0.9s linear;
}

.btn__spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn__icon {
  font-size: 1.1em;
}
</style>
