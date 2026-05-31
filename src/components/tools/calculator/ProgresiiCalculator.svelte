<script lang="ts">
  // ============================================================
  // ProgresiiCalculator.svelte — progresii aritmetice și geometrice
  // Termenul de rang n + suma primilor n termeni + primii termeni.
  // ============================================================
  type Mode = "aritmetica" | "geometrica";
  let mode = $state<Mode>("aritmetica");

  let a1Raw = $state("2");
  let ratieRaw = $state("3"); // d (aritmetică) sau q (geometrică)
  let nRaw = $state("10");

  function num(s: string): number {
    const v = parseFloat(s.replace(",", "."));
    return Number.isFinite(v) ? v : NaN;
  }
  function fmt(x: number): string {
    if (!Number.isFinite(x)) return "–";
    if (Number.isInteger(x)) return x.toLocaleString("ro-RO");
    return (Math.round(x * 1e6) / 1e6).toLocaleString("ro-RO");
  }

  let rez = $derived.by(() => {
    const a1 = num(a1Raw);
    const r = num(ratieRaw);
    const n = parseInt(nRaw, 10);
    if (!Number.isFinite(a1) || !Number.isFinite(r)) return { err: "Introdu valori numerice valide." };
    if (!Number.isInteger(n) || n < 1 || n > 1000) return { err: "n trebuie să fie întreg între 1 și 1000." };

    let an: number, sn: number, formulaAn: string, formulaSn: string;
    if (mode === "aritmetica") {
      an = a1 + (n - 1) * r;
      sn = (n * (a1 + an)) / 2;
      formulaAn = `aₙ = a₁ + (n−1)·d = ${fmt(a1)} + (${n}−1)·${fmt(r)}`;
      formulaSn = `Sₙ = n·(a₁ + aₙ)/2 = ${n}·(${fmt(a1)} + ${fmt(an)})/2`;
    } else {
      an = a1 * Math.pow(r, n - 1);
      sn = r === 1 ? a1 * n : a1 * (Math.pow(r, n) - 1) / (r - 1);
      formulaAn = `aₙ = a₁·qⁿ⁻¹ = ${fmt(a1)}·${fmt(r)}^${n - 1}`;
      formulaSn = r === 1 ? `Sₙ = n·a₁ = ${n}·${fmt(a1)}` : `Sₙ = a₁·(qⁿ−1)/(q−1)`;
    }

    const primii: number[] = [];
    for (let i = 1; i <= Math.min(n, 12); i++) {
      primii.push(mode === "aritmetica" ? a1 + (i - 1) * r : a1 * Math.pow(r, i - 1));
    }
    return { an, sn, formulaAn, formulaSn, primii, trunc: n > 12 };
  });
</script>

<div class="pg">
  <div class="pg__modes" role="tablist">
    <button type="button" role="tab" aria-selected={mode === "aritmetica"} class:is-active={mode === "aritmetica"} onclick={() => (mode = "aritmetica")}>Aritmetică</button>
    <button type="button" role="tab" aria-selected={mode === "geometrica"} class:is-active={mode === "geometrica"} onclick={() => (mode = "geometrica")}>Geometrică</button>
  </div>

  <div class="pg__inputs">
    <label class="pg__field"><span>Primul termen (a₁)</span><input type="text" inputmode="decimal" bind:value={a1Raw} /></label>
    <label class="pg__field"><span>{mode === "aritmetica" ? "Rația (d)" : "Rația (q)"}</span><input type="text" inputmode="decimal" bind:value={ratieRaw} /></label>
    <label class="pg__field"><span>Numărul de termeni (n)</span><input type="number" min="1" max="1000" bind:value={nRaw} /></label>
  </div>

  {#if rez && "err" in rez}
    <p class="pg__err" role="alert">{rez.err}</p>
  {:else if rez}
    <div class="pg__results">
      <div class="pg__card"><span>Termenul aₙ (rang {nRaw})</span><strong>{fmt(rez.an)}</strong></div>
      <div class="pg__card"><span>Suma Sₙ (primii {nRaw})</span><strong>{fmt(rez.sn)}</strong></div>
    </div>
    <div class="pg__formula">
      <p><strong>Termen:</strong> {rez.formulaAn} = {fmt(rez.an)}</p>
      <p><strong>Sumă:</strong> {rez.formulaSn} = {fmt(rez.sn)}</p>
    </div>
    <div class="pg__terms">
      <span class="pg__terms-label">Primii termeni:</span>
      <span class="pg__terms-list">{rez.primii.map(fmt).join(", ")}{rez.trunc ? ", …" : ""}</span>
    </div>
  {/if}
</div>

<style>
  .pg { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .pg__modes { display: flex; gap: 0.3rem; }
  .pg__modes button { flex: 1; padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); cursor: pointer; font: inherit; }
  .pg__modes button.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .pg__inputs { display: flex; flex-wrap: wrap; gap: var(--sp-3, 0.75rem); }
  .pg__field { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 130px; }
  .pg__field span { font-size: 0.8rem; color: var(--text-muted); }
  .pg__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; font-size: 1.1rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .pg__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .pg__results { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3, 0.75rem); }
  @media (max-width: 480px) { .pg__results { grid-template-columns: 1fr; } }
  .pg__card { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: var(--r-md); }
  .pg__card span { font-size: 0.78rem; color: var(--text-muted); }
  .pg__card strong { font-size: 1.6rem; color: var(--accent); font-family: var(--font-mono); word-break: break-all; }
  .pg__formula { font-size: 0.85rem; color: var(--text); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3, 0.75rem); display: flex; flex-direction: column; gap: 0.3rem; }
  .pg__formula p { margin: 0; }
  .pg__terms { font-size: 0.9rem; }
  .pg__terms-label { color: var(--text-muted); font-size: 0.8125rem; }
  .pg__terms-list { font-family: var(--font-mono); color: var(--text); }
  .pg__err { color: #dc2626; text-align: center; margin: 0; }
</style>
