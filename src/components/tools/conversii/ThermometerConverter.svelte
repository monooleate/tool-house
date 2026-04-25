<script lang="ts">
  // ============================================================
  // ThermometerConverter.svelte – Celsius ↔ Fahrenheit
  // Portolva a math reference CelsiusFahrenheitCalculator.tsx-ből.
  // Funkciók: gradient bar + marker, formula highlight (last edited),
  // referencia táblázat kattintható sorokkal, hangulat-emoji.
  // ============================================================

  function cToF(c: number): number {
    return Math.round((c * 9 / 5 + 32) * 100) / 100;
  }
  function fToC(f: number): number {
    return Math.round(((f - 32) * 5 / 9) * 100) / 100;
  }

  let cRaw = $state("25");
  let fRaw = $state("77");
  let lastEdited: "c" | "f" = $state("c");

  function handleC(value: string) {
    cRaw = value;
    lastEdited = "c";
    const v = parseFloat(value.replace(",", "."));
    if (Number.isFinite(v)) fRaw = cToF(v).toString();
  }
  function handleF(value: string) {
    fRaw = value;
    lastEdited = "f";
    const v = parseFloat(value.replace(",", "."));
    if (Number.isFinite(v)) cRaw = fToC(v).toString();
  }

  let cNum = $derived(parseFloat(cRaw.replace(",", ".")));
  let isValid = $derived(Number.isFinite(cNum));

  // Marker pozíció a gradient sávon: -40 → 100°C tartomány
  let tempPercent = $derived(
    isValid ? Math.max(0, Math.min(100, ((cNum + 40) / 140) * 100)) : 50
  );

  // Hangulat ikon + leírás
  let mood = $derived(getMood(cNum));
  function getMood(c: number): { emoji: string; label: string } {
    if (!Number.isFinite(c)) return { emoji: "", label: "" };
    if (c < 0)  return { emoji: "❄️", label: "Sub punctul de îngheț" };
    if (c < 10) return { emoji: "🥶", label: "Frig" };
    if (c < 20) return { emoji: "🧥", label: "Răcoare" };
    if (c < 30) return { emoji: "😊", label: "Plăcut" };
    if (c < 37) return { emoji: "☀️", label: "Cald" };
    if (c < 40) return { emoji: "🤒", label: "Interval febril" };
    return { emoji: "🔥", label: "Foarte cald" };
  }

  // Referencia hőmérsékletek (kattintható sorok)
  const REFS = [
    { c: -40, f: -40, label: "Aceeași valoare (−40°)" },
    { c: -18, f:   0, label: "0 °F" },
    { c:   0, f:  32, label: "Punctul de îngheț al apei" },
    { c:  10, f:  50, label: "Vreme rece" },
    { c:  20, f:  68, label: "Temperatura camerei" },
    { c:  25, f:  77, label: "Cald plăcut" },
    { c:  30, f:  86, label: "Vară caldă" },
    { c:  36.6, f: 97.88, label: "Temperatură corp normală" },
    { c:  37.5, f: 99.5,  label: "Febră ușoară" },
    { c:  40, f: 104, label: "Febră mare" },
    { c: 100, f: 212, label: "Punctul de fierbere al apei" },
    { c: 180, f: 356, label: "Cuptor – căldură medie" },
  ];
</script>

<div class="thermo">
  <!-- Header banner -->
  <div class="thermo__banner">
    <span class="thermo__banner-icon" aria-hidden="true">🌡️</span>
    <div>
      <h2 class="thermo__banner-title">Convertor Celsius ↔ Fahrenheit</h2>
      <p class="thermo__banner-sub">Conversie bidirecțională în timp real</p>
    </div>
  </div>

  <!-- Inputs -->
  <div class="thermo__inputs">
    <div class="thermo__field">
      <label for="c-input" class="thermo__label">Celsius (°C)</label>
      <div class="thermo__input-wrap thermo__input-wrap--c">
        <input
          id="c-input"
          type="text"
          inputmode="decimal"
          value={cRaw}
          oninput={(e) => handleC((e.target as HTMLInputElement).value)}
          class="thermo__input"
          placeholder="0"
        />
        <span class="thermo__suffix">°C</span>
      </div>
    </div>

    <div class="thermo__swap" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4m4-4H3"/>
      </svg>
    </div>

    <div class="thermo__field">
      <label for="f-input" class="thermo__label">Fahrenheit (°F)</label>
      <div class="thermo__input-wrap thermo__input-wrap--f">
        <input
          id="f-input"
          type="text"
          inputmode="decimal"
          value={fRaw}
          oninput={(e) => handleF((e.target as HTMLInputElement).value)}
          class="thermo__input"
          placeholder="32"
        />
        <span class="thermo__suffix">°F</span>
      </div>
    </div>
  </div>

  <!-- Gradient temperature bar with marker -->
  {#if isValid}
    <div class="thermo__bar-wrap">
      <div class="thermo__bar" role="img" aria-label={`Temperatură ${cNum}°C`}>
        <div class="thermo__bar-marker" style:left={`calc(${tempPercent}% - 10px)`}></div>
      </div>
      <div class="thermo__bar-scale" aria-hidden="true">
        <span>−40°</span><span>0°</span><span>20°</span><span>37°</span><span>100°</span>
      </div>
    </div>

    <!-- Result card -->
    <div class="thermo__result">
      <div class="thermo__result-line">
        <span class="thermo__result-c">{cRaw} °C</span>
        <span class="thermo__result-eq">=</span>
        <span class="thermo__result-f">{fRaw} °F</span>
      </div>
      {#if mood.emoji}
        <p class="thermo__mood">
          <span aria-hidden="true">{mood.emoji}</span> {mood.label}
        </p>
      {/if}
    </div>
  {/if}

  <!-- Formulas -->
  <div class="thermo__formulas">
    <div class="thermo__formula" class:is-active={lastEdited === "c"}>
      <p class="thermo__formula-label">Celsius → Fahrenheit</p>
      <p class="thermo__formula-eq">°F = °C × 9/5 + 32</p>
    </div>
    <div class="thermo__formula" class:is-active={lastEdited === "f"}>
      <p class="thermo__formula-label">Fahrenheit → Celsius</p>
      <p class="thermo__formula-eq">°C = (°F − 32) × 5/9</p>
    </div>
  </div>

  <!-- Reference table -->
  <div>
    <h3 class="thermo__refs-title">
      <span aria-hidden="true">📋</span> Temperaturi de referință
    </h3>
    <div class="thermo__refs-wrap">
      <table class="thermo__refs">
        <thead>
          <tr>
            <th class="t-left">Descriere</th>
            <th class="t-right">°C</th>
            <th class="t-right">°F</th>
          </tr>
        </thead>
        <tbody>
          {#each REFS as r}
            <tr class="thermo__refs-row" onclick={() => handleC(r.c.toString())} tabindex="0" onkeydown={(e) => e.key === "Enter" && handleC(r.c.toString())}>
              <td>{r.label}</td>
              <td class="t-right thermo__refs-c">{r.c}</td>
              <td class="t-right thermo__refs-f">{r.f}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="thermo__refs-hint">Apasă un rând pentru conversie instantanee</p>
  </div>
</div>

<style>
  .thermo {
    display: flex; flex-direction: column; gap: var(--sp-5);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --thermo-c: #f97316;
    --thermo-f: #3b82f6;
  }

  .thermo__banner {
    display: flex; align-items: center; gap: var(--sp-3);
    padding: var(--sp-4);
    background: linear-gradient(135deg, var(--thermo-f) 0%, #a855f7 50%, var(--thermo-c) 100%);
    border-radius: var(--r-md);
    color: #fff;
  }
  .thermo__banner-icon { font-size: 1.75rem; }
  .thermo__banner-title { margin: 0; font-size: 1.0625rem; font-weight: 700; line-height: 1.2; }
  .thermo__banner-sub { margin: 4px 0 0 0; font-size: 0.8125rem; opacity: 0.9; }

  .thermo__inputs {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--sp-3);
    align-items: end;
  }
  @media (max-width: 640px) { .thermo__inputs { grid-template-columns: 1fr; } }
  .thermo__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .thermo__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .thermo__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: all var(--t-fast);
  }
  .thermo__input-wrap--c:focus-within { border-color: var(--thermo-c); box-shadow: 0 0 0 3px color-mix(in srgb, var(--thermo-c) 22%, transparent); }
  .thermo__input-wrap--f:focus-within { border-color: var(--thermo-f); box-shadow: 0 0 0 3px color-mix(in srgb, var(--thermo-f) 22%, transparent); }
  .thermo__input {
    width: 100%; border: none; background: transparent; outline: none;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center;
  }
  .thermo__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 700; font-size: 0.9375rem;
  }
  .thermo__swap {
    align-self: center; justify-self: center;
    width: 36px; height: 36px;
    background: color-mix(in srgb, var(--thermo-c) 15%, transparent);
    color: var(--thermo-c);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: var(--sp-3);
  }
  @media (max-width: 640px) {
    .thermo__swap { transform: rotate(90deg); }
  }

  .thermo__bar-wrap { display: flex; flex-direction: column; gap: 4px; }
  .thermo__bar {
    height: 14px;
    border-radius: var(--r-full);
    background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 25%, #facc15 50%, #f97316 75%, #ef4444 100%);
    position: relative;
  }
  .thermo__bar-marker {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 20px; height: 20px;
    background: var(--bg-card); border: 3px solid var(--text);
    border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    transition: left 200ms ease-out;
  }
  .thermo__bar-scale {
    display: flex; justify-content: space-between;
    font-size: 0.6875rem; color: var(--text-subtle); font-family: var(--font-mono);
  }

  .thermo__result {
    text-align: center; padding: var(--sp-4);
    background: linear-gradient(90deg, color-mix(in srgb, var(--thermo-c) 8%, var(--bg)) 0%, color-mix(in srgb, var(--thermo-f) 8%, var(--bg)) 100%);
    border: 1px solid color-mix(in srgb, var(--thermo-c) 25%, transparent);
    border-radius: var(--r-md);
  }
  .thermo__result-line {
    font-size: 1.125rem; font-weight: 700;
    display: flex; gap: var(--sp-2); justify-content: center; flex-wrap: wrap;
  }
  .thermo__result-c { color: var(--thermo-c); }
  .thermo__result-f { color: var(--thermo-f); }
  .thermo__result-eq { color: var(--text-muted); }
  .thermo__mood {
    margin: 6px 0 0 0; font-size: 0.875rem; color: var(--text-muted);
  }

  .thermo__formulas {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 640px) { .thermo__formulas { grid-template-columns: 1fr; } }
  .thermo__formula {
    padding: var(--sp-3); border: 2px solid var(--border);
    background: var(--bg); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .thermo__formula:nth-child(1).is-active {
    border-color: var(--thermo-c);
    background: color-mix(in srgb, var(--thermo-c) 8%, var(--bg));
  }
  .thermo__formula:nth-child(2).is-active {
    border-color: var(--thermo-f);
    background: color-mix(in srgb, var(--thermo-f) 8%, var(--bg));
  }
  .thermo__formula-label {
    margin: 0 0 6px 0; font-size: 0.6875rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle);
  }
  .thermo__formula-eq {
    margin: 0; font-family: var(--font-mono); font-size: 0.9375rem;
    font-weight: 700; color: var(--text);
  }

  .thermo__refs-title {
    margin: 0 0 var(--sp-3) 0; font-size: 0.9375rem; font-weight: 700;
    color: var(--text); display: flex; align-items: center; gap: var(--sp-2);
  }
  .thermo__refs-wrap { overflow-x: auto; }
  .thermo__refs {
    width: 100%; border-collapse: collapse; font-size: 0.875rem;
  }
  .thermo__refs th {
    text-align: left; padding: var(--sp-2) var(--sp-3);
    font-weight: 700; color: var(--text-muted); font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border);
  }
  .thermo__refs th.t-right { text-align: right; }
  .thermo__refs td {
    padding: var(--sp-2) var(--sp-3); color: var(--text);
    border-bottom: 1px solid var(--border);
  }
  .thermo__refs td.t-right { text-align: right; font-family: var(--font-mono); font-weight: 600; }
  .thermo__refs-c { color: var(--thermo-c); }
  .thermo__refs-f { color: var(--thermo-f); }
  .thermo__refs-row { cursor: pointer; transition: background var(--t-fast); }
  .thermo__refs-row:hover, .thermo__refs-row:focus-visible {
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    outline: none;
  }
  .thermo__refs-hint {
    text-align: center; margin: var(--sp-2) 0 0 0;
    font-size: 0.75rem; color: var(--text-subtle);
  }
</style>
