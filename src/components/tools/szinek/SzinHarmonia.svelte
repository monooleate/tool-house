<script lang="ts">
  // ─── Szín-harmónia generátor (HSL-rotáció) – kétnyelvű, 100% kliensoldali ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";
  const DICT = {
    hu: {
      base: "Alapszín", invalid: "Érvénytelen szín", copied: "Másolva!",
      complementary: "Komplementer", analogous: "Analóg", triadic: "Triád",
      split: "Osztott komplementer", tetradic: "Tetrád (négyzet)", monochromatic: "Monokromatikus",
      copyRow: "Sor másolása", clickHint: "Kattints egy színre a másoláshoz",
    },
    ro: {
      base: "Culoarea de bază", invalid: "Culoare invalidă", copied: "Copiat!",
      complementary: "Complementară", analogous: "Analoage", triadic: "Triadică",
      split: "Complementară divizată", tetradic: "Tetradică (pătrat)", monochromatic: "Monocromatică",
      copyRow: "Copiază rândul", clickHint: "Apasă pe o culoare pentru a o copia",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  type RGB = { r: number; g: number; b: number };
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex2 = (n: number) => clamp(n).toString(16).padStart(2, "0").toUpperCase();
  const rgbToHex = ({ r, g, b }: RGB) => `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;

  function hexToRgb(hex: string): RGB | null {
    let h = hex.trim().replace(/^#/, "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  function rgbToHsl({ r, g, b }: RGB) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  function hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360; s /= 100; l /= 100;
    let r: number, g: number, b: number;
    if (s === 0) { r = g = b = l; }
    else {
      const f = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = f(p, q, h + 1 / 3); g = f(p, q, h); b = f(p, q, h - 1 / 3);
    }
    return { r: clamp(r * 255), g: clamp(g * 255), b: clamp(b * 255) };
  }

  let rgb = $state<RGB>({ r: 244, g: 63, b: 94 });
  let textRaw = $state("#F43F5E");
  let textErr = $state(false);
  let copiedKey = $state("");

  const hex = $derived(rgbToHex(rgb));
  const hsl = $derived(rgbToHsl(rgb));

  function shift(dHue: number, dL = 0): string {
    const h = (hsl.h + dHue + 360) % 360;
    const l = Math.max(0, Math.min(100, hsl.l + dL));
    return rgbToHex(hslToRgb(h, hsl.s, l));
  }

  const schemes = $derived([
    { key: "complementary", label: L.complementary, colors: [hex, shift(180)] },
    { key: "analogous", label: L.analogous, colors: [shift(-30), hex, shift(30)] },
    { key: "triadic", label: L.triadic, colors: [hex, shift(120), shift(240)] },
    { key: "split", label: L.split, colors: [hex, shift(150), shift(210)] },
    { key: "tetradic", label: L.tetradic, colors: [hex, shift(90), shift(180), shift(270)] },
    { key: "monochromatic", label: L.monochromatic, colors: [shift(0, -30), shift(0, -15), hex, shift(0, 15), shift(0, 30)] },
  ]);

  function onText(e: Event) {
    textRaw = (e.target as HTMLInputElement).value;
    const parsed = hexToRgb(textRaw);
    if (parsed) { rgb = parsed; textErr = false; }
    else { textErr = textRaw.trim() !== ""; }
  }
  function onPicker(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    const parsed = hexToRgb(v);
    if (parsed) { rgb = parsed; textRaw = v.toUpperCase(); textErr = false; }
  }
  async function copy(key: string, val: string) {
    try { await navigator.clipboard.writeText(val); copiedKey = key; setTimeout(() => (copiedKey = ""), 1200); } catch {}
  }
</script>

<div class="tool">
  <div class="card base-card">
    <span class="legend">{L.base}</span>
    <div class="picker-row" class:picker-row--err={textErr}>
      <input class="color-picker" type="color" value={hex} oninput={onPicker} aria-label={L.base} />
      <input class="text-input" type="text" spellcheck="false" autocomplete="off" value={textRaw} oninput={onText} placeholder="#F43F5E" />
    </div>
    {#if textErr}<p class="err">⚠️ {L.invalid}</p>{:else}<p class="hint">{L.clickHint}</p>{/if}
  </div>

  {#each schemes as sch}
    <div class="card scheme">
      <div class="scheme-head">
        <span class="scheme-label">{sch.label}</span>
        <button type="button" class="row-copy" onclick={() => copy(`row-${sch.key}`, sch.colors.join(", "))}>
          {copiedKey === `row-${sch.key}` ? `✓ ${L.copied}` : `📋 ${L.copyRow}`}
        </button>
      </div>
      <div class="swatches">
        {#each sch.colors as c, i}
          <button type="button" class="swatch" style={`background:${c}`} onclick={() => copy(`${sch.key}-${i}`, c)} title={c}>
            <span class="swatch__hex">{copiedKey === `${sch.key}-${i}` ? `✓ ${L.copied}` : c}</span>
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); }
  .hint { margin: var(--sp-2) 0 0; font-size: .8125rem; color: var(--text-muted); }
  .err { margin: var(--sp-2) 0 0; font-size: .8125rem; color: #dc2626; font-weight: 600; }

  .base-card { display: flex; flex-direction: column; gap: var(--sp-2); }
  .picker-row { display: flex; gap: var(--sp-2); margin-top: var(--sp-2); }
  .color-picker { width: 48px; flex-shrink: 0; padding: 2px; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; }
  .text-input { flex: 1; min-width: 0; font-family: var(--font-mono, monospace); font-size: 1rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); }
  .text-input:focus { outline: none; border-color: var(--cat-szinek, #f43f5e); }
  .picker-row--err .text-input { border-color: #dc2626; }

  .scheme { padding: var(--sp-4) var(--sp-5); }
  .scheme-head { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); margin-bottom: var(--sp-3); }
  .scheme-label { font-size: .875rem; font-weight: 600; color: var(--text); }
  .row-copy { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; padding: var(--sp-1) var(--sp-3); color: var(--text-muted); font-size: .75rem; }
  .row-copy:hover { border-color: var(--cat-szinek, #f43f5e); }

  .swatches { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
  .swatch {
    flex: 1; min-width: 64px; height: 76px; border: 1px solid var(--border);
    border-radius: var(--r-md, 8px); cursor: pointer; position: relative;
    display: flex; align-items: flex-end; justify-content: center; padding: var(--sp-1); overflow: hidden;
  }
  .swatch__hex {
    font-family: var(--font-mono, monospace); font-size: .68rem; font-weight: 700;
    color: #fff; background: rgba(0,0,0,.45); border-radius: var(--r-sm, 4px);
    padding: 1px 5px; white-space: nowrap;
  }
</style>
