<script lang="ts">
  // ─── CSS gradiens generátor (100% kliensoldali, kétnyelvű build-idős) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      type: "Típus", linear: "Lineáris", radial: "Radiális",
      angle: "Szög", stops: "Színpontok", addStop: "Színpont hozzáadása",
      remove: "Eltávolítás", cssOutput: "CSS kód", copy: "Másolás", copied: "Másolva!",
      preview: "Előnézet", pos: "pozíció",
    },
    ro: {
      type: "Tip", linear: "Liniar", radial: "Radial",
      angle: "Unghi", stops: "Puncte de culoare", addStop: "Adaugă punct",
      remove: "Elimină", cssOutput: "Cod CSS", copy: "Copiază", copied: "Copiat!",
      preview: "Previzualizare", pos: "poziție",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  type Stop = { color: string; pos: number };

  let type = $state<"linear" | "radial">("linear");
  let angle = $state(90);
  let stops = $state<Stop[]>([
    { color: "#3B82F6", pos: 0 },
    { color: "#F43F5E", pos: 100 },
  ]);
  let copied = $state(false);

  const sorted = $derived([...stops].sort((a, b) => a.pos - b.pos));
  const stopsStr = $derived(sorted.map((s) => `${s.color} ${s.pos}%`).join(", "));
  const gradient = $derived(
    type === "linear"
      ? `linear-gradient(${angle}deg, ${stopsStr})`
      : `radial-gradient(circle, ${stopsStr})`,
  );
  const css = $derived(`background: ${gradient};`);

  function addStop() {
    if (stops.length >= 6) return;
    const mid = Math.round((stops[stops.length - 1].pos + stops[0].pos) / 2);
    stops = [...stops, { color: "#22C55E", pos: Math.max(0, Math.min(100, mid)) }];
  }
  function removeStop(i: number) {
    if (stops.length <= 2) return;
    stops = stops.filter((_, idx) => idx !== i);
  }
  function setColor(i: number, v: string) {
    stops = stops.map((s, idx) => (idx === i ? { ...s, color: v.toUpperCase() } : s));
  }
  function setPos(i: number, v: number) {
    stops = stops.map((s, idx) => (idx === i ? { ...s, pos: Math.max(0, Math.min(100, v)) } : s));
  }

  async function copy() {
    try { await navigator.clipboard.writeText(css); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }
</script>

<div class="tool">
  <!-- Előnézet -->
  <div class="preview" style={`background:${gradient}`} aria-label={L.preview}></div>

  <!-- Beállítások -->
  <div class="card">
    <div class="type-row">
      <div class="seg" role="group" aria-label={L.type}>
        <button type="button" class:seg--active={type === "linear"} onclick={() => (type = "linear")}>{L.linear}</button>
        <button type="button" class:seg--active={type === "radial"} onclick={() => (type = "radial")}>{L.radial}</button>
      </div>
      {#if type === "linear"}
        <label class="angle">
          <span>{L.angle}: <strong>{angle}°</strong></span>
          <input type="range" min="0" max="360" bind:value={angle} />
        </label>
      {/if}
    </div>
  </div>

  <!-- Színpontok -->
  <div class="card">
    <div class="stops-head">
      <h3 class="legend">{L.stops}</h3>
      <button type="button" class="btn btn--ghost" onclick={addStop} disabled={stops.length >= 6}>+ {L.addStop}</button>
    </div>
    <ul class="stops">
      {#each stops as s, i}
        <li class="stop">
          <input class="stop__color" type="color" value={s.color} oninput={(e) => setColor(i, (e.target as HTMLInputElement).value)} aria-label="szín" />
          <code class="stop__hex">{s.color}</code>
          <input class="stop__range" type="range" min="0" max="100" value={s.pos} oninput={(e) => setPos(i, +(e.target as HTMLInputElement).value)} aria-label={L.pos} />
          <span class="stop__pos">{s.pos}%</span>
          <button type="button" class="stop__remove" onclick={() => removeStop(i)} disabled={stops.length <= 2} aria-label={L.remove}>✕</button>
        </li>
      {/each}
    </ul>
  </div>

  <!-- CSS kimenet -->
  <div class="card">
    <div class="css-head">
      <h3 class="legend">{L.cssOutput}</h3>
      <button type="button" class="btn btn--primary" onclick={copy}>{copied ? `✓ ${L.copied}` : `📋 ${L.copy}`}</button>
    </div>
    <pre class="css-out"><code>{css}</code></pre>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0; }

  .preview { width: 100%; min-height: 180px; border-radius: var(--r-lg, 12px); border: 1px solid var(--border); }

  .type-row { display: flex; gap: var(--sp-4); align-items: center; flex-wrap: wrap; }
  .seg { display: inline-flex; border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; }
  .seg button { background: var(--bg-input); color: var(--text-muted); border: none; padding: var(--sp-2) var(--sp-4); font-size: .8125rem; cursor: pointer; }
  .seg button.seg--active { background: var(--cat-szinek, #f43f5e); color: #fff; font-weight: 600; }
  .angle { flex: 1; min-width: 180px; display: flex; flex-direction: column; gap: var(--sp-1); font-size: .8125rem; color: var(--text); }
  .angle input[type="range"] { accent-color: var(--cat-szinek, #f43f5e); }

  .stops-head, .css-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); margin-bottom: var(--sp-3); }
  .stops { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .stop { display: grid; grid-template-columns: 40px 76px 1fr 44px 32px; align-items: center; gap: var(--sp-2); }
  .stop__color { width: 40px; height: 32px; padding: 2px; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; }
  .stop__hex { font-family: var(--font-mono, monospace); font-size: .8125rem; color: var(--text-muted); }
  .stop__range { width: 100%; accent-color: var(--cat-szinek, #f43f5e); }
  .stop__pos { font-family: var(--font-mono, monospace); font-size: .8125rem; color: var(--text-muted); text-align: right; }
  .stop__remove { background: transparent; border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; color: var(--text-muted); padding: var(--sp-1); }
  .stop__remove:hover:not(:disabled) { border-color: #dc2626; color: #dc2626; }
  .stop__remove:disabled { opacity: .35; cursor: not-allowed; }

  .css-out { margin: 0; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-4); overflow-x: auto; }
  .css-out code { font-family: var(--font-mono, monospace); font-size: .875rem; color: var(--text); white-space: pre-wrap; word-break: break-word; }

  .btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); white-space: nowrap; }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary { background: var(--cat-szinek, #f43f5e); color: #fff; border-color: transparent; }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--ghost { background: var(--bg-input); color: var(--text); }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-szinek, #f43f5e); }
</style>
