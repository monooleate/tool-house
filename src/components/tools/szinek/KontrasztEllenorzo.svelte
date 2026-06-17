<script lang="ts">
  // ─── WCAG kontraszt-ellenőrző (100% kliensoldali, kétnyelvű build-idős) ───
  // A WCAG 2.x relatív luminancia képlete alapján számolja a kontrasztarányt,
  // és kiértékeli az AA/AAA megfelelőséget normál és nagy szövegre.
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      fg: "Szöveg színe", bg: "Háttérszín", swap: "Csere",
      ratio: "Kontrasztarány", sample: "Minta szöveg – árvíztűrő tükörfúrógép",
      pass: "Megfelel", fail: "Nem felel meg",
      aaNormal: "AA – normál szöveg", aaLarge: "AA – nagy szöveg",
      aaaNormal: "AAA – normál szöveg", aaaLarge: "AAA – nagy szöveg",
      levels: "WCAG megfelelőség", invalid: "Érvénytelen szín",
    },
    ro: {
      fg: "Culoarea textului", bg: "Culoarea fundalului", swap: "Inversează",
      ratio: "Raport de contrast", sample: "Text de probă – cinci elefanți mănâncă jeleu",
      pass: "Trece", fail: "Nu trece",
      aaNormal: "AA – text normal", aaLarge: "AA – text mare",
      aaaNormal: "AAA – text normal", aaaLarge: "AAA – text mare",
      levels: "Conformitate WCAG", invalid: "Culoare invalidă",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  type RGB = { r: number; g: number; b: number };

  function hexToRgb(hex: string): RGB | null {
    let h = hex.trim().replace(/^#/, "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  const toHex2 = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0").toUpperCase();
  const rgbToHex = ({ r, g, b }: RGB) => `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;

  function luminance({ r, g, b }: RGB): number {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  function contrast(c1: RGB, c2: RGB): number {
    const l1 = luminance(c1), l2 = luminance(c2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  // ─── State ─────────────────────────────────────────────────
  let fgHex = $state("#1F2937");
  let bgHex = $state("#FFFFFF");

  const fg = $derived(hexToRgb(fgHex));
  const bg = $derived(hexToRgb(bgHex));
  const ratio = $derived(fg && bg ? contrast(fg, bg) : null);
  const ratioStr = $derived(ratio ? `${ratio.toFixed(2)}:1` : "—");

  const checks = $derived(
    ratio
      ? [
          { key: "aaLarge", label: L.aaLarge, min: 3, pass: ratio >= 3 },
          { key: "aaNormal", label: L.aaNormal, min: 4.5, pass: ratio >= 4.5 },
          { key: "aaaLarge", label: L.aaaLarge, min: 4.5, pass: ratio >= 4.5 },
          { key: "aaaNormal", label: L.aaaNormal, min: 7, pass: ratio >= 7 },
        ]
      : [],
  );

  function onPick(which: "fg" | "bg", e: Event) {
    const v = (e.target as HTMLInputElement).value;
    if (which === "fg") fgHex = v.toUpperCase();
    else bgHex = v.toUpperCase();
  }
  function onText(which: "fg" | "bg", e: Event) {
    const v = (e.target as HTMLInputElement).value;
    if (which === "fg") fgHex = v;
    else bgHex = v;
  }
  function swap() {
    const t = fgHex; fgHex = bgHex; bgHex = t;
  }
</script>

<div class="tool">
  <!-- Színválasztók -->
  <div class="pickers">
    {#each [["fg", L.fg, fgHex], ["bg", L.bg, bgHex]] as [which, label, val]}
      <div class="card picker">
        <span class="picker__label">{label}</span>
        <div class="picker__row" class:picker__row--err={!hexToRgb(val as string)}>
          <input class="picker__color" type="color" value={hexToRgb(val as string) ? rgbToHex(hexToRgb(val as string)!) : "#000000"} oninput={(e) => onPick(which as "fg" | "bg", e)} aria-label={label} />
          <input class="picker__text" type="text" spellcheck="false" autocomplete="off" value={val} oninput={(e) => onText(which as "fg" | "bg", e)} />
        </div>
      </div>
    {/each}
    <button type="button" class="swap-btn" onclick={swap} aria-label={L.swap} title={L.swap}>⇅</button>
  </div>

  {#if !fg || !bg}
    <p class="err-msg" role="alert">⚠️ {L.invalid}</p>
  {:else}
    <!-- Élő előnézet -->
    <div class="preview" style={`background:${rgbToHex(bg)}; color:${rgbToHex(fg)}`}>
      <span class="preview__big">{L.sample}</span>
      <span class="preview__small">{L.sample}</span>
    </div>

    <!-- Kontrasztarány -->
    <div class="card ratio-card">
      <span class="ratio-card__label">{L.ratio}</span>
      <span class="ratio-card__value">{ratioStr}</span>
    </div>

    <!-- WCAG szintek -->
    <div class="card">
      <h3 class="legend">{L.levels}</h3>
      <ul class="checks">
        {#each checks as c}
          <li class="check" class:check--pass={c.pass} class:check--fail={!c.pass}>
            <span class="check__icon">{c.pass ? "✓" : "✕"}</span>
            <span class="check__label">{c.label}</span>
            <span class="check__min">≥ {c.min}:1</span>
            <span class="check__verdict">{c.pass ? L.pass : L.fail}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); }

  .pickers { display: grid; grid-template-columns: 1fr auto 1fr; gap: var(--sp-3); align-items: center; }
  @media (max-width: 560px) { .pickers { grid-template-columns: 1fr; } .swap-btn { justify-self: center; } }
  .picker { display: flex; flex-direction: column; gap: var(--sp-2); }
  .picker__label { font-size: .8125rem; font-weight: 600; color: var(--text-muted); }
  .picker__row { display: flex; gap: var(--sp-2); }
  .picker__row--err .picker__text { border-color: #dc2626; }
  .picker__color { width: 44px; flex-shrink: 0; padding: 2px; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; }
  .picker__text { flex: 1; min-width: 0; font-family: var(--font-mono, monospace); font-size: .9375rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); }
  .picker__text:focus { outline: none; border-color: var(--cat-szinek, #f43f5e); }

  .swap-btn { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; padding: var(--sp-3); font-size: 1.1rem; color: var(--text); }
  .swap-btn:hover { border-color: var(--cat-szinek, #f43f5e); }

  .preview { border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-6); display: flex; flex-direction: column; gap: var(--sp-3); }
  .preview__big { font-size: 1.5rem; font-weight: 700; }
  .preview__small { font-size: .875rem; }

  .ratio-card { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3); }
  .ratio-card__label { font-size: .875rem; color: var(--text-muted); }
  .ratio-card__value { font-size: 1.75rem; font-weight: 700; color: var(--text); font-family: var(--font-mono, monospace); font-variant-numeric: tabular-nums; }

  .checks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .check { display: grid; grid-template-columns: 24px 1fr auto auto; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); border: 1px solid var(--border); }
  .check--pass { background: color-mix(in srgb, #16a34a 8%, var(--bg-card)); border-color: color-mix(in srgb, #16a34a 35%, var(--border)); }
  .check--fail { background: color-mix(in srgb, #dc2626 7%, var(--bg-card)); border-color: color-mix(in srgb, #dc2626 30%, var(--border)); }
  .check__icon { font-weight: 700; text-align: center; }
  .check--pass .check__icon { color: #16a34a; }
  .check--fail .check__icon { color: #dc2626; }
  .check__label { font-size: .875rem; color: var(--text); font-weight: 600; }
  .check__min { font-size: .78rem; color: var(--text-muted); font-family: var(--font-mono, monospace); }
  .check__verdict { font-size: .78rem; font-weight: 700; }
  .check--pass .check__verdict { color: #16a34a; }
  .check--fail .check__verdict { color: #dc2626; }

  .err-msg { margin: 0; font-size: .8125rem; color: #dc2626; font-weight: 600; background: color-mix(in srgb, #dc2626 7%, var(--bg-card)); border: 1px solid color-mix(in srgb, #dc2626 30%, var(--border)); border-radius: var(--r-md, 8px); padding: var(--sp-3) var(--sp-4); }
</style>
