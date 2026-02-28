<script lang="ts">
  // ============================================================
  // KeresesCsereTool.svelte
  // Keresés és csere – case-sensitive és whole word opcióval
  // ============================================================
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";

  let input = "";
  let searchStr = "";
  let replaceStr = "";
  let caseSensitive = true;
  let wholeWord = false;
  let copied = false;

  function buildRegex(): RegExp | null {
    if (!searchStr) return null;
    let escaped = searchStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (wholeWord) escaped = `\\b${escaped}\\b`;
    return new RegExp(escaped, caseSensitive ? "g" : "gi");
  }

  $: regex = buildRegex();
  $: matchCount = (() => {
    if (!regex || !input) return 0;
    return (input.match(regex) ?? []).length;
  })();

  $: output = (() => {
    if (!regex || !input) return input;
    return input.replace(regex, replaceStr);
  })();

  // Highlight-olt bemenet
  $: highlighted = (() => {
    if (!regex || !input || !searchStr) return "";
    return input.replace(regex, (m) => `<mark>${m}</mark>`);
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
        <label class="label" for="ks-search">Keresendő</label>
        <input id="ks-search" type="text" class="input" bind:value={searchStr} placeholder={ui.searchedText} />
      </div>
      <span class="arrow" aria-hidden="true">→</span>
      <div class="field">
        <label class="label" for="ks-replace">{ui.replaceText}</label>
        <input id="ks-replace" type="text" class="input" bind:value={replaceStr} placeholder={ui.replaceTextPlaceholder} />
      </div>
    </div>
    <div class="options-row">
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={caseSensitive} />
        Kis-/nagybetű érzékeny
      </label>
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={wholeWord} />
        Teljes szó egyezés
      </label>
    </div>
    {#if searchStr && input}
      <div class="match-info">
        <span class="match-count">{matchCount}</span> találat
      </div>
    {/if}
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">{ui.input} {#if highlighted && searchStr}<span class="highlight-hint">(találatok kiemelve)</span>{/if}</span>
      <textarea class="textarea" rows="10" placeholder={ui.pasteTextHere} bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">{ui.result}</span>
        <div class="output-actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? `✓ ${ui.copied}` : ui.copy}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, "csere-eredmeny.txt")} disabled={!output}>{ui.download}</button>
        </div>
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
.options-row { display: flex; gap: var(--sp-5); flex-wrap: wrap; }
.checkbox-label { display: flex; align-items: center; gap: var(--sp-2); font-size: .875rem; color: var(--text-muted); cursor: pointer; }
.checkbox-label input { accent-color: var(--accent); }
.match-info { font-family: var(--font-mono); font-size: .78rem; color: var(--text-muted); }
.match-count { color: var(--accent); font-weight: 700; }
.highlight-hint { font-size: .72rem; color: var(--text-subtle); margin-left: var(--sp-2); }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.output-actions { display: flex; gap: var(--sp-2); }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
</style>
