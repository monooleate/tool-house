<script lang="ts">
  // ============================================================
  // CmmdcCmmmcCalculator.svelte — CMMDC (c.m.m.d.c.) și CMMMC (c.m.m.m.c.)
  // Algoritmul lui Euclid + descompunere în factori primi. Oricâte numere.
  // ============================================================
  let raw = $state("12, 18, 24");

  function parseNums(s: string): number[] {
    return s
      .split(/[,;\s]+/)
      .map((x) => x.trim())
      .filter((x) => x !== "")
      .map((x) => parseInt(x, 10))
      .filter((n) => Number.isInteger(n) && n > 0);
  }

  function gcd2(a: number, b: number): number {
    while (b) { [a, b] = [b, a % b]; }
    return a;
  }
  function lcm2(a: number, b: number): number {
    return (a / gcd2(a, b)) * b;
  }
  function factorize(n: number): Map<number, number> {
    const f = new Map<number, number>();
    let r = n;
    for (let d = 2; d * d <= r; d++) {
      while (r % d === 0) { f.set(d, (f.get(d) ?? 0) + 1); r /= d; }
    }
    if (r > 1) f.set(r, (f.get(r) ?? 0) + 1);
    return f;
  }
  function factorStr(n: number): string {
    if (n === 1) return "1";
    const f = factorize(n);
    return [...f.entries()].map(([p, e]) => (e === 1 ? `${p}` : `${p}^${e}`)).join(" × ");
  }

  let rez = $derived.by(() => {
    const nums = parseNums(raw);
    if (nums.length < 2) return null;
    const cmmdc = nums.reduce((a, b) => gcd2(a, b));
    const cmmmc = nums.reduce((a, b) => lcm2(a, b));
    return { nums, cmmdc, cmmmc };
  });
</script>

<div class="cm">
  <label class="cm__field">
    <span>Numere naturale (separate prin virgulă sau spațiu)</span>
    <input type="text" inputmode="numeric" bind:value={raw} placeholder="ex: 12, 18, 24" class="cm__input" />
  </label>

  {#if rez}
    <div class="cm__results">
      <div class="cm__card">
        <span class="cm__card-label">CMMDC (c.m.m.d.c.)</span>
        <span class="cm__card-value">{rez.cmmdc}</span>
        <span class="cm__card-sub">cel mai mare divizor comun</span>
      </div>
      <div class="cm__card">
        <span class="cm__card-label">CMMMC (c.m.m.m.c.)</span>
        <span class="cm__card-value">{rez.cmmmc}</span>
        <span class="cm__card-sub">cel mai mic multiplu comun</span>
      </div>
    </div>

    <div class="cm__factors">
      <span class="cm__factors-label">Descompunere în factori primi:</span>
      <ul>
        {#each rez.nums as n}
          <li><strong>{n}</strong> = {factorStr(n)}</li>
        {/each}
      </ul>
    </div>

    <div class="cm__formula">
      <strong>Relație:</strong> pentru două numere, CMMDC(a, b) × CMMMC(a, b) = a × b
    </div>
  {:else}
    <p class="cm__hint">Introdu cel puțin două numere naturale pozitive.</p>
  {/if}
</div>

<style>
  .cm { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .cm__field { display: flex; flex-direction: column; gap: var(--sp-2, 0.5rem); }
  .cm__field span { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .cm__input { padding: var(--sp-3, 0.75rem); border: 1px solid var(--border); border-radius: var(--r-md); background: var(--bg); color: var(--text); font-size: 1.25rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .cm__input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .cm__results { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3, 0.75rem); }
  @media (max-width: 480px) { .cm__results { grid-template-columns: 1fr; } }
  .cm__card { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; padding: var(--sp-4, 1rem); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: var(--r-md); text-align: center; }
  .cm__card-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
  .cm__card-value { font-size: 2rem; font-weight: 700; color: var(--accent); font-family: var(--font-mono); }
  .cm__card-sub { font-size: 0.72rem; color: var(--text-muted); }
  .cm__factors { font-size: 0.9rem; }
  .cm__factors-label { font-size: 0.8125rem; color: var(--text-muted); }
  .cm__factors ul { margin: 0.4rem 0 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.2rem; font-family: var(--font-mono); }
  .cm__formula { text-align: center; font-size: 0.8125rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: var(--bg); border-radius: var(--r-md); }
  .cm__hint { text-align: center; color: var(--text-muted); padding: var(--sp-3, 0.75rem); }
</style>
