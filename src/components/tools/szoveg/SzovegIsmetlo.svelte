<script lang="ts">
  // ─── Szövegismétlő (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "Szöveg", inputPh: "Ismételendő szöveg…",
      countLbl: "Ismétlések száma", sepLbl: "Elválasztó",
      sepNewline: "Új sor", sepSpace: "Szóköz", sepComma: "Vessző", sepNone: "Semmi", sepCustom: "Egyéni",
      numbering: "Sorszámozás (1. 2. 3.…)",
      output: "Eredmény", copy: "Másolás", copied: "Másolva!",
      chars: "karakter", empty: "Add meg az ismételendő szöveget.",
      hint: "Minden feldolgozás a böngésződben történik.",
    },
    ro: {
      inputLbl: "Text", inputPh: "Textul de repetat…",
      countLbl: "Număr de repetări", sepLbl: "Separator",
      sepNewline: "Rând nou", sepSpace: "Spațiu", sepComma: "Virgulă", sepNone: "Nimic", sepCustom: "Personalizat",
      numbering: "Numerotare (1. 2. 3.…)",
      output: "Rezultat", copy: "Copiază", copied: "Copiat!",
      chars: "caractere", empty: "Introdu textul de repetat.",
      hint: "Toată procesarea are loc în browserul tău.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let count = $state(10);
  let sepMode = $state<"newline" | "space" | "comma" | "none" | "custom">("newline");
  let customSep = $state(" | ");
  let numbering = $state(false);
  let copied = $state(false);

  const sep = $derived(
    sepMode === "newline" ? "\n" : sepMode === "space" ? " " : sepMode === "comma" ? ", " : sepMode === "custom" ? customSep : ""
  );

  const output = $derived.by(() => {
    if (!input) return "";
    const n = Math.max(1, Math.min(10000, Math.floor(count) || 1));
    const arr: string[] = [];
    for (let i = 0; i < n; i++) arr.push(numbering ? `${i + 1}. ${input}` : input);
    return arr.join(sep);
  });

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card controls">
    <div class="field"><label class="lbl" for="r-in">{L.inputLbl}</label><textarea id="r-in" class="inp ta" rows="3" bind:value={input} placeholder={L.inputPh}></textarea></div>
    <div class="row">
      <div class="field count"><label class="lbl" for="r-count">{L.countLbl}</label><input id="r-count" class="inp" type="number" min="1" max="10000" bind:value={count} /></div>
      <div class="field grow">
        <span class="lbl">{L.sepLbl}</span>
        <div class="seg" role="group">
          <button type="button" class:seg--active={sepMode === "newline"} onclick={() => (sepMode = "newline")}>{L.sepNewline}</button>
          <button type="button" class:seg--active={sepMode === "space"} onclick={() => (sepMode = "space")}>{L.sepSpace}</button>
          <button type="button" class:seg--active={sepMode === "comma"} onclick={() => (sepMode = "comma")}>{L.sepComma}</button>
          <button type="button" class:seg--active={sepMode === "none"} onclick={() => (sepMode = "none")}>{L.sepNone}</button>
          <button type="button" class:seg--active={sepMode === "custom"} onclick={() => (sepMode = "custom")}>{L.sepCustom}</button>
        </div>
      </div>
    </div>
    {#if sepMode === "custom"}<input class="inp" type="text" bind:value={customSep} aria-label={L.sepCustom} />{/if}
    <label class="check"><input type="checkbox" bind:checked={numbering} /><span>{L.numbering}</span></label>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output}{#if output} · <span class="badge">{output.length} {L.chars}</span>{/if}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    {#if output}<pre class="code"><code>{output}</code></pre>{:else}<p class="empty">{L.empty}</p>{/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .row { display: flex; gap: var(--sp-4); flex-wrap: wrap; align-items: flex-start; }
  .count { max-width: 160px; } .grow { flex: 1; min-width: 220px; }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-szoveg, #f59e0b); box-shadow: 0 0 0 3px #f59e0b22; }
  .ta { resize: vertical; }
  .seg { display: inline-flex; flex-wrap: wrap; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; border-right: 1px solid var(--border); padding: var(--sp-2) var(--sp-3); font-size: .8rem; cursor: pointer; }
  .seg button:last-child { border-right: none; }
  .seg button.seg--active { background: var(--cat-szoveg, #f59e0b); color: #fff; font-weight: 600; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-szoveg, #f59e0b); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-szoveg, #f59e0b); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 400px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-word; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-szoveg, #f59e0b); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
