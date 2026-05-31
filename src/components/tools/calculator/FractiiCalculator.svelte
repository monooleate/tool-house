<script lang="ts">
  // ============================================================
  // FractiiCalculator.svelte — operații cu fracții (+ − × ÷)
  // Aducere la numitor comun, simplificare (CMMDC), număr mixt, pași.
  // ============================================================
  type Op = "add" | "sub" | "mul" | "div";

  const OPS: { key: Op; sym: string; label: string }[] = [
    { key: "add", sym: "+", label: "Adunare" },
    { key: "sub", sym: "−", label: "Scădere" },
    { key: "mul", sym: "×", label: "Înmulțire" },
    { key: "div", sym: "÷", label: "Împărțire" },
  ];

  let op = $state<Op>("add");
  let n1 = $state("1");
  let d1 = $state("2");
  let n2 = $state("1");
  let d2 = $state("3");

  function gcd(a: number, b: number): number {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a || 1;
  }
  function intOf(s: string): number | null {
    const n = parseInt(s, 10);
    return Number.isInteger(n) ? n : null;
  }

  let rez = $derived.by(() => {
    const a = intOf(n1), b = intOf(d1), c = intOf(n2), e = intOf(d2);
    if (a === null || b === null || c === null || e === null) return null;
    if (b === 0 || e === 0) return { err: "Numitorul nu poate fi 0." };
    if (op === "div" && c === 0) return { err: "Nu se poate împărți la fracția 0." };

    let num: number, den: number, pas: string;
    switch (op) {
      case "add": num = a * e + c * b; den = b * e; pas = `${a}·${e} + ${c}·${b} = ${num}, numitor ${b}·${e} = ${den}`; break;
      case "sub": num = a * e - c * b; den = b * e; pas = `${a}·${e} − ${c}·${b} = ${num}, numitor ${b}·${e} = ${den}`; break;
      case "mul": num = a * c; den = b * e; pas = `${a}·${c} = ${num}, ${b}·${e} = ${den}`; break;
      case "div": num = a * e; den = b * c; pas = `${a}·${e} = ${num}, ${b}·${c} = ${den} (înmulțire cu inversul)`; break;
    }
    // normalizare semn
    if (den < 0) { num = -num; den = -den; }
    const g = gcd(num, den);
    const sn = num / g, sd = den / g;
    const simplificat = g !== 1;
    // număr mixt
    let mixt = "";
    if (sd !== 1 && Math.abs(sn) > sd) {
      const intreg = Math.trunc(sn / sd);
      const rest = Math.abs(sn % sd);
      mixt = `${intreg} ${rest}/${sd}`;
    }
    const zecimal = sn / sd;
    return { a, b, c, e, num, den, sn, sd, simplificat, g, mixt, zecimal, pas };
  });
</script>

<div class="fr">
  <div class="fr__modes" role="tablist">
    {#each OPS as o}
      <button type="button" role="tab" aria-selected={op === o.key} class:is-active={op === o.key} onclick={() => (op = o.key)}>
        {o.sym} {o.label}
      </button>
    {/each}
  </div>

  <div class="fr__expr">
    <div class="fr__frac">
      <input class="fr__num" type="text" inputmode="numeric" bind:value={n1} aria-label="Numărător 1" />
      <span class="fr__bar"></span>
      <input class="fr__num" type="text" inputmode="numeric" bind:value={d1} aria-label="Numitor 1" />
    </div>
    <span class="fr__op">{OPS.find((o) => o.key === op)?.sym}</span>
    <div class="fr__frac">
      <input class="fr__num" type="text" inputmode="numeric" bind:value={n2} aria-label="Numărător 2" />
      <span class="fr__bar"></span>
      <input class="fr__num" type="text" inputmode="numeric" bind:value={d2} aria-label="Numitor 2" />
    </div>
    <span class="fr__op">=</span>
    <div class="fr__result">
      {#if rez && !("err" in rez)}
        {#if rez.sd === 1}
          <span class="fr__res-int">{rez.sn}</span>
        {:else}
          <div class="fr__frac fr__frac--res">
            <span class="fr__num fr__num--res">{rez.sn}</span>
            <span class="fr__bar"></span>
            <span class="fr__num fr__num--res">{rez.sd}</span>
          </div>
        {/if}
      {:else}
        <span class="fr__res-int">?</span>
      {/if}
    </div>
  </div>

  {#if rez && "err" in rez}
    <p class="fr__err" role="alert">{rez.err}</p>
  {:else if rez}
    <div class="fr__steps">
      <p><strong>Rezultat brut:</strong> {rez.num}/{rez.den}</p>
      <p><strong>Pași:</strong> {rez.pas}</p>
      {#if rez.simplificat}
        <p><strong>Simplificare:</strong> împărțim la CMMDC = {rez.g} → <strong>{rez.sn}/{rez.sd}</strong></p>
      {:else}
        <p><strong>Simplificare:</strong> fracția este deja ireductibilă.</p>
      {/if}
      {#if rez.mixt}
        <p><strong>Număr mixt:</strong> {rez.mixt}</p>
      {/if}
      <p><strong>Zecimal:</strong> {Number.isInteger(rez.zecimal) ? rez.zecimal : rez.zecimal.toFixed(4)}</p>
    </div>
  {/if}
</div>

<style>
  .fr { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .fr__modes { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .fr__modes button { flex: 1; min-width: 110px; padding: 0.5rem 0.6rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); cursor: pointer; font: inherit; font-size: 0.85rem; }
  .fr__modes button.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .fr__expr { display: flex; align-items: center; justify-content: center; gap: var(--sp-3, 0.75rem); flex-wrap: wrap; }
  .fr__frac { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .fr__num { width: 64px; text-align: center; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); padding: 0.4rem; font-size: 1.2rem; font-family: var(--font-mono); outline: none; }
  .fr__num:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .fr__bar { width: 64px; height: 2px; background: var(--text); }
  .fr__op { font-size: 1.5rem; font-weight: 700; color: var(--text-muted); }
  .fr__result { min-width: 64px; display: flex; justify-content: center; }
  .fr__res-int { font-size: 1.8rem; font-weight: 700; color: var(--accent); font-family: var(--font-mono); }
  .fr__num--res { border: none; background: transparent; color: var(--accent); width: 64px; text-align: center; font-size: 1.4rem; font-weight: 700; font-family: var(--font-mono); }
  .fr__frac--res .fr__bar { background: var(--accent); }
  .fr__err { color: #dc2626; text-align: center; margin: 0; font-size: 0.9rem; }
  .fr__steps { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3, 0.75rem); font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.3rem; }
  .fr__steps p { margin: 0; color: var(--text); }
  .fr__steps strong { color: var(--text); }
</style>
