<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  let input = "";
  let output = "";
  let error = "";
  let copied = false;

  function minify() {
    try {
      error = "";
      const parsed = JSON.parse(input);
      output = JSON.stringify(parsed);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      output = "";
    }
  }

  $: if (input.trim()) { minify(); } else { output = ""; error = ""; }

  async function copyOutput() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }
</script>

<div class="tool">
  <div class="io-grid">
    <div class="io-pane">
      <span class="label">JSON bemenet</span>
      <textarea class="textarea" rows="12" placeholder={'{"kulcs": "érték", "szam": 42}'} bind:value={input}></textarea>
      {#if error}<div class="error-msg">{error}</div>{/if}
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">Minifikált JSON</span>
        <div class="actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? "✓ Másolva!" : "Másolás"}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, "minified.json", "application/json")} disabled={!output}>Letöltés</button>
        </div>
      </div>
      <textarea class="textarea textarea--out" rows="12" value={output} readonly placeholder="A minifikált JSON itt jelenik meg..."></textarea>
      {#if output}
        <div class="stats">
          <span>Eredeti: {input.length} kar.</span>
          <span>Minifikált: {output.length} kar.</span>
          <span class="saving">Csökkentés: {Math.round(((input.length - output.length) / input.length) * 100)}%</span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.actions { display: flex; gap: var(--sp-2); }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
.error-msg { font-family: var(--font-mono); font-size: .78rem; color: var(--error); background: rgba(239,68,68,0.08); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-sm); }
.stats { display: flex; gap: var(--sp-4); font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); flex-wrap: wrap; }
.saving { color: var(--accent); font-weight: 700; }
</style>
