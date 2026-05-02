<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { mdToHtml } from "../../../lib/markdown.ts";

  type RightMode = "preview" | "html";

  let input = "";
  let rightMode: RightMode = "preview";
  let copied = false;

  $: htmlOutput = mdToHtml(input);

  async function copyOutput() {
    if (!htmlOutput) return;
    try {
      await navigator.clipboard.writeText(htmlOutput);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {}
  }

  function handleKeydown(ev: KeyboardEvent) {
    if (ev.key === "Tab") {
      ev.preventDefault();
      const ta = ev.target as HTMLTextAreaElement;
      const s = ta.selectionStart;
      const e = ta.selectionEnd;
      const v = ta.value;
      ta.value = v.slice(0, s) + "  " + v.slice(e);
      ta.selectionStart = ta.selectionEnd = s + 2;
      input = ta.value;
    }
  }
</script>

<div class="mdh-tool">
  <div class="mdh-toolbar card">
    <div class="mdh-modes" role="tablist" aria-label={ui.preview}>
      <button
        role="tab"
        aria-selected={rightMode === "preview"}
        class="mdh-mode"
        class:active={rightMode === "preview"}
        on:click={() => (rightMode = "preview")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        {ui.preview}
      </button>
      <button
        role="tab"
        aria-selected={rightMode === "html"}
        class="mdh-mode"
        class:active={rightMode === "html"}
        on:click={() => (rightMode = "html")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        {ui.htmlCode}
      </button>
    </div>
  </div>

  <div class="mdh-grid">
    <div class="mdh-pane">
      <span class="label">Markdown</span>
      <textarea
        class="mdh-source"
        placeholder={ui.markdownPlaceholder}
        bind:value={input}
        on:keydown={handleKeydown}
        spellcheck="false"
        aria-label="Markdown"
      ></textarea>
    </div>

    <div class="mdh-pane">
      <div class="mdh-pane-head">
        <span class="label">{rightMode === "preview" ? ui.preview : ui.htmlCode}</span>
        <div class="mdh-actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!htmlOutput}>
            {copied ? `✓ ${ui.copied}` : ui.htmlCopy}
          </button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(htmlOutput, "output.html", "text/html")} disabled={!htmlOutput}>
            {ui.download}
          </button>
        </div>
      </div>

      {#if rightMode === "preview"}
        <div class="mdh-preview" aria-live="polite">
          {#if htmlOutput}
            {@html htmlOutput}
          {:else}
            <p class="mdh-empty">{ui.previewPlaceholder}</p>
          {/if}
        </div>
      {:else}
        <textarea class="mdh-source mdh-source--out" value={htmlOutput} readonly aria-label={ui.htmlCode}></textarea>
      {/if}
    </div>
  </div>
</div>

<style>
.mdh-tool { display: flex; flex-direction: column; gap: var(--sp-4); }

.mdh-toolbar {
  display: flex; align-items: center; justify-content: flex-start;
  gap: var(--sp-3); padding: var(--sp-3) var(--sp-4);
}
.mdh-modes { display: inline-flex; gap: 4px; padding: 4px; background: var(--bg-input); border-radius: var(--r-md); border: 1px solid var(--border); }
.mdh-mode {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; font-size: .825rem; font-weight: 500;
  background: transparent; border: 0; border-radius: calc(var(--r-md) - 3px);
  color: var(--text-muted); cursor: pointer; transition: background .15s, color .15s;
}
.mdh-mode:hover { color: var(--text); }
.mdh-mode.active { background: var(--bg-card); color: var(--text); box-shadow: 0 1px 2px rgba(0,0,0,.08); }

.mdh-grid {
  display: grid; gap: var(--sp-4); align-items: stretch;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 900px) { .mdh-grid { grid-template-columns: 1fr; } }

.mdh-pane { display: flex; flex-direction: column; gap: var(--sp-2); min-width: 0; }
.mdh-pane-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); flex-wrap: wrap; }
.mdh-actions { display: inline-flex; gap: var(--sp-2); }

.mdh-source {
  width: 100%; min-height: 460px; resize: vertical;
  font-family: var(--font-mono); font-size: .9rem; line-height: 1.65;
  background: var(--bg-input); color: var(--text);
  border: 1px solid var(--border); border-radius: var(--r-md);
  padding: var(--sp-4); tab-size: 2; -moz-tab-size: 2;
}
.mdh-source:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-subtle); }
.mdh-source--out { background: var(--bg-card); color: var(--accent); }

.mdh-preview {
  width: 100%; min-height: 460px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md);
  padding: var(--sp-5) var(--sp-6); overflow-y: auto; max-height: 700px;
  font-size: .9375rem; line-height: 1.7; color: var(--text);
}
.mdh-empty { color: var(--text-subtle); font-style: italic; margin: 0; }

/* ─── Renderelt Markdown stílusok ─────────────────────────────────────── */
.mdh-preview :global(h1),
.mdh-preview :global(h2),
.mdh-preview :global(h3),
.mdh-preview :global(h4),
.mdh-preview :global(h5),
.mdh-preview :global(h6) { margin: 1.4em 0 .55em; font-weight: 700; line-height: 1.3; color: var(--text); }
.mdh-preview :global(h1) { font-size: 1.875rem; padding-bottom: .35em; border-bottom: 1px solid var(--border); }
.mdh-preview :global(h2) { font-size: 1.5rem; padding-bottom: .3em; border-bottom: 1px solid var(--border); }
.mdh-preview :global(h3) { font-size: 1.25rem; }
.mdh-preview :global(h4) { font-size: 1.05rem; }
.mdh-preview :global(h5) { font-size: .95rem; color: var(--text-muted); }
.mdh-preview :global(h6) { font-size: .85rem; text-transform: uppercase; letter-spacing: .04em; color: var(--text-muted); }
.mdh-preview :global(h1:first-child),
.mdh-preview :global(h2:first-child),
.mdh-preview :global(h3:first-child) { margin-top: 0; }

.mdh-preview :global(p) { margin: 0 0 1em; }
.mdh-preview :global(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.mdh-preview :global(a:hover) { text-decoration: none; }

.mdh-preview :global(strong) { font-weight: 700; color: var(--text); }
.mdh-preview :global(em) { font-style: italic; }
.mdh-preview :global(del) { color: var(--text-subtle); }

.mdh-preview :global(ul),
.mdh-preview :global(ol) { padding-left: 1.5em; margin: 0 0 1em; }
.mdh-preview :global(li) { margin: .25em 0; }
.mdh-preview :global(li > ul),
.mdh-preview :global(li > ol) { margin: .25em 0; }
.mdh-preview :global(li.md-task) { list-style: none; margin-left: -1.4em; padding-left: 0; }
.mdh-preview :global(li.md-task input) { margin-right: .5em; transform: translateY(1px); accent-color: var(--accent); }

.mdh-preview :global(blockquote) {
  margin: 1em 0; padding: .25em 1em; border-left: 3px solid var(--accent);
  background: var(--accent-subtle); border-radius: 0 var(--r-md) var(--r-md) 0; color: var(--text-muted);
}
.mdh-preview :global(blockquote p:last-child) { margin-bottom: 0; }

.mdh-preview :global(code) {
  font-family: var(--font-mono); font-size: .87em;
  background: var(--bg-input); padding: .15em .4em; border-radius: 4px;
  border: 1px solid var(--border); color: var(--text);
}
.mdh-preview :global(pre) {
  position: relative; background: var(--bg-input); border: 1px solid var(--border);
  padding: var(--sp-4); border-radius: var(--r-md);
  overflow-x: auto; margin: 1em 0; font-size: .85rem; line-height: 1.55;
}
.mdh-preview :global(pre code) { background: transparent; border: 0; padding: 0; font-size: 1em; color: var(--text); }
.mdh-preview :global(.md-codelang) {
  position: absolute; top: 6px; right: 8px;
  font-family: var(--font-mono); font-size: .68rem; text-transform: uppercase;
  letter-spacing: .06em; color: var(--text-subtle); user-select: none;
}

.mdh-preview :global(hr) { margin: 2em 0; border: 0; border-top: 1px solid var(--border); }

.mdh-preview :global(.md-tablewrap) { overflow-x: auto; margin: 1em 0; }
.mdh-preview :global(table) { border-collapse: collapse; width: 100%; font-size: .9rem; }
.mdh-preview :global(th),
.mdh-preview :global(td) { padding: .55em .85em; border: 1px solid var(--border); text-align: left; }
.mdh-preview :global(thead th) { background: var(--bg-input); font-weight: 600; }
.mdh-preview :global(tbody tr:nth-child(even)) { background: var(--bg-input); }

.mdh-preview :global(img) { max-width: 100%; height: auto; border-radius: var(--r-md); margin: .5em 0; }
</style>
