<script lang="ts">
  // ============================================================
  // AriCalculator.svelte – ari ↔ metri pătrați (RO ingatlan / agrar)
  // 🆕 RO-specific: jargon imobiliar uzual (5 ari, 10 ari, 1 ha = 100 ari).
  // 1 ar = 100 m² | 1 ha = 100 ari = 10.000 m²
  // ============================================================
  let ariRaw = $state("5");
  let m2Raw = $state("500");

  function fmt(n: number, d = 4): string {
    if (Number.isInteger(n)) return n.toLocaleString("ro-RO");
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  function setAri(value: string) {
    ariRaw = value;
    const v = parse(value);
    m2Raw = Number.isFinite(v) ? fmt(v * 100, 0) : "";
  }
  function setM2(value: string) {
    m2Raw = value;
    const v = parse(value);
    ariRaw = Number.isFinite(v) ? fmt(v / 100) : "";
  }

  type Preset = { label: string; ari: number };
  const PRESETS: Preset[] = [
    { label: "Lot mic (3 ari)",         ari: 3 },
    { label: "Casă + curte (5 ari)",    ari: 5 },
    { label: "Curte mare (8 ari)",      ari: 8 },
    { label: "Vilă + grădină (10 ari)", ari: 10 },
    { label: "Teren mare (20 ari)",     ari: 20 },
    { label: "1 hectar (100 ari)",      ari: 100 },
  ];
</script>

<div class="ari">
  <div class="ari__inputs">
    <div class="ari__field">
      <label for="ari-ari" class="ari__label">Ari (a)</label>
      <div class="ari__input-wrap">
        <input
          id="ari-ari"
          type="text"
          inputmode="decimal"
          value={ariRaw}
          oninput={(e) => setAri((e.target as HTMLInputElement).value)}
          placeholder="ex. 5"
          class="ari__input"
        />
        <span class="ari__suffix">ari</span>
      </div>
    </div>

    <div class="ari__equals" aria-hidden="true">=</div>

    <div class="ari__field">
      <label for="ari-m2" class="ari__label">Metri pătrați (m²)</label>
      <div class="ari__input-wrap">
        <input
          id="ari-m2"
          type="text"
          inputmode="decimal"
          value={m2Raw}
          oninput={(e) => setM2((e.target as HTMLInputElement).value)}
          placeholder="ex. 500"
          class="ari__input"
        />
        <span class="ari__suffix">m²</span>
      </div>
    </div>
  </div>

  <p class="ari__hint">Modifică oricare valoare pentru conversie instantanee — uzual la anunțuri imobiliare RO</p>

  <div class="ari__presets">
    <span class="ari__presets-label">Suprafețe imobiliare:</span>
    {#each PRESETS as p}
      <button
        type="button"
        class="ari__chip"
        onclick={() => setAri(p.ari.toString())}
        title={p.label}
      >
        {p.ari} ari
      </button>
    {/each}
  </div>

  <div class="ari__formula">
    <strong>Formulă:</strong> 1 ar = 100 m² | 1 hectar = 100 ari = 10 000 m²
  </div>
</div>

<style>
  .ari {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .ari__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .ari__inputs { flex-direction: column; align-items: stretch; } }
  .ari__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .ari__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .ari__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .ari__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .ari__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .ari__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .ari__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .ari__equals { display: none; } }
  .ari__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .ari__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .ari__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .ari__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .ari__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .ari__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
