<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  let input = "";
  let output = "";
  let mode: "encode" | "decode" = "encode";
  let copied = false;

  const ENTITIES: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  };

  const REVERSE: Record<string, string> = {};
  for (const [k, v] of Object.entries(ENTITIES)) REVERSE[v] = k;

  function encodeEntities(str: string): string {
    return str.replace(/[&<>"']/g, (c) => ENTITIES[c] ?? c);
  }

  function decodeEntities(str: string): string {
    return str
      .replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;|&#(\d+);|&#x([0-9a-fA-F]+);/g, (match, dec, hex) => {
        if (REVERSE[match]) return REVERSE[match];
        if (dec) return String.fromCharCode(parseInt(dec, 10));
        if (hex) return String.fromCharCode(parseInt(hex, 16));
        return match;
      });
  }

  $: {
    if (!input.trim()) { output = ""; }
    else { output = mode === "encode" ? encodeEntities(input) : decodeEntities(input); }
  }

  async function copyOutput() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 2000); } catch {}
  }
</script>

<div class="tool">
  <div class="card settings-card">
    <div class="mode-row">
      <label class="mode-opt" class:mode-opt--active={mode === "encode"}>
        <input type="radio" name="mode" value="encode" bind:group={mode} />
        <span>Kódolás (& → &amp;amp;)</span>
      </label>
      <label class="mode-opt" class:mode-opt--active={mode === "decode"}>
        <input type="radio" name="mode" value="decode" bind:group={mode} />
        <span>Dekódolás (&amp;amp; → &)</span>
      </label>
    </div>
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">{mode === "encode" ? "HTML / szöveg" : "HTML entity kód"}</span>
      <textarea class="textarea" rows="10" placeholder={mode === "encode" ? '<p>Helló & "Világ"</p>' : '&lt;p&gt;Hell&oacute; &amp; &quot;Vil&aacute;g&quot;&lt;/p&gt;'} bind:value={input}></textarea>
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">{mode === "encode" ? "HTML entity kód" : "Dekódolt szöveg"}</span>
        <div class="actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? "✓ Másolva!" : "Másolás"}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, "html-entity.txt")} disabled={!output}>Letöltés</button>
        </div>
      </div>
      <textarea class="textarea textarea--out" rows="10" value={output} readonly></textarea>
    </div>
  </div>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.settings-card { display: flex; flex-direction: column; gap: var(--sp-3); }
.mode-row { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.mode-opt { display: flex; align-items: center; gap: var(--sp-2); cursor: pointer; font-size: .875rem; color: var(--text-muted); padding: var(--sp-2) var(--sp-4); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); transition: all var(--t-fast); }
.mode-opt--active { border-color: var(--accent); color: var(--text); background: var(--accent-subtle); }
.mode-opt input { accent-color: var(--accent); }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 700px) { .io-grid { grid-template-columns: 1fr; } }
.io-pane { display: flex; flex-direction: column; gap: var(--sp-2); }
.output-header { display: flex; align-items: center; justify-content: space-between; }
.actions { display: flex; gap: var(--sp-2); }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--out { background: var(--bg-card); color: var(--accent); }
</style>
