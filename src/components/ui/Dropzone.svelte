<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ui } from "../../lib/ui-labels.ts";

  export let accept: string = "*/*";
  export let multiple: boolean = false;
  export let maxSizeMB: number = 100;
  export let label: string = ui.dropzoneDefault;
  export let sublabel: string = "";
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher<{ files: File[] }>();

  let dragOver = false;
  let error = "";
  let inputEl: HTMLInputElement;

  function validateFile(file: File): string | null {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `"${file.name}" ${ui.fileTooLarge.replace("{n}", String(maxSizeMB))}`;
    }
    if (accept !== "*/*") {
      const types = accept.split(",").map((t) => t.trim());
      const valid = types.some((t) => {
        if (t.startsWith(".")) return file.name.toLowerCase().endsWith(t);
        if (t.endsWith("/*")) return file.type.startsWith(t.slice(0, -2));
        return file.type === t;
      });
      if (!valid) return `"${file.name}" ${ui.unsupportedFormat}`;
    }
    return null;
  }

  function handleFiles(files: FileList | File[]) {
    error = "";
    const fileArr = Array.from(files);
    const errors: string[] = [];

    for (const f of fileArr) {
      const err = validateFile(f);
      if (err) errors.push(err);
    }

    if (errors.length) {
      error = errors.join(". ");
      return;
    }

    dispatch("files", multiple ? fileArr : [fileArr[0]]);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    dragOver = false;
    if (disabled) return;
    const files = e.dataTransfer?.files;
    if (files?.length) handleFiles(files);
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
    if (!disabled) dragOver = true;
  }

  function onDragLeave() { dragOver = false; }

  function onInputChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    if (input.files?.length) handleFiles(input.files);
    input.value = "";
  }

  function onClick() {
    if (!disabled) inputEl?.click();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }
</script>

<div
  class="dropzone"
  class:dropzone--drag={dragOver}
  class:dropzone--disabled={disabled}
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-label={label}
  aria-disabled={disabled}
  on:click={onClick}
  on:keydown={onKeydown}
  on:drop={onDrop}
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}
>
  <input
    bind:this={inputEl}
    type="file"
    {accept}
    {multiple}
    class="dropzone__input"
    aria-hidden="true"
    tabindex="-1"
    on:change={onInputChange}
  />

  <div class="dropzone__content">
    <div class="dropzone__icon" aria-hidden="true">
      {#if dragOver}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      {:else}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      {/if}
    </div>

    <p class="dropzone__label">{label}</p>

    {#if sublabel}
      <p class="dropzone__sublabel">{sublabel}</p>
    {/if}

    <span class="btn btn--outline btn--sm dropzone__btn">
      {ui.selectFile}
    </span>
  </div>
</div>

{#if error}
  <div class="alert alert--error" role="alert" aria-live="polite" style="margin-top: 8px;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    {error}
  </div>
{/if}

<style>
.dropzone {
  position: relative;
  border: 2px dashed var(--border);
  border-radius: var(--r-xl);
  padding: var(--sp-10) var(--sp-8);
  text-align: center;
  cursor: pointer;
  transition: all var(--t-fast);
  background: var(--bg-card);
  user-select: none;
}

.dropzone:hover:not(.dropzone--disabled),
.dropzone--drag {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.dropzone--drag .dropzone__icon {
  color: var(--accent);
  transform: translateY(-4px);
}

.dropzone--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropzone__input {
  position: absolute;
  width: 1px; height: 1px;
  opacity: 0;
  pointer-events: none;
}

.dropzone__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);
}

.dropzone__icon {
  color: var(--text-subtle);
  transition: all var(--t-normal);
}

.dropzone__label {
  font-size: 0.9375rem;
  color: var(--text-muted);
  max-width: 36ch;
  margin: 0;
}

.dropzone__sublabel {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-subtle);
  margin: 0;
}

.dropzone__btn {
  pointer-events: none;
}
</style>
