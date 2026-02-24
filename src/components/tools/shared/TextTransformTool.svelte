<script lang="ts">
  // ============================================================
  // TextTransformTool.svelte
  // Generikus szöveg transzformáló – worker alapú
  // Props-szal konfigurálható: operation, opciók, placeholder
  // ============================================================
  import type { TextOperation } from "../../../workers/text.worker.ts";
  import { downloadText } from "../../../lib/download.ts";

  export let operation: TextOperation;
  export let operationLabel: string = "Átalakítás";
  $: void operationLabel;          // suppress unused-export warning (parent-only prop)
  export let placeholder: string = "Illeszd be a szöveget ide...";
  export let outputPlaceholder: string = "Az eredmény itt jelenik meg...";

  /** Opcionális: ha az operation-t a user választja (pl. kisbetű/nagybetű) */
  export let modes: { value: string; label: string }[] = [];
  export let modeKey: string = "";

  /** Extra opciók a workernek (pl. { direction: "asc" }) */
  export let workerOptions: Record<string, unknown> = {};

  let input = "";
  let output = "";
  let selectedMode = modes.length > 0 ? modes[0].value : "";
  let processing = false;
  let elapsedMs = 0;
  let copied = false;
  let worker: Worker | null = null;

  function getWorker(): Worker {
    if (!worker) {
      worker = new Worker(
        new URL("../../../workers/text.worker.ts", import.meta.url),
        { type: "module" }
      );
      worker.addEventListener("message", onWorkerMessage);
    }
    return worker;
  }

  function onWorkerMessage(e: MessageEvent) {
    const msg = e.data;
    if (msg.type === "result") {
      output = msg.result;
      elapsedMs = msg.elapsedMs;
      processing = false;
    } else if (msg.type === "error") {
      output = `Hiba: ${msg.error}`;
      processing = false;
    }
  }

  function doTransform() {
    if (!input.trim()) return;
    processing = true;

    // Mód logika:
    // - Ha modeKey van: mode érték → workerOptions[modeKey], operation marad fix
    // - Ha modeKey NINCS de modes van: selectedMode maga az operation
    let op = operation;
    const opts = { ...workerOptions };

    if (modes.length > 0 && selectedMode) {
      if (modeKey) {
        opts[modeKey] = selectedMode;
      } else {
        op = selectedMode as TextOperation;
      }
    }

    getWorker().postMessage({
      type: "transform",
      id: crypto.randomUUID(),
      operation: op,
      text: input,
      options: opts,
    });
  }

  // Valós idejű feldolgozás (gyors műveleteknél)
  $: if (input.trim()) {
    doTransform();
  } else {
    output = "";
    elapsedMs = 0;
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {}
  }

  function downloadOutput() {
    if (!output) return;
    downloadText(output, "eredmeny.txt");
  }

  function clearAll() {
    input = "";
    output = "";
    elapsedMs = 0;
  }

  $: inputStats = {
    chars: input.length,
    lines: input ? input.split("\n").length : 0,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
  };

  $: outputStats = {
    chars: output.length,
    lines: output ? output.split("\n").length : 0,
  };
</script>

<div class="text-tool">
  <!-- Beállítások (ha van mód választás) -->
  {#if modes.length > 0}
    <div class="card settings-card">
      <div class="settings-row">
        <span class="label">Mód</span>
        <div class="mode-opts">
          {#each modes as mode}
            <label class="mode-opt">
              <input type="radio" name="mode" value={mode.value} bind:group={selectedMode} />
              <span>{mode.label}</span>
            </label>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Input / Output grid -->
  <div class="io-grid">
    <div class="io-pane">
      <div class="pane-header">
        <span class="label">Bemenet</span>
        <span class="stats">{inputStats.chars} kar. | {inputStats.lines} sor | {inputStats.words} szó</span>
      </div>
      <textarea
        class="textarea"
        rows="10"
        {placeholder}
        bind:value={input}
      ></textarea>
      <div class="pane-actions">
        <button class="btn btn--ghost btn--sm" on:click={clearAll} disabled={!input}>Törlés</button>
      </div>
    </div>

    <div class="io-pane">
      <div class="pane-header">
        <span class="label">Eredmény</span>
        <span class="stats">
          {#if elapsedMs > 0}
            {outputStats.chars} kar. | {elapsedMs} ms
          {/if}
        </span>
      </div>
      <textarea
        class="textarea textarea--output"
        rows="10"
        placeholder={outputPlaceholder}
        value={output}
        readonly
      ></textarea>
      <div class="pane-actions">
        <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>
          {copied ? "✓ Másolva!" : "Másolás"}
        </button>
        <button class="btn btn--ghost btn--sm" on:click={downloadOutput} disabled={!output}>
          Letöltés (.txt)
        </button>
      </div>
    </div>
  </div>

  {#if processing}
    <div class="processing-indicator">
      <span class="spinner"></span> Feldolgozás...
    </div>
  {/if}
</div>

<style>
.text-tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.settings-row { display: flex; flex-direction: column; gap: var(--sp-2); }
.mode-opts { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.mode-opt {
  display: flex; align-items: center; gap: var(--sp-2);
  cursor: pointer; font-size: .875rem; color: var(--text-muted);
  padding: var(--sp-2) var(--sp-3);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  transition: all var(--t-fast);
}
.mode-opt:has(input:checked) {
  border-color: var(--accent);
  color: var(--text);
  background: var(--accent-subtle);
}
.mode-opt input { accent-color: var(--accent); width: 14px; height: 14px; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.pane-header { display: flex; align-items: center; justify-content: space-between; }
.stats { font-family: var(--font-mono); font-size: .72rem; color: var(--text-subtle); }
.textarea {
  width: 100%; min-height: 200px; resize: vertical;
  font-family: var(--font-mono); font-size: .875rem;
  background: var(--bg-input); color: var(--text);
  border: 1px solid var(--border); border-radius: var(--r-md);
  padding: var(--sp-4); line-height: 1.6;
  transition: border-color var(--t-fast);
}
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--output { background: var(--bg-card); color: var(--accent); }
.pane-actions { display: flex; gap: var(--sp-2); }
.processing-indicator {
  display: flex; align-items: center; gap: var(--sp-2);
  font-family: var(--font-mono); font-size: .78rem; color: var(--text-muted);
}
.spinner {
  width: 14px; height: 14px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
