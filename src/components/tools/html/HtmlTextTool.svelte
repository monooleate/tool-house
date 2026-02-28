<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  let input = "";
  let output = "";
  let preserveNewlines = true;
  let copied = false;

  function stripHtml(html: string, keepNewlines: boolean): string {
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (keepNewlines) {
      // Replace block elements with newlines
      const blocks = doc.querySelectorAll("br, p, div, h1, h2, h3, h4, h5, h6, li, tr");
      blocks.forEach(el => { el.insertAdjacentText("afterend", "\n"); });
    }
    const text = doc.body.textContent || "";
    return keepNewlines ? text.replace(/\n{3,}/g, "\n\n").trim() : text.trim();
  }

  $: if (input.trim()) { output = stripHtml(input, preserveNewlines); } else { output = ""; }

  async function copyOutput() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }
</script>

<div class="tool">
  <div class="card settings-card">
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={preserveNewlines} />
      Sortörések megőrzése (blokk elemek → újsor)
    </label>
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">HTML kód</span>
      <textarea class="textarea" rows="12" placeholder='<h1>Cím</h1><p>Szöveges tartalom <strong>félkövérrel</strong>.</p>' bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">{ui.plainText}</span>
        <div class="actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? `✓ ${ui.copied}` : ui.copy}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, "szoveg.txt")} disabled={!output}>{ui.download}</button>
        </div>
      </div>
      <textarea class="textarea textarea--out" rows="12" value={output} readonly placeholder={ui.plainTextPreview}></textarea>
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
</style>
