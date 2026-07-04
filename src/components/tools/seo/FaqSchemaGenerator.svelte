<script lang="ts">
  // ─── FAQ Schema (JSON-LD) generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      heading: "Kérdés–válasz párok",
      qLbl: "Kérdés", qPh: "Pl. Mennyibe kerül a szállítás?",
      aLbl: "Válasz", aPh: "Pl. A szállítás 15 000 Ft feletti rendelésnél ingyenes.",
      add: "Kérdés hozzáadása", remove: "Törlés",
      wrap: "Beágyazás <script> taggel", output: "Generált JSON-LD",
      copy: "Másolás", copied: "Másolva!",
      empty: "Adj hozzá legalább egy kitöltött kérdés–válasz párt.",
      count: "érvényes kérdés",
      hint: "Illeszd a HTML <head> vagy <body> szakaszába. A FAQ tartalomnak láthatóan is szerepelnie kell az oldalon.",
    },
    ro: {
      heading: "Perechi întrebare–răspuns",
      qLbl: "Întrebare", qPh: "Ex. Cât costă livrarea?",
      aLbl: "Răspuns", aPh: "Ex. Livrarea este gratuită pentru comenzi peste 200 lei.",
      add: "Adaugă întrebare", remove: "Șterge",
      wrap: "Încadrare cu tag <script>", output: "JSON-LD generat",
      copy: "Copiază", copied: "Copiat!",
      empty: "Adaugă cel puțin o pereche întrebare–răspuns completată.",
      count: "întrebări valide",
      hint: "Inserează în secțiunea <head> sau <body>. Conținutul FAQ trebuie să apară și vizibil pe pagină.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  type QA = { q: string; a: string };
  let items = $state<QA[]>([{ q: "", a: "" }, { q: "", a: "" }]);
  let wrap = $state(true);
  let copied = $state(false);

  const valid = $derived(items.filter((it) => it.q.trim() && it.a.trim()));

  const output = $derived.by(() => {
    if (valid.length === 0) return "";
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: valid.map((it) => ({
        "@type": "Question",
        name: it.q.trim(),
        acceptedAnswer: { "@type": "Answer", text: it.a.trim() },
      })),
    };
    const json = JSON.stringify(schema, null, 2);
    return wrap ? `<script type="application/ld+json">\n${json}\n<\/script>` : json;
  });

  function add() { items = [...items, { q: "", a: "" }]; }
  function removeItem(i: number) { if (items.length > 1) items = items.filter((_, idx) => idx !== i); }
  function setQ(i: number, v: string) { items = items.map((it, idx) => (idx === i ? { ...it, q: v } : it)); }
  function setA(i: number, v: string) { items = items.map((it, idx) => (idx === i ? { ...it, a: v } : it)); }

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="grid">
    <div class="card form">
      <div class="form-head">
        <h3 class="legend">{L.heading}</h3>
        <span class="badge">{valid.length} {L.count}</span>
      </div>

      {#each items as it, i}
        <div class="qa">
          <div class="qa-head">
            <span class="qa-num">#{i + 1}</span>
            <button type="button" class="qa-del" onclick={() => removeItem(i)} disabled={items.length <= 1} aria-label={L.remove}>✕</button>
          </div>
          <input class="inp" type="text" placeholder={L.qPh} value={it.q} oninput={(e) => setQ(i, (e.target as HTMLInputElement).value)} aria-label={L.qLbl} />
          <textarea class="inp ta" rows="2" placeholder={L.aPh} value={it.a} oninput={(e) => setA(i, (e.target as HTMLTextAreaElement).value)} aria-label={L.aLbl}></textarea>
        </div>
      {/each}

      <button type="button" class="btn btn--ghost add" onclick={add}>+ {L.add}</button>
    </div>

    <div class="card out">
      <div class="out-head">
        <h3 class="legend">{L.output}</h3>
        <button type="button" class="btn btn--primary" onclick={copy} disabled={!output}>
          {copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}
        </button>
      </div>
      <label class="check"><input type="checkbox" bind:checked={wrap} /><span>{L.wrap}</span></label>
      {#if output}
        <pre class="code"><code>{output}</code></pre>
      {:else}
        <p class="empty">{L.empty}</p>
      {/if}
      <p class="hint">{L.hint}</p>
    </div>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); align-items: start; }
  @media (max-width: 780px) { .grid { grid-template-columns: 1fr; } }

  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .form { display: flex; flex-direction: column; gap: var(--sp-4); }
  .form-head { display: flex; align-items: center; justify-content: space-between; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-seo, #ec4899); background: #ec489915; padding: 2px var(--sp-2); border-radius: 999px; }

  .qa { display: flex; flex-direction: column; gap: var(--sp-2); padding: var(--sp-3); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); }
  .qa-head { display: flex; align-items: center; justify-content: space-between; }
  .qa-num { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--text-subtle); }
  .qa-del { background: transparent; border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; color: var(--text-muted); padding: 0 var(--sp-2); line-height: 1.6; }
  .qa-del:hover:not(:disabled) { border-color: #dc2626; color: #dc2626; }
  .qa-del:disabled { opacity: .35; cursor: not-allowed; }

  .inp { width: 100%; background: var(--bg-card); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .ta { resize: vertical; min-height: 52px; }

  .add { align-self: flex-start; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; margin-bottom: var(--sp-3); }
  .check input[type="checkbox"] { accent-color: var(--cat-seo, #ec4899); width: 16px; height: 16px; }
  .code { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; max-height: 420px; }
  .code code { font-family: var(--font-mono, monospace); font-size: .8rem; line-height: 1.55; color: var(--text); white-space: pre; }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-seo, #ec4899); }
</style>
