<script lang="ts">
  // ─── Fordított szöveg (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      modeLbl: "Megfordítás módja",
      chars: "Karakterek", words: "Szavak", lines: "Sorok",
      charsHint: "A teljes szöveg karakterei visszafelé", wordsHint: "A szavak sorrendje megfordul", linesHint: "A sorok sorrendje megfordul",
      inputLbl: "Bemenet", inputPh: "Illeszd be a szöveget…",
      output: "Eredmény", copy: "Másolás", copied: "Másolva!", empty: "Add meg a szöveget.",
      hint: "Diakritika-helyes (Unicode). Minden feldolgozás a böngésződben történik.",
    },
    ro: {
      modeLbl: "Mod de inversare",
      chars: "Caractere", words: "Cuvinte", lines: "Rânduri",
      charsHint: "Caracterele întregului text invers", wordsHint: "Ordinea cuvintelor se inversează", linesHint: "Ordinea rândurilor se inversează",
      inputLbl: "Intrare", inputPh: "Lipește textul…",
      output: "Rezultat", copy: "Copiază", copied: "Copiat!", empty: "Introdu textul.",
      hint: "Corect cu diacritice (Unicode). Toată procesarea are loc în browserul tău.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let mode = $state<"chars" | "words" | "lines">("chars");
  let copied = $state(false);

  const output = $derived.by(() => {
    if (!input) return "";
    if (mode === "chars") return [...input].reverse().join("");
    if (mode === "words") return input.split(/(\s+)/).reverse().join("");
    return input.split("\n").reverse().join("\n");
  });

  const modeHint = $derived(mode === "chars" ? L.charsHint : mode === "words" ? L.wordsHint : L.linesHint);

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <span class="lbl">{L.modeLbl}</span>
    <div class="seg" role="group">
      <button type="button" class:seg--active={mode === "chars"} onclick={() => (mode = "chars")}>{L.chars}</button>
      <button type="button" class:seg--active={mode === "words"} onclick={() => (mode = "words")}>{L.words}</button>
      <button type="button" class:seg--active={mode === "lines"} onclick={() => (mode = "lines")}>{L.lines}</button>
    </div>
    <p class="mode-hint">{modeHint}</p>
  </div>

  <div class="grid2">
    <div class="card"><label class="lbl" for="rv-in">{L.inputLbl}</label><textarea id="rv-in" class="inp ta" rows="6" bind:value={input} placeholder={L.inputPh}></textarea></div>
    <div class="card">
      <div class="out-head"><h3 class="legend">{L.output}</h3>
        <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
      {#if output}<pre class="code"><code>{output}</code></pre>{:else}<p class="empty">{L.empty}</p>{/if}
    </div>
  </div>
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 700px) { .grid2 { grid-template-columns: 1fr; } }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-szoveg, #f59e0b); box-shadow: 0 0 0 3px #f59e0b22; }
  .ta { resize: vertical; }
  .seg { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; width: fit-content; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; border-right: 1px solid var(--border); padding: var(--sp-2) var(--sp-4); font-size: .8125rem; cursor: pointer; }
  .seg button:last-child { border-right: none; }
  .seg button.seg--active { background: var(--cat-szoveg, #f59e0b); color: #fff; font-weight: 600; }
  .mode-hint { margin: var(--sp-3) 0 0; font-size: .78rem; color: var(--text-subtle); }
  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 340px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .85rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-word; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-szoveg, #f59e0b); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
