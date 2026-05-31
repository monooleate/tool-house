<script lang="ts">
  // ============================================================
  // CombinatoricaCalculator.svelte — factorial, permutări, aranjamente, combinări
  // Calcul exact cu BigInt. n ≤ 170 (rezultate rezonabile).
  // ============================================================
  type Mode = "factorial" | "permutari" | "aranjamente" | "combinari";
  const MODES: { key: Mode; label: string }[] = [
    { key: "factorial", label: "Factorial n!" },
    { key: "permutari", label: "Permutări P(n)" },
    { key: "aranjamente", label: "Aranjamente A(n,k)" },
    { key: "combinari", label: "Combinări C(n,k)" },
  ];

  let mode = $state<Mode>("combinari");
  let nRaw = $state("49");
  let kRaw = $state("6");

  const MAX_N = 170;

  function fact(n: bigint): bigint {
    let r = 1n;
    for (let i = 2n; i <= n; i++) r *= i;
    return r;
  }
  function intOf(s: string): number | null {
    const n = parseInt(s, 10);
    return Number.isInteger(n) ? n : null;
  }

  let needsK = $derived(mode === "aranjamente" || mode === "combinari");

  let rez = $derived.by(() => {
    const n = intOf(nRaw);
    if (n === null || n < 0) return { err: "n trebuie să fie un număr natural." };
    if (n > MAX_N) return { err: `n trebuie să fie cel mult ${MAX_N}.` };
    let k = 0;
    if (needsK) {
      const kv = intOf(kRaw);
      if (kv === null || kv < 0) return { err: "k trebuie să fie un număr natural." };
      if (kv > n) return { err: "k nu poate fi mai mare decât n." };
      k = kv;
    }
    const N = BigInt(n), K = BigInt(k);
    let val: bigint, formula: string;
    switch (mode) {
      case "factorial":
        val = fact(N); formula = `${n}! = ${n === 0 ? 1 : `${n} × ${n - 1} × … × 1`}`; break;
      case "permutari":
        val = fact(N); formula = `P(${n}) = ${n}!`; break;
      case "aranjamente":
        val = fact(N) / fact(N - K); formula = `A(${n},${k}) = ${n}! / (${n}−${k})! = ${n}! / ${n - k}!`; break;
      case "combinari":
        val = fact(N) / (fact(K) * fact(N - K)); formula = `C(${n},${k}) = ${n}! / (${k}! × ${n - k}!)`; break;
    }
    return { val: val.toString(), formula };
  });
</script>

<div class="cb">
  <div class="cb__modes" role="tablist">
    {#each MODES as m}
      <button type="button" role="tab" aria-selected={mode === m.key} class:is-active={mode === m.key} onclick={() => (mode = m.key)}>{m.label}</button>
    {/each}
  </div>

  <div class="cb__inputs">
    <label class="cb__field">
      <span>n</span>
      <input type="number" min="0" max={MAX_N} bind:value={nRaw} />
    </label>
    {#if needsK}
      <label class="cb__field">
        <span>k</span>
        <input type="number" min="0" bind:value={kRaw} />
      </label>
    {/if}
  </div>

  {#if rez && "err" in rez}
    <p class="cb__err" role="alert">{rez.err}</p>
  {:else if rez}
    <div class="cb__result">
      <span class="cb__result-label">Rezultat</span>
      <span class="cb__result-value">{rez.val}</span>
    </div>
    <div class="cb__formula"><strong>Formula:</strong> {rez.formula}</div>
  {/if}

  <div class="cb__legend">
    <p><strong>Aranjamente</strong> = grupe de k elemente din n, <em>contează ordinea</em>.</p>
    <p><strong>Combinări</strong> = grupe de k elemente din n, <em>nu contează ordinea</em>.</p>
  </div>
</div>

<style>
  .cb { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .cb__modes { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .cb__modes button { flex: 1; min-width: 140px; padding: 0.5rem 0.6rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); cursor: pointer; font: inherit; font-size: 0.85rem; }
  .cb__modes button.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .cb__inputs { display: flex; gap: var(--sp-3, 0.75rem); }
  .cb__field { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; max-width: 160px; }
  .cb__field span { font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono); }
  .cb__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; font-size: 1.2rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .cb__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .cb__result { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: var(--r-md); }
  .cb__result-label { font-size: 0.8rem; color: var(--text-muted); }
  .cb__result-value { font-size: 1.6rem; font-weight: 700; color: var(--accent); font-family: var(--font-mono); word-break: break-all; line-height: 1.2; }
  .cb__formula { text-align: center; font-size: 0.85rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: var(--bg-input); border-radius: var(--r-md); font-family: var(--font-mono); }
  .cb__err { color: #dc2626; text-align: center; margin: 0; }
  .cb__legend { font-size: 0.82rem; color: var(--text-muted); }
  .cb__legend p { margin: 0.15rem 0; }
</style>
