<script lang="ts">
  // ============================================================
  // DensitateCalculator.svelte – kg/m³ ↔ g/cm³
  // Port: SurusegEgysegCalculator.tsx logic + RO materiale uzuale.
  // 1 g/cm³ = 1.000 kg/m³
  // ============================================================
  let kgm3Raw = $state("1000");
  let gcm3Raw = $state("1");

  function fmt(n: number, d = 4): string {
    if (Number.isInteger(n)) return n.toLocaleString("ro-RO");
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  function setKgm3(value: string) {
    kgm3Raw = value;
    const v = parse(value);
    gcm3Raw = Number.isFinite(v) ? fmt(v / 1000, 6) : "";
  }
  function setGcm3(value: string) {
    gcm3Raw = value;
    const v = parse(value);
    kgm3Raw = Number.isFinite(v) ? fmt(v * 1000, 0) : "";
  }

  type Material = { name: string; kgm3: number };
  const MATERIALS: Material[] = [
    { name: "Aer (la 20 °C)", kgm3: 1.2 },
    { name: "Lemn de pin",    kgm3: 500 },
    { name: "Ulei",           kgm3: 920 },
    { name: "Apă",            kgm3: 1000 },
    { name: "Beton",          kgm3: 2400 },
    { name: "Aluminiu",       kgm3: 2700 },
    { name: "Sticlă",         kgm3: 2500 },
    { name: "Oțel",           kgm3: 7850 },
    { name: "Cupru",          kgm3: 8960 },
    { name: "Plumb",          kgm3: 11340 },
    { name: "Aur",            kgm3: 19300 },
  ];
</script>

<div class="dn">
  <div class="dn__inputs">
    <div class="dn__field">
      <label for="dn-kgm3" class="dn__label">Densitate (kg/m³)</label>
      <div class="dn__input-wrap">
        <input
          id="dn-kgm3"
          type="text"
          inputmode="decimal"
          value={kgm3Raw}
          oninput={(e) => setKgm3((e.target as HTMLInputElement).value)}
          placeholder="ex. 1000"
          class="dn__input"
        />
        <span class="dn__suffix">kg/m³</span>
      </div>
    </div>

    <div class="dn__equals" aria-hidden="true">↔</div>

    <div class="dn__field">
      <label for="dn-gcm3" class="dn__label">Densitate (g/cm³)</label>
      <div class="dn__input-wrap">
        <input
          id="dn-gcm3"
          type="text"
          inputmode="decimal"
          value={gcm3Raw}
          oninput={(e) => setGcm3((e.target as HTMLInputElement).value)}
          placeholder="ex. 1"
          class="dn__input"
        />
        <span class="dn__suffix">g/cm³</span>
      </div>
    </div>
  </div>

  <p class="dn__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="dn__refs-wrap">
    <h3 class="dn__refs-title"><span aria-hidden="true">📋</span> Materiale uzuale</h3>
    <table class="dn__refs">
      <thead>
        <tr>
          <th class="t-left">Material</th>
          <th class="t-right">kg/m³</th>
          <th class="t-right">g/cm³</th>
        </tr>
      </thead>
      <tbody>
        {#each MATERIALS as m}
          <tr class="dn__refs-row" onclick={() => setKgm3(m.kgm3.toString())} tabindex="0"
              onkeydown={(e) => e.key === "Enter" && setKgm3(m.kgm3.toString())}>
            <td>{m.name}</td>
            <td class="t-right dn__refs-num">{m.kgm3.toLocaleString("ro-RO")}</td>
            <td class="t-right dn__refs-num">{(m.kgm3 / 1000).toString().replace(".", ",")}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="dn__refs-hint">Apasă un rând pentru încărcare automată</p>
  </div>

  <div class="dn__formula">
    <strong>Formulă:</strong> 1 g/cm³ = 1 000 kg/m³ | g/cm³ = kg/m³ ÷ 1000
  </div>
</div>

<style>
  .dn {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .dn__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .dn__inputs { flex-direction: column; align-items: stretch; } }
  .dn__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .dn__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .dn__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) 56px var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .dn__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .dn__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.375rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .dn__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.75rem;
  }
  .dn__equals {
    font-size: 1.5rem; color: var(--cat-conversii, #8b5cf6);
    padding-bottom: var(--sp-3); font-weight: 700;
  }
  @media (max-width: 640px) { .dn__equals { display: none; } }
  .dn__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }

  .dn__refs-wrap {
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
    overflow-x: auto;
  }
  .dn__refs-title {
    margin: 0 0 var(--sp-2) 0; font-size: 0.9375rem; font-weight: 700;
    display: flex; align-items: center; gap: var(--sp-2);
  }
  .dn__refs {
    width: 100%; border-collapse: collapse; font-size: 0.875rem;
  }
  .dn__refs th {
    text-align: left; padding: var(--sp-2) var(--sp-3);
    font-weight: 700; color: var(--text-muted); font-size: 0.75rem;
    text-transform: uppercase; letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border);
  }
  .dn__refs th.t-right { text-align: right; }
  .dn__refs td {
    padding: var(--sp-2) var(--sp-3); color: var(--text);
    border-bottom: 1px solid var(--border);
  }
  .dn__refs td.t-right { text-align: right; font-family: var(--font-mono); font-weight: 600; }
  .dn__refs-num { color: var(--cat-conversii, #8b5cf6); }
  .dn__refs-row { cursor: pointer; transition: background var(--t-fast); }
  .dn__refs-row:hover, .dn__refs-row:focus-visible {
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 10%, transparent);
    outline: none;
  }
  .dn__refs-hint { text-align: center; margin: var(--sp-2) 0 0 0; font-size: 0.75rem; color: var(--text-subtle); }

  .dn__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
