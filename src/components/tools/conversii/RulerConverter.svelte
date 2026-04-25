<script lang="ts">
  // ============================================================
  // RulerConverter.svelte – cm ↔ inch interaktív vonalzó
  // Portolva a math reference CmInchConverter.tsx-ből (RO).
  // Kétirányú: number input + draggable SVG marker.
  // ============================================================
  const CM_PER_INCH = 2.54;
  const PX_PER_CM = 20;       // 20 px/cm — jó arány desktopra
  const RULER_CM = 30;         // A vizuális vonalzó hossza cm-ben (0–30)

  let cm = $state(15);
  let inch = $derived(cm / CM_PER_INCH);

  let svgEl: SVGSVGElement | null = $state(null);
  let isDragging = $state(false);

  function setCm(v: number) {
    // Nincs felső korlát — beírható bármekkora érték (pl. 75" TV = 190,5 cm).
    // A vizuális vonalzó 30 cm-ig megy; ezen túl a marker eltűnik.
    cm = Math.max(0, v);
  }
  function setInch(v: number) {
    setCm(v * CM_PER_INCH);
  }

  // A marker csak akkor látható, ha cm a vonalzó tartományában van
  let markerVisible = $derived(cm <= RULER_CM);

  function updateFromPosition(clientX: number) {
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    const x = clientX - rect.left;
    // Drag csak a vonalzó tartományában — clamp 0..RULER_CM
    cm = Math.max(0, Math.min(RULER_CM, x / PX_PER_CM));
  }

  function handlePointerDown(e: PointerEvent) {
    isDragging = true;
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    updateFromPosition(e.clientX);
  }
  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return;
    updateFromPosition(e.clientX);
  }
  function handlePointerUp() {
    isDragging = false;
  }

  // Kijelző-méret presetek
  const SCREEN_PRESETS = [
    { inch: 5, label: "5\" telefon" },
    { inch: 6, label: "6\" telefon" },
    { inch: 10, label: "10\" tabletă" },
    { inch: 24, label: "24\" monitor" },
    { inch: 27, label: "27\" monitor" },
    { inch: 32, label: "32\" TV/monitor" },
    { inch: 43, label: "43\" TV" },
    { inch: 55, label: "55\" TV" },
    { inch: 65, label: "65\" TV" },
    { inch: 75, label: "75\" TV" },
  ];
</script>

<div class="ruler">
  <!-- Number inputs -->
  <div class="ruler__inputs">
    <div class="ruler__field">
      <label for="cm-num" class="ruler__label">Centimetri (cm)</label>
      <div class="ruler__input-wrap">
        <input
          id="cm-num"
          type="number"
          inputmode="decimal"
          step="0.1"
          min="0"
          value={cm.toFixed(2)}
          oninput={(e) => setCm(Number((e.target as HTMLInputElement).value))}
          class="ruler__input"
        />
      </div>
    </div>

    <div class="ruler__equals" aria-hidden="true">⇄</div>

    <div class="ruler__field">
      <label for="inch-num" class="ruler__label">Inch (țoli)</label>
      <div class="ruler__input-wrap">
        <input
          id="inch-num"
          type="number"
          inputmode="decimal"
          step="0.01"
          min="0"
          value={inch.toFixed(3)}
          oninput={(e) => setInch(Number((e.target as HTMLInputElement).value))}
          class="ruler__input"
        />
      </div>
    </div>
  </div>

  <!-- Interactive SVG ruler -->
  <div class="ruler__svg-wrap" role="presentation">
    <svg
      bind:this={svgEl}
      width={RULER_CM * PX_PER_CM}
      height="120"
      viewBox={`0 0 ${RULER_CM * PX_PER_CM} 120`}
      class="ruler__svg"
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onpointercancel={handlePointerUp}
      role="slider"
      tabindex="0"
      aria-label="Vonalzó — trage marcatorul pentru a converti cm în inch"
      aria-valuemin="0"
      aria-valuemax={RULER_CM}
      aria-valuenow={cm.toFixed(1)}
    >
      <!-- Vonalzó test -->
      <rect x="0" y="20" width={RULER_CM * PX_PER_CM} height="80" fill="var(--ruler-body)" rx="4" />

      <!-- CM skála (felső) -->
      {#each Array(RULER_CM + 1) as _, i}
        {@const x = i * PX_PER_CM}
        {@const isMajor = i % 5 === 0}
        {@const isMid = i % 1 === 0}
        <line
          x1={x}
          y1="20"
          x2={x}
          y2={isMajor ? 50 : (isMid ? 35 : 28)}
          stroke="var(--ruler-tick)"
          stroke-width={isMajor ? 1.5 : 1}
        />
        {#if isMajor}
          <text x={x + 3} y="64" class="ruler__num" fill="var(--ruler-text)">
            {i}
          </text>
        {/if}
      {/each}
      <text x={RULER_CM * PX_PER_CM - 5} y="14" class="ruler__unit" fill="var(--ruler-text)" text-anchor="end">cm</text>

      <!-- INCH skála (alsó) -->
      {#each Array(Math.floor(RULER_CM / CM_PER_INCH) + 1) as _, i}
        {@const xInch = i * CM_PER_INCH * PX_PER_CM}
        <line
          x1={xInch}
          y1="100"
          x2={xInch}
          y2={70}
          stroke="var(--ruler-tick)"
          stroke-width="1.5"
        />
        <text x={xInch + 3} y="92" class="ruler__num" fill="var(--ruler-text)">{i}</text>
      {/each}
      <text x={RULER_CM * PX_PER_CM - 5} y="116" class="ruler__unit" fill="var(--ruler-text)" text-anchor="end">inch</text>

      <!-- Marker — csak akkor látható, ha cm érték a vonalzó tartományán belül -->
      {#if markerVisible}
        <g class="ruler__marker" style:transform={`translateX(${cm * PX_PER_CM}px)`}>
          <line x1="0" y1="0" x2="0" y2="120" stroke="var(--cat-conversii, #8b5cf6)" stroke-width="2.5" />
          <circle cx="0" cy="20" r="7" fill="var(--cat-conversii, #8b5cf6)" stroke="var(--bg-card)" stroke-width="2" />
          <circle cx="0" cy="100" r="7" fill="var(--cat-conversii, #8b5cf6)" stroke="var(--bg-card)" stroke-width="2" />
        </g>
      {/if}
    </svg>
  </div>

  <p class="ruler__hint">
    {#if markerVisible}
      Trage marcatorul de-a lungul rigleli sau scrie valoarea în câmpurile de mai sus
    {:else}
      Valoarea depășește lungimea riglei vizuale ({RULER_CM} cm). Conversia rămâne corectă în câmpurile de mai sus.
    {/if}
  </p>

  <!-- Screen size presets -->
  <div class="ruler__presets">
    <span class="ruler__presets-title">Diagonale ecran:</span>
    <div class="ruler__chips">
      {#each SCREEN_PRESETS as preset}
        <button
          type="button"
          class="ruler__chip"
          onclick={() => setInch(preset.inch)}
          title={`${preset.inch} inch = ${(preset.inch * CM_PER_INCH).toFixed(2)} cm`}
        >
          {preset.label}
        </button>
      {/each}
    </div>
  </div>

  <div class="ruler__formula">
    <strong>Formulă:</strong> 1 inch = 2,54 cm (exact) | inch = cm ÷ 2,54
  </div>
</div>

<style>
  .ruler {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding: var(--sp-5);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    /* Vonalzó-specifikus design tokenek (light/dark contrast) */
    --ruler-body: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 6%, var(--bg));
    --ruler-tick: var(--text-muted);
    --ruler-text: var(--text);
  }

  .ruler__inputs {
    display: flex;
    align-items: end;
    gap: var(--sp-3);
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 640px) {
    .ruler__inputs { flex-direction: column; align-items: stretch; }
  }
  .ruler__field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    flex: 1;
    min-width: 140px;
  }
  .ruler__label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
  }
  .ruler__input-wrap {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3);
  }
  .ruler__input-wrap:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }
  .ruler__input {
    width: 100%;
    border: none;
    background: transparent;
    color: var(--text);
    font-size: 1.25rem;
    font-weight: 700;
    font-family: var(--font-mono);
    text-align: center;
    outline: none;
  }
  .ruler__input::-webkit-outer-spin-button,
  .ruler__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .ruler__input { -moz-appearance: textfield; }
  .ruler__equals {
    font-size: 1.5rem;
    color: var(--cat-conversii, #8b5cf6);
    padding-bottom: var(--sp-3);
  }
  @media (max-width: 640px) { .ruler__equals { display: none; } }

  .ruler__svg-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-2);
  }
  .ruler__svg {
    display: block;
    cursor: ew-resize;
    touch-action: none;
    user-select: none;
  }
  .ruler__num {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
  }
  .ruler__unit {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .ruler__marker {
    transition: transform 80ms ease-out;
    pointer-events: none;
  }

  .ruler__hint {
    text-align: center;
    color: var(--text-subtle);
    font-size: 0.8125rem;
    margin: 0;
  }

  .ruler__presets {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    padding-top: var(--sp-3);
    border-top: 1px solid var(--border);
  }
  .ruler__presets-title {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 600;
    text-align: center;
  }
  .ruler__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    justify-content: center;
  }
  .ruler__chip {
    padding: 4px 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent;
    border-radius: var(--r-full);
    cursor: pointer;
    transition: all var(--t-fast);
  }
  .ruler__chip:hover {
    background: var(--cat-conversii, #8b5cf6);
    color: #fff;
  }

  .ruler__formula {
    text-align: center;
    font-size: 0.8125rem;
    color: var(--text-muted);
    padding: var(--sp-3);
    background: var(--bg);
    border-radius: var(--r-md);
  }
</style>
