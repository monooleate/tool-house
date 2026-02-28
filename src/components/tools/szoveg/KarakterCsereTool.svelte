<script lang="ts">
  // ============================================================
  // KarakterCsereTool.svelte
  // Egyszerű karakter/szöveg csere – regex nélkül
  // ============================================================
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let input = "";
  let searchStr = "";
  let replaceStr = "";
  let caseSensitive = true;
  let copied = false;

  $: output = (() => {
    if (!input || !searchStr) return input;
    if (caseSensitive) {
      return input.split(searchStr).join(replaceStr);
    }
    const re = new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    return input.replace(re, replaceStr);
  })();

  $: matchCount = (() => {
    if (!input || !searchStr) return 0;
    const flags = caseSensitive ? "g" : "gi";
    const re = new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
    return (input.match(re) ?? []).length;
  })();

  async function copyOutput() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }
</script>

<div class="tool">
  <div class="card settings-card">
    <div class="replace-row">
      <div class="field">
        <label class="label" for="search-str">{ui.searchText}</label>
        <input id="search-str" type="text" class="input" bind:value={searchStr} placeholder="pl. alma" />
      </div>
      <span class="arrow" aria-hidden="true">→</span>
      <div class="field">
        <label class="label" for="replace-str">Csere erre</label>
        <input id="replace-str" type="text" class="input" bind:value={replaceStr} placeholder={ui.examplePlaceholder} />
      </div>
    </div>
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={caseSensitive} />
      Kis-/nagybetű érzékeny
    </label>
    {#if searchStr && input}
      <div class="match-info">{matchCount} találat</div>
    {/if}
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">{ui.input}</span>
      <textarea class="textarea" rows="10" placeholder={ui.pasteTextHere} bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">{ui.result}</span>
        <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? `✓ ${ui.copied}` : ui.copy}</button>
      </div>
      <textarea class="textarea textarea--out" rows="10" value={output} readonly></textarea>
    </div>
  </div>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-4); }
.replace-row { display: flex; align-items: flex-end; gap: var(--sp-3); flex-wrap: wrap; }
.field { display: flex; flex-direction: column; gap: var(--sp-1); flex: 1; min-width: 160px; }
.arrow { font-family: var(--font-mono); font-size: 1.2rem; color: var(--accent); padding-bottom: var(--sp-2); }
.input { font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); }
.input:focus { outline: none; border-color: var(--accent); }
.checkbox-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; color: var(--text-muted); cursor: pointer; }
.checkbox-label input { accent-color: var(--accent); }
.match-info { font-family: var(--font-mono); font-size: .78rem; color: var(--accent); }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
</style>
