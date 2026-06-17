<script lang="ts">
  // ─── Színvakság-szimulátor (CVD mátrixok) – kétnyelvű, 100% kliensoldali ───
  // A szín szimulált megjelenése a leggyakoribb színlátászavarok esetén.
  // Wickline/HCIRN közelítő mátrixok, sRGB-re alkalmazva.
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";
  const DICT = {
    hu: {
      base: "Vizsgált szín", invalid: "Érvénytelen szín", copied: "Másolva!",
      normal: "Normál látás", normalNote: "kb. 92%",
      prot: "Protanópia", protNote: "vörös-vakság (~1%)",
      deut: "Deuteranópia", deutNote: "zöld-vakság (~6%)",
      trit: "Tritanópia", tritNote: "kék-vakság (~0,01%)",
      achr: "Akromatópszia", achrNote: "teljes színvakság (ritka)",
      hint: "Hasonlítsd össze, megkülönböztethető marad-e a szín az egyes típusoknál.",
    },
    ro: {
      base: "Culoarea testată", invalid: "Culoare invalidă", copied: "Copiat!",
      normal: "Vedere normală", normalNote: "cca. 92%",
      prot: "Protanopie", protNote: "lipsă de roșu (~1%)",
      deut: "Deuteranopie", deutNote: "lipsă de verde (~6%)",
      trit: "Tritanopie", tritNote: "lipsă de albastru (~0,01%)",
      achr: "Acromatopsie", achrNote: "lipsă totală a culorii (rar)",
      hint: "Compară dacă culoarea rămâne distinctă la fiecare tip.",
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

  // CVD szimulációs mátrixok (sRGB-re)
  const MATRICES: Record<string, number[][]> = {
    prot: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
    deut: [[0.625, 0.375, 0], [0.70, 0.30, 0], [0, 0.30, 0.70]],
    trit: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
    achr: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]],
  };
  function apply(m: number[][], { r, g, b }: RGB): RGB {
    return {
      r: clamp(m[0][0] * r + m[0][1] * g + m[0][2] * b),
      g: clamp(m[1][0] * r + m[1][1] * g + m[1][2] * b),
      b: clamp(m[2][0] * r + m[2][1] * g + m[2][2] * b),
    };
  }

  let rgb = $state<RGB>({ r: 22, g: 163, b: 74 }); // egy zöld – jól mutatja a deuteranópiát
  let textRaw = $state("#16A34A");
  let textErr = $state(false);
  let copiedKey = $state("");

  const hex = $derived(rgbToHex(rgb));
  const results = $derived([
    { key: "normal", label: L.normal, note: L.normalNote, hex: hex },
    { key: "prot", label: L.prot, note: L.protNote, hex: rgbToHex(apply(MATRICES.prot, rgb)) },
    { key: "deut", label: L.deut, note: L.deutNote, hex: rgbToHex(apply(MATRICES.deut, rgb)) },
    { key: "trit", label: L.trit, note: L.tritNote, hex: rgbToHex(apply(MATRICES.trit, rgb)) },
    { key: "achr", label: L.achr, note: L.achrNote, hex: rgbToHex(apply(MATRICES.achr, rgb)) },
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
      <input class="text-input" type="text" spellcheck="false" autocomplete="off" value={textRaw} oninput={onText} placeholder="#16A34A" />
    </div>
    {#if textErr}<p class="err">⚠️ {L.invalid}</p>{:else}<p class="hint">{L.hint}</p>{/if}
  </div>

  <div class="grid">
    {#each results as r}
      <div class="cvd">
        <button type="button" class="cvd__swatch" style={`background:${r.hex}`} onclick={() => copy(r.key, r.hex)} title={r.hex} aria-label={`${r.label} ${r.hex}`}></button>
        <div class="cvd__meta">
          <span class="cvd__label">{r.label}</span>
          <span class="cvd__note">{r.note}</span>
          <button type="button" class="cvd__hex" onclick={() => copy(r.key, r.hex)}>{copiedKey === r.key ? `✓ ${L.copied}` : r.hex}</button>
        </div>
      </div>
    {/each}
  </div>
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

  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--sp-3); }
  .cvd { display: flex; flex-direction: column; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md, 8px); overflow: hidden; }
  .cvd__swatch { height: 88px; border: none; border-bottom: 1px solid var(--border); cursor: pointer; width: 100%; padding: 0; }
  .cvd__meta { display: flex; flex-direction: column; gap: 2px; padding: var(--sp-3); }
  .cvd__label { font-size: .8125rem; font-weight: 700; color: var(--text); }
  .cvd__note { font-size: .72rem; color: var(--text-muted); }
  .cvd__hex { align-self: flex-start; margin-top: var(--sp-1); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-sm, 4px); cursor: pointer; padding: 2px 6px; font-family: var(--font-mono, monospace); font-size: .72rem; color: var(--text); }
  .cvd__hex:hover { border-color: var(--cat-szinek, #f43f5e); }
</style>
