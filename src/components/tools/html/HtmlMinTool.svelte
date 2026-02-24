<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  let input = "";
  let output = "";
  let removeComments = true;
  let copied = false;

  function minifyHtml(html: string, stripComments: boolean): string {
    let result = html;
    if (stripComments) result = result.replace(/<!--[\s\S]*?-->/g, "");
    result = result.replace(/\s+/g, " ");
    result = result.replace(/>\s+</g, "><");
    result = result.replace(/\s+>/g, ">");
    result = result.replace(/<\s+/g, "<");
    return result.trim();
  }

  $: if (input.trim()) { output = minifyHtml(input, removeComments); } else { output = ""; }

  async function copyOutput() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }
</script>

<div class="tool">
  <div class="card settings-card">
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={removeComments} />
      HTML kommentek eltávolítása
    </label>
  </div>
  <div class="io-grid">
    <div class="io-pane">
      <span class="label">HTML bemenet</span>
      <textarea class="textarea" rows="12" placeholder="Illeszd be a HTML kódot..." bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">Minifikált HTML</span>
        <div class="actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? "✓ Másolva!" : "Másolás"}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, "min.html", "text/html")} disabled={!output}>Letöltés</button>
        </div>
      </div>
      <textarea class="textarea textarea--out" rows="12" value={output} readonly></textarea>
      {#if output}
        <div class="stats">Eredeti: {input.length} kar. → Minifikált: {output.length} kar. ({Math.round(((input.length - output.length) / input.length) * 100)}% csökkentés)</div>
      {/if}
    </div>
  </div>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.checkbox-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; color: var(--text-muted); cursor: pointer; }
.checkbox-label input { accent-color: var(--accent); }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.actions { display: flex; gap: var(--sp-2); }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
.stats { font-family: var(--font-mono); font-size: .75rem; color: var(--text-subtle); }
</style>
