<script lang="ts">
  // ─── Szöveg-összehasonlító / diff (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      aLbl: "Eredeti szöveg (A)", bLbl: "Módosított szöveg (B)",
      aPh: "Illeszd be az első szöveget…", bPh: "Illeszd be a második szöveget…",
      ignoreWs: "Szóközök figyelmen kívül", ignoreCase: "Kis-/nagybetű figyelmen kívül",
      result: "Különbségek", same: "azonos", added: "hozzáadott", removed: "törölt",
      identical: "A két szöveg azonos.", empty: "Add meg mindkét szöveget az összehasonlításhoz.",
      tooBig: "Túl nagy szöveg a részletes diffhez (max ~2000 sor oldalanként).",
      hint: "Sor-szintű összehasonlítás. Minden feldolgozás a böngésződben történik.",
    },
    ro: {
      aLbl: "Text original (A)", bLbl: "Text modificat (B)",
      aPh: "Lipește primul text…", bPh: "Lipește al doilea text…",
      ignoreWs: "Ignoră spațiile", ignoreCase: "Ignoră majuscule/minuscule",
      result: "Diferențe", same: "identic", added: "adăugat", removed: "șters",
      identical: "Cele două texte sunt identice.", empty: "Introdu ambele texte pentru comparare.",
      tooBig: "Text prea mare pentru diff detaliat (max ~2000 de rânduri per parte).",
      hint: "Comparare pe rânduri. Toată procesarea are loc în browserul tău.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  let a = $state("");
  let b = $state("");
  let ignoreWs = $state(false);
  let ignoreCase = $state(false);

  function norm(s: string): string {
    let t = s;
    if (ignoreWs) t = t.replace(/\s+/g, " ").trim();
    if (ignoreCase) t = t.toLowerCase();
    return t;
  }

  const diff = $derived.by(() => {
    if (!a.trim() && !b.trim()) return { rows: [] as { type: string; text: string }[], add: 0, del: 0, tooBig: false };
    const aL = a.split("\n"), bL = b.split("\n");
    if (aL.length > 2000 || bL.length > 2000) return { rows: [], add: 0, del: 0, tooBig: true };
    const aN = aL.map(norm), bN = bL.map(norm);
    const m = aL.length, n = bL.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--)
      for (let j = n - 1; j >= 0; j--)
        dp[i][j] = aN[i] === bN[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const rows: { type: string; text: string }[] = [];
    let i = 0, j = 0, add = 0, del = 0;
    while (i < m && j < n) {
      if (aN[i] === bN[j]) { rows.push({ type: "same", text: aL[i] }); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) { rows.push({ type: "del", text: aL[i] }); del++; i++; }
      else { rows.push({ type: "add", text: bL[j] }); add++; j++; }
    }
    while (i < m) { rows.push({ type: "del", text: aL[i] }); del++; i++; }
    while (j < n) { rows.push({ type: "add", text: bL[j] }); add++; j++; }
    return { rows, add, del, tooBig: false };
  });
</script>

<div class="tool">
  <div class="inputs">
    <div class="card"><label class="lbl" for="d-a">{L.aLbl}</label><textarea id="d-a" class="inp ta" rows="7" bind:value={a} placeholder={L.aPh}></textarea></div>
    <div class="card"><label class="lbl" for="d-b">{L.bLbl}</label><textarea id="d-b" class="inp ta" rows="7" bind:value={b} placeholder={L.bPh}></textarea></div>
  </div>

  <div class="opts">
    <label class="check"><input type="checkbox" bind:checked={ignoreWs} /><span>{L.ignoreWs}</span></label>
    <label class="check"><input type="checkbox" bind:checked={ignoreCase} /><span>{L.ignoreCase}</span></label>
  </div>

  <div class="card">
    <div class="out-head">
      <h3 class="legend">{L.result}</h3>
      {#if diff.rows.length}<span class="badge"><span class="b-add">+{diff.add} {L.added}</span> · <span class="b-del">−{diff.del} {L.removed}</span></span>{/if}
    </div>
    {#if diff.tooBig}
      <p class="empty">{L.tooBig}</p>
    {:else if !a.trim() && !b.trim()}
      <p class="empty">{L.empty}</p>
    {:else if diff.add === 0 && diff.del === 0}
      <p class="identical">✓ {L.identical}</p>
    {:else}
      <div class="diff">
        {#each diff.rows as r}
          <div class="line line--{r.type}"><span class="gutter">{r.type === "add" ? "+" : r.type === "del" ? "−" : " "}</span><code>{r.text || " "}</code></div>
        {/each}
      </div>
    {/if}
    <p class="hint">{L.hint}</p>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .inputs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
  @media (max-width: 700px) { .inputs { grid-template-columns: 1fr; } }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .lbl { display: block; font-size: .8125rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .85rem; font-family: var(--font-mono, monospace); }
  .inp:focus { outline: none; border-color: var(--cat-szoveg, #f59e0b); box-shadow: 0 0 0 3px #f59e0b22; }
  .ta { resize: vertical; }
  .opts { display: flex; gap: var(--sp-5); flex-wrap: wrap; }
  .check { display: inline-flex; align-items: center; gap: var(--sp-2); font-size: .8125rem; color: var(--text); cursor: pointer; }
  .check input[type="checkbox"] { accent-color: var(--cat-szoveg, #f59e0b); width: 16px; height: 16px; }

  .out-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); flex-wrap: wrap; }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }
  .badge { font-family: var(--font-mono, monospace); font-size: .75rem; font-weight: 700; }
  .b-add { color: var(--success); } .b-del { color: var(--error); }
  .diff { border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; max-height: 480px; overflow-y: auto; }
  .line { display: flex; gap: var(--sp-2); padding: 1px var(--sp-3); font-family: var(--font-mono, monospace); font-size: .82rem; line-height: 1.6; }
  .line code { white-space: pre-wrap; word-break: break-word; color: var(--text); }
  .gutter { flex-shrink: 0; width: 1ch; color: var(--text-subtle); user-select: none; }
  .line--same { background: var(--bg-input); }
  .line--add { background: color-mix(in srgb, var(--success) 14%, transparent); }
  .line--del { background: color-mix(in srgb, var(--error) 12%, transparent); }
  .line--del code { text-decoration: line-through; opacity: .8; }
  .identical { margin: 0; padding: var(--sp-5); text-align: center; color: var(--success); font-size: .9rem; font-weight: 600; background: var(--bg-input); border-radius: var(--r-md, 8px); }
  .empty { margin: 0; padding: var(--sp-6); text-align: center; color: var(--text-subtle); font-size: .8125rem; background: var(--bg-input); border: 1px dashed var(--border); border-radius: var(--r-md, 8px); }
  .hint { margin: var(--sp-3) 0 0; font-size: .75rem; color: var(--text-subtle); }
</style>
