<script lang="ts">
  import { ui } from "../../../lib/ui-labels.ts";
  // ─── State ────────────────────────────────────────────────
  let input = "";
  let indent: "2" | "4" | "tab" = "2";
  let copied = false;

  // ─── Reactive parsing ─────────────────────────────────────
  $: parseResult = tryParse(input);
  $: formatted = parseResult.ok
    ? JSON.stringify(parseResult.data, null, indent === "tab" ? "\t" : Number(indent))
    : "";
  $: highlighted = formatted ? syntaxHighlight(formatted) : "";
  $: charCount = formatted.length;

  interface ParseOk  { ok: true; data: unknown }
  interface ParseErr { ok: false; error: string; line: number | null }
  type ParseResult = ParseOk | ParseErr;

  function tryParse(str: string): ParseResult {
    if (!str.trim()) return { ok: false, error: "", line: null };
    try {
      const data = JSON.parse(str);
      return { ok: true, data };
    } catch (e) {
      const msg = e instanceof SyntaxError ? e.message : String(e);
      const lineMatch = msg.match(/position\s+(\d+)/i);
      let line: number | null = null;
      if (lineMatch) {
        const pos = parseInt(lineMatch[1], 10);
        line = str.slice(0, pos).split("\n").length;
      }
      return { ok: false, error: msg, line };
    }
  }

  // ─── Syntax highlighting ──────────────────────────────────
  function syntaxHighlight(json: string): string {
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "json-number";
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "json-key" : "json-string";
        } else if (/true|false/.test(match)) {
          cls = "json-boolean";
        } else if (/null/.test(match)) {
          cls = "json-null";
        }
        // Escape HTML
        const escaped = match
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<span class="${cls}">${escaped}</span>`;
      }
    );
  }

  // ─── Minify ───────────────────────────────────────────────
  function minify() {
    if (!parseResult.ok) return;
    input = JSON.stringify(parseResult.data);
  }

  // ─── Prettify ─────────────────────────────────────────────
  function prettify() {
    if (!parseResult.ok) return;
    input = JSON.stringify(parseResult.data, null, indent === "tab" ? "\t" : Number(indent));
  }

  // ─── Copy ─────────────────────────────────────────────────
  async function copyToClipboard() {
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {}
  }

  // ─── Clear ────────────────────────────────────────────────
  function clear() {
    input = "";
    copied = false;
  }

  // ─── Example ──────────────────────────────────────────────
  function loadExample() {
    input = '{"name":"John","age":30,"active":true,"address":{"city":"Budapest","zip":"1011"},"hobbies":["running","reading",null]}';
  }
</script>

<!-- Toolbar -->
<div class="toolbar card">
  <div class="toolbar__left">
    <label class="label" for="indent-select">{ui.indentation}</label>
    <div class="indent-options">
      <button
        class="indent-btn"
        class:active={indent === "2"}
        on:click={() => indent = "2"}
      >2 {ui.spaces}</button>
      <button
        class="indent-btn"
        class:active={indent === "4"}
        on:click={() => indent = "4"}
      >4 {ui.spaces}</button>
      <button
        class="indent-btn"
        class:active={indent === "tab"}
        on:click={() => indent = "tab"}
      >Tab</button>
    </div>
  </div>

  <div class="toolbar__actions">
    <button class="btn btn--outline btn--sm" on:click={prettify} disabled={!parseResult.ok}>
      {ui.format}
    </button>
    <button class="btn btn--outline btn--sm" on:click={minify} disabled={!parseResult.ok}>
      {ui.minify}
    </button>
    <button class="btn btn--outline btn--sm" on:click={copyToClipboard} disabled={!formatted}>
      {copied ? ui.copied : ui.copy}
    </button>
    <button class="btn btn--ghost btn--sm" on:click={clear} disabled={!input}>
      {ui.delete}
    </button>
  </div>
</div>

<!-- Input -->
<div class="editor-area">
  <div class="editor-panel">
    <div class="editor-panel__header">
      <span class="editor-panel__title">{ui.input}</span>
      {#if !input.trim()}
        <button class="btn btn--ghost btn--sm" on:click={loadExample}>{ui.loadExample}</button>
      {/if}
    </div>
    <textarea
      class="textarea json-input"
      class:json-input--error={input.trim() && !parseResult.ok && parseResult.error}
      placeholder={ui.pasteJson}
      bind:value={input}
      spellcheck="false"
      rows="16"
    ></textarea>

    <!-- Validation status -->
    {#if input.trim() && !parseResult.ok && parseResult.error}
      <div class="validation-error" role="alert">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span>
          {ui.invalid} JSON
          {#if parseResult.line} (sor ~{parseResult.line}){/if}:
          {parseResult.error}
        </span>
      </div>
    {:else if input.trim() && parseResult.ok}
      <div class="validation-ok">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>{ui.valid} JSON · {charCount.toLocaleString(ui.locale)} {ui.chars}</span>
      </div>
    {/if}
  </div>

  <!-- Output -->
  {#if parseResult.ok && highlighted}
    <div class="editor-panel">
      <div class="editor-panel__header">
        <span class="editor-panel__title">{ui.result}</span>
        <span class="editor-panel__meta">{charCount.toLocaleString(ui.locale)} {ui.chars}</span>
      </div>
      <pre class="json-output"><code>{@html highlighted}</code></pre>
    </div>
  {/if}
</div>

<style>
/* Toolbar */
.toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--sp-4);
  margin-bottom: var(--sp-5);
}

.toolbar__actions {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
}

.indent-options {
  display: flex;
  gap: 2px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 2px;
}

.indent-btn {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  background: transparent;
  border: none;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: all var(--t-fast);
}

.indent-btn:hover { color: var(--text); }

.indent-btn.active {
  background: var(--accent-bright);
  color: #000;
}

/* Editor area */
.editor-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
}

@media (max-width: 768px) {
  .editor-area { grid-template-columns: 1fr; }
}

.editor-panel {
  display: flex;
  flex-direction: column;
}

.editor-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3) var(--sp-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: var(--r-md) var(--r-md) 0 0;
}

.editor-panel__title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.editor-panel__meta {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-subtle);
}

/* JSON input textarea */
.json-input {
  border-radius: 0 0 var(--r-md) var(--r-md);
  min-height: 400px;
  resize: vertical;
  font-size: 0.8125rem;
  line-height: 1.55;
  tab-size: 2;
}

.json-input--error {
  border-color: var(--error);
}

.json-input--error:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 3px #ef444420;
}

/* JSON output */
.json-output {
  margin: 0;
  padding: var(--sp-4);
  min-height: 400px;
  max-height: 600px;
  overflow: auto;
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 var(--r-md) var(--r-md);
  background: var(--bg-input);
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--text);
  tab-size: 2;
}

/* Syntax highlighting */
:global(.json-key)     { color: var(--text); font-weight: 600; }
:global(.json-string)  { color: #10b981; }
:global(.json-number)  { color: #3b82f6; }
:global(.json-boolean) { color: #f59e0b; }
:global(.json-null)    { color: var(--text-subtle); font-style: italic; }

.dark :global(.json-key) { color: var(--text); }

/* Validation messages */
.validation-error {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-2);
  margin-top: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  background: #ef444410;
  border: 1px solid var(--error);
  border-radius: var(--r-md);
  font-size: 0.8125rem;
  color: var(--error);
}

.validation-ok {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-2);
  padding: var(--sp-2) var(--sp-4);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--success);
}
</style>
