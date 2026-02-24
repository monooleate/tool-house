<script lang="ts">
  import { formatFileSize, calcSavingPercent } from "../../lib/download.ts";

  export interface QueueItem {
    id: string;
    filename: string;
    status: "pending" | "processing" | "done" | "error";
    progress?: number;       // 0–100
    originalSize?: number;
    outputSize?: number;
    error?: string;
    elapsedMs?: number;
    outputBlob?: Blob;
    outputFilename?: string;
  }

  export let items: QueueItem[] = [];
  export let onDownload: (item: QueueItem) => void = () => {};
  export let onReset: () => void = () => {};

  $: doneCount     = items.filter((i) => i.status === "done").length;
  $: errorCount    = items.filter((i) => i.status === "error").length;
  $: totalCount    = items.length;
  $: overallPercent = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
  $: allDone       = totalCount > 0 && doneCount + errorCount === totalCount;
  $: totalSaved    = items.reduce((acc, i) => {
    if (i.status === "done" && i.originalSize && i.outputSize) {
      return acc + (i.originalSize - i.outputSize);
    }
    return acc;
  }, 0);
</script>

{#if items.length > 0}
<div class="queue" aria-label="Feldolgozási sor" aria-live="polite">

  <!-- Overall progress -->
  <div class="queue__header">
    <div class="queue__summary">
      <span class="queue__count">
        {doneCount}/{totalCount} feldolgozva
        {#if errorCount > 0}
          · <span class="queue__errors">{errorCount} hiba</span>
        {/if}
      </span>
      {#if totalSaved > 0}
        <span class="queue__saved">
          🗜️ {formatFileSize(totalSaved)} megtakarítva
        </span>
      {/if}
    </div>

    <div class="queue__actions">
      {#if allDone}
        <button class="btn btn--ghost btn--sm" on:click={onReset}>
          Új feldolgozás
        </button>
      {/if}
    </div>
  </div>

  <!-- Overall bar -->
  <div class="progress-track" role="progressbar" aria-valuenow={overallPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Összes folyamat">
    <div class="progress-fill" style={`width: ${overallPercent}%`}></div>
  </div>

  <!-- File list -->
  <ul class="queue__list" role="list">
    {#each items as item (item.id)}
      <li class="queue-item queue-item--{item.status}">
        <div class="queue-item__info">
          <span class="queue-item__name" title={item.filename}>{item.filename}</span>
          <div class="queue-item__meta">
            {#if item.status === "processing"}
              <span class="queue-item__status-text">Feldolgozás...</span>
            {:else if item.status === "done" && item.originalSize && item.outputSize}
              <span class="queue-item__sizes">
                {formatFileSize(item.originalSize)} → {formatFileSize(item.outputSize)}
              </span>
              {#if item.originalSize > item.outputSize}
                <span class="queue-item__saving">
                  -{calcSavingPercent(item.originalSize, item.outputSize)}%
                </span>
              {/if}
              {#if item.elapsedMs}
                <span class="queue-item__time">{item.elapsedMs}ms</span>
              {/if}
            {:else if item.status === "error"}
              <span class="queue-item__error">{item.error ?? "Hiba történt"}</span>
            {/if}
          </div>
        </div>

        <div class="queue-item__right">
          {#if item.status === "pending"}
            <span class="queue-item__badge queue-item__badge--pending">Várakozik</span>
          {:else if item.status === "processing"}
            <span class="queue-item__spinner" aria-hidden="true"></span>
          {:else if item.status === "done"}
            <span class="queue-item__badge queue-item__badge--done">✓</span>
            {#if item.outputBlob}
              <button
                class="btn btn--outline btn--sm"
                on:click={() => onDownload(item)}
                aria-label={`Letöltés: ${item.outputFilename ?? item.filename}`}
              >
                ↓
              </button>
            {/if}
          {:else if item.status === "error"}
            <span class="queue-item__badge queue-item__badge--error">✕</span>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</div>
{/if}

<style>
.queue {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.queue__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--sp-3);
}

.queue__summary {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  flex-wrap: wrap;
}

.queue__count {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text);
}

.queue__errors { color: var(--error); }

.queue__saved {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--success);
  font-weight: 700;
}

.queue__list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  list-style: none;
  padding: 0; margin: 0;
  max-height: 320px;
  overflow-y: auto;
}

.queue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  min-height: 44px;
}

.queue-item--done   { border-color: #10b98130; }
.queue-item--error  { border-color: #ef444430; }

.queue-item__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.queue-item__name {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}

.queue-item__meta {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  flex-wrap: wrap;
}

.queue-item__sizes {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.queue-item__saving {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--success);
  background: #10b98115;
  padding: 1px 5px;
  border-radius: var(--r-full);
}

.queue-item__time {
  font-size: 0.72rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
}

.queue-item__status-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
}

.queue-item__error {
  font-size: 0.75rem;
  color: var(--error);
}

.queue-item__right {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-shrink: 0;
}

.queue-item__badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: var(--r-full);
}

.queue-item__badge--pending {
  background: var(--bg-input);
  color: var(--text-subtle);
  border: 1px solid var(--border);
}

.queue-item__badge--done {
  background: #10b98120;
  color: var(--success);
  border: 1px solid #10b98140;
}

.queue-item__badge--error {
  background: #ef444420;
  color: var(--error);
  border: 1px solid #ef444440;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.queue-item__spinner {
  display: inline-block;
  width: 18px; height: 18px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
