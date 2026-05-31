<script lang="ts">
  // ============================================================
  // LogaritmiCalculator.svelte — logaritm în orice bază + ln, lg, log₂
  // log_b(x) = ln(x) / ln(b). Validare: x>0, b>0, b≠1.
  // ============================================================
  let xRaw = $state("1000");
  let bRaw = $state("10");

  function num(s: string): number {
    const v = parseFloat(s.replace(",", "."));
    return Number.isFinite(v) ? v : NaN;
  }
  function fmt(x: number): string {
    if (!Number.isFinite(x)) return "–";
    if (Number.isInteger(x)) return String(x);
    return (Math.round(x * 1e8) / 1e8).toString();
  }

  let rez = $derived.by(() => {
    const x = num(xRaw);
    const b = num(bRaw);
    if (!Number.isFinite(x) || x <= 0) return { err: "Argumentul x trebuie să fie un număr pozitiv (x > 0)." };
    if (!Number.isFinite(b) || b <= 0 || b === 1) return { err: "Baza trebuie să fie pozitivă și diferită de 1." };
    return {
      logb: Math.log(x) / Math.log(b),
      ln: Math.log(x),
      lg: Math.log10(x),
      log2: Math.log2(x),
      x, b,
    };
  });

  const PRESETS = [
    { x: "1000", b: "10", label: "lg 1000" },
    { x: "8", b: "2", label: "log₂ 8" },
    { x: "100", b: "10", label: "lg 100" },
    { x: "2.718281828", b: "2.718281828", label: "ln e" },
  ];
</script>

<div class="lg">
  <div class="lg__inputs">
    <label class="lg__field"><span>Argument (x &gt; 0)</span><input type="text" inputmode="decimal" bind:value={xRaw} /></label>
    <label class="lg__field"><span>Baza (b &gt; 0, b ≠ 1)</span><input type="text" inputmode="decimal" bind:value={bRaw} /></label>
  </div>

  <div class="lg__presets">
    {#each PRESETS as p}
      <button type="button" class="lg__chip" onclick={() => { xRaw = p.x; bRaw = p.b; }}>{p.label}</button>
    {/each}
  </div>

  {#if rez && "err" in rez}
    <p class="lg__err" role="alert">{rez.err}</p>
  {:else if rez}
    <div class="lg__main">
      <span class="lg__main-label">log<sub>{fmt(rez.b)}</sub>({fmt(rez.x)})</span>
      <span class="lg__main-value">{fmt(rez.logb)}</span>
    </div>
    <div class="lg__grid">
      <div class="lg__card"><span>ln {fmt(rez.x)} (bază e)</span><strong>{fmt(rez.ln)}</strong></div>
      <div class="lg__card"><span>lg {fmt(rez.x)} (bază 10)</span><strong>{fmt(rez.lg)}</strong></div>
      <div class="lg__card"><span>log₂ {fmt(rez.x)} (bază 2)</span><strong>{fmt(rez.log2)}</strong></div>
    </div>
    <div class="lg__formula"><strong>Formula schimbării de bază:</strong> log<sub>b</sub>(x) = ln(x) / ln(b)</div>
  {/if}
</div>

<style>
  .lg { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .lg__inputs { display: flex; flex-wrap: wrap; gap: var(--sp-3, 0.75rem); }
  .lg__field { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 150px; }
  .lg__field span { font-size: 0.8rem; color: var(--text-muted); }
  .lg__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; font-size: 1.2rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .lg__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .lg__presets { display: flex; flex-wrap: wrap; gap: var(--sp-2, 0.5rem); }
  .lg__chip { padding: 4px 10px; font-size: 0.8125rem; font-weight: 600; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); border: 1px solid transparent; border-radius: var(--r-full); cursor: pointer; font-family: var(--font-mono); }
  .lg__chip:hover { background: var(--accent); color: #fff; }
  .lg__main { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: var(--r-md); }
  .lg__main-label { font-size: 0.95rem; color: var(--text-muted); font-family: var(--font-mono); }
  .lg__main-value { font-size: 2rem; font-weight: 700; color: var(--accent); font-family: var(--font-mono); word-break: break-all; }
  .lg__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3, 0.75rem); }
  @media (max-width: 520px) { .lg__grid { grid-template-columns: 1fr; } }
  .lg__card { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-3, 0.75rem); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); }
  .lg__card span { font-size: 0.74rem; color: var(--text-muted); }
  .lg__card strong { font-size: 1.1rem; color: var(--text); font-family: var(--font-mono); }
  .lg__formula { text-align: center; font-size: 0.85rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: var(--bg-input); border-radius: var(--r-md); font-family: var(--font-mono); }
  .lg__err { color: #dc2626; text-align: center; margin: 0; }
</style>
