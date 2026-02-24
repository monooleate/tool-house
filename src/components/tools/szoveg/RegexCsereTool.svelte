<script lang="ts">
  // ============================================================
  // RegexCsereTool.svelte
  // Regex keresés és csere – match highlight, flag választás
  // ============================================================
  import { downloadText } from "../../../lib/download.ts";

  let input = "";
  let pattern = "";
  let replacement = "";
  let flagG = true;
  let flagI = false;
  let flagM = false;
  let copied = false;
  let error = "";

  $: flags = (flagG ? "g" : "") + (flagI ? "i" : "") + (flagM ? "m" : "");

  $: regex = (() => {
    if (!pattern) return null;
    try {
      error = "";
      return new RegExp(pattern, flags);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      return null;
    }
  })();

  $: matchCount = (() => {
    if (!regex || !input) return 0;
    // Re-create with global flag for counting
    try {
      const countRe = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return (input.match(countRe) ?? []).length;
    } catch { return 0; }
  })();

  $: output = (() => {
    if (!regex || !input) return input;
    try {
      return input.replace(regex, replacement);
    } catch (e) {
      return `Hiba: ${e instanceof Error ? e.message : String(e)}`;
    }
  })();

  async function copyOutput() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }

  const EXAMPLES = [
    { label: "Számok kinyerése", pattern: "\\d+", replacement: "[$&]" },
    { label: "E-mail elfedés", pattern: "(\\w{2})\\w+(@\\w+)", replacement: "$1***$2" },
    { label: "Dupla szóközök", pattern: "\\s{2,}", replacement: " " },
    { label: "HTML tagok törlése", pattern: "<[^>]+>", replacement: "" },
  ];
</script>

<div class="tool">
  <div class="card settings-card">
    <div class="pattern-row">
      <div class="field field--wide">
        <label class="label" for="rx-pattern">Regex minta</label>
        <div class="regex-input-wrap">
          <span class="regex-delim">/</span>
          <input id="rx-pattern" type="text" class="input input--regex" bind:value={pattern}
            placeholder="\\d+" class:input--error={!!error} />
          <span class="regex-delim">/{flags}</span>
        </div>
      </div>
      <div class="field">
        <label class="label" for="rx-replace">Csere</label>
        <input id="rx-replace" type="text" class="input" bind:value={replacement} placeholder="$1, $&, stb." />
      </div>
    </div>

    <div class="flags-row">
      <span class="label">Flagek:</span>
      <label class="flag-opt"><input type="checkbox" bind:checked={flagG} /><code>g</code> global</label>
      <label class="flag-opt"><input type="checkbox" bind:checked={flagI} /><code>i</code> case-insensitive</label>
      <label class="flag-opt"><input type="checkbox" bind:checked={flagM} /><code>m</code> multiline</label>
    </div>

    {#if error}
      <div class="error-msg">Hibás regex: {error}</div>
    {:else if pattern && input}
      <div class="match-info"><span class="match-count">{matchCount}</span> találat</div>
    {/if}

    <div class="examples">
      <span class="examples__label">Példák:</span>
      {#each EXAMPLES as ex}
        <button class="btn btn--ghost btn--sm" on:click={() => { pattern = ex.pattern; replacement = ex.replacement; }}>
          {ex.label}
        </button>
      {/each}
    </div>
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">Bemenet</span>
      <textarea class="textarea" rows="10" placeholder="Illeszd be a szöveget..." bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">Eredmény</span>
        <div class="output-actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? "✓ Másolva!" : "Másolás"}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, "regex-eredmeny.txt")} disabled={!output}>Letöltés</button>
        </div>
      </div>
      <textarea class="textarea textarea--out" rows="10" value={output} readonly></textarea>
    </div>
  </div>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.pattern-row { display: flex; align-items: flex-end; gap: var(--sp-3); flex-wrap: wrap; }
.field { display: flex; flex-direction: column; gap: var(--sp-1); flex: 1; min-width: 160px; }
.field--wide { flex: 2; }
.regex-input-wrap {
  display: flex; align-items: center; gap: 0;
  background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md);
  padding: 0 var(--sp-2); transition: border-color var(--t-fast);
}
.regex-input-wrap:focus-within { border-color: var(--accent); }
.regex-delim { font-family: var(--font-mono); font-size: .875rem; color: var(--text-subtle); flex-shrink: 0; }
.input--regex { border: none !important; background: transparent !important; padding: var(--sp-3) var(--sp-2) !important; flex: 1; }
.input--regex:focus { outline: none; }
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.input:focus { outline: none; border-color: var(--accent); }
.input--error { border-color: var(--error) !important; }
.flags-row { display: flex; align-items: center; gap: var(--sp-4); flex-wrap: wrap; }
.flag-opt { display: flex; align-items: center; gap: var(--sp-1); font-size: .84rem; color: var(--text-muted); cursor: pointer; }
.flag-opt input { accent-color: var(--accent); }
.flag-opt code { font-family: var(--font-mono); font-weight: 700; color: var(--accent); }
.error-msg { font-family: var(--font-mono); font-size: .78rem; color: var(--error); background: rgba(239,68,68,0.08); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-sm); }
.match-info { font-family: var(--font-mono); font-size: .78rem; color: var(--text-muted); }
.match-count { color: var(--accent); font-weight: 700; }
.examples { display: flex; flex-wrap: wrap; gap: var(--sp-2); align-items: center; }
.examples__label { font-family: var(--font-mono); font-size: .72rem; color: var(--text-subtle); text-transform: uppercase; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.output-actions { display: flex; gap: var(--sp-2); }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
</style>
