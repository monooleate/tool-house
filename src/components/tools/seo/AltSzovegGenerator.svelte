<script lang="ts">
  // ─── Kép alt szöveg sablon generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      tplLbl: "Sablon (helyőrzők: {1}, {2}, {3}…)",
      tplPh: "{1} {2} – termékfotó fehér háttéren",
      dataLbl: "Adatsorok (soronként egy, mezők vesszővel elválasztva)",
      dataPh: "Piros bögre, kerámia\nKék pléd, gyapjú\nFa vágódeszka, tölgy",
      output: "Generált alt szövegek", copy: "Másolás", copied: "Másolva!", csv: "CSV letöltés",
      empty: "Adj meg egy sablont és legalább egy adatsort.",
      hint: "A jó alt szöveg tömör, leíró, és a kép tartalmát írja le – nem kulcsszóhalmaz. Minden helyben készül.",
    },
    ro: {
      tplLbl: "Șablon (substituenți: {1}, {2}, {3}…)",
      tplPh: "{1} {2} – fotografie de produs pe fundal alb",
      dataLbl: "Rânduri de date (câte unul pe rând, câmpuri separate prin virgulă)",
      dataPh: "Cană roșie, ceramică\nPled albastru, lână\nTocător lemn, stejar",
      output: "Texte alt generate", copy: "Copiază", copied: "Copiat!", csv: "Descarcă CSV",
      empty: "Adaugă un șablon și cel puțin un rând de date.",
      hint: "Un text alt bun este concis, descriptiv și descrie conținutul imaginii – nu o aglomerare de cuvinte cheie. Totul se face local.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let template = $state("");
  let data = $state("");
  let copied = $state(false);

  const rows = $derived.by(() => {
    if (!template.trim() || !data.trim()) return [] as { fields: string[]; alt: string }[];
    return data.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const fields = line.split(",").map((f) => f.trim());
      const alt = template.replace(/\{(\d+)\}/g, (_, n) => fields[Number(n) - 1] ?? "").replace(/\s+/g, " ").trim();
      return { fields, alt };
    });
  });

  const output = $derived(rows.map((r) => r.alt).join("\n"));

  function csvCell(s: string): string {
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
  function downloadCsv() {
    if (!rows.length) return;
    const maxFields = Math.max(...rows.map((r) => r.fields.length));
    const header = [...Array(maxFields)].map((_, i) => `mezo_${i + 1}`).concat("alt_text");
    const lines = [header.join(",")];
    for (const r of rows) {
      const cells = [...Array(maxFields)].map((_, i) => csvCell(r.fields[i] ?? "")).concat(csvCell(r.alt));
      lines.push(cells.join(","));
    }
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "alt-texts.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }
</script>

<div class="tool">
  <div class="card">
    <label class="lbl" for="alt-tpl">{L.tplLbl}</label>
    <input id="alt-tpl" class="inp" type="text" bind:value={template} placeholder={L.tplPh} />
    <label class="lbl mt" for="alt-data">{L.dataLbl}</label>
    <textarea id="alt-data" class="inp ta" rows="5" bind:value={data} placeholder={L.dataPh}></textarea>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.output}{#if rows.length} · <span class="badge">{rows.length}</span>{/if}</h3>
      {#if rows.length}
        <div class="actions">
          <button type="button" class="btn btn--ghost" onclick={downloadCsv}>⬇ {L.csv}</button>
          <button type="button" class="btn btn--primary" onclick={copy}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
        </div>
      {/if}
    </div>
    {#if rows.length}
      <ul class="list">
        {#each rows as r}<li class="item"><code>{r.alt}</code></li>{/each}
      </ul>
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
  .lbl.mt { margin-top: var(--sp-4); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-seo, #ec4899); box-shadow: 0 0 0 3px #ec489922; }
  .ta { resize: vertical; min-height: 110px; font-family: var(--font-mono, monospace); }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .actions { display: flex; gap: var(--sp-2); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .72rem; font-weight: 700; color: var(--cat-seo, #ec4899); }
  .list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-1); max-height: 340px; overflow-y: auto; }
  .item { padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); background: var(--bg-input); }
  .item code { font-family: var(--font-mono, monospace); font-size: .82rem; color: var(--text); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn--primary { background: var(--cat-seo, #ec4899); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover { border-color: var(--cat-seo, #ec4899); }
</style>
