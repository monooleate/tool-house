<script lang="ts">
  // ─── Szöveg → Hashtag generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "Szöveg (szavak vagy kifejezések, soronként vagy szóközzel)",
      inputPh: "nyári akció\ningyenes szállítás\núj kollekció",
      modeLbl: "Mód", perWord: "Minden szó", perLine: "Minden sor",
      styleLbl: "Stílus", lower: "#kisbetu", camel: "#camelCase",
      accent: "Ékezetek eltávolítása", sepLbl: "Kimenet",
      sepSpace: "Szóközzel", sepLine: "Soronként",
      output: "Hashtagek", copy: "Másolás", copied: "Másolva!",
      count: "hashtag", empty: "Add meg a szöveget.",
      hint: "A hashtagekben csak betűk és számok maradnak. Minden feldolgozás a böngésződben.",
    },
    ro: {
      inputLbl: "Text (cuvinte sau expresii, pe rânduri sau cu spații)",
      inputPh: "reducere de vară\nlivrare gratuită\ncolecție nouă",
      modeLbl: "Mod", perWord: "Fiecare cuvânt", perLine: "Fiecare rând",
      styleLbl: "Stil", lower: "#litere-mici", camel: "#camelCase",
      accent: "Elimină diacriticele", sepLbl: "Ieșire",
      sepSpace: "Cu spații", sepLine: "Pe rânduri",
      output: "Hashtag-uri", copy: "Copiază", copied: "Copiat!",
      count: "hashtag-uri", empty: "Introdu textul.",
      hint: "În hashtag-uri rămân doar litere și cifre. Toată procesarea are loc în browserul tău.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let mode = $state<"word" | "line">("line");
  let style = $state<"lower" | "camel">("camel");
  let accent = $state(true);
  let sepLine = $state(false);
  let copied = $state(false);

  function strip(s: string): string { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  function toHashtag(phrase: string): string {
    let words = phrase.trim().split(/\s+/).filter(Boolean);
    if (accent) words = words.map(strip);
    words = words.map((w) => w.replace(/[^a-zA-Z0-9]/g, "")).filter(Boolean);
    if (words.length === 0) return "";
    let tag: string;
    if (style === "lower") tag = words.join("").toLowerCase();
    else tag = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
    return "#" + tag;
  }

  const tags = $derived.by(() => {
    if (!input.trim()) return [] as string[];
    const units = mode === "line" ? input.split("\n") : input.split(/\s+/);
    return units.map(toHashtag).filter(Boolean);
  });

  const output = $derived(tags.join(sepLine ? "\n" : " "));

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="ht-in">{L.inputLbl}</label>
    <textarea id="ht-in" class="inp ta" rows="4" bind:value={input} placeholder={L.inputPh}></textarea>
    <div class="rows">
      <div class="field"><span class="mini">{L.modeLbl}</span>
        <div class="seg"><button type="button" class:seg--active={mode === "line"} onclick={() => (mode = "line")}>{L.perLine}</button><button type="button" class:seg--active={mode === "word"} onclick={() => (mode = "word")}>{L.perWord}</button></div></div>
      <div class="field"><span class="mini">{L.styleLbl}</span>
        <div class="seg"><button type="button" class:seg--active={style === "camel"} onclick={() => (style = "camel")}>{L.camel}</button><button type="button" class:seg--active={style === "lower"} onclick={() => (style = "lower")}>{L.lower}</button></div></div>
      <div class="field"><span class="mini">{L.sepLbl}</span>
        <div class="seg"><button type="button" class:seg--active={!sepLine} onclick={() => (sepLine = false)}>{L.sepSpace}</button><button type="button" class:seg--active={sepLine} onclick={() => (sepLine = true)}>{L.sepLine}</button></div></div>
    </div>
    <label class="check"><input type="checkbox" bind:checked={accent} /><span>{L.accent}</span></label>
  </div>

  <div class="card">
    <div class="out-head"><h3 class="legend">{L.output}{#if tags.length} · <span class="badge">{tags.length} {L.count}</span>{/if}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button></div>
    {#if output}<pre class="code"><code>{output}</code></pre>{:else}<p class="empty">{L.empty}</p>{/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-szoveg, #f59e0b); box-shadow: 0 0 0 3px #f59e0b22; }
  .ta { resize: vertical; }
  .rows { display: flex; gap: var(--sp-5); flex-wrap: wrap; margin: var(--sp-4) 0; }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .mini { font-size: .75rem; color: var(--text-muted); font-weight: 600; }
  .seg { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; width: fit-content; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; border-right: 1px solid var(--border); padding: var(--sp-2) var(--sp-3); font-size: .8rem; cursor: pointer; }
  .seg button:last-child { border-right: none; }
  .seg button.seg--active { background: var(--cat-szoveg, #f59e0b); color: #fff; font-weight: 600; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-szoveg, #f59e0b); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-szoveg, #f59e0b); }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow: auto; max-height: 300px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .85rem; line-height: 1.7; color: var(--cat-szoveg, #f59e0b); white-space: pre-wrap; word-break: break-word; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-szoveg, #f59e0b); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
