<script lang="ts">
  // ============================================================
  // MedieCalculator.svelte – Medie aritmetică, mediană, mod, abatere
  // Portolva a math reference AtlagKalkulator.tsx-ből (RO).
  // Funkciók: dynamic rows, simplu vs ponderat, full statistics.
  // ============================================================

  type Mode = "simplu" | "ponderat";
  type Row = { id: number; value: string; weight: string };

  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "simplu",   icon: "📊", label: "Medie simplă", desc: "Aritmetică obișnuită" },
    { key: "ponderat", icon: "⚖️", label: "Medie ponderată", desc: "Cu greutăți" },
  ];

  let mode: Mode = $state("simplu");
  let nextId = $state(6);
  let rows: Row[] = $state([
    { id: 1, value: "85", weight: "1" },
    { id: 2, value: "90", weight: "1" },
    { id: 3, value: "78", weight: "1" },
    { id: 4, value: "92", weight: "1" },
    { id: 5, value: "88", weight: "1" },
  ]);

  function parseN(s: string): number {
    const cleaned = s.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }

  type Stats = {
    medie: number; medieP: number; mediana: number; mod: number[];
    abatere: number; varianta: number; suma: number;
    n: number; min: number; max: number; amplitudine: number;
  };

  let stats: Stats = $derived.by(() => {
    const valid = rows.filter(r => r.value.trim() !== "" && Number.isFinite(parseN(r.value)));
    const nums = valid.map(r => parseN(r.value));
    const ws = valid.map(r => {
      const w = parseN(r.weight);
      return Number.isFinite(w) && w > 0 ? w : 1;
    });

    if (nums.length === 0) {
      return { medie: 0, medieP: 0, mediana: 0, mod: [], abatere: 0, varianta: 0, suma: 0, n: 0, min: 0, max: 0, amplitudine: 0 };
    }

    const suma = nums.reduce((a, b) => a + b, 0);
    const medie = suma / nums.length;

    const sumWeighted = nums.reduce((acc, v, i) => acc + v * ws[i], 0);
    const sumW = ws.reduce((a, b) => a + b, 0);
    const medieP = sumW > 0 ? sumWeighted / sumW : 0;

    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const mediana = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const freq: Record<string, number> = {};
    for (const n of nums) {
      const k = n.toString();
      freq[k] = (freq[k] || 0) + 1;
    }
    const maxFreq = Math.max(...Object.values(freq));
    const mod = maxFreq > 1
      ? Object.entries(freq).filter(([, f]) => f === maxFreq).map(([k]) => parseFloat(k))
      : [];

    const ref = mode === "ponderat" ? medieP : medie;
    const varianta = nums.reduce((acc, v) => acc + (v - ref) ** 2, 0) / nums.length;
    const abatere = Math.sqrt(varianta);

    const min = Math.min(...nums);
    const max = Math.max(...nums);

    return {
      medie, medieP, mediana, mod, abatere, varianta, suma,
      n: nums.length, min, max, amplitudine: max - min,
    };
  });

  let activeMedie = $derived(mode === "ponderat" ? stats.medieP : stats.medie);

  function fmt(n: number, decimals = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toFixed(decimals);
  }

  function addRow() {
    rows = [...rows, { id: nextId, value: "", weight: "1" }];
    nextId += 1;
  }

  function removeRow(id: number) {
    if (rows.length <= 1) return;
    rows = rows.filter(r => r.id !== id);
  }

  function updateRow(id: number, field: "value" | "weight", v: string) {
    rows = rows.map(r => r.id === id ? { ...r, [field]: v } : r);
  }

  function clearAll() {
    rows = [{ id: nextId, value: "", weight: "1" }];
    nextId += 1;
  }

  function fillExample() {
    rows = [
      { id: nextId,     value: "9", weight: "5" },
      { id: nextId + 1, value: "8", weight: "4" },
      { id: nextId + 2, value: "10", weight: "5" },
      { id: nextId + 3, value: "7", weight: "3" },
      { id: nextId + 4, value: "9", weight: "5" },
    ];
    nextId += 5;
  }
</script>

<div class="medie">
  <!-- Banner -->
  <div class="medie__banner">
    <span class="medie__banner-icon" aria-hidden="true">📊</span>
    <div>
      <h2 class="medie__banner-title">Calculator medie</h2>
      <p class="medie__banner-sub">Medie, mediană, mod, abatere standard</p>
    </div>
  </div>

  <!-- Mode toggle -->
  <div class="medie__modes" role="tablist">
    {#each MODES as m}
      <button class="medie__mode" class:is-active={mode === m.key}
              onclick={() => (mode = m.key)} role="tab" aria-selected={mode === m.key}>
        <span class="medie__mode-icon" aria-hidden="true">{m.icon}</span>
        <span class="medie__mode-text">
          <span class="medie__mode-label">{m.label}</span>
          <span class="medie__mode-desc">{m.desc}</span>
        </span>
      </button>
    {/each}
  </div>

  <!-- Rows + actions -->
  <div class="medie__data">
    <div class="medie__data-header">
      <span class="medie__data-title">Valori {mode === "ponderat" ? "și greutăți" : ""}</span>
      <div class="medie__data-actions">
        <button class="medie__btn medie__btn--secondary" onclick={fillExample}>Exemplu</button>
        <button class="medie__btn medie__btn--secondary" onclick={clearAll}>Șterge</button>
      </div>
    </div>

    <ul class="medie__rows" class:medie__rows--ponderat={mode === "ponderat"}>
      {#each rows as r, i (r.id)}
        <li class="medie__row">
          <span class="medie__row-num">{i + 1}.</span>
          <input
            type="text" inputmode="decimal" placeholder="0"
            class="medie__row-input"
            value={r.value}
            oninput={(e) => updateRow(r.id, "value", (e.target as HTMLInputElement).value)} />
          {#if mode === "ponderat"}
            <input
              type="text" inputmode="decimal" placeholder="1"
              class="medie__row-input medie__row-input--weight"
              value={r.weight}
              oninput={(e) => updateRow(r.id, "weight", (e.target as HTMLInputElement).value)} />
          {/if}
          <button
            type="button" class="medie__row-remove"
            disabled={rows.length <= 1}
            onclick={() => removeRow(r.id)}
            aria-label="Șterge rândul">×</button>
        </li>
      {/each}
    </ul>

    <button class="medie__add" onclick={addRow}>
      <span aria-hidden="true">+</span> Adaugă rând
    </button>
  </div>

  <!-- Main result -->
  <div class="medie__main">
    <p class="medie__main-label">{mode === "ponderat" ? "Medie ponderată" : "Medie aritmetică"}</p>
    <p class="medie__main-value">{fmt(activeMedie)}</p>
    {#if stats.n > 0}
      <p class="medie__main-hint">calculată din {stats.n} valori</p>
    {/if}
  </div>

  <!-- Stat grid -->
  <div class="medie__stats">
    <div class="medie__stat"><span class="medie__stat-label">Mediană</span><span class="medie__stat-value">{fmt(stats.mediana)}</span></div>
    <div class="medie__stat"><span class="medie__stat-label">Mod</span><span class="medie__stat-value">{stats.mod.length > 0 ? stats.mod.join(", ") : "–"}</span></div>
    <div class="medie__stat"><span class="medie__stat-label">Abatere σ</span><span class="medie__stat-value">{fmt(stats.abatere)}</span></div>
    <div class="medie__stat"><span class="medie__stat-label">Sumă</span><span class="medie__stat-value">{fmt(stats.suma)}</span></div>
    <div class="medie__stat"><span class="medie__stat-label">Min / Max</span><span class="medie__stat-value">{stats.n > 0 ? `${fmt(stats.min)} / ${fmt(stats.max)}` : "–"}</span></div>
    <div class="medie__stat"><span class="medie__stat-label">Amplitudine</span><span class="medie__stat-value">{fmt(stats.amplitudine)}</span></div>
  </div>

  <div class="medie__formula">
    <strong>Formulă:</strong>
    {#if mode === "ponderat"}
      x̄ = Σ(xᵢ · wᵢ) / Σwᵢ — fiecare valoare multiplicată cu greutatea sa
    {:else}
      x̄ = Σxᵢ / n — suma valorilor împărțită la numărul de valori
    {/if}
  </div>
</div>

<style>
  .medie {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --medie-accent: var(--cat-calculator, #4f46e5);
  }

  .medie__banner {
    display: flex; align-items: center; gap: var(--sp-3);
    padding: var(--sp-4);
    background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
    color: #fff; border-radius: var(--r-md);
  }
  .medie__banner-icon { font-size: 1.75rem; }
  .medie__banner-title { margin: 0; font-size: 1.0625rem; font-weight: 700; }
  .medie__banner-sub { margin: 2px 0 0 0; font-size: 0.8125rem; opacity: 0.92; }

  .medie__modes {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2);
  }
  .medie__mode {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-3); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    text-align: left; transition: all var(--t-fast);
  }
  .medie__mode:hover { border-color: color-mix(in srgb, var(--medie-accent) 50%, transparent); }
  .medie__mode.is-active {
    border-color: var(--medie-accent);
    background: color-mix(in srgb, var(--medie-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--medie-accent) 18%, transparent);
  }
  .medie__mode-icon { font-size: 1.25rem; }
  .medie__mode-text { display: flex; flex-direction: column; gap: 1px; }
  .medie__mode-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .medie__mode-desc { font-size: 0.6875rem; color: var(--text-muted); }

  .medie__data { display: flex; flex-direction: column; gap: var(--sp-3); }
  .medie__data-header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: var(--sp-2);
  }
  .medie__data-title { font-size: 0.875rem; font-weight: 600; color: var(--text); }
  .medie__data-actions { display: flex; gap: var(--sp-2); }
  .medie__btn {
    padding: 4px 10px; cursor: pointer;
    background: var(--bg); color: var(--text-muted);
    border: 1px solid var(--border); border-radius: var(--r-md);
    font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .medie__btn:hover {
    background: color-mix(in srgb, var(--medie-accent) 10%, var(--bg));
    color: var(--medie-accent);
    border-color: var(--medie-accent);
  }

  .medie__rows {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: var(--sp-2);
    max-height: 320px; overflow-y: auto;
  }
  .medie__row {
    display: grid; gap: var(--sp-2); align-items: center;
    grid-template-columns: 32px 1fr 36px;
  }
  .medie__rows--ponderat .medie__row {
    grid-template-columns: 32px 1fr 100px 36px;
  }
  .medie__row-num {
    font-family: var(--font-mono); font-size: 0.8125rem;
    color: var(--text-subtle); text-align: right;
  }
  .medie__row-input {
    width: 100%; padding: 8px var(--sp-3); outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 0.9375rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .medie__row-input:focus {
    border-color: var(--medie-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--medie-accent) 22%, transparent);
  }
  .medie__row-input--weight { text-align: center; }
  .medie__row-remove {
    width: 32px; height: 32px; cursor: pointer;
    background: var(--bg); color: var(--text-muted);
    border: 1px solid var(--border); border-radius: var(--r-md);
    font-size: 1rem; line-height: 1; font-weight: 700;
    transition: all var(--t-fast);
  }
  .medie__row-remove:hover:not(:disabled) {
    background: color-mix(in srgb, #ef4444 12%, transparent);
    color: #ef4444; border-color: #ef4444;
  }
  .medie__row-remove:disabled { opacity: 0.4; cursor: not-allowed; }

  .medie__add {
    width: 100%; padding: 10px; cursor: pointer;
    background: transparent; color: var(--text-muted);
    border: 2px dashed var(--border); border-radius: var(--r-md);
    font-size: 0.875rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .medie__add:hover {
    border-color: var(--medie-accent); color: var(--medie-accent);
    background: color-mix(in srgb, var(--medie-accent) 5%, transparent);
  }

  .medie__main {
    text-align: center; padding: var(--sp-5);
    background: linear-gradient(135deg,
      color-mix(in srgb, var(--medie-accent) 12%, var(--bg)) 0%,
      color-mix(in srgb, var(--medie-accent) 4%, var(--bg)) 100%);
    border: 1px solid color-mix(in srgb, var(--medie-accent) 28%, transparent);
    border-radius: var(--r-md);
  }
  .medie__main-label {
    margin: 0 0 4px 0; font-size: 0.75rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted);
  }
  .medie__main-value {
    margin: 0; font-family: var(--font-mono);
    font-size: 2.5rem; font-weight: 700; color: var(--medie-accent); line-height: 1.1;
  }
  .medie__main-hint {
    margin: var(--sp-2) 0 0 0; font-size: 0.75rem; color: var(--text-subtle);
  }

  .medie__stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 480px) { .medie__stats { grid-template-columns: repeat(2, 1fr); } }
  .medie__stat {
    display: flex; flex-direction: column; gap: 2px; align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .medie__stat-label {
    font-size: 0.6875rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle);
  }
  .medie__stat-value {
    font-family: var(--font-mono); font-size: 1.0625rem; font-weight: 700;
    color: var(--text);
  }

  .medie__formula {
    text-align: center; padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-size: 0.8125rem; color: var(--text-muted);
  }
</style>
