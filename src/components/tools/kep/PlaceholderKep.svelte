<script lang="ts">
  // ─── Placeholder kép generátor (100% kliensoldali, kétnyelvű) ───
  const LANG = ((import.meta.env.PUBLIC_SITE_LANG as string) || "hu") as "hu" | "ro";

  const DICT = {
    hu: {
      presets: "Méret-sablonok",
      width: "Szélesség (px)", height: "Magasság (px)",
      bg: "Háttérszín", fg: "Szövegszín", textLbl: "Felirat (üres = méret)",
      textPh: "Kép helye…", download: "PNG letöltése", preview: "Előnézet",
      hint: "A kép a böngésződben, canvas-szal készül – semmi nem kerül szerverre.",
    },
    ro: {
      presets: "Șabloane de dimensiune",
      width: "Lățime (px)", height: "Înălțime (px)",
      bg: "Culoare fundal", fg: "Culoare text", textLbl: "Text (gol = dimensiunea)",
      textPh: "Locul imaginii…", download: "Descarcă PNG", preview: "Previzualizare",
      hint: "Imaginea se creează în browserul tău, cu canvas – nimic nu ajunge pe server.",
    },
  };
  const L = DICT[LANG] ?? DICT.hu;

  const PRESETS = [
    { l: "OG 1200×630", w: 1200, h: 630 },
    { l: "Instagram 1080×1080", w: 1080, h: 1080 },
    { l: "Story 1080×1920", w: 1080, h: 1920 },
    { l: "Full HD 1920×1080", w: 1920, h: 1080 },
    { l: "Banner 300×250", w: 300, h: 250 },
  ];

  let width = $state(1200);
  let height = $state(630);
  let bg = $state("#3b82f6");
  let fg = $state("#ffffff");
  let text = $state("");
  let canvas = $state<HTMLCanvasElement>();

  function draw() {
    if (!canvas) return;
    const w = Math.max(1, Math.min(4000, Math.floor(width) || 1));
    const h = Math.max(1, Math.min(4000, Math.floor(height) || 1));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fg;
    const label = text.trim() || `${w} × ${h}`;
    const fontSize = Math.max(12, Math.round(Math.min(w, h) / 8));
    ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, w / 2, h / 2);
  }

  $effect(() => { width; height; bg; fg; text; draw(); });

  function download() {
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `placeholder-${width}x${height}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
  function preset(w: number, h: number) { width = w; height = h; }
</script>

<div class="tool">
  <div class="presets">
    <span class="presets-lbl">{L.presets}:</span>
    {#each PRESETS as p}<button type="button" class="chip" onclick={() => preset(p.w, p.h)}>{p.l}</button>{/each}
  </div>

  <div class="grid">
    <div class="card controls">
      <div class="row2">
        <div class="field"><label class="lbl" for="ph-w">{L.width}</label><input id="ph-w" class="inp" type="number" min="1" max="4000" bind:value={width} /></div>
        <div class="field"><label class="lbl" for="ph-h">{L.height}</label><input id="ph-h" class="inp" type="number" min="1" max="4000" bind:value={height} /></div>
      </div>
      <div class="row2">
        <div class="field"><label class="lbl" for="ph-bg">{L.bg}</label><input id="ph-bg" class="color" type="color" bind:value={bg} /></div>
        <div class="field"><label class="lbl" for="ph-fg">{L.fg}</label><input id="ph-fg" class="color" type="color" bind:value={fg} /></div>
      </div>
      <div class="field"><label class="lbl" for="ph-t">{L.textLbl}</label><input id="ph-t" class="inp" type="text" bind:value={text} placeholder={L.textPh} /></div>
      <button type="button" class="btn btn--primary" onclick={download}>⬇ {L.download}</button>
    </div>
    <div class="card preview">
      <span class="lbl">{L.preview}</span>
      <div class="canvas-wrap"><canvas bind:this={canvas}></canvas></div>
    </div>
  </div>
  <p class="hint">{L.hint}</p>
</div>

<style>
  .tool { display: flex; flex-direction: column; gap: var(--sp-4); }
  .presets { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
  .presets-lbl { font-size: .8125rem; color: var(--text-muted); font-weight: 600; }
  .chip { background: var(--bg-input); border: 1px solid var(--border); border-radius: 999px; padding: var(--sp-1) var(--sp-3); font-size: .8rem; color: var(--text); cursor: pointer; transition: all var(--t-fast, .15s); }
  .chip:hover { border-color: var(--cat-kep, #3b82f6); color: var(--cat-kep, #3b82f6); }
  .grid { display: grid; grid-template-columns: 320px 1fr; gap: var(--sp-4); align-items: start; }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg, 12px); padding: var(--sp-5); }
  .controls { display: flex; flex-direction: column; gap: var(--sp-4); }
  .field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  .lbl { font-size: .8125rem; font-weight: 600; color: var(--text); }
  .inp { width: 100%; background: var(--bg-input); color: var(--text); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-2) var(--sp-3); font-size: .875rem; font-family: inherit; }
  .inp:focus { outline: none; border-color: var(--cat-kep, #3b82f6); box-shadow: 0 0 0 3px #3b82f622; }
  .color { width: 100%; height: 38px; padding: 2px; border: 1px solid var(--border); border-radius: var(--r-md, 8px); background: var(--bg-input); cursor: pointer; }
  .preview { display: flex; flex-direction: column; gap: var(--sp-3); }
  .canvas-wrap { display: flex; align-items: center; justify-content: center; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md, 8px); padding: var(--sp-3); min-height: 200px; }
  canvas { max-width: 100%; max-height: 420px; height: auto; border-radius: var(--r-sm, 4px); }
  .hint { margin: 0; font-size: .75rem; color: var(--text-subtle); }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-md, 8px); font-weight: 600; font-size: .8125rem; cursor: pointer; transition: all var(--t-fast, .15s); border: 1px solid var(--border); }
  .btn--primary { background: var(--cat-kep, #3b82f6); color: #fff; border-color: transparent; }
  .btn--primary:hover { filter: brightness(1.08); }
</style>
