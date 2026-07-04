<script lang="ts">
  // ─── Vessző ↔ sortörés átalakító (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      dirLbl: "Irány", toList: "Sorokból lista", toLines: "Listából sorok",
      sepLbl: "Elválasztó", comma: "Vessző", semicolon: "Pontosvessző", space: "Szóköz", tab: "Tab", custom: "Egyéni",
      trim: "Elemek trimmelése", removeEmpty: "Üres elemek kihagyása", dedupe: "Duplikátumok törlése", quote: "Idézőjelbe tétel",
      inputLbl: "Bemenet", output: "Eredmény", copy: "Másolás", copied: "Másolva!",
      items: "elem", empty: "Add meg a bemenetet.",
      inPhList: "alma\nkörte\nszilva", inPhLines: "alma, körte, szilva",
      hint: "A „Sorokból lista” a sorokat egy sorba fűzi; a „Listából sorok” az elválasztó mentén sortöri.",
    },
    ro: {
      dirLbl: "Direcție", toList: "Din rânduri în listă", toLines: "Din listă în rânduri",
      sepLbl: "Separator", comma: "Virgulă", semicolon: "Punct și virgulă", space: "Spațiu", tab: "Tab", custom: "Personalizat",
      trim: "Curăță elementele", removeEmpty: "Omite elementele goale", dedupe: "Șterge duplicatele", quote: "Pune între ghilimele",
      inputLbl: "Intrare", output: "Rezultat", copy: "Copiază", copied: "Copiat!",
      items: "elemente", empty: "Introdu datele.",
      inPhList: "măr\npară\nprună", inPhLines: "măr, pară, prună",
      hint: "„Din rânduri în listă” unește rândurile pe un singur rând; „Din listă în rânduri” împarte pe separator.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let dir = $state<"toList" | "toLines">("toList");
  let sepMode = $state<"comma" | "semicolon" | "space" | "tab" | "custom">("comma");
  let customSep = $state(" | ");
  let trim = $state(true);
  let removeEmpty = $state(true);
  let dedupe = $state(false);
  let quote = $state(false);
  let copied = $state(false);

  const joinSep = $derived(
    sepMode === "comma" ? ", " : sepMode === "semicolon" ? "; " : sepMode === "space" ? " " : sepMode === "tab" ? "\t" : customSep
  );
  const splitChar = $derived(
    sepMode === "comma" ? "," : sepMode === "semicolon" ? ";" : sepMode === "space" ? " " : sepMode === "tab" ? "\t" : customSep
  );

  function process(items: string[]): string[] {
    let arr = items;
    if (trim) arr = arr.map((x) => x.trim());
    if (removeEmpty) arr = arr.filter((x) => x !== "");
    if (dedupe) arr = [...new Set(arr)];
    if (quote) arr = arr.map((x) => `"${x}"`);
    return arr;
  }

  const output = $derived.by(() => {
    if (!input.trim()) return "";
    if (dir === "toList") {
      return process(input.split("\n")).join(joinSep);
    } else {
      const esc = splitChar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = sepMode === "space" ? /\s+/ : new RegExp("\\s*" + esc + "\\s*");
      return process(input.split(re)).join("\n");
    }
  });

  const itemCount = $derived(output ? (dir === "toList" ? process(input.split("\n")).length : output.split("\n").length) : 0);

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card controls">
    <div class="field">
      <span class="lbl">{L.dirLbl}</span>
      <div class="seg" role="group">
        <button type="button" class:seg--active={dir === "toList"} onclick={() => (dir = "toList")}>{L.toList}</button>
        <button type="button" class:seg--active={dir === "toLines"} onclick={() => (dir = "toLines")}>{L.toLines}</button>
      </div>
    </div>
    <div class="field">
      <span class="lbl">{L.sepLbl}</span>
      <div class="seg" role="group">
        <button type="button" class:seg--active={sepMode === "comma"} onclick={() => (sepMode = "comma")}>{L.comma}</button>
        <button type="button" class:seg--active={sepMode === "semicolon"} onclick={() => (sepMode = "semicolon")}>{L.semicolon}</button>
        <button type="button" class:seg--active={sepMode === "space"} onclick={() => (sepMode = "space")}>{L.space}</button>
        <button type="button" class:seg--active={sepMode === "tab"} onclick={() => (sepMode = "tab")}>{L.tab}</button>
        <button type="button" class:seg--active={sepMode === "custom"} onclick={() => (sepMode = "custom")}>{L.custom}</button>
      </div>
    </div>
    {#if sepMode === "custom"}<input class="inp" type="text" bind:value={customSep} aria-label={L.custom} />{/if}
    <div class="opts">
      <label class="check"><input type="checkbox" bind:checked={trim} /><span>{L.trim}</span></label>
      <label class="check"><input type="checkbox" bind:checked={removeEmpty} /><span>{L.removeEmpty}</span></label>
      <label class="check"><input type="checkbox" bind:checked={dedupe} /><span>{L.dedupe}</span></label>
      <label class="check"><input type="checkbox" bind:checked={quote} /><span>{L.quote}</span></label>
    </div>
  </div>

  <div class="grid2">
    <div class="card"><label class="lbl" for="cl-in">{L.inputLbl}</label><textarea id="cl-in" class="inp ta" rows="6" bind:value={input} placeholder={dir === "toList" ? L.inPhList : L.inPhLines}></textarea></div>
    <div class="card">
      <div class="out-head"><h3 class="legend">{L.output}{#if output} · <span class="badge">{itemCount} {L.items}</span>{/if}</h3>
        <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
      {#if output}<pre class="code"><code>{output}</code></pre>{:else}<p class="empty">{L.empty}</p>{/if}
    </div>
  </div>
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 700px) { .grid2 { grid-template-columns: 1fr; } }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-szoveg, #f59e0b); box-shadow: 0 0 0 3px #f59e0b22; }
  .ta { resize: vertical; }
  .seg { display: inline-flex; flex-wrap: wrap; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; width: fit-content; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; border-right: 1px solid var(--border); padding: var(--sp-2) var(--sp-3); font-size: .8rem; cursor: pointer; }
  .seg button:last-child { border-right: none; }
  .seg button.seg--active { background: var(--cat-szoveg, #f59e0b); color: #fff; font-weight: 600; }
  .opts { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-szoveg, #f59e0b); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-szoveg, #f59e0b); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 340px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-word; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-szoveg, #f59e0b); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
