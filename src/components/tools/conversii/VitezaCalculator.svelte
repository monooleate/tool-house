<script lang="ts">
  // ============================================================
  // VitezaCalculator.svelte – convertor viteză multi-unitate
  // Unități: km/h, m/s, mph (mile/oră), noduri (knots). Bază internă: m/s.
  // Editezi orice câmp → celelalte se recalculează instant.
  // ============================================================
  type Unit = "kmh" | "ms" | "mph" | "noduri";

  // factor: 1 unitate = X m/s
  const TO_MS: Record<Unit, number> = {
    kmh: 1 / 3.6,
    ms: 1,
    mph: 0.44704,
    noduri: 0.514444,
  };
  const LABELS: Record<Unit, string> = {
    kmh: "km/h",
    ms: "m/s",
    mph: "mph",
    noduri: "noduri",
  };
  const ORDER: Unit[] = ["kmh", "ms", "mph", "noduri"];

  let ms = $state(50 / 3.6); // implicit 50 km/h
  let last: Unit = $state("kmh");

  function valueOf(u: Unit): number {
    return Math.round((ms / TO_MS[u]) * 1000) / 1000;
  }
  function setUnit(u: Unit, v: number) {
    last = u;
    ms = v * TO_MS[u];
  }

  const REFS: { kmh: number; label: string }[] = [
    { kmh: 5, label: "Mers pe jos" },
    { kmh: 30, label: "Zonă urbană" },
    { kmh: 50, label: "Oraș" },
    { kmh: 100, label: "Drum național" },
    { kmh: 130, label: "Autostradă" },
  ];
</script>

<div class="vit">
  <div class="vit__grid">
    {#each ORDER as u}
      <div class="vit__field">
        <label class="vit__label" for={`vit-${u}`}>{LABELS[u]}</label>
        <div class="vit__input-wrap">
          <input
            id={`vit-${u}`}
            type="number"
            inputmode="decimal"
            step="0.1"
            min="0"
            value={valueOf(u)}
            oninput={(e) => setUnit(u, Number((e.target as HTMLInputElement).value))}
            class="vit__input"
          />
        </div>
      </div>
    {/each}
  </div>

  <p class="vit__hint">Modifică orice câmp — celelalte se actualizează instant</p>

  <div class="vit__refs">
    <span class="vit__refs-label">Viteze uzuale:</span>
    {#each REFS as ref}
      <button type="button" class="vit__chip" onclick={() => setUnit("kmh", ref.kmh)}>
        {ref.label} ({ref.kmh} km/h)
      </button>
    {/each}
  </div>

  <div class="vit__formula">
    <strong>Formule:</strong> m/s = km/h ÷ 3,6 | mph = km/h × 0,621371 | 1 nod = 1,852 km/h
  </div>
</div>

<style>
  .vit { display: flex; flex-direction: column; gap: var(--sp-4); padding: var(--sp-5); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .vit__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-3); }
  @media (max-width: 480px) { .vit__grid { grid-template-columns: 1fr; } }
  .vit__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .vit__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .vit__input-wrap { background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); transition: border-color var(--t-fast); }
  .vit__input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .vit__input { width: 100%; border: none; background: transparent; color: var(--text); font-size: 1.35rem; font-weight: 700; font-family: var(--font-mono); text-align: center; outline: none; }
  .vit__input::-webkit-outer-spin-button, .vit__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .vit__input { -moz-appearance: textfield; }
  .vit__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .vit__refs { display: flex; flex-wrap: wrap; gap: var(--sp-2); align-items: center; justify-content: center; padding-top: var(--sp-3); border-top: 1px solid var(--border); }
  .vit__refs-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; width: 100%; text-align: center; }
  .vit__chip { padding: 4px 10px; font-size: 0.8125rem; font-weight: 600; background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent); color: var(--cat-conversii, #8b5cf6); border: 1px solid transparent; border-radius: var(--r-full); cursor: pointer; transition: all var(--t-fast); }
  .vit__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .vit__formula { text-align: center; font-size: 0.8125rem; color: var(--text-muted); padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md); }
</style>
