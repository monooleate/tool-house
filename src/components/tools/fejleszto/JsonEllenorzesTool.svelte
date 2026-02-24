<script lang="ts">
  let input = "";
  let valid: boolean | null = null;
  let errorMsg = "";
  let errorLine = 0;

  $: {
    if (!input.trim()) { valid = null; errorMsg = ""; errorLine = 0; }
    else {
      try { JSON.parse(input); valid = true; errorMsg = ""; errorLine = 0; }
      catch (e) {
        valid = false;
        const msg = e instanceof Error ? e.message : String(e);
        errorMsg = msg;
        const lineMatch = msg.match(/position\s+(\d+)/i);
        if (lineMatch) {
          const pos = parseInt(lineMatch[1], 10);
          errorLine = input.substring(0, pos).split("\n").length;
        }
      }
    }
  }

  const EXAMPLES = [
    { label: "Érvényes JSON", value: '{\n  "nev": "Kovács János",\n  "kor": 30,\n  "aktiv": true\n}' },
    { label: "Hibás JSON", value: '{\n  "nev": "Kovács"\n  "kor": 30\n}' },
  ];
</script>

<div class="tool">
  <div class="card status-card" class:status--valid={valid === true} class:status--invalid={valid === false} class:status--empty={valid === null}>
    {#if valid === null}
      <span class="status-icon">⏳</span>
      <span>Illeszd be a JSON szöveget az ellenőrzéshez</span>
    {:else if valid}
      <span class="status-icon">✅</span>
      <span class="status-text">Érvényes JSON</span>
    {:else}
      <span class="status-icon">❌</span>
      <div class="error-detail">
        <span class="status-text">Érvénytelen JSON</span>
        <span class="error-line">{errorLine > 0 ? `Hiba a(z) ${errorLine}. sor közelében` : ""}</span>
        <code class="error-code">{errorMsg}</code>
      </div>
    {/if}
  </div>

  <div class="examples">
    <span class="examples__label">Példák:</span>
    {#each EXAMPLES as ex}
      <button class="btn btn--ghost btn--sm" on:click={() => (input = ex.value)}>{ex.label}</button>
    {/each}
  </div>

  <textarea class="textarea" rows="15" placeholder='Illeszd be a JSON-t ide...' bind:value={input} class:textarea--valid={valid === true} class:textarea--invalid={valid === false}></textarea>
</div>

<style>
.tool { display: flex; flex-direction: column; gap: var(--sp-5); }
.status-card { display: flex; align-items: flex-start; gap: var(--sp-3); font-size: .9375rem; }
.status--valid { border-color: var(--success); }
.status--invalid { border-color: var(--error); }
.status-icon { font-size: 1.25rem; }
.status-text { font-weight: 700; }
.error-detail { display: flex; flex-direction: column; gap: var(--sp-1); }
.error-line { font-family: var(--font-mono); font-size: .78rem; color: var(--text-muted); }
.error-code { font-family: var(--font-mono); font-size: .78rem; color: var(--error); background: rgba(239,68,68,0.08); padding: var(--sp-1) var(--sp-2); border-radius: var(--r-sm); word-break: break-all; }
.examples { display: flex; flex-wrap: wrap; gap: var(--sp-2); align-items: center; }
.examples__label { font-family: var(--font-mono); font-size: .72rem; color: var(--text-subtle); text-transform: uppercase; }
.textarea { width: 100%; font-family: var(--font-mono); font-size: .875rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); line-height: 1.6; resize: vertical; transition: border-color var(--t-fast); }
.textarea:focus { outline: none; border-color: var(--accent); }
.textarea--valid { border-color: var(--success); }
.textarea--invalid { border-color: var(--error); }
</style>
