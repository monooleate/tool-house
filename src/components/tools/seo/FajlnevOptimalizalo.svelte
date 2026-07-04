<script lang="ts">
  // ─── SEO fájlnév optimalizáló (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      inputLbl: "Fájlnevek (soronként egy)",
      inputPh: "Nyári Akció Bögre (piros).JPG\nÁrlista 2026 – végleges.PDF",
      sepLbl: "Elválasztó", lower: "Kisbetűsítés",
      output: "SEO fájlnevek", copy: "Másolás", copied: "Másolva!",
      empty: "Illessz be egy vagy több fájlnevet.",
      hint: "Eltávolítja az ékezeteket és a speciális karaktereket, a szóközöket elválasztóra cseréli, a kiterjesztést megtartja.",
    },
    ro: {
      inputLbl: "Nume de fișiere (câte unul pe rând)",
      inputPh: "Reducere de Vară Cană (roșu).JPG\nListă de prețuri 2026 – final.PDF",
      sepLbl: "Separator", lower: "Litere mici",
      output: "Nume de fișiere SEO", copy: "Copiază", copied: "Copiat!",
      empty: "Lipește unul sau mai multe nume de fișiere.",
      hint: "Elimină diacriticele și caracterele speciale, înlocuiește spațiile cu separatorul, păstrează extensia.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let input = $state("");
  let sep = $state<"-" | "_">("-");
  let lower = $state(true);
  let copied = $state(false);

  function optimize(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return "";
    const dot = trimmed.lastIndexOf(".");
    let base = dot > 0 ? trimmed.slice(0, dot) : trimmed;
    let ext = dot > 0 ? trimmed.slice(dot) : "";
    const strip = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    base = strip(base);
    ext = strip(ext);
    if (lower) { base = base.toLowerCase(); ext = ext.toLowerCase(); }
    const s = sep;
    base = base
      .replace(/[^a-zA-Z0-9]+/g, s)
      .replace(s === "-" ? /-+/g : /_+/g, s)
      .replace(s === "-" ? /^-+|-+$/g : /^_+|_+$/g, "");
    return base + ext;
  }

  const output = $derived(input.split("\n").map(optimize).join("\n"));

  async function copy() {
    if (!output.trim()) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="fn-in">{L.inputLbl}</label>
    <textarea id="fn-in" class="inp ta" rows="4" bind:value={input} placeholder={L.inputPh}></textarea>
    <div class="opts">
      <div class="seg-wrap">
        <span class="mini-lbl">{L.sepLbl}:</span>
        <div class="seg" role="group">
          <button type="button" class:seg--active={sep === "-"} onclick={() => (sep = "-")}>-</button>
          <button type="button" class:seg--active={sep === "_"} onclick={() => (sep = "_")}>_</button>
        </div>
      </div>
      <label class="check"><input type="checkbox" bind:checked={lower} /><span>{L.lower}</span></label>
    </div>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output}</h3>
      <button type="button" class="btn btn--primary" onclick={copy} disabled={!output.trim()}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    {#if output.trim()}
      <pre class="code"><code>{output}</code></pre>
    {:else}
      <p class="empty">{L.empty}</p>
    {/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .ta { resize: vertical; min-height: 92px; }
  .opts { display: flex; align-items: center; gap: var(--sp-5); margin-top: var(--sp-3); flex-wrap: wrap; }
  .seg-wrap { display: flex; align-items: center; gap: var(--sp-2); }
  .mini-lbl { font-size: .8125rem; color: var(--text-muted); }
  .seg { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; padding: var(--sp-1) var(--sp-4); font-family: var(--font-mono, monospace); font-size: .9rem; cursor: pointer; }
  .seg button.seg--active { background: var(--cat-seo, #ec4899); color: #fff; font-weight: 700; }
  .check { display: flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-seo, #ec4899); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 320px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; color: var(--text); white-space: pre-wrap; word-break: break-all; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
</style>
