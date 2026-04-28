<script lang="ts">
  import { onMount } from "svelte";

  type FormatId = "EAN13" | "CODE128" | "UPC" | "ITF14";

  const FORMATS: Array<{ id: FormatId; jsId: string; label: string; desc: string; example: string }> = [
    { id: "EAN13",   jsId: "ean13",   label: "EAN-13",   desc: "13 cifre, cod produs european",       example: "5901234123457" },
    { id: "CODE128", jsId: "code128", label: "CODE-128", desc: "Alfanumeric, universal",              example: "INSTRUMENTE-2026" },
    { id: "UPC",     jsId: "upc",     label: "UPC-A",    desc: "12 cifre, retail SUA / Canada",       example: "036000291452" },
    { id: "ITF14",   jsId: "itf14",   label: "ITF-14",   desc: "14 cifre, unități de transport",      example: "10012345678902" },
  ];

  let format = $state<FormatId>("EAN13");
  let value = $state<string>("5901234123457");
  let lineWidth = $state<number>(2);
  let height = $state<number>(100);
  let displayValue = $state<boolean>(true);
  let lineColor = $state<string>("#000000");
  let background = $state<string>("#ffffff");
  let advancedOpen = $state<boolean>(false);

  let svgContainer: HTMLDivElement | undefined = $state();
  let canvasEl: HTMLCanvasElement | undefined = $state();
  let JsBarcode: any = $state(null);
  let libError = $state<string>("");
  let copied = $state<boolean>(false);

  // GTIN check digit (modulo-10 ponderat: alternant 3,1,3,1...)
  function calcCheckDigit(digits: string): number {
    let sum = 0;
    let mul = 3;
    for (let i = digits.length - 1; i >= 0; i--) {
      sum += (digits.charCodeAt(i) - 48) * mul;
      mul = mul === 3 ? 1 : 3;
    }
    return (10 - (sum % 10)) % 10;
  }

  function isValidGtin(v: string, totalLen: number): boolean {
    if (v.length !== totalLen) return false;
    const body = v.slice(0, totalLen - 1);
    const check = Number(v[totalLen - 1]);
    return calcCheckDigit(body) === check;
  }

  const validation = $derived.by((): { ok: boolean; msg: string } => {
    const v = value.trim();
    if (!v) return { ok: false, msg: "Introdu o valoare." };

    if (format === "EAN13") {
      if (!/^\d+$/.test(v)) return { ok: false, msg: "EAN-13: doar cifre acceptate." };
      if (v.length !== 12 && v.length !== 13)
        return { ok: false, msg: `EAN-13: 12 sau 13 cifre (acum: ${v.length}).` };
      if (v.length === 13 && !isValidGtin(v, 13))
        return { ok: false, msg: `EAN-13: cifră de control invalidă. Calculată: ${calcCheckDigit(v.slice(0, 12))}.` };
      return { ok: true, msg: "" };
    }

    if (format === "UPC") {
      if (!/^\d+$/.test(v)) return { ok: false, msg: "UPC-A: doar cifre acceptate." };
      if (v.length !== 11 && v.length !== 12)
        return { ok: false, msg: `UPC-A: 11 sau 12 cifre (acum: ${v.length}).` };
      if (v.length === 12 && !isValidGtin(v, 12))
        return { ok: false, msg: `UPC-A: cifră de control invalidă. Calculată: ${calcCheckDigit(v.slice(0, 11))}.` };
      return { ok: true, msg: "" };
    }

    if (format === "ITF14") {
      if (!/^\d+$/.test(v)) return { ok: false, msg: "ITF-14: doar cifre acceptate." };
      if (v.length !== 13 && v.length !== 14)
        return { ok: false, msg: `ITF-14: 13 sau 14 cifre (acum: ${v.length}).` };
      if (v.length === 14 && !isValidGtin(v, 14))
        return { ok: false, msg: `ITF-14: cifră de control invalidă. Calculată: ${calcCheckDigit(v.slice(0, 13))}.` };
      return { ok: true, msg: "" };
    }

    if (format === "CODE128") {
      if (v.length > 80) return { ok: false, msg: `CODE-128: prea lung (${v.length}). Maxim recomandat: 80.` };
      return { ok: true, msg: "" };
    }

    return { ok: true, msg: "" };
  });

  const computedCheckHint = $derived.by((): string => {
    const v = value.trim();
    if (!/^\d+$/.test(v)) return "";
    if (format === "EAN13" && v.length === 12) return ` → cifră de control: ${calcCheckDigit(v)}`;
    if (format === "UPC"   && v.length === 11) return ` → cifră de control: ${calcCheckDigit(v)}`;
    if (format === "ITF14" && v.length === 13) return ` → cifră de control: ${calcCheckDigit(v)}`;
    return "";
  });

  onMount(async () => {
    try {
      const mod: any = await import("jsbarcode");
      JsBarcode = mod.default ?? mod;
    } catch (e) {
      libError = `Eroare la încărcarea librăriei JsBarcode: ${e instanceof Error ? e.message : String(e)}`;
    }
  });

  // Render reactiv
  $effect(() => {
    if (!JsBarcode || !validation.ok) return;
    const fmt = FORMATS.find(f => f.id === format)!;
    const v = value.trim();

    // Canvas (PNG export)
    if (canvasEl) {
      const ctx = canvasEl.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      try {
        JsBarcode(canvasEl, v, {
          format: fmt.jsId,
          width: lineWidth,
          height,
          displayValue,
          background,
          lineColor,
          margin: 12,
        });
      } catch {}
    }

    // SVG (vizualizare + export)
    if (svgContainer) {
      svgContainer.innerHTML = "";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      try {
        JsBarcode(svg, v, {
          format: fmt.jsId,
          width: lineWidth,
          height,
          displayValue,
          background,
          lineColor,
          margin: 12,
        });
        svgContainer.appendChild(svg);
      } catch {}
    }
  });

  function selectFormat(id: FormatId) {
    format = id;
    const ex = FORMATS.find(f => f.id === id)!.example;
    // dacă valoarea curentă nu e validă pentru noul format, încărcăm exemplul
    queueMicrotask(() => {
      if (!validation.ok) value = ex;
    });
  }

  function loadExample() {
    value = FORMATS.find(f => f.id === format)!.example;
  }

  function downloadPNG() {
    if (!canvasEl || !validation.ok) return;
    const a = document.createElement("a");
    a.download = `cod-${format.toLowerCase()}-${Date.now()}.png`;
    a.href = canvasEl.toDataURL("image/png");
    a.click();
  }

  function downloadSVG() {
    if (!svgContainer || !validation.ok) return;
    const data = svgContainer.innerHTML;
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `cod-${format.toLowerCase()}-${Date.now()}.svg`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch {}
  }
</script>

<div class="tool">
  {#if libError}
    <div class="error-banner" role="alert">{libError}</div>
  {/if}

  <!-- Format selector -->
  <fieldset class="card formats">
    <legend class="legend">Format cod de bare</legend>
    <div class="format-grid">
      {#each FORMATS as fmt}
        <button
          type="button"
          class="format-card"
          class:format-card--active={format === fmt.id}
          aria-pressed={format === fmt.id}
          onclick={() => selectFormat(fmt.id)}
        >
          <span class="format-card__label">{fmt.label}</span>
          <span class="format-card__desc">{fmt.desc}</span>
          <code class="format-card__example">{fmt.example}</code>
        </button>
      {/each}
    </div>
  </fieldset>

  <!-- Input -->
  <div class="card input-card">
    <label class="label" for="bc-input">Valoare</label>
    <div class="input-row">
      <input
        id="bc-input"
        type="text"
        class="input"
        class:input--invalid={!validation.ok}
        bind:value
        placeholder="Introdu valoarea..."
        aria-invalid={!validation.ok}
        aria-describedby="bc-status"
        autocomplete="off"
        spellcheck="false"
      />
      <button type="button" class="btn btn--ghost" onclick={loadExample} title="Încarcă exemplu">📝 Exemplu</button>
      <button type="button" class="btn btn--ghost" onclick={copyValue} disabled={!value}>{copied ? "✓" : "📋"}</button>
    </div>
    <div id="bc-status" class="status" class:status--ok={validation.ok} class:status--bad={!validation.ok}>
      {#if validation.ok}
        <span>✓ Cod valid {format} ({value.trim().length} caractere){computedCheckHint}</span>
      {:else}
        <span>⚠️ {validation.msg}</span>
      {/if}
    </div>
  </div>

  <!-- Preview -->
  <div class="card preview-card" role="img" aria-label={`Previzualizare cod ${format}`}>
    {#if !JsBarcode}
      <div class="placeholder">⏳ Se încarcă generatorul...</div>
    {:else if !validation.ok}
      <div class="placeholder placeholder--err">⚠️ Corectează valoarea pentru a vedea codul.</div>
    {:else}
      <div bind:this={svgContainer} class="svg-host"></div>
      <canvas bind:this={canvasEl} class="canvas-hidden" aria-hidden="true"></canvas>
    {/if}
  </div>

  <!-- Download -->
  <div class="card download-card">
    <h3 class="legend">Descărcare</h3>
    <div class="dl-row">
      <button type="button" class="btn btn--primary" onclick={downloadPNG} disabled={!validation.ok}>⬇️ PNG</button>
      <button type="button" class="btn btn--outline" onclick={downloadSVG} disabled={!validation.ok}>⬇️ SVG (vector)</button>
    </div>
    <p class="hint">SVG este vectorial — perfect pentru tipar. PNG e ideal pentru web și aplicații.</p>
  </div>

  <!-- Advanced -->
  <details class="card advanced" bind:open={advancedOpen}>
    <summary>⚙️ Opțiuni avansate</summary>
    <div class="adv-grid">
      <label class="adv-item">
        <span>Grosime linie: <strong>{lineWidth}px</strong></span>
        <input type="range" min="1" max="5" step="0.5" bind:value={lineWidth} />
      </label>
      <label class="adv-item">
        <span>Înălțime: <strong>{height}px</strong></span>
        <input type="range" min="50" max="200" step="10" bind:value={height} />
      </label>
      <label class="adv-item">
        <span>Culoare linie</span>
        <input type="color" bind:value={lineColor} />
      </label>
      <label class="adv-item">
        <span>Fundal</span>
        <input type="color" bind:value={background} />
      </label>
      <label class="adv-item adv-item--row">
        <input type="checkbox" bind:checked={displayValue} />
        <span>Afișează valoarea sub cod</span>
      </label>
    </div>
  </details>

  <p class="disclaimer">
    ℹ️ Codurile generate sunt potrivite pentru uz personal, prototipare și testare. Pentru utilizare comercială cu produse fizice este necesară licențierea oficială
    <a href="https://www.gs1ro.org/" target="_blank" rel="noopener noreferrer">GS1 România</a>, care îți alocă un prefix companie unic.
  </p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg, 12px);
    padding: var(--sp-5);
  }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); padding: 0; }
  .label { display: block; font-size: .875rem; font-weight: 600; color: var(--text); margin-bottom: var(--sp-2); }

  /* Format grid */
  .formats { padding: var(--sp-5); }
  .format-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--sp-3);
  }
  .format-card {
    display: flex; flex-direction: column; gap: var(--sp-1);
    padding: var(--sp-4);
    background: var(--bg-input);
    border: 2px solid var(--border);
    border-radius: var(--r-md, 8px);
    cursor: pointer;
    text-align: left;
    transition: all var(--t-fast, 0.15s);
    color: var(--text);
  }
  .format-card:hover { border-color: var(--cat-fejleszto); transform: translateY(-1px); }
  .format-card--active {
    border-color: var(--cat-fejleszto);
    background: color-mix(in srgb, var(--cat-fejleszto) 10%, var(--bg-card));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-fejleszto) 25%, transparent);
  }
  .format-card__label { font-weight: 700; font-size: 1rem; color: var(--text); }
  .format-card__desc { font-size: .8125rem; color: var(--text-muted); }
  .format-card__example { display: block; font-family: var(--font-mono, monospace); font-size: .75rem; color: var(--text-subtle, var(--text-muted)); background: transparent; }

  /* Input */
  .input-row { display: flex; gap: var(--sp-2); align-items: stretch; }
  .input {
    flex: 1;
    font-family: var(--font-mono, monospace);
    font-size: 1rem;
    background: var(--bg-input);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4);
    transition: border-color var(--t-fast, 0.15s);
  }
  .input:focus { outline: none; border-color: var(--cat-fejleszto); }
  .input--invalid { border-color: #e11d48; }

  .status { margin-top: var(--sp-3); font-size: .8125rem; }
  .status--ok  { color: #059669; }
  .status--bad { color: #e11d48; }

  /* Preview */
  .preview-card {
    min-height: 220px;
    display: flex; align-items: center; justify-content: center;
    border-style: dashed;
    background: var(--bg-input);
  }
  .svg-host { display: flex; justify-content: center; }
  .svg-host :global(svg) { max-width: 100%; height: auto; }
  .canvas-hidden { display: none; }
  .placeholder { color: var(--text-muted); font-size: .9375rem; padding: var(--sp-6); text-align: center; }
  .placeholder--err { color: #e11d48; }

  /* Download */
  .dl-row { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-3) var(--sp-5);
    border-radius: var(--r-md, 8px);
    font-weight: 600;
    font-size: .9375rem;
    cursor: pointer;
    transition: all var(--t-fast, 0.15s);
    border: 1px solid transparent;
  }
  .btn:disabled { opacity: .5; cursor: not-allowed; }
  .btn--primary {
    background: var(--cat-fejleszto);
    color: white;
  }
  .btn--primary:hover:not(:disabled) { filter: brightness(1.08); }
  .btn--outline {
    background: transparent;
    border-color: var(--cat-fejleszto);
    color: var(--cat-fejleszto);
  }
  .btn--outline:hover:not(:disabled) { background: color-mix(in srgb, var(--cat-fejleszto) 12%, transparent); }
  .btn--ghost {
    background: var(--bg-input);
    border-color: var(--border);
    color: var(--text);
    padding: var(--sp-3) var(--sp-4);
  }
  .btn--ghost:hover:not(:disabled) { border-color: var(--cat-fejleszto); }
  .hint { margin: var(--sp-3) 0 0; font-size: .8125rem; color: var(--text-muted); }

  /* Advanced */
  .advanced > summary { cursor: pointer; font-weight: 600; color: var(--text); user-select: none; }
  .adv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--sp-4);
    margin-top: var(--sp-4);
  }
  .adv-item { display: flex; flex-direction: column; gap: var(--sp-2); font-size: .875rem; color: var(--text-muted); }
  .adv-item--row { flex-direction: row; align-items: center; }
  .adv-item input[type="color"] { height: 40px; width: 100%; border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; padding: 2px; background: var(--bg-input); }
  .adv-item input[type="range"] { accent-color: var(--cat-fejleszto); }

  .disclaimer {
    font-size: .8125rem;
    color: var(--text-muted);
    background: color-mix(in srgb, var(--cat-fejleszto) 6%, var(--bg-card));
    border: 1px solid color-mix(in srgb, var(--cat-fejleszto) 30%, var(--border));
    border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4);
    margin: 0;
  }
  .disclaimer a { color: var(--cat-fejleszto); text-decoration: underline; }

  .error-banner {
    background: #fef2f2; color: #b91c1c;
    border: 1px solid #fecaca; border-radius: var(--r-md, 8px);
    padding: var(--sp-3) var(--sp-4); font-size: .875rem;
  }
</style>
