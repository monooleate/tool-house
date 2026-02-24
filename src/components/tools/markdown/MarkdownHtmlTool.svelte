<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  let input = "";
  let htmlOutput = "";
  let showPreview = true;
  let copied = false;

  // Simple markdown to HTML conversion without external deps
  function mdToHtml(md: string): string {
    let html = md;
    // Headers
    html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
    html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
    // Bold & italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    // Horizontal rule
    html = html.replace(/^---$/gm, "<hr />");
    // Unordered lists
    html = html.replace(/^[\-\*]\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
    // Blockquote
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");
    // Paragraphs (lines that are not already wrapped)
    html = html.replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, "<p>$1</p>");
    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, "");
    return html.trim();
  }

  $: if (input.trim()) { htmlOutput = mdToHtml(input); } else { htmlOutput = ""; }

  async function copyOutput() {
    if (!htmlOutput) return;
    try { await navigator.clipboard.writeText(htmlOutput); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }
</script>

<div class="tool">
  <div class="card settings-card">
    <div class="mode-row">
      <label class="mode-opt" class:active={showPreview}>
        <input type="radio" name="view" value={true} bind:group={showPreview} />
        <span>Előnézet</span>
      </label>
      <label class="mode-opt" class:active={!showPreview}>
        <input type="radio" name="view" value={false} bind:group={showPreview} />
        <span>HTML kód</span>
      </label>
    </div>
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">Markdown</span>
      <textarea class="textarea" rows="15" placeholder="# Cím&#10;&#10;Ez egy **félkövér** és *dőlt* szöveg.&#10;&#10;- Lista elem 1&#10;- Lista elem 2" bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">{showPreview ? "Előnézet" : "HTML kód"}</span>
        <div class="actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!htmlOutput}>{copied ? "✓ Másolva!" : "HTML másolás"}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(htmlOutput, "output.html", "text/html")} disabled={!htmlOutput}>Letöltés</button>
        </div>
      </div>
      {#if showPreview}
        <div class="preview-box">{@html htmlOutput || '<span class="placeholder">Az előnézet itt jelenik meg...</span>'}</div>
      {:else}
        <textarea class="textarea textarea--out" rows="15" value={htmlOutput} readonly></textarea>
      {/if}
    </div>
  </div>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.mode-row { display: flex; gap: var(--sp-3); }
.mode-opt { display: flex; align-items: center; gap: var(--sp-2); cursor: pointer; font-size: .875rem; color: var(--text-muted); padding: var(--sp-2) var(--sp-4); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); }
.mode-opt.active, .mode-opt:has(input:checked) { border-color: var(--accent); color: var(--text); background: var(--accent-subtle); }
.mode-opt input { accent-color: var(--accent); }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.actions { display: flex; gap: var(--sp-2); }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
.preview-box { min-height: 300px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-5); font-size: .9375rem; line-height: 1.7; overflow-y: auto; max-height: 500px; }
.preview-box :global(h1) { font-size: 1.5rem; margin-bottom: .5rem; }
.preview-box :global(h2) { font-size: 1.25rem; margin-bottom: .5rem; }
.preview-box :global(code) { background: var(--bg-input); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: .85em; }
.preview-box :global(pre) { background: var(--bg-input); padding: var(--sp-4); border-radius: var(--r-md); overflow-x: auto; }
.preview-box :global(blockquote) { border-left: 3px solid var(--accent); padding-left: var(--sp-4); color: var(--text-muted); }
.placeholder { color: var(--text-subtle); }
</style>
