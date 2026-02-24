<script lang="ts">
  import { downloadText } from "../../../lib/download.ts";
  let input = "";
  let output = "";
  let mode: "encode" | "decode" = "encode";
  let error = "";
  let copied = false;

  function encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  function decode(str: string): string {
    return decodeURIComponent(escape(atob(str.trim())));
  }

  $: {
    error = "";
    if (!input.trim()) { output = ""; }
    else {
      try { output = mode === "encode" ? encode(input) : decode(input); }
      catch (e) { error = e instanceof Error ? e.message : String(e); output = ""; }
    }
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
        <span>Kódolás (Encode)</span>
      </label>
      <label class="mode-opt" class:mode-opt--active={mode === "decode"}>
        <input type="radio" name="mode" value="decode" bind:group={mode} />
        <span>Dekódolás (Decode)</span>
      </label>
    </div>
  </div>

  <div class="io-grid">
    <div class="io-pane">
      <span class="label">{mode === "encode" ? "Szöveg" : "Base64 kód"}</span>
      <textarea class="textarea" rows="10" placeholder={mode === "encode" ? "Írd be a kódolandó szöveget..." : "Illeszd be a Base64 kódot..."} bind:value={input}></textarea>
      {#if error}<div class="error-msg">{error}</div>{/if}
    </div>
    <div class="io-pane">
      <div class="output-header">
        <span class="label">{mode === "encode" ? "Base64 eredmény" : "Dekódolt szöveg"}</span>
        <div class="actions">
          <button class="btn btn--outline btn--sm" on:click={copyOutput} disabled={!output}>{copied ? "✓ Másolva!" : "Másolás"}</button>
          <button class="btn btn--ghost btn--sm" on:click={() => downloadText(output, mode === "encode" ? "base64.txt" : "decoded.txt")} disabled={!output}>Letöltés</button>
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
.error-msg { font-family: var(--font-mono); font-size: .78rem; color: var(--error); background: rgba(239,68,68,0.08); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-sm); }
</style>
