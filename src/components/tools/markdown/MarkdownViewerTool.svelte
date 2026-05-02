<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  import { ui } from "../../../lib/ui-labels.ts";
  import { mdToHtml } from "../../../lib/markdown.ts";

  type ViewMode = "split" | "preview" | "source";

  const LANG = (typeof import.meta !== "undefined" && (import.meta as any).env?.PUBLIC_SITE_LANG) || "hu";
  const isRO = LANG === "ro";

  const LABELS = isRO
    ? {
        sourceLabel: "Sursă Markdown",
        previewLabel: "Previzualizare live",
        viewSplit: "Împărțit",
        viewPreview: "Doar previzualizare",
        viewSource: "Doar sursă",
        viewModeAria: "Mod de afișare",
        loadExample: "Încarcă exemplu",
        pasteFromClip: "Lipește",
        clear: "Șterge",
        downloadMd: "Descarcă .md",
        downloadHtml: "Descarcă .html",
        copyHtml: "Copiază HTML",
        words: "cuvinte",
        chars: "caractere",
        lines: "rânduri",
        readingTime: "min citire",
        emptyHint: "Începe să scrii sau lipește text Markdown – previzualizarea apare instantaneu.",
        placeholder:
          "# Titlul tău\n\nScrie sau lipește text **Markdown** aici. Previzualizarea apare *instant* pe partea dreaptă.\n\n## Caracteristici\n\n- Liste, [linkuri](https://example.com), `cod inline`\n- Suport **GFM**: tabele, liste de sarcini\n- Securizat: orice HTML din sursă este escape-at\n\n```js\nfunction salut(nume) {\n  return `Salut, ${nume}!`;\n}\n```\n\n| Funcție | Suport |\n|---|---|\n| Tabele | ✅ |\n| Task list | ✅ |\n| Cod | ✅ |\n\n- [x] Conversie instantă\n- [ ] Sincronizare scroll (în curând)\n\n> Conversia se face exclusiv în browser – sursa ta nu părăsește dispozitivul.\n",
      }
    : {
        sourceLabel: "Markdown forrás",
        previewLabel: "Élő előnézet",
        viewSplit: "Osztott",
        viewPreview: "Csak előnézet",
        viewSource: "Csak forrás",
        viewModeAria: "Megjelenítési mód",
        loadExample: "Példa betöltése",
        pasteFromClip: "Beillesztés",
        clear: "Törlés",
        downloadMd: ".md letöltése",
        downloadHtml: ".html letöltése",
        copyHtml: "HTML másolása",
        words: "szó",
        chars: "karakter",
        lines: "sor",
        readingTime: "perc olvasás",
        emptyHint: "Kezdj el gépelni, vagy illessz be Markdown szöveget – az előnézet azonnal megjelenik.",
        placeholder:
          "# A te címed\n\nÍrj vagy illessz be **Markdown** szöveget. Az előnézet *azonnal* megjelenik a jobb oldalon.\n\n## Funkciók\n\n- Listák, [linkek](https://example.com), `inline kód`\n- **GFM** támogatás: táblázatok, feladatlisták\n- Biztonságos: a forrásban lévő HTML escape-elve van\n\n```js\nfunction udvozlet(nev) {\n  return `Szia, ${nev}!`;\n}\n```\n\n| Funkció | Támogatás |\n|---|---|\n| Táblázatok | ✅ |\n| Task list | ✅ |\n| Kód | ✅ |\n\n- [x] Azonnali konvertálás\n- [ ] Scroll-szinkron (hamarosan)\n\n> A renderelés kizárólag a böngésződben történik – a forrásod nem hagyja el az eszközt.\n",
      };

  let input = LABELS.placeholder;
  let viewMode: ViewMode = "split";
  let copiedHtml = false;

  $: htmlOutput = mdToHtml(input);
  $: charCount = input.length;
  $: wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  $: lineCount = input ? input.split("\n").length : 0;
  $: readingMin = Math.max(1, Math.ceil(wordCount / 200));

  async function copyHtml() {
    if (!htmlOutput) return;
    try {
      await navigator.clipboard.writeText(htmlOutput);
      copiedHtml = true;
      setTimeout(() => (copiedHtml = false), 2000);
    } catch {}
  }

  async function pasteFromClip() {
    try {
      const t = await navigator.clipboard.readText();
      if (t) input = t;
    } catch {}
  }

  function loadExample() {
    input = LABELS.placeholder;
  }

  function clearAll() {
    input = "";
  }

  function downloadHtmlFile() {
    if (!htmlOutput) return;
    const wrapped = `<!doctype html>
<html lang="${LANG}">
<head>
<meta charset="utf-8" />
<title>Markdown export</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:780px;margin:2rem auto;padding:0 1rem;line-height:1.7;color:#222}
pre{background:#f4f4f5;padding:1rem;border-radius:6px;overflow-x:auto}
code{background:#f4f4f5;padding:.15em .35em;border-radius:4px;font-size:.9em}
pre code{background:transparent;padding:0}
blockquote{border-left:3px solid #888;padding-left:1rem;color:#555;margin:1rem 0}
table{border-collapse:collapse;width:100%}
th,td{border:1px solid #ddd;padding:.5rem .75rem}
th{background:#f4f4f5}
img{max-width:100%}
</style>
</head>
<body>
${htmlOutput}
</body>
</html>`;
    downloadText(wrapped, "markdown.html", "text/html");
  }

  function downloadMdFile() {
    if (!input) return;
    downloadText(input, "document.md", "text/markdown");
  }

  function handleSourceKeydown(ev: KeyboardEvent) {
    // Tab kezelése a forrás textareá-ban (4 szóköz beszúrása)
    if (ev.key === "Tab") {
      ev.preventDefault();
      const ta = ev.target as HTMLTextAreaElement;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const v = ta.value;
      ta.value = v.slice(0, start) + "  " + v.slice(end);
      ta.selectionStart = ta.selectionEnd = start + 2;
      input = ta.value;
    }
  }
</script>

<div class="md-tool">
  <div class="md-toolbar card">
    <div class="md-modes" role="tablist" aria-label={LABELS.viewModeAria}>
      <button
        role="tab"
        aria-selected={viewMode === "split"}
        class="md-mode"
        class:active={viewMode === "split"}
        on:click={() => (viewMode = "split")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="8" height="18" rx="1"/><rect x="13" y="3" width="8" height="18" rx="1"/></svg>
        {LABELS.viewSplit}
      </button>
      <button
        role="tab"
        aria-selected={viewMode === "preview"}
        class="md-mode"
        class:active={viewMode === "preview"}
        on:click={() => (viewMode = "preview")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        {LABELS.viewPreview}
      </button>
      <button
        role="tab"
        aria-selected={viewMode === "source"}
        class="md-mode"
        class:active={viewMode === "source"}
        on:click={() => (viewMode = "source")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        {LABELS.viewSource}
      </button>
    </div>

    <div class="md-tools">
      <button class="btn btn--ghost btn--sm" on:click={loadExample}>{LABELS.loadExample}</button>
      <button class="btn btn--ghost btn--sm" on:click={pasteFromClip}>{LABELS.pasteFromClip}</button>
      <button class="btn btn--ghost btn--sm" on:click={clearAll} disabled={!input}>{LABELS.clear}</button>
    </div>
  </div>

  <div
    class="md-grid"
    class:md-grid--split={viewMode === "split"}
    class:md-grid--preview={viewMode === "preview"}
    class:md-grid--source={viewMode === "source"}
  >
    {#if viewMode !== "preview"}
      <div class="md-pane">
        <div class="md-pane-head">
          <span class="label">{LABELS.sourceLabel}</span>
          <button
            class="btn btn--outline btn--sm"
            on:click={downloadMdFile}
            disabled={!input}
            title={LABELS.downloadMd}
          >
            {LABELS.downloadMd}
          </button>
        </div>
        <textarea
          class="md-source"
          bind:value={input}
          on:keydown={handleSourceKeydown}
          placeholder={LABELS.placeholder}
          spellcheck="false"
          aria-label={LABELS.sourceLabel}
        ></textarea>
      </div>
    {/if}

    {#if viewMode !== "source"}
      <div class="md-pane">
        <div class="md-pane-head">
          <span class="label">{LABELS.previewLabel}</span>
          <div class="md-pane-actions">
            <button class="btn btn--outline btn--sm" on:click={copyHtml} disabled={!htmlOutput}>
              {copiedHtml ? `✓ ${ui.copied}` : LABELS.copyHtml}
            </button>
            <button class="btn btn--ghost btn--sm" on:click={downloadHtmlFile} disabled={!htmlOutput}>
              {LABELS.downloadHtml}
            </button>
          </div>
        </div>
        <div class="md-preview" aria-live="polite" aria-label={LABELS.previewLabel}>
          {#if htmlOutput}
            {@html htmlOutput}
          {:else}
            <p class="md-empty">{LABELS.emptyHint}</p>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="md-stats" aria-label="stats">
    <span><strong>{wordCount}</strong> {LABELS.words}</span>
    <span><strong>{charCount}</strong> {LABELS.chars}</span>
    <span><strong>{lineCount}</strong> {LABELS.lines}</span>
    <span><strong>{readingMin}</strong> {LABELS.readingTime}</span>
  </div>
</div>

<style>
.md-tool { display: flex; flex-direction: column; gap: var(--sp-4); }

.md-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: var(--sp-3); padding: var(--sp-3) var(--sp-4);
}
.md-modes { display: inline-flex; gap: 4px; padding: 4px; background: var(--bg-input); border-radius: var(--r-md); border: 1px solid var(--border); }
.md-mode {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; font-size: .825rem; font-weight: 500;
  background: transparent; border: 0; border-radius: calc(var(--r-md) - 3px);
  color: var(--text-muted); cursor: pointer; transition: background .15s, color .15s;
}
.md-mode:hover { color: var(--text); }
.md-mode.active { background: var(--bg-card); color: var(--text); box-shadow: 0 1px 2px rgba(0,0,0,.08); }
.md-tools { display: inline-flex; gap: var(--sp-2); flex-wrap: wrap; }

.md-grid { display: grid; gap: var(--sp-4); align-items: stretch; }
.md-grid--split { grid-template-columns: 1fr 1fr; }
.md-grid--preview, .md-grid--source { grid-template-columns: 1fr; }
@media (max-width: 900px) { .md-grid--split { grid-template-columns: 1fr; } }

.md-pane { display: flex; flex-direction: column; gap: var(--sp-2); min-width: 0; }
.md-pane-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); flex-wrap: wrap; }
.md-pane-actions { display: inline-flex; gap: var(--sp-2); }

.md-source {
  width: 100%; min-height: 460px; resize: vertical;
  font-family: var(--font-mono); font-size: .9rem; line-height: 1.65;
  background: var(--bg-input); color: var(--text);
  border: 1px solid var(--border); border-radius: var(--r-md);
  padding: var(--sp-4); tab-size: 2; -moz-tab-size: 2;
}
.md-source:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-subtle); }

.md-preview {
  width: 100%; min-height: 460px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md);
  padding: var(--sp-5) var(--sp-6); overflow-y: auto; max-height: 700px;
  font-size: .9375rem; line-height: 1.7; color: var(--text);
}
.md-empty { color: var(--text-subtle); font-style: italic; margin: 0; }

.md-stats {
  display: flex; flex-wrap: wrap; gap: var(--sp-5);
  font-family: var(--font-mono); font-size: .8rem; color: var(--text-subtle);
  padding: var(--sp-2) var(--sp-3); border-top: 1px solid var(--border);
}
.md-stats strong { color: var(--text); font-weight: 600; }

/* ─── Renderelt Markdown stílusok (preview area) ─────────────────────── */
.md-preview :global(h1),
.md-preview :global(h2),
.md-preview :global(h3),
.md-preview :global(h4),
.md-preview :global(h5),
.md-preview :global(h6) { margin: 1.4em 0 .55em; font-weight: 700; line-height: 1.3; color: var(--text); }
.md-preview :global(h1) { font-size: 1.875rem; padding-bottom: .35em; border-bottom: 1px solid var(--border); }
.md-preview :global(h2) { font-size: 1.5rem; padding-bottom: .3em; border-bottom: 1px solid var(--border); }
.md-preview :global(h3) { font-size: 1.25rem; }
.md-preview :global(h4) { font-size: 1.05rem; }
.md-preview :global(h5) { font-size: .95rem; color: var(--text-muted); }
.md-preview :global(h6) { font-size: .85rem; text-transform: uppercase; letter-spacing: .04em; color: var(--text-muted); }
.md-preview :global(h1:first-child),
.md-preview :global(h2:first-child),
.md-preview :global(h3:first-child) { margin-top: 0; }

.md-preview :global(p) { margin: 0 0 1em; }
.md-preview :global(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.md-preview :global(a:hover) { text-decoration: none; }

.md-preview :global(strong) { font-weight: 700; color: var(--text); }
.md-preview :global(em) { font-style: italic; }
.md-preview :global(del) { color: var(--text-subtle); }

.md-preview :global(ul),
.md-preview :global(ol) { padding-left: 1.5em; margin: 0 0 1em; }
.md-preview :global(li) { margin: .25em 0; }
.md-preview :global(li > ul),
.md-preview :global(li > ol) { margin: .25em 0; }
.md-preview :global(li.md-task) { list-style: none; margin-left: -1.4em; padding-left: 0; }
.md-preview :global(li.md-task input) { margin-right: .5em; transform: translateY(1px); accent-color: var(--accent); }

.md-preview :global(blockquote) {
  margin: 1em 0; padding: .25em 1em; border-left: 3px solid var(--accent);
  background: var(--accent-subtle); border-radius: 0 var(--r-md) var(--r-md) 0; color: var(--text-muted);
}
.md-preview :global(blockquote p:last-child) { margin-bottom: 0; }

.md-preview :global(code) {
  font-family: var(--font-mono); font-size: .87em;
  background: var(--bg-input); padding: .15em .4em; border-radius: 4px;
  border: 1px solid var(--border); color: var(--text);
}
.md-preview :global(pre) {
  position: relative; background: var(--bg-input); border: 1px solid var(--border);
  padding: var(--sp-4) var(--sp-4) var(--sp-4) var(--sp-4); border-radius: var(--r-md);
  overflow-x: auto; margin: 1em 0; font-size: .85rem; line-height: 1.55;
}
.md-preview :global(pre code) { background: transparent; border: 0; padding: 0; font-size: 1em; color: var(--text); }
.md-preview :global(.md-codelang) {
  position: absolute; top: 6px; right: 8px;
  font-family: var(--font-mono); font-size: .68rem; text-transform: uppercase;
  letter-spacing: .06em; color: var(--text-subtle); user-select: none;
}

.md-preview :global(hr) { margin: 2em 0; border: 0; border-top: 1px solid var(--border); }

.md-preview :global(.md-tablewrap) { overflow-x: auto; margin: 1em 0; }
.md-preview :global(table) { border-collapse: collapse; width: 100%; font-size: .9rem; }
.md-preview :global(th),
.md-preview :global(td) { padding: .55em .85em; border: 1px solid var(--border); text-align: left; }
.md-preview :global(thead th) { background: var(--bg-input); font-weight: 600; }
.md-preview :global(tbody tr:nth-child(even)) { background: var(--bg-input); }

.md-preview :global(img) { max-width: 100%; height: auto; border-radius: var(--r-md); margin: .5em 0; }
</style>
