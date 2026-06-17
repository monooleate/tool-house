<script lang="ts">
  // ─── Színkonverter (100% kliensoldali, kétnyelvű build-idős) ───
  // Egyetlen igazságforrás: az rgb {r,g,b}. A szövegmező bármilyen formátumot
  // elfogad (HEX/RGB/HSL), a színválasztó és a csúszkák is ezt frissítik.
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      heading: "Szín kiválasztása",
      inputLabel: "Bármilyen formátum (HEX, RGB, HSL)",
      invalid: "Érvénytelen színformátum",
      channels: "RGB csatornák",
      outputs: "Színértékek",
      copy: "Másolás",
      copied: "Másolva!",
    },
    ro: {
      heading: "Alegerea culorii",
      inputLabel: "Orice format (HEX, RGB, HSL)",
      invalid: "Format de culoare invalid",
      channels: "Canale RGB",
      outputs: "Valori de culoare",
      copy: "Copiază",
      copied: "Copiat!",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  type RGB = { r: number; g: number; b: number };

  // ─── Konverziók ────────────────────────────────────────────
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex2 = (n: number) => clamp(n).toString(16).padStart(2, "0").toUpperCase();
  function rgbToHex({ r, g, b }: RGB): string { return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`; }

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
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: clamp(r * 255), g: clamp(g * 255), b: clamp(b * 255) };
  }

  function rgbToHsv({ r, g, b }: RGB) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0; const s = max === 0 ? 0 : d / max; const v = max;
    if (max !== min) {
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
  }

  function rgbToCmyk({ r, g, b }: RGB) {
    const r1 = r / 255, g1 = g / 255, b1 = b / 255;
    const k = 1 - Math.max(r1, g1, b1);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((1 - r1 - k) / (1 - k)) * 100),
      m: Math.round(((1 - g1 - k) / (1 - k)) * 100),
      y: Math.round(((1 - b1 - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  }

  function parseColor(str: string): RGB | null {
    const s = str.trim().toLowerCase();
    if (s === "") return null;
    const hx = hexToRgb(s);
    if (hx) return hx;
    const rgbM = s.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
    if (rgbM) {
      const r = +rgbM[1], g = +rgbM[2], b = +rgbM[3];
      if (r <= 255 && g <= 255 && b <= 255) return { r, g, b };
    }
    const hslM = s.match(/hsla?\(\s*(\d+)[,\s]+(\d+)%?[,\s]+(\d+)%?/);
    if (hslM) {
      const h = +hslM[1], sl = +hslM[2], l = +hslM[3];
      if (h <= 360 && sl <= 100 && l <= 100) return hslToRgb(h, sl, l);
    }
    return null;
  }

  // ─── State ─────────────────────────────────────────────────
  let rgb = $state<RGB>({ r: 59, g: 130, b: 246 });
  let textRaw = $state("#3B82F6");
  let textErr = $state(false);
  let copiedKey = $state("");

  const hex = $derived(rgbToHex(rgb));
  const hsl = $derived(rgbToHsl(rgb));
  const hsv = $derived(rgbToHsv(rgb));
  const cmyk = $derived(rgbToCmyk(rgb));

  const outputs = $derived([
    { key: "hex", label: "HEX", value: hex },
    { key: "rgb", label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { key: "hsl", label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { key: "hsv", label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
    { key: "cmyk", label: "CMYK", value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ]);

  function onText(e: Event) {
    textRaw = (e.target as HTMLInputElement).value;
    const parsed = parseColor(textRaw);
    if (parsed) { rgb = parsed; textErr = false; }
    else { textErr = textRaw.trim() !== ""; }
  }
  function onPicker(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    const parsed = hexToRgb(v);
    if (parsed) { rgb = parsed; textRaw = v.toUpperCase(); textErr = false; }
  }
  function setChannel(ch: "r" | "g" | "b", val: number) {
    rgb = { ...rgb, [ch]: clamp(val) };
    textRaw = rgbToHex(rgb);
    textErr = false;
  }

  async function copy(key: string, val: string) {
    try { await navigator.clipboard.writeText(val); copiedKey = key; setTimeout(() => (copiedKey = ""), 1500); } catch {}
  }
</script>

<div class="tool">
  <div class="card top">
    <div class="swatch" style={`background:${hex}`} aria-label={hex}></div>
    <div class="top-controls">
      <h2 class="legend">{L.heading}</h2>
      <div class="picker-row">
        <input class="color-picker" type="color" value={hex} oninput={onPicker} aria-label={L.heading} />
        <input
          class="text-input"
          class:text-input--err={textErr}
          type="text"
          spellcheck="false"
          autocomplete="off"
          value={textRaw}
          oninput={onText}
          placeholder="#3B82F6 · rgb(59,130,246) · hsl(217,91%,60%)"
          aria-label={L.inputLabel}
        />
      </div>
      {#if textErr}<p class="err">⚠️ {L.invalid}</p>{:else}<p class="hint">{L.inputLabel}</p>{/if}
    </div>
  </div>

  <!-- RGB csúszkák -->
  <div class="card">
    <h3 class="legend">{L.channels}</h3>
    <div class="sliders">
      {#each [["r", "R", "#ef4444"], ["g", "G", "#22c55e"], ["b", "B", "#3b82f6"]] as [ch, lab, col]}
        <label class="slider">
          <span class="slider__lab" style={`color:${col}`}>{lab}</span>
          <input type="range" min="0" max="255" value={rgb[ch as "r" | "g" | "b"]} oninput={(e) => setChannel(ch as "r" | "g" | "b", +(e.target as HTMLInputElement).value)} style={`accent-color:${col}`} />
          <span class="slider__val">{rgb[ch as "r" | "g" | "b"]}</span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Kimenetek -->
  <div class="card">
    <h3 class="legend">{L.outputs}</h3>
    <ul class="out-list">
      {#each outputs as o}
        <li class="out">
          <span class="out__label">{o.label}</span>
          <code class="out__value">{o.value}</code>
          <button type="button" class="out__copy" onclick={() => copy(o.key, o.value)} aria-label={L.copy}>
            {copiedKey === o.key ? "✓" : "📋"}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-5); }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .legend { font-size: .875rem; font-weight: 600; color: var(--text); margin: 0 0 var(--sp-3); }
  .hint { margin: var(--sp-2) 0 0; font-size: .8125rem; color: var(--text-muted); }
  .err { margin: var(--sp-2) 0 0; font-size: .8125rem; color: #dc2626; font-weight: 600; }

  .top { display: flex; gap: var(--sp-4); align-items: stretch; }
  @media (max-width: 520px) { .top { flex-direction: column; } }
  .swatch { width: 120px; flex-shrink: 0; min-height: 120px; border-radius: var(--r-md, 8px); border: 1px solid var(--border); }
  @media (max-width: 520px) { .swatch { width: 100%; min-height: 80px; } }
  .top-controls { flex: 1; display: flex; flex-direction: column; }
  .top-controls .legend { margin-bottom: var(--sp-2); }

  .picker-row { display: flex; gap: var(--sp-2); align-items: stretch; }
  .color-picker { width: 48px; flex-shrink: 0; padding: 2px; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; height: auto; }
  .text-input { flex: 1; min-width: 0; font-family: var(--font-mono, monospace); font-size: 1rem; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); }
  .text-input:focus { outline: none; border-color: var(--cat-szinek, #f43f5e); }
  .text-input--err { border-color: #dc2626; }

  .sliders { display: flex; flex-direction: column; gap: var(--sp-3); }
  .slider { display: grid; grid-template-columns: 28px 1fr 44px; align-items: center; gap: var(--sp-3); }
  .slider__lab { font-weight: 700; font-size: .9rem; }
  .slider__val { font-family: var(--font-mono, monospace); font-size: .875rem; color: var(--text-muted); text-align: right; font-variant-numeric: tabular-nums; }
  .slider input[type="range"] { width: 100%; }

  .out-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
  .out { display: grid; grid-template-columns: 54px 1fr auto; align-items: center; gap: var(--sp-3); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); }
  .out__label { font-weight: 700; font-size: .8125rem; color: var(--text-muted); }
  .out__value { font-family: var(--font-mono, monospace); font-size: .9375rem; color: var(--text); word-break: break-all; }
  .out__copy { background: transparent; border: 1px solid var(--border); border-radius: var(--r-md, 8px); cursor: pointer; padding: var(--sp-1) var(--sp-3); color: var(--text); }
  .out__copy:hover { border-color: var(--cat-szinek, #f43f5e); }
</style>
