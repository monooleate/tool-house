<script lang="ts">
  // ============================================================
  // NumereRomaneCalculator.svelte — convertor numere romane ↔ arabe (1–3999)
  // Bidirecțional: editezi un câmp, celălalt se actualizează + validare.
  // ============================================================
  const MAP: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  const ROMAN_RE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  function toRoman(n: number): string {
    let out = "";
    let rest = n;
    for (const [v, sym] of MAP) {
      while (rest >= v) { out += sym; rest -= v; }
    }
    return out;
  }
  function fromRoman(s: string): number | null {
    const up = s.toUpperCase().trim();
    if (up === "") return null;
    if (!ROMAN_RE.test(up)) return null;
    let n = 0;
    let i = 0;
    for (const [v, sym] of MAP) {
      while (up.startsWith(sym, i)) { n += v; i += sym.length; }
    }
    return i === up.length && n >= 1 && n <= 3999 ? n : null;
  }

  let arab = $state("2026");
  let roman = $state("MMXXVI");
  let eroare = $state("");

  function onArab(v: string) {
    arab = v;
    eroare = "";
    const n = parseInt(v, 10);
    if (v.trim() === "") { roman = ""; return; }
    if (!Number.isInteger(n) || n < 1 || n > 3999) {
      roman = "";
      eroare = "Introdu un număr întreg între 1 și 3999.";
      return;
    }
    roman = toRoman(n);
  }
  function onRoman(v: string) {
    roman = v.toUpperCase();
    eroare = "";
    if (v.trim() === "") { arab = ""; return; }
    const n = fromRoman(v);
    if (n === null) {
      arab = "";
      eroare = "Număr roman invalid. Folosește doar I, V, X, L, C, D, M (1–3999).";
      return;
    }
    arab = String(n);
  }

  // Descompunere pentru valoarea curentă validă
  let descompunere = $derived.by(() => {
    const n = parseInt(arab, 10);
    if (!Number.isInteger(n) || n < 1 || n > 3999) return [];
    const parts: { sym: string; val: number }[] = [];
    let rest = n;
    for (const [v, sym] of MAP) {
      while (rest >= v) { parts.push({ sym, val: v }); rest -= v; }
    }
    return parts;
  });

  const SIMBOLURI = [
    { sym: "I", val: 1 }, { sym: "V", val: 5 }, { sym: "X", val: 10 },
    { sym: "L", val: 50 }, { sym: "C", val: 100 }, { sym: "D", val: 500 }, { sym: "M", val: 1000 },
  ];
</script>

<div class="nr">
  <div class="nr__io">
    <div class="nr__field">
      <label class="nr__label" for="nr-arab">Număr arab (1–3999)</label>
      <div class="nr__wrap">
        <input id="nr-arab" type="text" inputmode="numeric" value={arab}
          oninput={(e) => onArab((e.target as HTMLInputElement).value)} class="nr__input" />
      </div>
    </div>
    <div class="nr__eq" aria-hidden="true">⇄</div>
    <div class="nr__field">
      <label class="nr__label" for="nr-roman">Număr roman</label>
      <div class="nr__wrap">
        <input id="nr-roman" type="text" value={roman}
          oninput={(e) => onRoman((e.target as HTMLInputElement).value)} class="nr__input nr__input--roman" />
      </div>
    </div>
  </div>

  {#if eroare}
    <p class="nr__err" role="alert">{eroare}</p>
  {:else if descompunere.length}
    <div class="nr__break">
      <span class="nr__break-label">Descompunere:</span>
      {#each descompunere as p, i}
        <span class="nr__chip">{p.sym}<small>={p.val}</small></span>{#if i < descompunere.length - 1}<span class="nr__plus">+</span>{/if}
      {/each}
    </div>
  {/if}

  <div class="nr__table">
    <span class="nr__table-label">Simboluri de bază:</span>
    <div class="nr__symbols">
      {#each SIMBOLURI as s}
        <button type="button" class="nr__sym" onclick={() => onArab(String(s.val))}>
          <strong>{s.sym}</strong><span>{s.val}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .nr { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .nr__io { display: flex; align-items: end; gap: var(--sp-3, 0.75rem); flex-wrap: wrap; justify-content: center; }
  @media (max-width: 600px) { .nr__io { flex-direction: column; align-items: stretch; } }
  .nr__field { display: flex; flex-direction: column; gap: var(--sp-2, 0.5rem); flex: 1; min-width: 160px; }
  .nr__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .nr__wrap { background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3, 0.75rem); }
  .nr__wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .nr__input { width: 100%; border: none; background: transparent; color: var(--text); font-size: 1.5rem; font-weight: 700; font-family: var(--font-mono); text-align: center; outline: none; }
  .nr__input--roman { letter-spacing: 0.08em; }
  .nr__eq { font-size: 1.4rem; color: var(--text-muted); padding-bottom: var(--sp-3, 0.75rem); }
  @media (max-width: 600px) { .nr__eq { display: none; } }
  .nr__err { color: #dc2626; font-size: 0.85rem; margin: 0; text-align: center; }
  .nr__break { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; justify-content: center; font-size: 0.9rem; }
  .nr__break-label { color: var(--text-muted); width: 100%; text-align: center; font-size: 0.8125rem; }
  .nr__chip { font-family: var(--font-mono); font-weight: 700; color: var(--accent); }
  .nr__chip small { font-weight: 500; color: var(--text-muted); }
  .nr__plus { color: var(--text-muted); }
  .nr__table { padding-top: var(--sp-3, 0.75rem); border-top: 1px solid var(--border); }
  .nr__table-label { font-size: 0.8125rem; color: var(--text-muted); display: block; text-align: center; margin-bottom: var(--sp-2, 0.5rem); }
  .nr__symbols { display: flex; flex-wrap: wrap; gap: var(--sp-2, 0.5rem); justify-content: center; }
  .nr__sym { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 12px; background: color-mix(in srgb, var(--accent) 12%, transparent); border: 1px solid transparent; border-radius: var(--r-md); cursor: pointer; }
  .nr__sym strong { font-family: var(--font-mono); color: var(--accent); }
  .nr__sym span { font-size: 0.7rem; color: var(--text-muted); }
  .nr__sym:hover { background: var(--accent); }
  .nr__sym:hover strong, .nr__sym:hover span { color: #fff; }
</style>
